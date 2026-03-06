(function () {
  "use strict";

  var NAV_ID = "tb-common-nav-link";
  var NAV_HREF = "https://talkbetter.github.io/D/Index.html";
  var NAV_TEXT = "← 回導覽頁";

  function isElementInDOM(id) {
    return !!document.getElementById(id);
  }

  function createNavButton() {
    var link = document.createElement("a");
    link.id = NAV_ID;
    link.className = "tb-common-nav";
    link.href = NAV_HREF;
    link.textContent = NAV_TEXT;
    link.setAttribute("aria-label", NAV_TEXT);
    return link;
  }

  function mountNavButton() {
    if (isElementInDOM(NAV_ID)) return;

    var body = document.body;
    if (!body) return;

    body.appendChild(createNavButton());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountNavButton, { once: true });
  } else {
    mountNavButton();
  }
})();
