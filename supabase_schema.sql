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
('cherry_blossom', '櫻花', '台灣春季最受矚目的賞花勝景，品種豐富，從 1 月中旬陸續綻放到 4 月。', '1月 - 4月'),
('plum_blossom', '梅花', '台灣冬季越冷越開花，清香遠播，主要盛開於 12 月底至 2 月。', '12月 - 2月'),
('tung_flower', '油桐花', '初夏客家庄五月雪，朵朵白花如雪花般隨風飄落鋪滿步道。', '4月 - 5月'),
('calla_lily', '海芋', '陽明山竹子湖與桃園彩色海芋季代表，純白與繽紛苞片綻放。', '3月 - 6月'),
('bald_cypress', '落羽松 (落羽杉)', '秋冬之際由翠綠轉為金黃、深紅的羽狀複葉美景。', '11月 - 1月'),
('hydrangea', '繡球花', '初夏陽明山竹子湖與高山園區爆發的花海巨星。', '5月 - 7月'),
('lotus_waterlily', '荷花與睡蓮', '夏季水生花卉盛宴，白河蓮花季立葉荷花與香水睡蓮。', '4月 - 9月'),
('daylily', '金針花 (萱草)', '母親花萱草！五月平地金針到八九月花東高山黃金花海。', '5月 - 9月'),
('lavender', '薰衣草', '秋冬至早春山林浪漫紫浪，帶有令人舒緩沉靜的獨特芳香。', '11月 - 4月'),
('salvia', '鼠尾草', '秋冬春季紫藍色長穗花海，常與薰衣草交織成絕美花毯。', '10月 - 4月'),
('golden_trumpet', '黃花風鈴木', '春季中南部爆發的金黃街道奇蹟，黃澄澄喇叭狀花朵盛開。', '2月 - 3月'),
('chive_flower', '韭菜花', '桃園大溪九月雪！秋初田園間細碎潔白花朵覆蓋大地。', '8月 - 9月'),
('silvergrass', '芒花 (甜根子草)', '秋季山海之間隨風擺盪的銀色波浪。', '9月 - 11月'),
('tulip', '鬱金香', '冬末早春歐洲風情，杯狀繽紛花朵高雅綻放。', '1月 - 3月'),
('maple', '楓葉 (楓樹/槭樹)', '深秋至初冬紅葉盛宴，滿山層林盡染，金黃與楓紅交織。', '11月 - 12月'),
('ginkgo', '銀杏', '活化石植物黃金傳奇，秋季溪頭大崙山全台最大銀杏森林。', '10月 - 11月'),
('chrysanthemum', '杭菊 (菊海)', '秋末苗栗銅鑼大地的黃白雪毯，圓滾滾菊海。', '11月 - 12月'),
('rose', '玫瑰', '千姿百態的香氣王后，台灣秋冬春季節連續開花。', '11月 - 4月'),
('sunflower', '向日葵', '陽光下最耀眼的金色巨浪，夏秋之際追隨太陽綻放。', '5月 - 10月'),
('kapok', '木棉花', '台南白河林初埤獲選全球最美花道！橘紅色木棉花雨。', '3月 - 4月'),
('wisteria', '紫藤花', '春季短暫集中綻放的夢幻紫色花瀑。', '3月 - 4月'),
('golden_shower', '阿勃勒 (黃金雨)', '初夏金黃花穗懸掛樹梢隨風飄落「黃金雨」。', '5月 - 6月'),
('hollyhock', '蜀葵花 (一丈紅)', '株高達2-3公尺的花海迷宮，員林與學甲一丈紅。', '3月 - 5月'),
('cosmos', '波斯菊 (花海)', '台灣秋冬至早春休耕期間最廣闊繽紛的大花毯。', '10月 - 2月'),
('bougainvillea', '九重葛', '秋冬至早春爆發花瀑牆，彰化田尾艷麗絕美景緻。', '10月 - 3月')
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  main_season = EXCLUDED.main_season;

