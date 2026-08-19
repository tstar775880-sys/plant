/**
 * Plant Hub - Journal & Issue Log Manager (Supabase + LocalStorage Hybrid)
 * Manages care logs and failure records with Supabase Cloud DB sync and LocalStorage fallback.
 */

window.JournalManager = (function() {
  const STORAGE_KEY_JOURNAL = "planthub_journal_logs";

  const categories = [
    { id: "ISSUE_WATER", name: "水分問題 (水過多/缺水)", badgeClass: "badge-rose" },
    { id: "WATERING", name: "水分管理 (例行澆水)", badgeClass: "badge-green" },
    { id: "PEST", name: "病蟲害防制", badgeClass: "badge-amber" },
    { id: "REPOTTING", name: "換盆與土壤介質", badgeClass: "badge-blue" },
    { id: "FERTILIZER", name: "施肥紀錄", badgeClass: "badge-pink" },
    { id: "GENERAL", name: "日常觀察紀錄", badgeClass: "badge-gray" }
  ];

  const defaultLogs = [
    {
      id: "log_11111111-1111-1111-1111-111111111111",
      plantId: "22222222-2222-2222-2222-222222222222",
      plantName: "玄關琴葉榕",
      date: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
      category: "ISSUE_WATER",
      categoryName: "水分問題 (水過多/缺水)",
      title: "澆水過多導致底部葉片發黃與脫落事故",
      content: "連續午後陣雨加上室內通風不良，每隔3天就澆水一次，導致底盤積水。底層兩片大葉子出現黑褐色斑塊並相繼黃化掉落。",
      lesson: "教訓與檢討：琴葉榕室內環境需等到表土向下3公分完全乾燥再給水，切勿積水！已暫停澆水一週並移至陽台通風處。"
    },
    {
      id: "log_22222222-2222-2222-2222-222222222222",
      plantId: "11111111-1111-1111-1111-111111111111",
      plantName: "小龜龜",
      date: new Date(Date.now() - 20 * 86400000).toISOString().split('T')[0],
      category: "REPOTTING",
      categoryName: "換盆與土壤介質",
      title: "替龜背竹換至8吋素燒陶盆",
      content: "舊塑膠盆根系已盤滿盆底，更換為透氣良好的紅陶盆，介質使用 60% 泥炭土 + 20% 珍珠石 + 20% 樹皮。",
      lesson: "盆底加鋪厚層火山石作為排水層，防止積水爛根。"
    }
  ];

  let memoryLogsCache = null;

  function getLocalLogs() {
    const data = localStorage.getItem(STORAGE_KEY_JOURNAL);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(defaultLogs));
      return defaultLogs;
    }
    try { return JSON.parse(data); } catch (e) { return defaultLogs; }
  }

  function saveLocalLogs(logs) {
    localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(logs));
  }

  function getLogs() {
    if (memoryLogsCache) return memoryLogsCache;
    memoryLogsCache = getLocalLogs();
    return memoryLogsCache;
  }

  async function fetchLogsAsync() {
    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from("garden_journal_logs")
          .select("*")
          .order("date", { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(l => {
            const catObj = categories.find(c => c.id === l.category) || categories[5];
            return {
              id: l.id,
              plantId: l.plant_id,
              plantName: l.plant_name || "通用植物",
              date: l.date,
              category: l.category,
              categoryName: catObj.name,
              title: l.title,
              content: l.content,
              lesson: l.lesson
            };
          });
          memoryLogsCache = mapped;
          saveLocalLogs(mapped);
          return mapped;
        }
      } catch (err) {
        console.warn("[JournalManager] Supabase fetch error, using local data", err);
      }
    }
    memoryLogsCache = getLocalLogs();
    return memoryLogsCache;
  }

  async function addLog(logData) {
    const catObj = categories.find(c => c.id === logData.category) || categories[5];

    const newLog = {
      id: (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : "log_" + Date.now(),
      plantId: logData.plantId || null,
      plantName: logData.plantName || "通用植物",
      date: logData.date || new Date().toISOString().split('T')[0],
      category: catObj.id,
      categoryName: catObj.name,
      title: logData.title || "養護筆記",
      content: logData.content || "",
      lesson: logData.lesson || ""
    };

    const logs = getLogs();
    logs.unshift(newLog);
    memoryLogsCache = logs;
    saveLocalLogs(logs);

    if (window.supabaseClient) {
      try {
        await window.supabaseClient.from("garden_journal_logs").insert({
          id: newLog.id,
          plant_id: newLog.plantId,
          plant_name: newLog.plantName,
          date: newLog.date,
          category: newLog.category,
          title: newLog.title,
          content: newLog.content,
          lesson: newLog.lesson
        });
        console.log("[JournalManager] Synced log to Supabase Cloud:", newLog.title);
      } catch (e) {
        console.warn("[JournalManager] Cloud sync error", e);
      }
    }

    return newLog;
  }

  async function deleteLog(logId) {
    let logs = getLogs();
    logs = logs.filter(l => l.id !== logId);
    memoryLogsCache = logs;
    saveLocalLogs(logs);

    if (window.supabaseClient) {
      try {
        await window.supabaseClient.from("garden_journal_logs").delete().eq("id", logId);
        console.log("[JournalManager] Deleted log from Supabase Cloud:", logId);
      } catch (e) {
        console.warn("[JournalManager] Cloud delete error", e);
      }
    }
  }

  function getCategories() {
    return categories;
  }

  return {
    getLogs,
    fetchLogsAsync,
    addLog,
    deleteLog,
    getCategories
  };
})();
