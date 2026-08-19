/**
 * Plant Hub - Garden & Plant Manager Module (Supabase + LocalStorage Hybrid)
 * Manages user's plant library with real-time Supabase Cloud DB sync.
 * Clean slate with NO hardcoded default encyclopedia entries.
 */

window.GardenManager = (function() {
  const STORAGE_KEY_PLANTS = "planthub_my_plants";
  const STORAGE_KEY_ENCYCLOPEDIA = "planthub_plant_encyclopedia";

  // Clean slate: No hardcoded default encyclopedia
  const defaultEncyclopedia = [];
  const defaultPlants = [];
  let memoryPlantsCache = null;

  function getLocalPlants() {
    const data = localStorage.getItem(STORAGE_KEY_PLANTS);
    if (!data) return defaultPlants;
    try {
      const parsed = JSON.parse(data);
      return parsed.filter(p => !p.id.includes("plant_1") && !p.id.includes("plant_2") && !p.id.includes("plant_3"));
    } catch (e) {
      return defaultPlants;
    }
  }

  function saveLocalPlants(plants) {
    localStorage.setItem(STORAGE_KEY_PLANTS, JSON.stringify(plants));
  }

  function getPlants() {
    if (memoryPlantsCache) return memoryPlantsCache;
    memoryPlantsCache = getLocalPlants();
    return memoryPlantsCache;
  }

  async function fetchPlantsAsync() {
    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from("garden_plants")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data !== null) {
          const mapped = data.map(p => ({
            id: p.id,
            name: p.name,
            species: p.species,
            purchaseDate: p.purchase_date,
            waterInterval: p.water_interval,
            lastWatered: p.last_watered,
            location: p.location,
            notes: p.notes
          }));
          memoryPlantsCache = mapped;
          saveLocalPlants(mapped);
          return mapped;
        }
      } catch (err) {
        console.warn("[GardenManager] Supabase fetch error", err);
      }
    }
    memoryPlantsCache = getLocalPlants();
    return memoryPlantsCache;
  }

  async function addPlant(plantData) {
    const newPlant = {
      id: (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : "plant_" + Date.now(),
      name: plantData.name || "未命名植物",
      species: plantData.species || "一般植物",
      purchaseDate: plantData.purchaseDate || new Date().toISOString().split('T')[0],
      waterInterval: parseInt(plantData.waterInterval, 10) || 3,
      lastWatered: plantData.lastWatered || new Date().toISOString().split('T')[0],
      location: plantData.location || "室內",
      notes: plantData.notes || ""
    };

    const plants = getPlants();
    plants.push(newPlant);
    memoryPlantsCache = plants;
    saveLocalPlants(plants);

    if (window.supabaseClient) {
      try {
        await window.supabaseClient.from("garden_plants").insert({
          id: newPlant.id,
          name: newPlant.name,
          species: newPlant.species,
          purchase_date: newPlant.purchaseDate,
          water_interval: newPlant.waterInterval,
          last_watered: newPlant.lastWatered,
          location: newPlant.location,
          notes: newPlant.notes
        });
      } catch (e) {
        console.warn("[GardenManager] Cloud sync error", e);
      }
    }

    return newPlant;
  }

  async function updatePlant(plantId, updatedFields) {
    const plants = getPlants();
    const idx = plants.findIndex(p => p.id === plantId);
    if (idx !== -1) {
      plants[idx] = { ...plants[idx], ...updatedFields };
      memoryPlantsCache = plants;
      saveLocalPlants(plants);

      if (window.supabaseClient) {
        try {
          const dbPayload = {};
          if (updatedFields.lastWatered !== undefined) dbPayload.last_watered = updatedFields.lastWatered;
          if (updatedFields.name !== undefined) dbPayload.name = updatedFields.name;
          if (updatedFields.species !== undefined) dbPayload.species = updatedFields.species;
          if (updatedFields.waterInterval !== undefined) dbPayload.water_interval = updatedFields.waterInterval;
          if (updatedFields.location !== undefined) dbPayload.location = updatedFields.location;
          if (updatedFields.notes !== undefined) dbPayload.notes = updatedFields.notes;

          await window.supabaseClient
            .from("garden_plants")
            .update(dbPayload)
            .eq("id", plantId);
        } catch (e) {
          console.warn("[GardenManager] Cloud update error", e);
        }
      }
      return plants[idx];
    }
    return null;
  }

  async function deletePlant(plantId) {
    let plants = getPlants();
    plants = plants.filter(p => p.id !== plantId);
    memoryPlantsCache = plants;
    saveLocalPlants(plants);

    if (window.supabaseClient) {
      try {
        await window.supabaseClient.from("garden_plants").delete().eq("id", plantId);
      } catch (e) {
        console.warn("[GardenManager] Cloud delete error", e);
      }
    }
  }

  function getEncyclopedia() {
    const data = localStorage.getItem(STORAGE_KEY_ENCYCLOPEDIA);
    if (!data) return defaultEncyclopedia;
    try { return JSON.parse(data); } catch (e) { return defaultEncyclopedia; }
  }

  function saveEncyclopedia(list) {
    localStorage.setItem(STORAGE_KEY_ENCYCLOPEDIA, JSON.stringify(list));
  }

  function addEncyclopediaEntry(entry) {
    const list = getEncyclopedia();
    list.push(entry);
    saveEncyclopedia(list);
  }

  return {
    getPlants,
    fetchPlantsAsync,
    addPlant,
    updatePlant,
    deletePlant,
    getEncyclopedia,
    saveEncyclopedia,
    addEncyclopediaEntry
  };
})();
