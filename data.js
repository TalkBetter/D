/* 頁面設定：可在這裡維護標題與說明文字 */
window.PAGE_CONFIG = {
  documentTitle: "3-4週 導覽頁",
  heroTitle: "3-4週 導覽頁",
  heroDescription: "",
  sectionTitle: "每週課程 Weeks",
  sectionDescription: ""
};

/* 課程資料集中管理：
   新增 / 刪除 / 排序只要改這個陣列，不需改 HTML 結構 */
window.COURSE_WEEKS = [
  {
    id: "w3",
    week: 3,
    icon: "🌱",
    title: "Week 3",
    description: "Seeds & Plants（種子與植物）。",
    url: "https://talkbetter.github.io/D3/",
    tag: ["句型"] 
  },
  {
    id: "w4",
    week: 4,
    icon: "🌴",
    title: "Week 4",
    description: "植物句型 + CH發音 + 過去式不規則動詞",
    url: "https://talkbetter.github.io/D4/",
    tag: ["發音", "文法", "句型"]
  }
];
