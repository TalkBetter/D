(function () {
  const listEl = document.getElementById("weeksList");
  const emptyEl = document.getElementById("emptyState");
  const heroTitleTextEl = document.getElementById("heroTitleText");
  const heroDescTextEl = document.getElementById("heroDescText");
  const sectionTitleTextEl = document.getElementById("sectionTitleText");
  const sectionDescTextEl = document.getElementById("sectionDescText");

  const tipEl = document.getElementById("homescreenTip");
  const tipBodyEl = document.getElementById("tipBody");
  const tipToggleEl = document.getElementById("tipToggle");
  const tipCloseEl = document.getElementById("tipClose");
  const tipResetEl = document.getElementById("tipReset");

  const pageConfig = window.PAGE_CONFIG || {};
  const sourceData = Array.isArray(window.COURSE_WEEKS) ? window.COURSE_WEEKS.slice() : [];

  function init() {
    applyPageConfig();
    bindEvents();
    setupTip();
    render();
  }

  function applyPageConfig() {
    if (pageConfig.documentTitle) {
      document.title = String(pageConfig.documentTitle);
    }
    if (heroTitleTextEl && pageConfig.heroTitle) {
      heroTitleTextEl.textContent = String(pageConfig.heroTitle);
    }
    if (heroDescTextEl) {
      heroDescTextEl.textContent =
        pageConfig.heroDescription !== undefined ? String(pageConfig.heroDescription) : " ";
    }
    if (sectionTitleTextEl && pageConfig.sectionTitle) {
      sectionTitleTextEl.textContent = String(pageConfig.sectionTitle);
    }
    if (sectionDescTextEl) {
      sectionDescTextEl.textContent =
        pageConfig.sectionDescription !== undefined ? String(pageConfig.sectionDescription) : " ";
    }
  }

  function bindEvents() {
    if (tipToggleEl) {
      tipToggleEl.addEventListener("click", function () {
        const collapsed = tipEl.classList.toggle("tip--collapsed");
        tipToggleEl.setAttribute("aria-expanded", String(!collapsed));
      });
    }

    if (tipCloseEl) {
      tipCloseEl.addEventListener("click", function () {
        tipEl.classList.add("tip--hidden");
        localStorage.setItem("homescreen_tip_closed", "1");
        showTipResetButton();
      });
    }

    if (tipResetEl) {
      tipResetEl.addEventListener("click", function () {
        localStorage.removeItem("homescreen_tip_closed");
        tipEl.classList.remove("tip--hidden");
        hideTipResetButton();
      });
    }

    window.addEventListener("resize", setupTip);
  }

  function setupTip() {
    if (!tipEl) return;
    const isDesktop = window.matchMedia("(min-width: 760px)").matches;

    if (isDesktop) {
      tipEl.classList.add("tip--hidden");
      hideTipResetButton();
      return;
    }

    const closed = localStorage.getItem("homescreen_tip_closed") === "1";
    if (closed) {
      tipEl.classList.add("tip--hidden");
      showTipResetButton();
    } else {
      tipEl.classList.remove("tip--hidden");
      hideTipResetButton();
    }

    tipEl.classList.remove("tip--collapsed");
    if (tipToggleEl) tipToggleEl.setAttribute("aria-expanded", "true");
    if (!tipBodyEl) return;
  }

  function showTipResetButton() {
    if (!tipResetEl) return;
    tipResetEl.classList.remove("tip-reset--hidden");
  }

  function hideTipResetButton() {
    if (!tipResetEl) return;
    tipResetEl.classList.add("tip-reset--hidden");
  }

  function render() {
    if (!listEl) return;

    if (sourceData.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    // 依 data.js 的陣列順序顯示，方便在資料檔直接維護排序
    listEl.innerHTML = sourceData.map(buildCardHTML).join("");
  }

  function buildCardHTML(item) {
    const icon = escapeHtml(item.icon || "📘");
    const title = escapeHtml(item.title || ("Week " + (item.week ?? "")));
    const desc = escapeHtml(item.description || "");
    const tag = item.tag ? `<span class="tag">${escapeHtml(item.tag)}</span>` : "";
    const url = encodeURI(item.url || "#");

    return `
      <a class="week-card" href="${url}" aria-label="進入 ${title}">
        <div class="week-card__icon" aria-hidden="true">${icon}</div>
        <div>
          <h3 class="week-card__title">${title}</h3>
          <p class="week-card__desc">${desc}</p>
        </div>
        <div class="week-card__meta">
          ${tag}
        </div>
      </a>
    `;
  }

  function escapeHtml(input) {
    return String(input)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  init();
})();
