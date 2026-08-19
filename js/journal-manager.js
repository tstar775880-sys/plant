/**
 * Plant Hub - Journal & Issue Log Manager
 * Handles plant care logs, failure records (e.g., overwatering), fertilization, repotting, and notes.
 */

window.JournalManager = (function() {
  const STORAGE_KEY_JOURNAL = "planthub_journal_logs";

  const categories = [
    { id: "ISSUE_WATER", name: "水分問題 (水過多/缺水)", badgeClass: "badge-rose" },
    { id: "WATERING", name: "水分管理 (例行澆水)", badgeClass: "badge-green" },
    { id: "PEST", name: "病虫害防制", badgeClass: "badge-amber" },
    { id: "REPOTTING", name: "換盆與土壤介質", badgeClass: "badge-blue" },
    { id: "FERTILIZER", name: "施肥紀錄", badgeClass: "badge-pink" },
    { id: "GENERAL", name: "日常觀察紀錄", badgeClass: "badge-gray" }
  ];

  // Default initial demo logs for realistic demonstration
  const defaultLogs = [
    {
      id: "log_1",
      plantId: "plant_2",
      plantName: "玄關琴葉榕",
      date: "2026-08-05",
      category: "ISSUE_WATER",
      categoryName: "水分問題 (水過多/缺水)",
      title: "澆水過多導致底部葉片發黃與脫落事故",
      content: "連續午後陣雨加上室內通風不良，每隔3天就澆水一次，導致底盤積水。底層兩片大葉子出現黑褐色斑塊並相繼黃化掉落。",
      lesson: "教訓與檢討：琴葉榕室內環境需等到表土向下3公分完全乾燥再給水，切勿積水！已暫停澆水一週並移至陽台通風處。"
    },
    {
      id: "log_2",
      plantId: "plant_1",
      plantName: "小龜龜",
      date: "2026-07-28",
      category: "REPOTTING",
      categoryName: "換盆與土壤介質",
      title: "替龜背竹換至8吋素燒陶盆",
      content: "舊塑膠盆根系已盤滿盆底，更換為透氣良好的紅陶盆，介質使用 60% 泥炭土 + 20% 珍珠石 + 20% 樹皮。",
      lesson: "盆底加鋪厚層火山石作為排水層，防止積水爛根。"
    },
    {
      id: "log_3",
      plantId: "plant_3",
      plantName: "陽台迷你山櫻",
      date: "2026-08-01",
      category: "FERTILIZER",
      categoryName: "施肥紀錄",
      title: "補充花寶3號有機長效緩釋肥",
      content: "夏季營養生長旺盛期，沿盆邊埋入 10 粒有機緩釋肥球，促進枝條木質化與花芽分化準備。",
      lesson: "避免肥料直接接觸主幹根頸。"
    }
  ];

  function getLogs() {
    const data = localStorage.getItem(STORAGE_KEY_JOURNAL);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(defaultLogs));
      return defaultLogs;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading journal storage", e);
      return defaultLogs;
    }
  }

  function saveLogs(logs) {
    localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(logs));
  }

  function addLog(logData) {
    const logs = getLogs();
    const catObj = categories.find(c => c.id === logData.category) || categories[5];

    const newLog = {
      id: "log_" + Date.now(),
      plantId: logData.plantId || "",
      plantName: logData.plantName || "通用植物",
      date: logData.date || new Date().toISOString().split('T')[0],
      category: catObj.id,
      categoryName: catObj.name,
      title: logData.title || "養護筆記",
      content: logData.content || "",
      lesson: logData.lesson || ""
    };

    logs.unshift(newLog); // new logs first
    saveLogs(logs);
    return newLog;
  }

  function deleteLog(logId) {
    let logs = getLogs();
    logs = logs.filter(l => l.id !== logId);
    saveLogs(logs);
  }

  function getCategories() {
    return categories;
  }

  return {
    getLogs,
    addLog,
    deleteLog,
    getCategories
  };
})();
