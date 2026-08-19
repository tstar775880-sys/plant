# 台灣賞花與植物養護系統 (Plant Hub) - 開發紀錄與技術說明文件

本專案 (`Plant Hub`) 是一個專為台灣賞花迷與個人植物養護者設計的現代化網頁應用系統。本文檔詳細記載系統發展架構、模組邏輯、設計規範、資料庫 DDL 規格、測試規則以及 Git / GitHub 部署流程。

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

## Supabase PostgreSQL 資料庫結構說明 (Database Schema Documentation)

完整 SQL 建表與註解檔位於：[supabase_schema.sql](supabase_schema.sql)

### 模組 A：花季與賞花指南相關 (前綴 `flower_`)

#### 1. 花種大分類表 (`flower_categories`)
| 欄位名稱 (Column) | 資料型態 (Type) | 鍵值 / 約束 | 中文說明與用途 (Description) |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(50)` | **PRIMARY KEY** | 大分類識別碼 (如：`cherry_blossom`, `plum_blossom`) |
| `name` | `VARCHAR(100)` | `NOT NULL` | 花種大分類中文名稱 (如：`櫻花`, `梅花`) |
| `description` | `TEXT` | 可空 | 分類簡介與歷史背景說明 |
| `main_season` | `VARCHAR(50)` | 可空 | 主要觀賞花期月份區間 (如：`1月 - 4月`) |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | 資料建立時間 |

#### 2. 品種細分表 (`flower_varieties`)
| 欄位名稱 (Column) | 資料型態 (Type) | 鍵值 / 約束 | 中文說明與用途 (Description) |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(50)` | **PRIMARY KEY** | 品種識別碼 (如：`yamazakura`, `yoshino`, `white_plum`) |
| `category_id` | `VARCHAR(50)` | **FOREIGN KEY** (`flower_categories.id`) | 所屬大分類外鍵 |
| `name` | `VARCHAR(100)` | `NOT NULL` | 品種中文名稱 (如：`山櫻花 (緋寒櫻)`, `吉野櫻`) |
| `blooming_months`| `INT[]` | `NOT NULL` | 開花月份數字陣列 (如：`[1, 2]`) |
| `peak_month` | `INT` | `NOT NULL` | 開花極盛期的月份數字 (如：`2`) |
| `color_tag` | `VARCHAR(50)` | 可空 | 花色與特徵標籤 (如：`濃粉紅/深紅色`) |
| `features` | `TEXT` | 可空 | 品種外型特徵與觀賞重點 |

