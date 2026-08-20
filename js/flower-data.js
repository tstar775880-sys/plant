/**
 * Plant Hub - Taiwan Flower Data Repository
 * Authoritative baseline data preloaded for 25 major Taiwan flower categories:
 * 櫻花, 梅花, 油桐花, 海芋, 落羽松與水杉, 繡球花, 荷花與睡蓮, 金針花, 薰衣草,
 * 鼠尾草, 黃花風鈴木, 韭菜花, 芒花(甜根子草), 鬱金香, 楓葉, 銀杏, 杭菊, 玫瑰, 向日葵,
 * 木棉花, 紫藤花, 阿勃勒, 蜀葵花, 波斯菊, 九重葛.
 */

window.PlantHubData = window.PlantHubData || {};

window.PlantHubData.flowerCategories = [
  {
    id: "cherry_blossom",
    name: "櫻花",
    description: "台灣春季最受矚目的賞花勝景，品種豐富，從 1 月中旬陸續綻放到 4 月。",
    mainSeason: "1月 - 4月",
    varieties: [
      {
        id: "yamazakura",
        name: "山櫻花 (緋寒櫻)",
        bloomingMonths: [1, 2],
        peakMonth: 2,
        endingMonth: 2,
        colorTag: "濃粉紅/深紅色",
        features: "台灣原生種櫻花，花朵呈吊鐘狀下垂，色澤濃艷亮麗，常吸引蜜蜂與綠繡眼。"
      },
      {
        id: "yaezakura",
        name: "八重櫻 (重瓣緋寒櫻)",
        bloomingMonths: [2, 3],
        peakMonth: 2,
        endingMonth: 3,
        colorTag: "深紫粉色",
        features: "花瓣多層重疊，花色深紅艷麗，盛開時滿樹重疊呈現粉紅花海美景。"
      },
      {
        id: "yoshino",
        name: "吉野櫻 (染井吉野)",
        bloomingMonths: [3, 4],
        peakMonth: 3,
        endingMonth: 4,
        colorTag: "淡粉白色",
        features: "花朵先開後長葉，滿開時呈淡粉白雪白景致，極具浪漫櫻雪氛圍。"
      },
      {
        id: "fuji_sakura",
        name: "富士櫻 / 昭和櫻",
        bloomingMonths: [2, 3],
        peakMonth: 3,
        endingMonth: 3,
        colorTag: "粉紅色",
        features: "花瓣五片明顯分開，花色粉嫩高雅，開花時間介於山櫻與吉野櫻之間。"
      }
    ]
  },
  {
    id: "plum_blossom",
    name: "梅花",
    description: "冬季越冷越開花，清香遠播，台灣白梅與綠萼梅主要盛開於 12 月底至 2 月。",
    mainSeason: "12月 - 2月",
    varieties: [
      {
        id: "white_plum",
        name: "角板山白梅 (國梅)",
        bloomingMonths: [12, 1],
        peakMonth: 1,
        endingMonth: 1,
        colorTag: "雪白色",
        features: "花瓣潔白如雪，伴隨清雅幽香，為寒冬中台灣最經典的踏雪尋梅景致。"
      },
      {
        id: "green_plum",
        name: "綠萼梅 (綠梅/青梅)",
        bloomingMonths: [1, 2],
        peakMonth: 1,
        endingMonth: 2,
        colorTag: "淡綠白色",
        features: "萼片呈鮮綠色，花色微綠帶白，優雅脫俗，花香持久且極具觀賞價值。"
      }
    ]
  },
  {
    id: "tung_flower",
    name: "油桐花",
    description: "初夏時節客家庄最浪漫的五月雪，朵朵白花如雪花般隨風飄落，鋪滿山林步道。",
    mainSeason: "4月 - 5月",
    varieties: [
      {
        id: "thousand_year_tung",
        name: "千年桐 (廣東油桐)",
        bloomingMonths: [4, 5],
        peakMonth: 4,
        endingMonth: 5,
        colorTag: "純白色/花心紅黃色",
        features: "台灣最常見的油桐品種，盛開時滿山白頭，落花如雪紛飛極為浪漫。"
      },
      {
        id: "three_year_tung",
        name: "三年桐 (油桐)",
        bloomingMonths: [4, 5],
        peakMonth: 4,
        endingMonth: 5,
        colorTag: "純白色",
        features: "葉片心形光滑，開花期集中於 4 月中下旬，花朵大而嬌艷。"
      }
    ]
  },
  {
    id: "calla_lily",
    name: "海芋",
    description: "陽明山竹子湖與桃園彩色海芋季代表，純白與繽紛色彩的苞片佇立於綠波之中。",
    mainSeason: "3月 - 6月",
    varieties: [
      {
        id: "white_calla",
        name: "白色海芋 (竹子湖濕地型)",
        bloomingMonths: [3, 4, 5],
        peakMonth: 4,
        endingMonth: 5,
        colorTag: "純白色",
        features: "偏好濕地環境，苞片挺拔純白，為竹子湖春季最具代表性的採花景致。"
      },
      {
        id: "color_calla",
        name: "彩色海芋 (桃園陸生型)",
        bloomingMonths: [4, 5, 6],
        peakMonth: 5,
        endingMonth: 6,
        colorTag: "金黃/亮紅/鮮粉/紫紅",
        features: "栽培於旱田，色彩繽紛燦爛，為桃園氣候季與春末夏初主題主角。"
      }
    ]
  },
  {
    id: "bald_cypress",
    name: "落羽松與黃金水杉",
    description: "秋冬羽狀複葉變色美景！包含各地落羽松 (落羽杉) 與南投杉林溪活化石黃金水杉林。",
    mainSeason: "11月 - 1月",
    varieties: [
      {
        id: "bald_cypress_var",
        name: "落羽松 (落羽杉 / 葉互生 / 具膝根)",
        bloomingMonths: [11, 12, 1],
        peakMonth: 12,
        endingMonth: 1,
        colorTag: "黃綠/金黃/深紅褐色",
        features: "11月開始轉黃觀賞，12月全紅盛開極盛，1月逐漸落葉進入尾聲。小葉左右交錯互生。"
      },
      {
        id: "metasequoia_var",
        name: "黃金水杉 (活化石 / 葉對生 / 杉林溪)",
        bloomingMonths: [11, 12],
        peakMonth: 11,
        endingMonth: 12,
        colorTag: "璀璨金黃色/橘黃色",
        features: "11月南投杉林溪黃金水杉林爆發燦爛金黃極盛，12月進入季末尾聲。小葉兩兩相對對生。"
      }
    ]
  },
  {
    id: "hydrangea",
    name: "繡球花",
    description: "初夏陽明山竹子湖與高山園區爆發的花海巨星，色彩隨土壤酸鹼度幻化成藍、紫、粉紅。",
    mainSeason: "5月 - 7月",
    varieties: [
      {
        id: "big_leaf_hydrangea",
        name: "大葉繡球花 (藍紫粉系)",
        bloomingMonths: [5, 6, 7],
        peakMonth: 6,
        endingMonth: 7,
        colorTag: "夢幻藍/紫色/粉紅色",
        features: "花球巨大簇擁，5月初綻開花，6月滿山盛開極盛，7月進入末期尾聲。"
      },
      {
        id: "panicle_hydrangea",
        name: "圓錐繡球花 (白粉漸層)",
        bloomingMonths: [6, 7],
        peakMonth: 6,
        endingMonth: 7,
        colorTag: "奶油白/淡粉紅",
        features: "花序呈圓錐狀，花期略晚於大葉繡球，耐熱性較佳，夏初清爽美景。"
      }
    ]
  },
  {
    id: "lotus_waterlily",
    name: "荷花與睡蓮",
    description: "夏季水生花卉盛宴！白河蓮花季立葉荷花與各地香水睡蓮高雅綻放。",
    mainSeason: "4月 - 9月",
    varieties: [
      {
        id: "baihe_lotus",
        name: "白河荷花 (立葉大賀蓮)",
        bloomingMonths: [5, 6, 7, 8],
        peakMonth: 6,
        endingMonth: 8,
        colorTag: "粉紅/純白色",
        features: "台南白河經典荷花，花朵高挺出水，6月盛開滿池，8月結實結蓮蓬進入尾聲。"
      },
      {
        id: "perfume_waterlily",
        name: "香水睡蓮 (浮葉睡蓮)",
        bloomingMonths: [4, 5, 6, 7, 8, 9],
        peakMonth: 6,
        endingMonth: 9,
        colorTag: "亮紫/鮮黃/純白/粉紅",
        features: "葉片浮於水面，花期極長且自帶清幽香氣，4月至9月水池畔優雅盛開。"
      }
    ]
  },
  {
    id: "daylily",
    name: "金針花 (萱草)",
    description: "母親花萱草！從五月平地金針到八九月花東高山花海，金黃浪潮極為壯觀。",
    mainSeason: "5月 - 9月",
    varieties: [
      {
        id: "alpine_daylily",
        name: "六十石山/赤科山高山金針",
        bloomingMonths: [8, 9],
        peakMonth: 8,
        endingMonth: 9,
        colorTag: "燦爛橙黃色",
        features: "8月盛開滿山金黃地毯，9月進入採收與季末尾聲，花東海岸山脈絕景。"
      },
      {
        id: "plain_daylily",
        name: "平地金針花 (花蓮1號/彰化花壇)",
        bloomingMonths: [5, 6],
        peakMonth: 5,
        endingMonth: 6,
        colorTag: "亮金黃色",
        features: "5月母親節前後平地爆發，花期較高山早，黃澄澄山坡美不勝收。"
      }
    ]
  },
  {
    id: "lavender",
    name: "薰衣草",
    description: "秋冬至早春山林浪漫紫浪，帶有令人舒緩沉靜的獨特芳香。",
    mainSeason: "11月 - 4月",
    varieties: [
      {
        id: "sweet_lavender",
        name: "甜蜜薰衣草 / 羽葉薰衣草",
        bloomingMonths: [11, 12, 1, 2, 3, 4],
        peakMonth: 1,
        endingMonth: 4,
        colorTag: "浪漫紫色",
        features: "台灣冬季至早春最具代表性的紫色花海，1月極盛盛開，4月春末進入尾聲。"
      }
    ]
  },
  {
    id: "salvia",
    name: "鼠尾草",
    description: "秋冬春季紫藍色長穗花海，常與薰衣草交織成絕美花毯景緻。",
    mainSeason: "10月 - 4月",
    varieties: [
      {
        id: "mexican_salvia",
        name: "墨西哥鼠尾草 / 藍花鼠尾草",
        bloomingMonths: [10, 11, 12, 1, 2, 3, 4],
        peakMonth: 11,
        endingMonth: 4,
        colorTag: "天鵝絨深紫/藍紫色",
        features: "花穗絨毛質感顯眼，11月盛開極盛，持續綻放到4月春末。"
      }
    ]
  },
  {
    id: "golden_trumpet",
    name: "黃花風鈴木",
    description: "春季中南部爆發的金黃街道奇蹟，黃澄澄喇叭狀花朵短暫震撼綻放。",
    mainSeason: "2月 - 3月",
    varieties: [
      {
        id: "golden_trumpet_tree",
        name: "黃花風鈴木 (黃金風鈴木)",
        bloomingMonths: [2, 3],
        peakMonth: 3,
        endingMonth: 3,
        colorTag: "耀眼鮮黃色",
        features: "2月下旬初綻開花，3月金黃花朵如風鈴掛滿枝頭盛開極盛，花期短暫而絢麗。"
      }
    ]
  },
  {
    id: "chive_flower",
    name: "韭菜花",
    description: "桃園大溪九月雪！秋初田園間細碎潔白花朵覆蓋大地，宛如積雪。",
    mainSeason: "8月 - 9月",
    varieties: [
      {
        id: "daxi_chive_flower",
        name: "大溪九月雪韭菜花",
        bloomingMonths: [8, 9],
        peakMonth: 9,
        endingMonth: 9,
        colorTag: "雪白色",
        features: "8月下旬開始開花，9月盛開時萬花齊放如雪花覆蓋綠田，絕美夏末秋初景色。"
      }
    ]
  },
  {
    id: "silvergrass",
    name: "芒花 (甜根子草)",
    description: "秋季山海之間隨風擺盪的銀色波浪，從溪床甜根子到秋芒步道絕景。",
    mainSeason: "9月 - 11月",
    varieties: [
      {
        id: "sweet_root_grass",
        name: "甜根子草 (溪床銀浪)",
        bloomingMonths: [9, 10],
        peakMonth: 9,
        endingMonth: 10,
        colorTag: "羽毛純白色",
        features: "9月中秋前後中南部河床滿滿純白羽毛花海盛開，10月進入季末尾聲。"
      },
      {
        id: "silver_grass_var",
        name: "菅芒花 (山坡金黃銀浪)",
        bloomingMonths: [10, 11],
        peakMonth: 11,
        endingMonth: 11,
        colorTag: "淡黃/紅褐色",
        features: "10月開花，11月草嶺古道與陽明山滿山紅褐色銀浪隨風搖曳盛開極盛。"
      }
    ]
  },
  {
    id: "tulip",
    name: "鬱金香",
    description: "冬末早春的歐洲風情！杯狀繽紛花朵在花園與花展高雅綻放。",
    mainSeason: "1月 - 3月",
    varieties: [
      {
        id: "dutch_tulip",
        name: "荷蘭鬱金香 (多彩系)",
        bloomingMonths: [1, 2, 3],
        peakMonth: 2,
        endingMonth: 3,
        colorTag: "艷紅/粉/純黃/紫黑多彩",
        features: "1月開花，2月士林官邸與山區園區極盛盛開，3月進入春季尾聲。"
      }
    ]
  },
  {
    id: "maple",
    name: "楓葉 (楓樹/槭樹)",
    description: "深秋至初冬的紅葉盛宴！滿山層林盡染，金黃與楓紅交織奇景。",
    mainSeason: "11月 - 12月",
    varieties: [
      {
        id: "red_maple",
        name: "青楓 / 掌葉楓 (楓紅期)",
        bloomingMonths: [11, 12],
        peakMonth: 12,
        endingMonth: 12,
        colorTag: "鮮紅/金黃/橘紅色",
        features: "11月受冷空氣影響開始變紅，12月奧萬大與福壽山全紅盛開極盛。"
      }
    ]
  },
  {
    id: "ginkgo",
    name: "銀杏",
    description: "活化石植物的黃金傳奇！秋季溪頭大崙山茶園間全台最大銀杏森林。",
    mainSeason: "10月 - 11月",
    varieties: [
      {
        id: "ginkgo_tree",
        name: "銀杏 (黃金葉觀賞期)",
        bloomingMonths: [10, 11],
        peakMonth: 10,
        endingMonth: 11,
        colorTag: "燦爛金黃色",
        features: "10月溪頭與大崙山黃金扇形葉盛開極盛，11月金黃落葉飄灑步道尾聲。"
      }
    ]
  },
  {
    id: "chrysanthemum",
    name: "杭菊 (菊海)",
    description: "秋末苗栗銅鑼大地的黃白雪毯！圓滾滾黃菊與白菊浪漫盛開。",
    mainSeason: "11月 - 12月",
    varieties: [
      {
        id: "hangzhou_chrysanthemum",
        name: "銅鑼白菊與黃菊",
        bloomingMonths: [11, 12],
        peakMonth: 11,
        endingMonth: 12,
        colorTag: "雪白/金黃圓球狀",
        features: "11月苗栗銅鑼杭菊季盛開，如雪球降落田野，12月初採收進入尾聲。"
      }
    ]
  },
  {
    id: "rose",
    name: "玫瑰",
    description: "千姿百態的香氣王后！花型豐滿多彩，在台灣秋冬春季節連續開花綻放。",
    mainSeason: "11月 - 4月",
    varieties: [
      {
        id: "grand_rose",
        name: "四季大花玫瑰 / 蔓藤玫瑰",
        bloomingMonths: [11, 12, 1, 2, 3, 4],
        peakMonth: 3,
        endingMonth: 4,
        colorTag: "深紅/粉紅/亮黃/純白/紫色",
        features: "台北玫瑰園與各地玫瑰森林盛景，3月春季花量最大盛開極盛。"
      }
    ]
  },
  {
    id: "sunflower",
    name: "向日葵",
    description: "陽光下最耀眼的金色巨浪！夏秋之際追隨太陽綻放的活力花海。",
    mainSeason: "5月 - 10月",
    varieties: [
      {
        id: "giant_sunflower",
        name: "巨型向日葵 / 彩色向日葵",
        bloomingMonths: [5, 6, 7, 8, 9, 10],
        peakMonth: 7,
        endingMonth: 10,
        colorTag: "耀眼金黃色/深橘紅",
        features: "5月起陸續綻放，7月盛夏極盛，持續作為休耕田花海盛開至10月。"
      }
    ]
  },
  {
    id: "kapok",
    name: "木棉花",
    description: "台南白河林初埤獲選全球最美花道！春季熱烈綻放橘紅色木棉花雨。",
    mainSeason: "3月 - 4月",
    varieties: [
      {
        id: "kapok_tree",
        name: "林初埤橘紅木棉",
        bloomingMonths: [3, 4],
        peakMonth: 3,
        endingMonth: 4,
        colorTag: "耀眼橘紅色",
        features: "3月木棉花道爆發盛開極盛，4月花落滿地進入尾聲。"
      }
    ]
  },
  {
    id: "wisteria",
    name: "紫藤花",
    description: "春季短暫集中綻放的夢幻紫色花瀑，嘉義瑞里與淡水園區浪漫盛景。",
    mainSeason: "3月 - 4月",
    varieties: [
      {
        id: "japanese_wisteria",
        name: "日本紫藤 / 瑞里紫藤",
        bloomingMonths: [3, 4],
        peakMonth: 4,
        endingMonth: 4,
        colorTag: "夢幻紫色/淡紫色",
        features: "3月下旬開花，4月上旬垂墜花瀑盛開極盛，4月中旬迅速進入尾聲。"
      }
    ]
  },
  {
    id: "golden_shower",
    name: "阿勃勒 (黃金雨)",
    description: "初夏金黃花穗懸掛樹梢隨風飄落，宛如灑落大地的金黃色雨滴。",
    mainSeason: "5月 - 6月",
    varieties: [
      {
        id: "golden_shower_tree",
        name: "阿勃勒 (黃金雨期)",
        bloomingMonths: [5, 6],
        peakMonth: 5,
        endingMonth: 6,
        colorTag: "燦爛金黃色",
        features: "5月台南與各地盛開極盛成黃金大道，6月花落進入尾聲。"
      }
    ]
  },
  {
    id: "hollyhock",
    name: "蜀葵花 (一丈紅)",
    description: "株高達2-3公尺的花海迷宮！員林與學甲春季最具震撼力的巨型花卉。",
    mainSeason: "3月 - 5月",
    varieties: [
      {
        id: "yuanlin_hollyhock",
        name: "員林/學甲蜀葵花",
        bloomingMonths: [3, 4, 5],
        peakMonth: 4,
        endingMonth: 5,
        colorTag: "濃紅/粉紅/純白/墨紫",
        features: "3月開花，4月高聳花柱爆發盛開極盛，5月春末進入尾聲。"
      }
    ]
  },
  {
    id: "cosmos",
    name: "波斯菊 (花海)",
    description: "台灣秋冬至早春休耕期間最廣闊繽紛的大花毯，色彩燦爛奪目。",
    mainSeason: "10月 - 2月",
    varieties: [
      {
        id: "giant_cosmos",
        name: "大波斯菊 / 黃波斯菊",
        bloomingMonths: [10, 11, 12, 1, 2],
        peakMonth: 11,
        endingMonth: 2,
        colorTag: "粉紅/桃紅/純白/金黃",
        features: "10月開花，11月新社花海極盛，持續盛開至2月春耕前進入尾聲。"
      }
    ]
  },
  {
    id: "bougainvillea",
    name: "九重葛",
    description: "秋冬至早春爆發花瀑牆！彰化田尾與各地巷弄艷麗絕美景緻。",
    mainSeason: "10月 - 3月",
    varieties: [
      {
        id: "bougainvillea_var",
        name: "艷紅/紫紅九重葛",
        bloomingMonths: [10, 11, 12, 1, 2, 3],
        peakMonth: 11,
        endingMonth: 3,
        colorTag: "桃紅/深紫/亮紅/白色",
        features: "10月開花，11月盛開成瀑布花牆，持續綻放到3月春季進入尾聲。"
      }
    ]
  }
];

window.PlantHubData.flowerSpots = [];