-- 2. 寫入花卉品種細分 (flower_varieties)
INSERT INTO flower_varieties (id, category_id, name, blooming_months, peak_month, color_tag, features) VALUES
('yamazakura', 'cherry_blossom', '山櫻花 (緋寒櫻)', ARRAY[1, 2], 2, '濃粉紅/深紅色', '台灣原生種櫻花，花朵呈吊鐘狀下垂，色澤濃艷亮麗。'),
('yaezakura', 'cherry_blossom', '八重櫻 (重瓣緋寒櫻)', ARRAY[2, 3], 2, '深紫粉色', '花瓣多層重疊，花色深紅艷麗，盛開時滿樹重疊呈現粉紅花海。'),
('yoshino', 'cherry_blossom', '吉野櫻 (染井吉野)', ARRAY[3, 4], 3, '淡粉白色', '花朵先開後長葉，滿開時呈淡粉白雪白景致，極具浪漫櫻雪氛圍。'),
('fuji_sakura', 'cherry_blossom', '富士櫻 / 昭和櫻', ARRAY[2, 3], 3, '粉紅色', '花瓣五片明顯分開，花色粉嫩高雅，開花時間介於山櫻與吉野櫻之間。'),
('white_plum', 'plum_blossom', '角板山白梅 (國梅)', ARRAY[12, 1], 1, '雪白色', '花瓣潔白如雪，伴隨清雅幽香，為寒冬中台灣最經典的踏雪尋梅景致。'),
('green_plum', 'plum_blossom', '綠萼梅 (綠梅/青梅)', ARRAY[1, 2], 1, '淡綠白色', '萼片呈鮮綠色，花色微綠帶白，優雅脫俗，花香持久。'),
('thousand_year_tung', 'tung_flower', '千年桐 (廣東油桐)', ARRAY[4, 5], 4, '純白色/花心紅黃色', '台灣最常見的油桐品種，盛開時滿山白頭，落花如雪紛飛。'),
('three_year_tung', 'tung_flower', '三年桐 (油桐)', ARRAY[4, 5], 4, '純白色', '葉片心形光滑，開花期集中於 4 月中下旬。'),
('white_calla', 'calla_lily', '白色海芋 (竹子湖濕地型)', ARRAY[3, 4, 5], 4, '純白色', '偏好濕地環境，苞片挺拔純白，為竹子湖春季代表性採花景致。'),
('color_calla', 'calla_lily', '彩色海芋 (桃園陸生型)', ARRAY[4, 5, 6], 5, '金黃/亮紅/鮮粉/紫紅', '栽培於旱田，色彩繽紛燦爛，為桃園氣候季主角。'),
('bald_cypress_var', 'bald_cypress', '落羽杉 (變色觀賞期)', ARRAY[11, 12, 1], 12, '黃綠/金黃/深紅褐色', '11月開始轉黃觀賞，12月全紅盛開極盛，1月逐漸落葉。'),
('big_leaf_hydrangea', 'hydrangea', '大葉繡球花 (藍紫粉系)', ARRAY[5, 6, 7], 6, '夢幻藍/紫色/粉紅色', '花球巨大簇擁，5月初綻開花，6月滿山盛開極盛，7月進入末期。'),
('panicle_hydrangea', 'hydrangea', '圓錐繡球花 (白粉漸層)', ARRAY[6, 7], 6, '奶油白/淡粉紅', '花序呈圓錐狀，花期略晚於大葉繡球，耐熱性較佳。'),
('baihe_lotus', 'lotus_waterlily', '白河荷花 (立葉大賀蓮)', ARRAY[5, 6, 7, 8], 6, '粉紅/純白色', '台南白河經典荷花，花朵高挺出水，6月盛開滿池。'),
('perfume_waterlily', 'lotus_waterlily', '香水睡蓮 (浮葉睡蓮)', ARRAY[4, 5, 6, 7, 8, 9], 6, '亮紫/鮮黃/純白/粉紅', '葉片浮於水面，花期極長且自帶清幽香氣。'),
('alpine_daylily', 'daylily', '六十石山/赤科山高山金針', ARRAY[8, 9], 8, '燦爛橙黃色', '8月盛開滿山金黃地毯，9月進入採收與季末尾聲。'),
('plain_daylily', 'daylily', '平地金針花 (花蓮1號/彰化花壇)', ARRAY[5, 6], 5, '亮金黃色', '5月母親節前後平地爆發，花期較高山早。'),
('sweet_lavender', 'lavender', '甜蜜薰衣草 / 羽葉薰衣草', ARRAY[11, 12, 1, 2, 3, 4], 1, '浪漫紫色', '台灣冬季至早春最具代表性的紫色花海，1月極盛盛開。'),
('mexican_salvia', 'salvia', '墨西哥鼠尾草 / 藍花鼠尾草', ARRAY[10, 11, 12, 1, 2, 3, 4], 11, '天鵝絨深紫/藍紫色', '花穗絨毛質感顯眼，11月盛開極盛，持續綻放到4月。'),
('golden_trumpet_tree', 'golden_trumpet', '黃花風鈴木 (黃金風鈴木)', ARRAY[2, 3], 3, '耀眼鮮黃色', '2月下旬初綻開花，3月金黃花朵如風鈴掛滿枝頭盛開極盛。'),
('daxi_chive_flower', 'chive_flower', '大溪九月雪韭菜花', ARRAY[8, 9], 9, '雪白色', '8月下旬開始開花，9月盛開時萬花齊放如雪花覆蓋綠田。'),
('sweet_root_grass', 'silvergrass', '甜根子草 (溪床銀浪)', ARRAY[9, 10], 9, '羽毛純白色', '9月中秋前後中南部河床滿滿純白羽毛花海盛開。'),
('silver_grass_var', 'silvergrass', '菅芒花 (山坡金黃銀浪)', ARRAY[10, 11], 11, '淡黃/紅褐色', '10月開花，11月草嶺古道與陽明山滿山紅褐色銀浪盛開。'),
('dutch_tulip', 'tulip', '荷蘭鬱金香 (多彩系)', ARRAY[1, 2, 3], 2, '艷紅/粉/純黃/紫黑多彩', '1月開花，2月士林官邸與山區園區極盛盛開。'),
('red_maple', 'maple', '青楓 / 掌葉楓 (楓紅期)', ARRAY[11, 12], 12, '鮮紅/金黃/橘紅色', '11月受冷空氣影響開始變紅，12月奧萬大與福壽山全紅極盛。'),
('ginkgo_tree', 'ginkgo', '銀杏 (黃金葉觀賞期)', ARRAY[10, 11], 10, '燦爛金黃色', '10月溪頭與大崙山黃金扇形葉盛開極盛，11月金黃落葉飄灑。'),
('hangzhou_chrysanthemum', 'chrysanthemum', '銅鑼白菊與黃菊', ARRAY[11, 12], 11, '雪白/金黃圓球狀', '11月苗栗銅鑼杭菊季盛開，如雪球降落田野。'),
('grand_rose', 'rose', '四季大花玫瑰 / 蔓藤玫瑰', ARRAY[11, 12, 1, 2, 3, 4], 3, '深紅/粉紅/亮黃/純白/紫色', '台北玫瑰園與各地玫瑰森林盛景，3月春季花量最大。'),
('giant_sunflower', 'sunflower', '巨型向日葵 / 彩色向日葵', ARRAY[5, 6, 7, 8, 9, 10], 7, '耀眼金黃色/深橘紅', '5月起陸續綻放，7月盛夏極盛，作為休耕田花海盛開。'),
('kapok_tree', 'kapok', '林初埤橘紅木棉', ARRAY[3, 4], 3, '耀眼橘紅色', '3月木棉花道爆發盛開極盛，4月花落滿地進入尾聲。'),
('japanese_wisteria', 'wisteria', '日本紫藤 / 瑞里紫藤', ARRAY[3, 4], 4, '夢幻紫色/淡紫色', '3月下旬開花，4月上旬垂墜花瀑盛開極盛。'),
('golden_shower_tree', 'golden_shower', '阿勃勒 (黃金雨期)', ARRAY[5, 6], 5, '燦爛金黃色', '5月台南與各地盛開極盛成黃金大道，6月花落進入尾聲。'),
('yuanlin_hollyhock', 'hollyhock', '員林/學甲蜀葵花', ARRAY[3, 4, 5], 4, '濃紅/粉紅/純白/墨紫', '3月開花，4月高聳花柱爆發盛開極盛，5月春末進入尾聲。'),
('giant_cosmos', 'cosmos', '大波斯菊 / 黃波斯菊', ARRAY[10, 11, 12, 1, 2], 11, '粉紅/桃紅/純白/金黃', '10月開花，11月新社花海極盛，持續盛開至2月。'),
('bougainvillea_var', 'bougainvillea', '艷紅/紫紅九重葛', ARRAY[10, 11, 12, 1, 2, 3], 11, '桃紅/深紫/亮紅/白色', '10月開花，11月盛開成瀑布花牆，持續綻放到3月。')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  blooming_months = EXCLUDED.blooming_months,
  peak_month = EXCLUDED.peak_month,
  color_tag = EXCLUDED.color_tag,
  features = EXCLUDED.features;

