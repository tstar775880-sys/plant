/**
 * Plant Hub - Global Application Script
 * Initializes shared UI components, handles nav states, and populates dashboard widgets.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Execute unit tests in background for safety check
  if (window.testWateringLogic) window.testWateringLogic();
  if (window.testFlowerCalculator) window.testFlowerCalculator();

  // If on Index page, update dashboard stats
  if (document.getElementById("dashboard-stats")) {
    initDashboard();
  }
});

function initDashboard() {
  const schedule = window.WateringTracker.getWateringSchedule();
  const plants = window.GardenManager.getPlants();
  const logs = window.JournalManager.getLogs();

  const currentMonth = new Date().getMonth() + 1;
  const bloomingVarieties = window.FlowerPlanner.filterVarieties("all", currentMonth.toString());

  // Update stat values
  const elWateringCount = document.getElementById("stat-watering-today");
  const elPlantsCount = document.getElementById("stat-total-plants");
  const elBloomingCount = document.getElementById("stat-blooming-now");
  const elLogsCount = document.getElementById("stat-journal-logs");

  if (elWateringCount) {
    const needWateringCount = schedule.today.length + schedule.overdue.length;
    elWateringCount.textContent = needWateringCount;
  }
  if (elPlantsCount) {
    elPlantsCount.textContent = plants.length;
  }
  if (elBloomingCount) {
    elBloomingCount.textContent = bloomingVarieties.length;
  }
  if (elLogsCount) {
    elLogsCount.textContent = logs.length;
  }

  // Render quick today watering tasks preview
  renderDashboardWateringPreview(schedule);
}

function renderDashboardWateringPreview(schedule) {
  const container = document.getElementById("dashboard-watering-preview");
  if (!container) return;

  const urgentList = [...schedule.overdue, ...schedule.today];

  if (urgentList.length === 0) {
    container.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: var(--text-secondary);">
        [狀態良好] 今日暫無需要給水的植物，全部生長狀況優良！
      </div>
    `;
    return;
  }

  container.innerHTML = urgentList.map(item => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1rem; background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 0.6rem;">
      <div>
        <div style="font-weight: 600; color: var(--text-primary);">${item.name} (${item.species})</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">位置：${item.location} | 上次澆水：${item.lastWatered} (${item.waterInterval}天週期)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span class="badge ${item.wateringStatus.badgeClass}">${item.wateringStatus.statusText}</span>
        <label class="custom-checkbox">
          <input type="checkbox" onchange="handleQuickWaterCheck('${item.id}', this)">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-green-bright);">完成給水</span>
        </label>
      </div>
    </div>
  `).join("");
}

function handleQuickWaterCheck(plantId, checkboxEl) {
  if (checkboxEl.checked) {
    window.WateringTracker.markAsWatered(plantId);
    // Re-init dashboard
    setTimeout(() => {
      initDashboard();
    }, 200);
  }
}
