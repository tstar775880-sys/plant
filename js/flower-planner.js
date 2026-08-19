/**
 * Plant Hub - Flower Planner Module
 * Handles species variety filtering, blooming calendar matching, spot exploration, and custom trip itinerary builder.
 */

window.FlowerPlanner = (function() {

  function getCategories() {
    return window.PlantHubData ? window.PlantHubData.flowerCategories : [];
  }

  function getSpots() {
    return window.PlantHubData ? window.PlantHubData.flowerSpots : [];
  }

  // Filter varieties by category and target month
  function filterVarieties(categoryId = "all", month = "all") {
    const categories = getCategories();
    let results = [];

    categories.forEach(cat => {
      if (categoryId !== "all" && cat.id !== categoryId) return;

      cat.varieties.forEach(v => {
        const targetM = month === "all" ? null : parseInt(month, 10);
        const isMatch = targetM === null || v.bloomingMonths.includes(targetM);

        if (isMatch) {
          const isPeak = targetM ? v.peakMonth === targetM : false;
          results.push({
            categoryId: cat.id,
            categoryName: cat.name,
            varietyId: v.id,
            varietyName: v.name,
            bloomingMonths: v.bloomingMonths,
            mainSeason: `${v.bloomingMonths[0]}月 - ${v.bloomingMonths[v.bloomingMonths.length - 1]}月`,
            peakMonth: v.peakMonth,
            isPeak,
            statusText: isPeak ? "[盛開中]" : (targetM ? "[花期中]" : `[花期 ${v.bloomingMonths[0]}-${v.bloomingMonths[v.bloomingMonths.length - 1]}月]`),
            badgeClass: isPeak ? "badge-pink" : "badge-green",
            colorTag: v.colorTag,
            features: v.features,
            spots: v.spots
          });
        }
      });
    });

    return results;
  }

  // Filter spot database by region and category
  function filterSpots(region = "all", categoryId = "all") {
    const spots = getSpots();
    return spots.filter(s => {
      const matchRegion = region === "all" || s.region === region;
      const matchCategory = categoryId === "all" || s.targetCategory === categoryId;
      return matchRegion && matchCategory;
    });
  }

  // Itinerary Store in LocalStorage
  const STORAGE_KEY_ITINERARY = "planthub_my_itinerary";

  function getSavedItinerary() {
    const data = localStorage.getItem(STORAGE_KEY_ITINERARY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  function saveItinerary(items) {
    localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(items));
  }

  function addSpotToItinerary(spotId, tripDate = null) {
    const spots = getSpots();
    const spot = spots.find(s => s.id === spotId);
    if (!spot) return null;

    const itinerary = getSavedItinerary();
    // Check if already in itinerary
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
    filterVarieties,
    filterSpots,
    getSavedItinerary,
    addSpotToItinerary,
    removeSpotFromItinerary
  };
})();