-- 3. 寫入賞花景點 (flower_spots)
INSERT INTO flower_spots (id, category_id, variety_id, name, region, region_name, location, best_months, suggested_duration, description, tips) VALUES
('spot_pingjing', 'cherry_blossom', 'yamazakura', '陽明山平菁街42巷', 'north', '北部 (台北)', '台北市士林區平菁街42巷', ARRAY[1, 2], '2小時', '北部最快盛開的賞櫻名勝！巷弄兩側寒櫻與山櫻花盛開伸出牆外，形成夢幻粉紅花海隧道。', '建議搭乘小19或303號公車前往，開花極盛期為 1月下旬至 2月上旬。'),
('spot_wuling', 'cherry_blossom', 'yaezakura', '武陵農場', 'central', '中部 (台中)', '台中市和平區平等里武陵路3-1號', ARRAY[2, 3], '半天 (4-6小時)', '全台最震撼櫻花勝地！上萬株紅粉佳人與八重櫻沿山谷綻放，綿延數公里粉紅花海公路。', '櫻花季期間實施交通總量管制，需預約賞花專車或取得住宿車輛通行證。'),
('spot_tianyuan', 'cherry_blossom', 'yoshino', '淡水無極天元宮', 'north', '北部 (新北)', '新北市淡水區北新路三段36號', ARRAY[3, 4], '2-3小時', '雄偉圓山天壇建築搭配粉白吉野櫻！後山與後花園吉野櫻盛開時滿天櫻雪浪漫至極。', '可於捷運淡水站搭乘賞櫻接駁專車，夜間天元宮點燈別有一番風味。'),
('spot_wusonglun', 'plum_blossom', 'white_plum', '南投信義烏松崙梅園', 'central', '中部 (南投)', '南投縣信義鄉自強村烏松崙', ARRAY[12, 1], '3-4小時', '全台最具美感的踏雪尋梅勝地！滿山坡百年古梅樹下盛開黃澄澄油菜花，黃白相映如仙境。', '山路狹窄，會車需特別注意；元旦前後為最佳滿開觀賞期。'),
('spot_jiaobanshan', 'plum_blossom', 'white_plum', '桃園角板山行館', 'north', '北部 (桃園)', '桃園市復興區澤仁里中正路133號', ARRAY[12, 1], '2小時', '北台灣最大賞梅勝地！近數百株老梅樹花香遠播，戰備隧道與湖光山色相映。', '設有無障礙步道，適合全家大小健行，可順遊角板山形象商圈。'),
('spot_sanyi_tung', 'tung_flower', 'thousand_year_tung', '苗栗三義四月雪小徑', 'north', '北部 (苗栗)', '苗栗縣三義鄉廣盛村80號 (勝興車站周邊)', ARRAY[4, 5], '2小時', '客家庄最經典的五月雪步道！枕木步道兩側滿佈油桐樹，隨風飄落鋪成純白花毯。', '建議穿著好走的運動鞋，賞花後可前往勝興車站與龍騰斷橋順遊。'),
('spot_zhuzihu_calla', 'calla_lily', 'white_calla', '陽明山竹子湖海芋田', 'north', '北部 (台北)', '台北市北投區竹子湖路 (海芋大道)', ARRAY[3, 4, 5], '3小時', '山谷中的純白仙境！背靠小油坑硫磺煙霧，穿上青蛙裝親自體驗採下白色海芋的樂趣。', '海芋季期間例假日實施交通管制，建議於捷運石牌站轉搭小8公車前往。'),
('spot_sanwan_cypress', 'bald_cypress', 'bald_cypress_var', '苗栗三灣落羽松秘境', 'north', '北部 (苗栗)', '苗栗縣三灣鄉錫隘13號', ARRAY[11, 12, 1], '2小時', '水上落羽松奇景！上百棵落羽杉佇立於水池中，秋冬紅葉倒映於澈亮水面，宛如歐美油畫。', '園區免費開放，聯外道路較窄需步行約15分鐘進入。'),
('spot_zhuzihu_hydrangea', 'hydrangea', 'big_leaf_hydrangea', '陽明山竹子湖繡球花園 (高家/曹家)', 'north', '北部 (台北)', '台北市北投區竹子湖路 (梯田區)', ARRAY[5, 6, 7], '3小時', '繽紛震撼的立體花牆！順著山坡梯田栽培的巨大藍紫粉色繡球花，令人沉浸於花海迷宮。', '梯田濕滑建議穿著平底鞋，6月上旬為花量最大最豐飽的極盛期。'),
('spot_baihe_lotus', 'lotus_waterlily', 'baihe_lotus', '台南白河蓮花公園', 'south', '南部 (台南)', '台南市白河區三間厝22-9號', ARRAY[5, 6, 7, 8], '3小時', '全台最具代表性的蓮花故鄉！荷葉連天出水高挺，大賀蓮與香水睡蓮清香撲鼻。', '清晨 5:00~9:00 為荷花盛開花型最美的黃金時刻，亦可品嚐蓮子大餐。'),
('spot_liushishi', 'daylily', 'alpine_daylily', '花蓮富里六十石山', 'east', '東部 (花蓮)', '花蓮縣富里鄉竹田村六十石山', ARRAY[8, 9], '半天 (4-5小時)', '天使的眼淚與金黃毯！海拔約800公尺綿延不絕的金黃色金針花海，配合耶穌光極致震撼。', '花季實施單向環山管制，山頂忘憂亭為俯瞰全景的最佳攝影點。'),
('spot_chiayi_trumpet', 'golden_trumpet', 'golden_trumpet_tree', '嘉義八掌溪軍輝橋風鈴木步道', 'south', '南部 (嘉義)', '嘉義市東區吳鳳南路軍輝橋旁', ARRAY[2, 3], '2小時', '爆發力十足的金黃風鈴木花海！堤防兩側黃花風鈴木盛開如黃金巨龍，耀眼無比。', '花期僅約10-14天，3月上旬為最佳觀賞期，沿線設有完善人行步道。'),
('spot_linchupi_kapok', 'kapok', 'kapok_tree', '台南白河林初埤木棉花道', 'south', '南部 (台南)', '台南市白河區玉豐里林初埤', ARRAY[3, 4], '2小時', '獲選全球最美15大花道之一！長達數公里的橘紅色木棉花在稻田旁延伸，落花成道。', '木棉花季會進行車輛管制，建議租借自行車漫遊綠意與紅花田間。'),
('spot_ruili_wisteria', 'wisteria', 'japanese_wisteria', '嘉義梅山瑞里紫藤花季', 'south', '南部 (嘉義)', '嘉義縣梅山鄉瑞里村 (幼葉林社區)', ARRAY[3, 4], '半天 (3-4小時)', '高山上的紫色浪漫狂潮！超過20處店家與步道垂掛著優雅紫色瀑布花穗。', '沿阿里山公路或166縣道上山，4月上旬為紫色花瀑最濃密的極盛期。'),
('spot_hutoupi_shower', 'golden_shower', 'golden_shower_tree', '台南新化虎頭埤風景區', 'south', '南部 (台南)', '台南市新化區中興路426號', ARRAY[5, 6], '3小時', '阿勃勒黃金雨盛宴！環湖步道旁阿勃勒盛開，花瓣隨湖風吹拂如黃金雨落入湖面。', '園區提供水上腳踏車與划船體驗，可在湖中央欣賞岸邊黃金樹影倒映。'),
('spot_tongluo_chrys', 'chrysanthemum', 'hangzhou_chrysanthemum', '苗栗銅鑼九湖杭菊田', 'north', '北部 (苗栗)', '苗栗縣銅鑼鄉九湖村九湖農場', ARRAY[11, 12], '2-3小時', '秋末大地的積雪與金毯！圓滾滾的白菊與黃菊交錯盛開於田野間，瀰漫濃郁菊香。', '11月中旬為杭菊祭活動最熱鬧時刻，現場有採菊花體驗與特產展售。'),
('spot_xinshe_cosmos', 'cosmos', 'giant_cosmos', '台中新社花海 (新社種苗場)', 'central', '中部 (台中)', '台中市新社區協成里協興街30號', ARRAY[10, 11, 12], '3-4小時', '全台規模最宏大的花海盛事！數公頃廣闊的波斯菊與主題景觀花毯織就大地彩繪。', '建議搭乘接駁車前往避開壅塞，現場配合農特產品展覽相當豐富。'),
('spot_xuejia_hollyhock', 'hollyhock', 'yuanlin_hollyhock', '台南學甲蜀葵花文化節', 'south', '南部 (台南)', '台南市學甲區光華里 (光華社區)', ARRAY[3, 4, 5], '2小時', '走進比人還高的巨型花海迷宫！蜀葵花花色多樣高聳挺拔，景致獨一無二。', '現場結合小麥田與鼠尾草田，建議搭配學甲虱目魚美食行程。')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  location = EXCLUDED.location,
  best_months = EXCLUDED.best_months,
  description = EXCLUDED.description,
  tips = EXCLUDED.tips;

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
