# 台灣賞花與植物養護系統 (Plant Hub) - 開發紀錄與技術說明文件

本專案 (`Plant Hub`) 是一個專為台灣賞花迷與個人植物養護者設計的現代化網頁應用系統。本文檔詳細記載系統發展架構、模組邏輯、設計規範、測試規則以及 Git / GitHub 部署流程。

---

## 專案遠景與需求重點

1. **台灣賞花指南與假期行程規劃 (Taiwan Flower Season & Spot Planner)**
   - 解決放假不知道去哪裡賞花的問題。
   - 支援花種大分類與精細品種劃分（如：**櫻花**細分為山櫻花/緋寒櫻、八重櫻、吉野櫻、富士櫻/昭和櫻；**梅花**細分為角板山白梅與綠萼梅）。
   - 整合台灣全台熱門賞花景點（如陽明山平菁街、武陵農場、淡水天元宮、南投烏松崙梅園、竹子湖繡球花田、六十石山金針花等）。
   - 內建**賞花行程規劃器 (Itinerary Planner)**，可自訂出遊日期、選擇景點排定站別順序與列印行程。

2. **個人植物園與週期給水提醒 (My Garden & Watering Schedule)**
   - 登記個人栽種的植物，設定自訂給水週期（如 3 天、5 天、7 天、14 天）。
   - 自動推算「今日待給水」與「已逾期」植物，並在主頁與植物園面板提供**動態 Checkbox 勾選**，勾選後自動寫入例行給水紀錄並更新下次給水日期。

3. **養殖問題與失敗經驗日誌 (Care Journal & Failure Log)**
   - 紀錄栽培過程中遇到的問題與經驗檢討（例如：水分過多導致爛根爛葉事故、施肥紀錄、換盆與介質、病蟲害防制）。

4. **視覺設計規範 (嚴格無 Icon / 無 Emoji 限制)**
   - **全站嚴禁使用任何 Icon 圖示與 Emoji 表情符號**。
   - 全面採用現代字體 (Inter + Noto Sans TC)、深色植物色彩系統 (`#0f1715`)、純 CSS 幾何徽章 (`[盛開中]`、`[今日需澆水]`、`[已逾期]`)、動態卡片與響應式排版。

5. **測試檔案規範 (`test_*`)**
   - 所有測試用檔案與驗證腳本統一前綴 `test_*` (如 `test_watering_logic.js` 與 `test_flower_calculator.js`)，便於日後快速辨識與一鍵清除。

---

## 專案檔案架構

```
d:/python/plant/
├── index.html                    # 專案門戶 Portal (總覽儀表板、統計指標、今日給水捷徑)
├── flower-guide.html             # 台灣賞花指南、品種細分、景點庫與出遊行程規劃器
├── my-garden.html                # 我的植物園庫存、給水任務控管、養護日誌與養護百科
├── css/
│   └── style.css                 # 核心 CSS 設計系統 (無 Icon/Emoji, 純 CSS Badges & 幾何設計)
├── js/
│   ├── app.js                    # 全局初始化、導覽列狀態控管、儀表板動態數據渲染
│   ├── flower-data.js            # 台灣花期與景點權威資料庫 (品種細分、開花月份、建議出遊Tips)
│   ├── flower-planner.js         # 賞花品種篩選器、景點比對與 LocalStorage 行程規劃器
│   ├── garden-manager.js         # 植物庫存管理 (CRUD)、養護百科資料與 LocalStorage 存取
│   ├── watering-tracker.js       # 澆水週期演算法、給水狀態判斷與 Checkbox 勾選更新
│   └── journal-manager.js        # 養護紀錄與失敗經驗日誌 (分類、搜尋、刪除)
├── test_watering_logic.js        # [測試檔案] 澆水週期、日期計算與狀態判斷測試腳本
├── test_flower_calculator.js     # [測試檔案] 花期月份比對與品種盛開計算測試腳本
├── DEVELOPMENT_LOG.md            # 詳細開發紀錄與技術說明文件 (本檔案)
└── README.md                     # 專案介紹文件
```

---

## 關鍵模組開發細節

### 1. 澆水週期計算邏輯 (`test_watering_logic.js` & `watering-tracker.js`)
公式：`NextWateringDate = LastWateredDate + IntervalDays`
- 當 `NextWateringDate < Today` -> `OVERDUE` (狀態標籤：`[已逾期 X 天]`, 色彩：`badge-rose`)
- 當 `NextWateringDate == Today` -> `TODAY` (狀態標籤：`[今日需澆水]`, 色彩：`badge-amber`)
- 當 `NextWateringDate - Today <= 3 Days` -> `UPCOMING` (狀態標籤：`[X 天後澆水]`, 色彩：`badge-blue`)

**一鍵勾選處理流程**：
1. 當使用者勾選 Checkbox，將植物的 `lastWatered` 更新為今日日期 (`YYYY-MM-DD`)。
2. 自動呼叫 `JournalManager.addLog()` 寫入一篇「完成例行給水」養護日誌。
3. 頁面無縫刷新，更新狀態標籤。

### 2. 櫻花與梅花品種細分層級 (`flower-data.js`)
- **櫻花大類 (`cherry_blossom`)**：
  - `山櫻花 (緋寒櫻)`：1-2月，濃粉紅/深紅色，耐熱性佳。
  - `八重櫻 (重瓣緋寒櫻)`：2-3月，深紫紅色，九族文化村/武陵農場代表。
  - `吉野櫻`：3-4月，淡粉白，天元宮/阿里山代表。
  - `富士櫻/昭和櫻`：2-3月，粉紅色，司馬庫斯代表。
- **梅花大類 (`plum_blossom`)**：
  - `角板山/信義白梅`：12-1月，雪白色，滿樹如雪。
  - `綠萼梅 (萼綠梅)`：1-2月，白花綠萼，古風清香。

---

## 測試檔案與驗證機制

專案遵照規範，將所有驗證邏輯封裝於 `test_*` 開頭之檔案中：
1. `test_watering_logic.js`：包含 3 個自動化測試情境，覆蓋今日需澆水、已逾期、未來預告的算術邊界。
2. `test_flower_calculator.js`：包含 2 個自動化測試情境，驗證特定月份 (如 2月山櫻花盛開、3月吉野櫻盛開) 的篩選正確性。

若日後欲清理測試程式碼，只需執行 PowerShell 刪除指令：
```powershell
Remove-Item -Path .\test_* -Force
```

---

## Git 歷程與 GitHub 遠端倉庫同步說明

本專案已連結至官方 GitHub 遠端倉庫：
`https://github.com/tstar775880-sys/plant.git`

### 首次推送與版控步驟指引：
```bash
# 1. 初始化 Git 倉庫
git init

# 2. 設定遠端倉庫 URL
git remote add origin https://github.com/tstar775880-sys/plant.git

# 3. 變更預設分支為 main
git branch -M main

# 4. 加入所有專案檔案
git add .

# 5. 提交版本紀錄
git commit -m "feat: 建立台灣賞花指南與植物養護系統 (Plant Hub) 完整介面與核心邏輯"

# 6. 推送至 GitHub
git push -u origin main
```

---

## 總結

`Plant Hub` 成功整合了台灣在地賞花情境與個人居家園藝的需求，在滿足無 Icon / 無 Emoji 限制的同時，創造出質感極高的視覺與使用體驗。
