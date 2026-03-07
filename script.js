(function () {
  const listEl = document.getElementById("weeksList");
  const emptyEl = document.getElementById("emptyState");
  const heroTitleTextEl = document.getElementById("heroTitleText");
  const heroDescTextEl = document.getElementById("heroDescText");
  const sectionTitleTextEl = document.getElementById("sectionTitleText");
  const sectionDescTextEl = document.getElementById("sectionDescText");

  const tipEl = document.getElementById("homescreenTip");
  const tipToggleEl = document.getElementById("tipToggle");
  const tipCloseEl = document.getElementById("tipClose");

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
    if (tipToggleEl && tipEl) {
      tipToggleEl.addEventListener("click", function () {
        const collapsed = tipEl.classList.toggle("tip--collapsed");
        tipToggleEl.setAttribute("aria-expanded", String(!collapsed));
      });
    }

    if (tipCloseEl && tipEl) {
      tipCloseEl.addEventListener("click", function () {
        tipEl.classList.add("tip--hidden");
        localStorage.setItem("homescreen_tip_closed", "1");
      });
    }

    window.addEventListener("resize", setupTip);
  }

  function setupTip() {
    if (!tipEl) return;
    const isDesktop = window.matchMedia("(min-width: 760px)").matches;

    if (isDesktop) {
      tipEl.classList.add("tip--hidden");
      return;
    }

    const closed = localStorage.getItem("homescreen_tip_closed") === "1";
    if (closed) {
      tipEl.classList.add("tip--hidden");
    } else {
      tipEl.classList.remove("tip--hidden");
    }

    tipEl.classList.remove("tip--collapsed");
    if (tipToggleEl) tipToggleEl.setAttribute("aria-expanded", "true");
  }

  function render() {
    if (!listEl) return;

    if (sourceData.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    listEl.innerHTML = sourceData.map(buildCardHTML).join("");
  }

  function buildCardHTML(item) {
    const icon = escapeHtml(item.icon || "📘");
    const title = escapeHtml(item.title || ("Week " + (item.week ?? "")));
    const desc = escapeHtml(item.description || "");
    const tagValues = Array.isArray(item.tag)
      ? item.tag
      : item.tag
        ? [item.tag]
        : [];
    const tag = tagValues
      .map(function (value) {
        return `<span class="tag">${escapeHtml(value)}</span>`;
      })
      .join(" ");
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
