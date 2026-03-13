/* 頁面設定：可在這裡維護標題與說明文字 */
window.PAGE_CONFIG = {
  documentTitle: "TalkBetter",
  heroTitle: "TalkBetter",
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
  },
  {
    id: "w5",
    week: 5,
    icon: "🌿",
    title: "Week 5",
    description: "植物句型 + 遊戲連結 + 現在進行式",
    url: "https://talkbetter.github.io/D5/",
    tag: ["句型", "遊戲"]
  }  
  
  
];
