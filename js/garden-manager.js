/**
 * Plant Hub - Garden & Plant Manager Module
 * Manages user's plant library, care guides, and LocalStorage persistence.
 */

window.GardenManager = (function() {
  const STORAGE_KEY_PLANTS = "planthub_my_plants";
  const STORAGE_KEY_JOURNAL = "planthub_journal_logs";

  // Pre-loaded Plant Care Encyclopedia
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

  // Default User Plants for First Load Demonstration
  const defaultPlants = [
    {
      id: "plant_1",
      name: "小龜龜",
      species: "龜背竹 (Monstera)",
      purchaseDate: "2026-05-10",
      waterInterval: 5,
      lastWatered: "2026-08-14", // 5 days -> Next is 08-19 (TODAY!)
      location: "客廳窗台",
      notes: "葉片已開裂第4片，生長狀況良好。"
    },
    {
      id: "plant_2",
      name: "玄關琴葉榕",
      species: "琴葉榕 (Fiddle-leaf Fig)",
      purchaseDate: "2026-03-15",
      waterInterval: 7,
      lastWatered: "2026-08-08", // 7 days -> Next was 08-15 (OVERDUE by 4 days)
      location: "玄關入口",
      notes: "上個月曾經因澆水過多導致底部老葉黃化掉落，現已調整水分。"
    },
    {
      id: "plant_3",
      name: "陽台迷你山櫻",
      species: "櫻花盆栽 (Mini Cherry)",
      purchaseDate: "2026-01-20",
      waterInterval: 2,
      lastWatered: "2026-08-18", // 2 days -> Next is 08-20 (UPCOMING)
      location: "戶外陽台",
      notes: "正值夏季營養生長階段，枝葉茂盛。"
    }
  ];

  function getPlants() {
    const data = localStorage.getItem(STORAGE_KEY_PLANTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_PLANTS, JSON.stringify(defaultPlants));
      return defaultPlants;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading plants storage", e);
      return defaultPlants;
    }
  }

  function savePlants(plants) {
    localStorage.setItem(STORAGE_KEY_PLANTS, JSON.stringify(plants));
  }

  function addPlant(plantData) {
    const plants = getPlants();
    const newPlant = {
      id: "plant_" + Date.now(),
      name: plantData.name || "未命名植物",
      species: plantData.species || "一般植物",
      purchaseDate: plantData.purchaseDate || new Date().toISOString().split('T')[0],
      waterInterval: parseInt(plantData.waterInterval, 10) || 3,
      lastWatered: plantData.lastWatered || new Date().toISOString().split('T')[0],
      location: plantData.location || "室內",
      notes: plantData.notes || ""
    };
    plants.push(newPlant);
    savePlants(plants);
    return newPlant;
  }

  function updatePlant(plantId, updatedFields) {
    const plants = getPlants();
    const idx = plants.findIndex(p => p.id === plantId);
    if (idx !== -1) {
      plants[idx] = { ...plants[idx], ...updatedFields };
      savePlants(plants);
      return plants[idx];
    }
    return null;
  }

  function deletePlant(plantId) {
    let plants = getPlants();
    plants = plants.filter(p => p.id !== plantId);
    savePlants(plants);
  }

  function getEncyclopedia() {
    return plantEncyclopedia;
  }

  return {
    getPlants,
    savePlants,
    addPlant,
    updatePlant,
    deletePlant,
    getEncyclopedia
  };
})();
