/**
 * Plant Hub - Taiwan Flower & Spot Data Repository
 * Contains comprehensive blooming calendars, species varieties, and spot locations.
 */

window.PlantHubData = window.PlantHubData || {};

window.PlantHubData.flowerCategories = [
  {
    id: "cherry_blossom",
    name: "櫻花",
    description: "台灣春季代表花卉，不同品種自一月起陸續綻放至四月。",
    mainSeason: "1月 - 4月",
    varieties: [
      {
        id: "yamazakura",
        name: "山櫻花 (緋寒櫻)",
        bloomingMonths: [1, 2],
        peakMonth: 2,
        colorTag: "濃粉紅/深紅色",
        features: "台灣原生種，花朵呈吊鐘狀下垂，顏色濃艷，耐熱性較高。",
        spots: ["陽明山平菁街42巷", "烏來櫻花大道", "三峽大熊櫻花林"]
      },
      {
        id: "yaezakura",
        name: "八重櫻 (重瓣緋寒櫻)",
        bloomingMonths: [2, 3],
        peakMonth: 2,
        colorTag: "深紫紅色",
        features: "花瓣多層重疊，色澤艷麗濃郁，常與九族文化村與武陵農場共構盛景。",
        spots: ["九族文化村", "武陵農場", "暨南大學校園"]
      },
      {
        id: "yoshino",
        name: "吉野櫻",
        bloomingMonths: [3, 4],
        peakMonth: 3,
        colorTag: "淡粉白",
        features: "花朵先開後長葉，五瓣粉白微紅，經典日系優雅品種。",
        spots: ["淡水無極天元宮", "阿里山國家森林遊樂區", "陽明山公園"]
      },
      {
        id: "fuji",
        name: "富士櫻 / 昭和櫻",
        bloomingMonths: [2, 3],
        peakMonth: 3,
        colorTag: "粉紅色",
        features: "花瓣纖長，粉嫩討喜，枝條優美。",
        spots: ["新竹司馬庫斯", "拉拉山櫻花季", "福壽山農場千櫻園"]
      }
    ]
  },
  {
    id: "plum_blossom",
    name: "梅花",
    description: "台灣冬季清雅花卉，越冷越開花，氣味清香飄逸。",
    mainSeason: "12月 - 2月",
    varieties: [
      {
        id: "white_plum",
        name: "角板山/信義白梅",
        bloomingMonths: [12, 1],
        peakMonth: 1,
        colorTag: "雪白色",
        features: "單瓣雪白，滿樹如積雪，清香遠播，盛開期約10-14天。",
        spots: ["南投信義鄉烏松崙", "南投風櫃斗", "桃園角板山行館"]
      },
      {
        id: "green_calyx_plum",
        name: "綠萼梅 (萼綠梅)",
        bloomingMonths: [1, 2],
        peakMonth: 1,
        colorTag: "白花綠萼",
        features: "花萼呈現清脆綠色，花瓣純白，極具古風雅致。",
        spots: ["梅嶺風景區", "士林官邸梅花園"]
      }
    ]
  },
  {
    id: "tung_flower",
    name: "油桐花",
    description: "四五月雪，客家庄山林步道的白雪美景。",
    mainSeason: "4月 - 5月",
    varieties: [
      {
        id: "thousand_year_tung",
        name: "千年桐 (廣東油桐)",
        bloomingMonths: [4, 5],
        peakMonth: 4,
        colorTag: "純白色/紅黃心",
        features: "台灣最常見桐花，落花時如白雪飄落，鋪滿山林步道。",
        spots: ["苗栗三義桐花步道", "新竹峨眉湖桐花步道", "土城桐花公園"]
      }
    ]
  },
  {
    id: "hydrangea",
    name: "繡球花",
    description: "初夏綻放的繽紛花海，隨土壤酸鹼值展現藍紫粉白。",
    mainSeason: "5月 - 7月",
    varieties: [
      {
        id: "macrophylla",
        name: "大葉繡球花",
        bloomingMonths: [5, 6, 7],
        peakMonth: 6,
        colorTag: "粉藍/紫紅/純白",
        features: "花球圓潤巨大，陽明山竹子湖海梯田絕景。",
        spots: ["陽明山竹子湖水車寮", "苗栗花露農場", "南投杉林溪"]
      }
    ]
  },
  {
    id: "daylily",
    name: "金針花",
    description: "花東縱谷夏季黃金花海，金黃燦爛鋪滿山頭。",
    mainSeason: "8月 - 10月",
    varieties: [
      {
        id: "golden_needle",
        name: "高山金針花",
        bloomingMonths: [8, 9, 10],
        peakMonth: 9,
        colorTag: "橙黃色",
        features: "一日美人，金黃色花海縱橫花東縱谷山稜。",
        spots: ["花蓮六十石山", "花蓮赤科山", "台東太麻里金針山"]
      }
    ]
  }
];

