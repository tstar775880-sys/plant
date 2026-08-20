/**
 * Plant Hub - Taiwan Flower Data Repository
 * Authoritative baseline data preloaded for 6 major Taiwan flower categories:
 * 櫻花, 梅花, 油桐花, 海芋, 落羽松 (落羽杉), 繡球花.
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
        name: "白色海芋 (濕地型)",
        bloomingMonths: [3, 4, 5],
        peakMonth: 4,
        endingMonth: 5,
        colorTag: "純白色",
        features: "偏好濕地環境，苞片挺拔純白，為竹子湖春季最具代表性的採花景致。"
      },
      {
        id: "color_calla",
        name: "彩色海芋 (陸生型)",
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
    name: "落羽松 (落羽杉)",
    description: "秋冬之際由翠綠轉為金黃、深紅的羽狀複葉美景，宛如置身歐美夢幻森林。",
    mainSeason: "11月 - 1月",
    varieties: [
      {
        id: "bald_cypress_var",
        name: "落羽杉 (變色觀賞期)",
        bloomingMonths: [11, 12, 1],
        peakMonth: 12,
        endingMonth: 1,
        colorTag: "黃綠/金黃/深紅褐色",
        features: "11月開始轉黃開花，12月全紅盛開極盛，1月逐漸落葉進入尾聲。"
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
  }
];

window.PlantHubData.flowerSpots = [];
