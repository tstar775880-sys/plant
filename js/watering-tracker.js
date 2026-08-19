/**
 * Plant Hub - Watering Tracker Module
 * Calculates upcoming, today, and overdue watering routines and handles user check-offs.
 */

window.WateringTracker = (function() {

  function getWateringSchedule(targetDateStr = null) {
    const plants = window.GardenManager.getPlants();
    const schedule = {
      today: [],
      overdue: [],
      upcoming: [],
      normal: []
    };

    plants.forEach(plant => {
      const status = window.calculateWateringStatus(
        plant.lastWatered,
        plant.waterInterval,
        targetDateStr
      );

      const item = {
        ...plant,
        wateringStatus: status
      };

      if (status.statusKey === "OVERDUE") {
        schedule.overdue.push(item);
      } else if (status.statusKey === "TODAY") {
        schedule.today.push(item);
      } else if (status.statusKey === "UPCOMING") {
        schedule.upcoming.push(item);
      } else {
        schedule.normal.push(item);
      }
    });

    return schedule;
  }

  function markAsWatered(plantId) {
    const todayStr = new Date().toISOString().split('T')[0];
    
    // 1. Update Plant's Last Watered Date
    const updated = window.GardenManager.updatePlant(plantId, {
      lastWatered: todayStr
    });

    if (updated && window.JournalManager) {
      // 2. Automatically log entry in Care Journal
      window.JournalManager.addLog({
        plantId: updated.id,
        plantName: updated.name,
        date: todayStr,
        category: "WATERING",
        categoryName: "水分管理",
        title: `完成例行澆水 (${updated.name})`,
        content: `依據 ${updated.waterInterval} 天週期計畫完成給水，狀態良好。`,
        lesson: "維持固定補水時間與土壤適度乾濕循環。"
      });
    }

    return updated;
  }

  return {
    getWateringSchedule,
    markAsWatered
  };
})();