#### 3. 全台賞花名勝景點庫 (`flower_spots`)
| 欄位名稱 (Column) | 資料型態 (Type) | 鍵值 / 約束 | 中文說明與用途 (Description) |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(50)` | **PRIMARY KEY** | 景點識別碼 (如：`spot_pingjing`, `spot_wuling`) |
| `category_id` | `VARCHAR(50)` | **FOREIGN KEY** (`flower_categories.id`) | 對應花種大分類外鍵 |
| `variety_id` | `VARCHAR(50)` | **FOREIGN KEY** (`flower_varieties.id`) | 對應主力品種細分外鍵 |
| `name` | `VARCHAR(150)` | `NOT NULL` | 景點名稱 (如：`陽明山平菁街42巷`) |
| `region` | `VARCHAR(20)` | `NOT NULL` | 地區代碼 (`north`, `central`, `south`, `east`) |
| `region_name` | `VARCHAR(50)` | `NOT NULL` | 地區顯示名稱 (如：`北部 (台北)`) |
| `location` | `VARCHAR(255)`| `NOT NULL` | 景點詳細地址或導航位置 |
| `best_months` | `INT[]` | `NOT NULL` | 最佳觀賞月份陣列 (如：`[1, 2]`) |
| `suggested_duration` | `VARCHAR(50)`| 可空 | 建議停留時間 (如：`2小時`) |
| `description` | `TEXT` | 可空 | 景點特色介紹與風景說明 |
| `tips` | `TEXT` | 可空 | 出遊建議與交通注意事項 |

#### 4. 賞花假期行程規劃表 (`flower_itineraries`)
| 欄位名稱 (Column) | 資料型態 (Type) | 鍵值 / 約束 | 中文說明與用途 (Description) |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY** | 行程項目主鍵 (自動產生 UUID) |
| `spot_id` | `VARCHAR(50)` | **FOREIGN KEY** (`flower_spots.id`) | 關聯之景點外鍵 |
| `trip_date` | `DATE` | `NOT NULL` | 預計出遊日期 (YYYY-MM-DD) |
| `sort_order` | `INT` | `DEFAULT 1` | 行程順序 (第 1 站、第 2 站) |

---

### 模組 B：個人植物養護與紀錄相關 (前綴 `garden_`)

#### 5. 個人栽培植物庫存表 (`garden_plants`)
| 欄位名稱 (Column) | 資料型態 (Type) | 鍵值 / 約束 | 中文說明與用途 (Description) |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY** | 植物主鍵 (自動產生 UUID) |
| `name` | `VARCHAR(100)` | `NOT NULL` | 植物暱稱/自訂標籤 (如：`小龜龜`, `玄關琴葉榕`) |
| `species` | `VARCHAR(100)` | `NOT NULL` | 植物品種學名 (如：`龜背竹 (Monstera)`) |
| `purchase_date`| `DATE` | 可空 | 購置或開始栽培日期 |
| `water_interval`| `INT` | `NOT NULL DEFAULT 3` | **自訂給水週期天數** (如：`3`, `5`, `7`) |
| `last_watered` | `DATE` | `NOT NULL DEFAULT TODAY`| **最近一次給水日期** (用於計算今日給水提醒) |
| `location` | `VARCHAR(100)` | 可空 | 擺放位置 (如：`客廳窗台`, `陽台東側`) |
| `notes` | `TEXT` | 可空 | 栽培備註、介質成分與注意事項 |

#### 6. 養護歷史與問題紀錄日誌表 (`garden_journal_logs`)
| 欄位名稱 (Column) | 資料型態 (Type) | 鍵值 / 約束 | 中文說明與用途 (Description) |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY** | 日誌主鍵 (自動產生 UUID) |
| `plant_id` | `UUID` | **FOREIGN KEY** (`garden_plants.id`) `ON DELETE CASCADE` | 關聯之植物外鍵 (植物刪除時連帶清理) |
| `plant_name` | `VARCHAR(100)` | 可空 | 植物名稱快照 |
| `date` | `DATE` | `NOT NULL` | 紀錄事件發生日期 |
| `category` | `VARCHAR(50)` | `NOT NULL` | 紀錄分類代碼 (`ISSUE_WATER`, `PEST`, `FERTILIZER`, `REPOTTING`, `WATERING`, `GENERAL`) |
| `title` | `VARCHAR(200)` | `NOT NULL` | 事件標題 (如：`澆水過多導致底部葉片發黃事故`) |
| `content` | `TEXT` | 可空 | 詳細狀況、症狀與處置過程描述 |
| `lesson` | `TEXT` | 可空 | **檢討教訓與改善經驗 (Lessons Learned)** |

---

## 專案檔案架構

```
d:/python/plant/
├── index.html                    # 專案門戶 Portal (總覽儀表板、統計指標、今日給水捷徑)
├── flower-guide.html             # 台灣賞花指南、品種細分、景點庫與出遊行程規劃器
├── my-garden.html                # 我的植物園庫存、給水任務控管、養護日誌與養護百科
├── supabase_schema.sql           # [Supabase SQL] 完整 DDL 建表指令、欄位中文註解與預載資料
├── css/
│   └── style.css                 # 核心 CSS 設計系統 (無 Icon/Emoji, 純 CSS Badges & 幾何設計)
├── js/
│   ├── app.js                    # 全局初始化、導覽列狀態控管、儀表板動態數據渲染
│   ├── flower-data.js            # 台灣花期與景點權威資料庫 (品種細分、開花月份、建議出遊Tips)
│   ├── flower-planner.js         # 賞花品種篩選器、景點比對與 LocalStorage/Supabase 行程規劃器
│   ├── garden-manager.js         # 植物庫存管理 (CRUD)、養護百科資料與 LocalStorage 存取
│   ├── watering-tracker.js       # 澆水週期演算法、給水狀態判斷與 Checkbox 勾選更新
│   └── journal-manager.js        # 養護紀錄與失敗經驗日誌 (分類、搜尋、刪除)
├── test_watering_logic.js        # [測試檔案] 澆水週期、日期計算與狀態判斷測試腳本
├── test_flower_calculator.js     # [測試檔案] 花期月份比對與品種盛開計算測試腳本
├── DEVELOPMENT_LOG.md            # 詳細開發紀錄與技術說明文件 (本檔案)
└── README.md                     # 專案說明文件
```

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

```bash
git add .
git commit -m "docs: 新增 Supabase SQL 欄位註解與詳細資料庫結構文件"
git push origin main
```
