/**
 * Plant Hub - Garden & Plant Manager Module (Supabase + LocalStorage Hybrid)
 * Manages user's plant library with real-time Supabase Cloud DB sync and LocalStorage fallback.
 */

window.GardenManager = (function() {
  const STORAGE_KEY_PLANTS = "planthub_my_plants";

  const plantEncyclopedia = [
    {
      species: "龜背竹 (Monstera)",
      sunlight: "半陰通風處、避免強烈直射光",
      waterInterval: 5,
      soil: "排水良好之泥炭土混珍珠石",
      careTips: "喜高濕度，葉片大易積灰塵，可用濕布輕拭葉面；冬日需減少水份。"
    },
    {
      species: "琴葉榕 (Fiddle-leaf Fig)",
      sunlight: "明亮散射光、每天 4-6 小時光照",
      waterInterval: 7,
      soil: "疏鬆肥沃、排水優良土壤",
      careTips: "對環境變化敏感，避免頻繁移動位置；表土向下2公分乾透再澆透。"
    },
    {
      species: "虎尾蘭 (Snake Plant)",
      sunlight: "耐陰，亦喜明亮光線",
      waterInterval: 14,
      soil: "多肉介質或極佳排水沙質土",
      careTips: "極度耐旱，最忌積水根腐；寧乾勿濕，冬季可2-3週澆水一次。"
    },
    {
      species: "蝴蝶蘭 (Orchid)",
      sunlight: "通風柔和散射光",
      waterInterval: 7,
      soil: "水苔或松樹皮塊",
      careTips: "花期維持環境通風，水苔表面乾燥才補水，切忌將水澆入花心。"
    },
    {
      species: "櫻花盆栽 (Mini Cherry)",
      sunlight: "全日照戶外陽台",
      waterInterval: 2,
      soil: "微酸性排水佳腐葉土",
      careTips: "開花前後需要充足日照與適度磷鉀肥；夏季需避免缺水枯黃。"
    }
  ];

  const defaultPlants = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      name: "小龜龜",
      species: "龜背竹 (Monstera)",
      purchaseDate: "2026-05-10",
      waterInterval: 5,
      lastWatered: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
      location: "客廳窗台",
      notes: "葉片已開裂第4片，生長狀況良好。"
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      name: "玄關琴葉榕",
      species: "琴葉榕 (Fiddle-leaf Fig)",
      purchaseDate: "2026-03-15",
      waterInterval: 7,
      lastWatered: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
      location: "玄關入口",
      notes: "上個月曾經因澆水過多導致底部老葉黃化掉落，現已調整水分。"
    },
    {
      id: "33333333-3333-3333-3333-333333333333",
      name: "陽台迷你山櫻",
      species: "櫻花盆栽 (Mini Cherry)",
      purchaseDate: "2026-01-20",
      waterInterval: 2,
      lastWatered: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
      location: "戶外陽台",
      notes: "正值夏季營養生長階段，枝葉茂盛。"
    }
  ];

  // In-memory cache for fast UI rendering
  let memoryPlantsCache = null;

  function getLocalPlants() {
    const data = localStorage.getItem(STORAGE_KEY_PLANTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_PLANTS, JSON.stringify(defaultPlants));
      return defaultPlants;
    }
    try { return JSON.parse(data); } catch (e) { return defaultPlants; }
  }

  function saveLocalPlants(plants) {
    localStorage.setItem(STORAGE_KEY_PLANTS, JSON.stringify(plants));
  }

  // Synchronous getter for quick UI rendering
  function getPlants() {
    if (memoryPlantsCache) return memoryPlantsCache;
    memoryPlantsCache = getLocalPlants();
    return memoryPlantsCache;
  }

  // Async fetch from Supabase Database
  async function fetchPlantsAsync() {
    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from("garden_plants")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          // Map database snake_case to frontend camelCase
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
        console.warn("[GardenManager] Supabase fetch error, using local data", err);
      }
    }
    memoryPlantsCache = getLocalPlants();
    return memoryPlantsCache;
  }

  // Add new plant to Supabase & LocalStorage
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

    // Save to Local Cache
    const plants = getPlants();
    plants.push(newPlant);
    memoryPlantsCache = plants;
    saveLocalPlants(plants);

    // Sync to Supabase Cloud DB
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
        console.log("[GardenManager] Synced new plant to Supabase Cloud:", newPlant.name);
      } catch (e) {
        console.warn("[GardenManager] Cloud sync error", e);
      }
    }

    return newPlant;
  }

  // Update plant
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
          console.log("[GardenManager] Updated plant in Supabase Cloud:", plantId);
        } catch (e) {
          console.warn("[GardenManager] Cloud update error", e);
        }
      }
      return plants[idx];
    }
    return null;
  }

  // Delete plant
  async function deletePlant(plantId) {
    let plants = getPlants();
    plants = plants.filter(p => p.id !== plantId);
    memoryPlantsCache = plants;
    saveLocalPlants(plants);

    if (window.supabaseClient) {
      try {
        await window.supabaseClient.from("garden_plants").delete().eq("id", plantId);
        console.log("[GardenManager] Deleted plant from Supabase Cloud:", plantId);
      } catch (e) {
        console.warn("[GardenManager] Cloud delete error", e);
      }
    }
  }

  function getEncyclopedia() {
    return plantEncyclopedia;
  }

  return {
    getPlants,
    fetchPlantsAsync,
    addPlant,
    updatePlant,
    deletePlant,
    getEncyclopedia
  };
})();
