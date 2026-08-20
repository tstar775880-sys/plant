/**
 * Plant Hub - Flower Planner Module (Supabase + Local Data)
 * Handles species variety filtering, blooming calendar matching, and custom trip itinerary builder.
 */

window.FlowerPlanner = (function() {

  let cloudCategories = null;
  let cloudSpots = null;

  function getCategories() {
    if (cloudCategories && cloudCategories.length > 0) return cloudCategories;
    return (window.PlantHubData && window.PlantHubData.flowerCategories) ? window.PlantHubData.flowerCategories : [];
  }

  function getSpots() {
    if (cloudSpots && cloudSpots.length > 0) return cloudSpots;
    return (window.PlantHubData && window.PlantHubData.flowerSpots) ? window.PlantHubData.flowerSpots : [];
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
          let statusText = "[開花]";
          let badgeClass = "badge-green";
          let statusKey = "BLOOMING";

          if (targetM) {
            const isEnding = (v.endingMonth && v.endingMonth === targetM) || 
                             (v.bloomingMonths && v.bloomingMonths.length > 1 && targetM === v.bloomingMonths[v.bloomingMonths.length - 1] && targetM !== v.peakMonth);
            const isPeak = v.peakMonth === targetM;

            if (isPeak) {
              statusText = "[盛開]";
              badgeClass = "badge-pink";
              statusKey = "PEAK";
            } else if (isEnding) {
              statusText = "[尾聲]";
              badgeClass = "badge-amber";
              statusKey = "ENDING";
            } else {
              statusText = "[開花]";
              badgeClass = "badge-green";
              statusKey = "BLOOMING";
            }
          }

          results.push({
            categoryId: cat.id,
            categoryName: cat.name,
            varietyId: v.id,
            varietyName: v.name,
            bloomingMonths: v.bloomingMonths || [],
            mainSeason: v.bloomingMonths && v.bloomingMonths.length ? `${v.bloomingMonths[0]}月 - ${v.bloomingMonths[v.bloomingMonths.length - 1]}月` : "花期未知",
            peakMonth: v.peakMonth,
            endingMonth: v.endingMonth,
            statusKey,
            statusText,
            badgeClass,
            colorTag: v.colorTag || "資訊補集中",
            features: v.features || ""
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

  function getCategoryTimelineData() {
    const categories = getCategories();
    return categories.map(cat => {
      const allMonthsSet = new Set();
      const peakMonthsSet = new Set();

      (cat.varieties || []).forEach(v => {
        (v.bloomingMonths || []).forEach(m => allMonthsSet.add(m));
        if (v.peakMonth) peakMonthsSet.add(v.peakMonth);
      });

      const sortedMonths = Array.from(allMonthsSet).sort((a, b) => a - b);
      const sortedPeaks = Array.from(peakMonthsSet).sort((a, b) => a - b);

      let seasonRangeText = "無資料";
      if (sortedMonths.length > 0) {
        seasonRangeText = `${sortedMonths[0]}月 - ${sortedMonths[sortedMonths.length - 1]}月`;
      }

      return {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        mainSeason: cat.mainSeason || seasonRangeText,
        bloomingMonths: sortedMonths,
        peakMonths: sortedPeaks,
        varieties: (cat.varieties || []).map(v => ({
          id: v.id,
          name: v.name,
          bloomingMonths: v.bloomingMonths || [],
          peakMonth: v.peakMonth,
          endingMonth: v.endingMonth || (v.bloomingMonths && v.bloomingMonths.length > 1 ? v.bloomingMonths[v.bloomingMonths.length - 1] : null),
          colorTag: v.colorTag || "",
          features: v.features || ""
        }))
      };
    });
  }

  return {
    getCategories,
    getSpots,
    fetchFlowerDataAsync,
    filterVarieties,
    filterSpots,
    getCategoryTimelineData
  };
})();

