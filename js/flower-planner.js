/**
 * Plant Hub - Flower Planner Module (Supabase + Local Data)
 * Handles species variety filtering, blooming calendar matching, and custom trip itinerary builder.
 */

window.FlowerPlanner = (function() {

  let cloudCategories = null;
  let cloudSpots = null;

  function getCategories() {
    if (cloudCategories) return cloudCategories;
    return window.PlantHubData ? window.PlantHubData.flowerCategories : [];
  }

  function getSpots() {
    if (cloudSpots) return cloudSpots;
    return window.PlantHubData ? window.PlantHubData.flowerSpots : [];
  }

  async function fetchFlowerDataAsync() {
    if (window.supabaseClient) {
      try {
        const { data: catData } = await window.supabaseClient.from("flower_categories").select("*, varieties:flower_varieties(*)");
        const { data: spotData } = await window.supabaseClient.from("flower_spots").select("*");

        if (catData && catData.length > 0) {
          cloudCategories = catData.map(c => ({
            id: c.id,
            name: c.name,
            description: c.description,
            mainSeason: c.main_season,
            varieties: (c.varieties || []).map(v => ({
              id: v.id,
              name: v.name,
              bloomingMonths: v.blooming_months || [],
              peakMonth: v.peak_month,
              colorTag: v.color_tag,
              features: v.features,
              spots: []
            }))
          }));
        } else {
          cloudCategories = [];
        }

        if (spotData && spotData.length > 0) {
          cloudSpots = spotData.map(s => ({
            id: s.id,
            name: s.name,
            region: s.region,
            regionName: s.region_name,
            targetCategory: s.category_id,
            varietyId: s.variety_id,
            bestMonths: s.best_months || [],
            location: s.location,
            description: s.description,
            suggestedDuration: s.suggested_duration,
            tips: s.tips
          }));
        } else {
          cloudSpots = [];
        }
      } catch (e) {
        console.warn("[FlowerPlanner] Supabase fetch error", e);
      }
    }
  }

  function filterVarieties(categoryId = "all", month = "all") {
    const categories = getCategories();
    let results = [];

    categories.forEach(cat => {
      if (categoryId !== "all" && cat.id !== categoryId) return;

      (cat.varieties || []).forEach(v => {
        const targetM = month === "all" ? null : parseInt(month, 10);
        const isMatch = targetM === null || (v.bloomingMonths && v.bloomingMonths.includes(targetM));

        if (isMatch) {
          const isPeak = targetM ? v.peakMonth === targetM : false;
          results.push({
            categoryId: cat.id,
            categoryName: cat.name,
            varietyId: v.id,
            varietyName: v.name,
            bloomingMonths: v.bloomingMonths || [],
            mainSeason: v.bloomingMonths && v.bloomingMonths.length ? `${v.bloomingMonths[0]}月 - ${v.bloomingMonths[v.bloomingMonths.length - 1]}月` : "花期未知",
            peakMonth: v.peakMonth,
            isPeak,
            statusText: isPeak ? "[盛開中]" : (targetM ? "[花期中]" : `[花期中]`),
            badgeClass: isPeak ? "badge-pink" : "badge-green",
            colorTag: v.colorTag || "資訊補集中",
            features: v.features || "",
            spots: v.spots || []
          });
        }
      });
    });

    return results;
  }

  function filterSpots(region = "all", categoryId = "all") {
    const spots = getSpots();
    return spots.filter(s => {
      const matchRegion = region === "all" || s.region === region;
      const matchCategory = categoryId === "all" || s.targetCategory === categoryId;
      return matchRegion && matchCategory;
    });
  }

  const STORAGE_KEY_ITINERARY = "planthub_my_itinerary";

  function getSavedItinerary() {
    const data = localStorage.getItem(STORAGE_KEY_ITINERARY);
    if (!data) return [];
    try { return JSON.parse(data); } catch (e) { return []; }
  }

  function saveItinerary(items) {
    localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(items));
  }

  function addSpotToItinerary(spotId, tripDate = null) {
    const spots = getSpots();
    const spot = spots.find(s => s.id === spotId);
    if (!spot) return null;

    const itinerary = getSavedItinerary();
    if (!itinerary.some(item => item.spotId === spotId)) {
      const newItem = {
        id: "itin_" + Date.now(),
        spotId: spot.id,
        spotName: spot.name,
        regionName: spot.regionName,
        location: spot.location,
        targetCategory: spot.targetCategory,
        suggestedDuration: spot.suggestedDuration,
        tripDate: tripDate || new Date().toISOString().split('T')[0],
        order: itinerary.length + 1
      };
      itinerary.push(newItem);
      saveItinerary(itinerary);
      return newItem;
    }
    return null;
  }

  function removeSpotFromItinerary(itinId) {
    let itinerary = getSavedItinerary();
    itinerary = itinerary.filter(item => item.id !== itinId);
    saveItinerary(itinerary);
  }

  return {
    getCategories,
    getSpots,
    fetchFlowerDataAsync,
    filterVarieties,
    filterSpots,
    getSavedItinerary,
    addSpotToItinerary,
    removeSpotFromItinerary
  };
})();