window.PlantHubData.flowerSpots = [
  {
    id: "spot_pingjing",
    name: "陽明山平菁街42巷",
    region: "north",
    regionName: "北部 (台北)",
    targetCategory: "cherry_blossom",
    varietyId: "yamazakura",
    bestMonths: [1, 2],
    location: "台北市士林區平菁街42巷",
    description: "北部最早開花之櫻花巷，寒櫻/山櫻花夾道盛開，緋紅燦爛。",
    suggestedDuration: "2小時",
    tips: "建議搭乘大眾運輸 (小19 或 303 公車)，清晨造訪避開人潮。"
  },
  {
    id: "spot_wuling",
    name: "武陵農場",
    region: "central",
    regionName: "中部 (台中)",
    targetCategory: "cherry_blossom",
    varietyId: "yaezakura",
    bestMonths: [2, 3],
    location: "台中市和平區平等里武陵路3-1號",
    description: "全台最震撼櫻花勝地，上萬株紅粉佳人與八重櫻形成櫻花隧道。",
    suggestedDuration: "全天 (6-8小時)",
    tips: "櫻花季實施車輛管制，需預先登記賞櫻專車或住宿通行證。"
  },
  {
    id: "spot_tianyuan",
    name: "淡水無極天元宮",
    region: "north",
    regionName: "北部 (新北)",
    targetCategory: "cherry_blossom",
    varietyId: "yoshino",
    bestMonths: [3, 4],
    location: "新北市淡水區水源里北新路三段36號",
    description: "圓山天壇建築配合優雅粉白吉野櫻，夜間點燈更顯雄偉浪漫。",
    suggestedDuration: "3小時",
    tips: "三月中下旬為吉野櫻極盛期，可搭乘淡水捷運接駁專車。"
  },
  {
    id: "spot_wusonglun",
    name: "南投信義烏松崙梅園",
    region: "central",
    regionName: "中部 (南投)",
    targetCategory: "plum_blossom",
    varietyId: "white_plum",
    bestMonths: [12, 1],
    location: "南投縣信義鄉自強村烏松崙",
    description: "滿山白梅如雪覆蓋，梅樹下種植油菜花，形成黃白相映絕景。",
    suggestedDuration: "4小時",
    tips: "山路狹窄，會車需注意；元旦前後為最佳賞梅期。"
  },
  {
    id: "spot_zhuzihu",
    name: "陽明山竹子湖繡球花田",
    region: "north",
    regionName: "北部 (台北)",
    targetCategory: "hydrangea",
    varietyId: "macrophylla",
    bestMonths: [5, 6],
    location: "台北市士林區竹子湖路",
    description: "海梯田與梯田式繡球花造景，藍紫粉白各色花球簇擁。",
    suggestedDuration: "3小時",
    tips: "午後山區容易起霧下雨，建議上午安排造訪。"
  },
  {
    id: "spot_sixtistone",
    name: "花蓮六十石山",
    region: "east",
    regionName: "東部 (花蓮)",
    targetCategory: "daylily",
    varietyId: "golden_needle",
    bestMonths: [8, 9],
    location: "花蓮縣富里鄉竹田村六十石山",
    description: "台灣小瑞士，雲隙光 (天使光) 灑落在金色毯子般的金針花海。",
    suggestedDuration: "5小時",
    tips: "山區午後易現耶穌光，建議下午3-5點於小台灣亭拍攝。"
  }
];
