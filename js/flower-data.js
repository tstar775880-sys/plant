/**
 * Plant Hub - Taiwan Flower & Spot Data Repository
 * Baseline authoritative data preloaded for 櫻花 (Cherry Blossom) and 梅花 (Plum Blossom).
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
        colorTag: "濃粉紅/深紅色",
        features: "台灣原生種櫻花，花朵呈吊鐘狀下垂，色澤濃艷亮麗，常吸引蜜蜂與綠繡眼。",
        spots: ["陽明山平菁街42巷", "烏來風景區", "三峽大熊櫻花林"]
      },
      {
        id: "yaezakura",
        name: "八重櫻 (重瓣緋寒櫻)",
        bloomingMonths: [2, 3],
        peakMonth: 2,
        colorTag: "深紫粉色",
        features: "花瓣多層重疊，花色深紅艷麗，盛開時滿樹重疊呈現粉紅花海美景。",
        spots: ["九族文化村", "武陵農場", "阿里山森林遊樂區"]
      },
      {
        id: "yoshino",
        name: "吉野櫻 (染井吉野)",
        bloomingMonths: [3, 4],
        peakMonth: 3,
        colorTag: "淡粉白色",
        features: "花朵先開後長葉，滿開時呈淡粉白雪白景致，極具浪漫的櫻雪氛圍。",
        spots: ["淡水天元宮", "阿里山賓館前", "陽明山公園"]
      },
      {
        id: "fuji_sakura",
        name: "富士櫻 / 昭和櫻",
        bloomingMonths: [2, 3],
        peakMonth: 3,
        colorTag: "粉紅色",
        features: "花瓣五片明顯分開，花色粉嫩高雅，開花時間介於山櫻與吉野櫻之間。",
        spots: ["三峽大熊櫻花林", "拉拉山恩愛農場"]
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
        colorTag: "雪白色",
        features: "花瓣潔白如雪，伴隨清雅幽香，為寒冬中台灣最經典的踏雪尋梅景致。",
        spots: ["桃園角板山行館", "南投信義鄉烏松崙", "風櫃斗梅園"]
      },
      {
        id: "green_plum",
        name: "綠萼梅 (綠梅/青梅)",
        bloomingMonths: [1, 2],
        peakMonth: 1,
        colorTag: "淡綠白色",
        features: "萼片呈鮮綠色，花色微綠帶白，優雅脫俗，花香持久且極具觀賞價值。",
        spots: ["南投信義鄉牛稠坑梅園", "台南梅嶺風景區"]
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
    description: "北部最快盛開的賞櫻名勝！巷弄兩側寒櫻與山櫻花盛開伸出牆外，形成夢幻粉紅花海隧道。",
    suggestedDuration: "2小時",
    tips: "建議搭乘小19或303號公車前往，開花極盛期為 1月下旬至 2月上旬。"
  },
  {
    id: "spot_wuling",
    name: "武陵農場櫻花鉤吻鮭故鄉",
    region: "central",
    regionName: "中部 (台中)",
    targetCategory: "cherry_blossom",
    varietyId: "yaezakura",
    bestMonths: [2, 3],
    location: "台中市和平區平等里武陵路3-1號",
    description: "全台最震撼櫻花勝地！上萬株紅粉佳人與八重櫻沿山谷綻放，綿延數公里粉紅花海公路。",
    suggestedDuration: "半天",
    tips: "櫻花季期間實施交通總量管制，需預約賞花專車或取得住宿車輛通行證。"
  },
  {
    id: "spot_tianyuan",
    name: "淡水無極天元宮",
    region: "north",
    regionName: "北部 (新北)",
    targetCategory: "cherry_blossom",
    varietyId: "yoshino",
    bestMonths: [3, 4],
    location: "新北市淡水區北新路三段36號",
    description: "雄偉的天壇建築與雪白吉野櫻相映成趣，夜間點燈賞櫻更是獨具沉靜氛圍。",
    suggestedDuration: "2-3小時",
    tips: "後山三色櫻2月開，天壇周邊吉野櫻3月下旬滿開，建議搭乘接駁公車。"
  },
  {
    id: "spot_jiaobanshan",
    name: "桃園角板山行館梅園",
    region: "north",
    regionName: "北部 (桃園)",
    targetCategory: "plum_blossom",
    varietyId: "white_plum",
    bestMonths: [12, 1],
    location: "桃園市復興區澤仁里中正路133號",
    description: "北部最大的賞梅勝地！園區內栽種數百株數十年老梅樹，盛開時猶如白雪覆蓋草坪。",
    suggestedDuration: "2小時",
    tips: "1月上旬為極盛期，園區平坦適合全家踏青，順遊角板山吊橋。"
  },
  {
    id: "spot_wusonglun",
    name: "南投信義鄉烏松崙梅園",
    region: "central",
    regionName: "中部 (南投)",
    targetCategory: "plum_blossom",
    varietyId: "white_plum",
    bestMonths: [1, 2],
    location: "南投縣信義鄉自強村烏松崙",
    description: "台灣知名賞梅故鄉，高海拔山坡上梅花盛開如雪，伴隨油菜花田交織成絕美畫卷。",
    suggestedDuration: "3小時",
    tips: "山路較狹窄，建議清晨前往避開車潮，在高處咖啡亭賞花視野最佳。"
  }
];
