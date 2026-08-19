/**
 * Plant Hub - Journal & Issue Log Manager (Supabase + LocalStorage Hybrid)
 * Manages care logs and failure records. Purges old mock logs for clean slate.
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

  const defaultLogs = [];
  let memoryLogsCache = null;

  function getLocalLogs() {
    const data = localStorage.getItem(STORAGE_KEY_JOURNAL);
    if (!data) return defaultLogs;
    try {
      const parsed = JSON.parse(data);
      return parsed.filter(l => !l.id.includes("log_1") && !l.id.includes("log_2"));
    } catch (e) {
      return defaultLogs;
    }
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

        if (!error && data !== null) {
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
        console.warn("[JournalManager] Supabase fetch error", err);
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
