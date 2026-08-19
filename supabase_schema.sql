-- ==========================================================================
-- Plant Hub - Supabase PostgreSQL Database DDL & Initial Seed Data
-- Module A: Flower Season & Spots (flower_*)
-- Module B: Garden Plants & Journal Logs (garden_*)
-- Includes SQL Table & Column Comments for Documentation & Maintenance
-- ==========================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------------
-- MODULE A: 花季與賞花指南模組 (flower_*)
-- --------------------------------------------------------------------------

-- 1. 花種大分類表 (flower_categories)
CREATE TABLE IF NOT EXISTS flower_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  main_season VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE flower_categories IS '花種大分類表 (如：櫻花、梅花、油桐花等)';
COMMENT ON COLUMN flower_categories.id IS '大分類識別碼 (如：cherry_blossom, plum_blossom)';
COMMENT ON COLUMN flower_categories.name IS '花種大分類中文名稱 (如：櫻花)';
COMMENT ON COLUMN flower_categories.description IS '分類簡介與歷史背景';
COMMENT ON COLUMN flower_categories.main_season IS '主要觀賞花期月份區間';
COMMENT ON COLUMN flower_categories.created_at IS '建立時間';


-- 2. 品種細分表 (flower_varieties)
CREATE TABLE IF NOT EXISTS flower_varieties (
  id VARCHAR(50) PRIMARY KEY,
  category_id VARCHAR(50) REFERENCES flower_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  blooming_months INT[] NOT NULL,
  peak_month INT NOT NULL,
  color_tag VARCHAR(50),
  features TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE flower_varieties IS '花卉品種細分資料表 (關聯至大分類)';
COMMENT ON COLUMN flower_varieties.id IS '品種識別碼 (如：yamazakura, yoshino, white_plum)';
COMMENT ON COLUMN flower_varieties.category_id IS '所屬大分類外鍵 (指向 flower_categories.id)';
COMMENT ON COLUMN flower_varieties.name IS '品種中文名稱 (如：山櫻花、八重櫻、吉野櫻、角板山白梅)';
COMMENT ON COLUMN flower_varieties.blooming_months IS '開花月份數字陣列 (如：ARRAY[1, 2])';
COMMENT ON COLUMN flower_varieties.peak_month IS '開花極盛期的月份數字 (如：2)';
COMMENT ON COLUMN flower_varieties.color_tag IS '花色與特徵標籤 (如：濃粉紅/深紅色)';
COMMENT ON COLUMN flower_varieties.features IS '品種外型特徵與養護重點';
COMMENT ON COLUMN flower_varieties.created_at IS '建立時間';


-- 3. 全台賞花名勝景點庫 (flower_spots)
CREATE TABLE IF NOT EXISTS flower_spots (
  id VARCHAR(50) PRIMARY KEY,
  category_id VARCHAR(50) REFERENCES flower_categories(id) ON DELETE SET NULL,
  variety_id VARCHAR(50) REFERENCES flower_varieties(id) ON DELETE SET NULL,
  name VARCHAR(150) NOT NULL,
  region VARCHAR(20) NOT NULL,
  region_name VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  best_months INT[] NOT NULL,
  suggested_duration VARCHAR(50),
  description TEXT,
  tips TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE flower_spots IS '全台賞花名勝景點庫 (關聯至花種大分類與品種)';
COMMENT ON COLUMN flower_spots.id IS '景點識別碼 (如：spot_pingjing, spot_wuling)';
COMMENT ON COLUMN flower_spots.category_id IS '對應花種大分類外鍵';
COMMENT ON COLUMN flower_spots.variety_id IS '對應主力品種細分外鍵';
COMMENT ON COLUMN flower_spots.name IS '景點名稱 (如：陽明山平菁街42巷)';
COMMENT ON COLUMN flower_spots.region IS '地區分類代碼 (north, central, south, east)';
COMMENT ON COLUMN flower_spots.region_name IS '地區顯示名稱 (如：北部 (台北))';
COMMENT ON COLUMN flower_spots.location IS '景點詳細地址或座標';
COMMENT ON COLUMN flower_spots.best_months IS '最佳觀賞月份陣列 (如：ARRAY[1, 2])';
COMMENT ON COLUMN flower_spots.suggested_duration IS '建議停留時間 (如：2小時)';
COMMENT ON COLUMN flower_spots.description IS '景點賞花特色簡介';
COMMENT ON COLUMN flower_spots.tips IS '出遊建議與交通注意事項';
COMMENT ON COLUMN flower_spots.created_at IS '建立時間';


-- 4. 賞花假期行程規劃表 (flower_itineraries)
CREATE TABLE IF NOT EXISTS flower_itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spot_id VARCHAR(50) REFERENCES flower_spots(id) ON DELETE CASCADE,
  trip_date DATE NOT NULL,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE flower_itineraries IS '賞花假期出遊行程規劃表';
COMMENT ON COLUMN flower_itineraries.id IS '行程項目主鍵 (UUID)';
COMMENT ON COLUMN flower_itineraries.spot_id IS '關聯之景點外鍵 (指向 flower_spots.id)';
COMMENT ON COLUMN flower_itineraries.trip_date IS '預計出遊日期 (YYYY-MM-DD)';
COMMENT ON COLUMN flower_itineraries.sort_order IS '行程順序 (第 1 站、第 2 站)';
COMMENT ON COLUMN flower_itineraries.created_at IS '建立時間';


-- --------------------------------------------------------------------------
-- MODULE B: 個人植物養護與日誌模組 (garden_*)
-- --------------------------------------------------------------------------

-- 5. 個人栽培植物庫存表 (garden_plants)
CREATE TABLE IF NOT EXISTS garden_plants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  species VARCHAR(100) NOT NULL,
  purchase_date DATE,
  water_interval INT NOT NULL DEFAULT 3,
  last_watered DATE NOT NULL DEFAULT CURRENT_DATE,
  location VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE garden_plants IS '個人栽培植物庫存資料表';
COMMENT ON COLUMN garden_plants.id IS '植物主鍵 (UUID)';
COMMENT ON COLUMN garden_plants.name IS '植物暱稱/自訂標籤 (如：小龜龜、玄關琴葉榕)';
COMMENT ON COLUMN garden_plants.species IS '植物品種學名 (如：龜背竹、琴葉榕、虎尾蘭)';
COMMENT ON COLUMN garden_plants.purchase_date IS '購置或開始栽培日期';
COMMENT ON COLUMN garden_plants.water_interval IS '自訂給水週期天數 (如：3天、5天、7天給水一次)';
COMMENT ON COLUMN garden_plants.last_watered IS '最近一次給水日期 (YYYY-MM-DD，用於計算今日是否需澆水)';
COMMENT ON COLUMN garden_plants.location IS '擺放位置 (如：客廳窗台、陽台東側)';
COMMENT ON COLUMN garden_plants.notes IS '栽培備註、介質成分與照顧筆記';
COMMENT ON COLUMN garden_plants.created_at IS '建立時間';


-- 6. 養護歷史與問題紀錄日誌表 (garden_journal_logs)
CREATE TABLE IF NOT EXISTS garden_journal_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plant_id UUID REFERENCES garden_plants(id) ON DELETE CASCADE,
  plant_name VARCHAR(100),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  lesson TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE garden_journal_logs IS '養護歷史、病蟲害與失敗經驗日誌表';
COMMENT ON COLUMN garden_journal_logs.id IS '日誌主鍵 (UUID)';
COMMENT ON COLUMN garden_journal_logs.plant_id IS '關聯之植物外鍵 (刪除植物時自動連帶刪除對應日誌)';
COMMENT ON COLUMN garden_journal_logs.plant_name IS '植物名稱快照';
COMMENT ON COLUMN garden_journal_logs.date IS '紀錄事件日期';
COMMENT ON COLUMN garden_journal_logs.category IS '紀錄分類代碼 (ISSUE_WATER, WATERING, PEST, REPOTTING, FERTILIZER, GENERAL)';
COMMENT ON COLUMN garden_journal_logs.title IS '事件標題 (如：澆水過多導致底部葉片發黃事故)';
COMMENT ON COLUMN garden_journal_logs.content IS '詳細狀況、症狀與處置過程描述';
COMMENT ON COLUMN garden_journal_logs.lesson IS '檢討教訓與改善心得 (Lessons Learned)';
COMMENT ON COLUMN garden_journal_logs.created_at IS '建立時間';


-- --------------------------------------------------------------------------
-- SEED DATA: 預載示範資料 (一鍵初始化)
-- --------------------------------------------------------------------------

-- 1. 寫入花種大分類 (flower_categories)
INSERT INTO flower_categories (id, name, description, main_season) VALUES
('cherry_blossom', '櫻花', '台灣春季代表花卉，不同品種自一月起陸續綻放至四月。', '1月 - 4月'),
('plum_blossom', '梅花', '台灣冬季清雅花卉，越冷越開花，氣味清香飄逸。', '12月 - 2月'),
('tung_flower', '油桐花', '四五月雪，客家庄山林步道的白雪美景。', '4月 - 5月'),
('hydrangea', '繡球花', '初夏綻放的繽紛花海，隨土壤酸鹼值展現藍紫粉白。', '5月 - 7月'),
('daylily', '金針花', '花東縱谷夏季黃金花海，金黃燦爛鋪滿山頭。', '8月 - 10月')
ON CONFLICT (id) DO NOTHING;

-- 2. 寫入花卉品種細分 (flower_varieties)
INSERT INTO flower_varieties (id, category_id, name, blooming_months, peak_month, color_tag, features) VALUES
('yamazakura', 'cherry_blossom', '山櫻花 (緋寒櫻)', ARRAY[1, 2], 2, '濃粉紅/深紅色', '台灣原生種，花朵呈吊鐘狀下垂，顏色濃艷，耐熱性較高。'),
('yaezakura', 'cherry_blossom', '八重櫻 (重瓣緋寒櫻)', ARRAY[2, 3], 2, '深紫紅色', '花瓣多層重疊，色澤艷麗濃郁，常與九族文化村與武陵農場共構盛景。'),
('yoshino', 'cherry_blossom', '吉野櫻', ARRAY[3, 4], 3, '淡粉白', '花朵先開後長葉，五瓣粉白微紅，經典日系優雅品種。'),
('fuji', 'cherry_blossom', '富士櫻 / 昭和櫻', ARRAY[2, 3], 3, '粉紅色', '花瓣纖長，粉嫩討喜，枝條優美。'),
('white_plum', 'plum_blossom', '角板山/信義白梅', ARRAY[12, 1], 1, '雪白色', '單瓣雪白，滿樹如積雪，清香遠播，盛開期約10-14天。'),
('green_calyx_plum', 'plum_blossom', '綠萼梅 (萼綠梅)', ARRAY[1, 2], 1, '白花綠萼', '花萼呈現清脆綠色，花瓣純白，極具古風雅致。')
ON CONFLICT (id) DO NOTHING;

-- 3. 寫入賞花景點 (flower_spots)
INSERT INTO flower_spots (id, category_id, variety_id, name, region, region_name, location, best_months, suggested_duration, description, tips) VALUES
('spot_pingjing', 'cherry_blossom', 'yamazakura', '陽明山平菁街42巷', 'north', '北部 (台北)', '台北市士林區平菁街42巷', ARRAY[1, 2], '2小時', '北部最早開花之櫻花巷，寒櫻/山櫻花夾道盛開，緋紅燦爛。', '建議搭乘大眾運輸 (小19 或 303 公車)，清晨造訪避開人潮。'),
('spot_wuling', 'cherry_blossom', 'yaezakura', '武陵農場', 'central', '中部 (台中)', '台中市和平區平等里武陵路3-1號', ARRAY[2, 3], '全天 (6-8小時)', '全台最震撼櫻花勝地，上萬株紅粉佳人與八重櫻形成櫻花隧道。', '櫻花季實施車輛管制，需預先登記賞櫻專車或住宿通行證。'),
('spot_tianyuan', 'cherry_blossom', 'yoshino', '淡水無極天元宮', 'north', '北部 (新北)', '新北市淡水區水源里北新路三段36號', ARRAY[3, 4], '3小時', '圓山天壇建築配合優雅粉白吉野櫻，夜間點燈更顯雄偉浪漫。', '三月中下旬為吉野櫻極盛期，可搭乘淡水捷運接駁專車。'),
('spot_wusonglun', 'plum_blossom', 'white_plum', '南投信義烏松崙梅園', 'central', '中部 (南投)', '南投縣信義鄉自強村烏松崙', ARRAY[12, 1], '4小時', '滿山白梅如雪覆蓋，梅樹下種植油菜花，形成黃白相映絕景。', '山路狹窄，會車需注意；元旦前後為最佳賞梅期。')
ON CONFLICT (id) DO NOTHING;

-- 4. 寫入預設個人植物庫存 (garden_plants)
INSERT INTO garden_plants (id, name, species, purchase_date, water_interval, last_watered, location, notes) VALUES
('11111111-1111-1111-1111-111111111111', '小龜龜', '龜背竹 (Monstera)', '2026-05-10', 5, CURRENT_DATE - INTERVAL '5 days', '客廳窗台', '葉片已開裂第4片，生長狀況良好。'),
('22222222-2222-2222-2222-222222222222', '玄關琴葉榕', '琴葉榕 (Fiddle-leaf Fig)', '2026-03-15', 7, CURRENT_DATE - INTERVAL '10 days', '玄關入口', '上個月曾經因澆水過多導致底部老葉黃化掉落，現已調整水分。'),
('33333333-3333-3333-3333-333333333333', '陽台迷你山櫻', '櫻花盆栽 (Mini Cherry)', '2026-01-20', 2, CURRENT_DATE - INTERVAL '1 day', '戶外陽台', '正值夏季營養生長階段，枝葉茂盛。')
ON CONFLICT (id) DO NOTHING;

-- 5. 寫入預設養護日誌 (garden_journal_logs)
INSERT INTO garden_journal_logs (plant_id, plant_name, date, category, title, content, lesson) VALUES
('22222222-2222-2222-2222-222222222222', '玄關琴葉榕', CURRENT_DATE - INTERVAL '14 days', 'ISSUE_WATER', '澆水過多導致底部葉片發黃與脫落事故', '連續午後陣雨加上室內通風不良，每隔3天就澆水一次，導致底盤積水。底層兩片大葉子出現黑褐色斑塊並相繼黃化掉落。', '教訓與檢討：琴葉榕室內環境需等到表土向下3公分完全乾燥再給水，切勿積水！已暫停澆水一週並移至陽台通風處。'),
('11111111-1111-1111-1111-111111111111', '小龜龜', CURRENT_DATE - INTERVAL '20 days', 'REPOTTING', '替龜背竹換至8吋素燒陶盆', '舊塑膠盆根系已盤滿盆底，更換為透氣良好的紅陶盆，介質使用 60% 泥炭土 + 20% 珍珠石 + 20% 樹皮。', '盆底加鋪厚層火山石作為排水層，防止積水爛根。');
