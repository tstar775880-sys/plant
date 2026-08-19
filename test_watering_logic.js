/**
 * [TEST FILE] test_watering_logic.js
 * Unit test & verification script for plant watering interval logic and status calculation.
 */

function calculateWateringStatus(lastWateredStr, intervalDays, targetDateStr = null) {
  const lastDate = new Date(lastWateredStr);
  const targetDate = targetDateStr ? new Date(targetDateStr) : new Date();

  // Reset time portions for accurate day comparison
  lastDate.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const nextWateringDate = new Date(lastDate);
  nextWateringDate.setDate(lastDate.getDate() + parseInt(intervalDays, 10));

  const diffTime = nextWateringDate.getTime() - targetDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let statusKey = "OK";
  let statusText = "狀態正常";
  let badgeClass = "badge-green";

  if (diffDays < 0) {
    statusKey = "OVERDUE";
    statusText = `已逾期 ${Math.abs(diffDays)} 天`;
    badgeClass = "badge-rose";
  } else if (diffDays === 0) {
    statusKey = "TODAY";
    statusText = "今日需澆水";
    badgeClass = "badge-amber";
  } else if (diffDays <= 3) {
    statusKey = "UPCOMING";
    statusText = `${diffDays} 天後澆水`;
    badgeClass = "badge-blue";
  } else {
    statusText = `${diffDays} 天後澆水`;
  }

  const nextDateFormatted = nextWateringDate.toISOString().split('T')[0];

  return {
    nextWateringDate: nextDateFormatted,
    daysRemaining: diffDays,
    statusKey,
    statusText,
    badgeClass
  };
}

// Test Runner
function runWateringTests() {
  console.log("=== RUNNING TEST: Watering Schedule Logic ===");

  const testCases = [
    {
      name: "Plant A (3-day interval, watered 3 days ago -> should be TODAY)",
      lastWatered: "2026-08-16",
      interval: 3,
      today: "2026-08-19",
      expectedStatus: "TODAY"
    },
    {
      name: "Plant B (7-day interval, watered 10 days ago -> should be OVERDUE by 3 days)",
      lastWatered: "2026-08-09",
      interval: 7,
      today: "2026-08-19",
      expectedStatus: "OVERDUE"
    },
    {
      name: "Plant C (5-day interval, watered 3 days ago -> 2 days remaining, UPCOMING)",
      lastWatered: "2026-08-16",
      interval: 5,
      today: "2026-08-19",
      expectedStatus: "UPCOMING"
    }
  ];

  let passed = 0;
  testCases.forEach((tc, idx) => {
    const res = calculateWateringStatus(tc.lastWatered, tc.interval, tc.today);
    const success = res.statusKey === tc.expectedStatus;
    if (success) {
      passed++;
      console.log(`[PASS] Case ${idx + 1}: ${tc.name} => ${res.statusText} (${res.nextWateringDate})`);
    } else {
      console.error(`[FAIL] Case ${idx + 1}: ${tc.name} => Expected ${tc.expectedStatus}, got ${res.statusKey}`);
    }
  });

  console.log(`=== TEST SUMMARY: ${passed}/${testCases.length} Passed ===\n`);
  return passed === testCases.length;
}

if (typeof window !== "undefined") {
  window.testWateringLogic = runWateringTests;
  window.calculateWateringStatus = calculateWateringStatus;
} else if (typeof module !== "undefined") {
  module.exports = { calculateWateringStatus, runWateringTests };
  runWateringTests();
}
