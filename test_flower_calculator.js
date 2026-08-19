/**
 * [TEST FILE] test_flower_calculator.js
 * Unit test & verification script for flower blooming month matches and spot filtering.
 */

function filterFlowersByMonth(categories, targetMonth) {
  const activeVarieties = [];
  categories.forEach(cat => {
    cat.varieties.forEach(v => {
      if (v.bloomingMonths.includes(targetMonth)) {
        const isPeak = v.peakMonth === targetMonth;
        activeVarieties.push({
          categoryName: cat.name,
          varietyName: v.name,
          isPeak,
          statusBadge: isPeak ? "盛開中" : "花期中",
          colorTag: v.colorTag,
          spots: v.spots
        });
      }
    });
  });
  return activeVarieties;
}

function runFlowerTests() {
  console.log("=== RUNNING TEST: Flower Blooming Calendar Calculator ===");

  // Mock Categories
  const mockCategories = [
    {
      name: "櫻花",
      varieties: [
        { name: "山櫻花", bloomingMonths: [1, 2], peakMonth: 2, colorTag: "濃粉紅", spots: ["陽明山"] },
        { name: "吉野櫻", bloomingMonths: [3, 4], peakMonth: 3, colorTag: "淡粉白", spots: ["天元宮"] }
      ]
    },
    {
      name: "繡球花",
      varieties: [
        { name: "大葉繡球花", bloomingMonths: [5, 6, 7], peakMonth: 6, colorTag: "藍紫粉", spots: ["竹子湖"] }
      ]
    }
  ];

  // Test Feb Blooming (Month 2) -> Should include 山櫻花 (Peak)
  const febResults = filterFlowersByMonth(mockCategories, 2);
  const febMatch = febResults.find(f => f.varietyName === "山櫻花");
  const febSuccess = febMatch && febMatch.isPeak === true;
  console.log(febSuccess ? "[PASS] Month 2 includes 山櫻花 (盛開中)" : "[FAIL] Month 2 test failed");

  // Test March Blooming (Month 3) -> Should include 吉野櫻
  const marResults = filterFlowersByMonth(mockCategories, 3);
  const marMatch = marResults.find(f => f.varietyName === "吉野櫻");
  const marSuccess = marMatch && marMatch.isPeak === true;
  console.log(marSuccess ? "[PASS] Month 3 includes 吉野櫻 (盛開中)" : "[FAIL] Month 3 test failed");

  const totalPassed = (febSuccess ? 1 : 0) + (marSuccess ? 1 : 0);
  console.log(`=== TEST SUMMARY: ${totalPassed}/2 Passed ===\n`);
  return totalPassed === 2;
}

if (typeof window !== "undefined") {
  window.testFlowerCalculator = runFlowerTests;
  window.filterFlowersByMonth = filterFlowersByMonth;
} else if (typeof module !== "undefined") {
  module.exports = { filterFlowersByMonth, runFlowerTests };
  runFlowerTests();
}
