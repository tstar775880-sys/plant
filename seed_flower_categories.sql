-- ==========================================================================
-- Plant Hub - Supabase Seed Script for 25 Major Taiwan Flower Categories & Varieties
-- Open Supabase Dashboard -> SQL Editor, paste and execute this script to seed cloud DB!
-- ==========================================================================

-- 1. Insert/Update 25 Flower Categories (flower_categories)
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

-- 2. Insert/Update Varieties (flower_varieties)
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
('yuanlin_hollyhock', 'hollyhock', '員林/學甲蜀葵花', ARRAY[3, 4, 5], 4, '濃功紅/粉紅/純白/墨紫', '3月開花，4月高聳花柱爆發盛開極盛，5月春末進入尾聲。'),
('giant_cosmos', 'cosmos', '大波斯菊 / 黃波斯菊', ARRAY[10, 11, 12, 1, 2], 11, '粉紅/桃紅/純白/金黃', '10月開花，11月新社花海極盛，持續盛開至2月。'),
('bougainvillea_var', 'bougainvillea', '艷紅/紫紅九重葛', ARRAY[10, 11, 12, 1, 2, 3], 11, '桃紅/深紫/亮紅/白色', '10月開花，11月盛開成瀑布花牆，持續綻放到3月。')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  blooming_months = EXCLUDED.blooming_months,
  peak_month = EXCLUDED.peak_month,
  color_tag = EXCLUDED.color_tag,
  features = EXCLUDED.features;
