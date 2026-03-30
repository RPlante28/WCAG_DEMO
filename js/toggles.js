/**
 * WCAG demo — toggle state, DOM fixes, reveal scoring
 */
(function () {
  "use strict";

  var REAL_KEYS = [
    "contrast",
    "focus",
    "alt",
    "semantic",
    "taborder",
    "skip",
    "labels",
    "errors",
    "captions",
    "pause",
    "keyboard",
    "lang",
    "textspacing",
  ];

  var FAKE_KEYS = ["colorblind", "hoveralt", "newtab", "srremove", "leftalign", "darkmode"];

  var REAL_LABELS = {
    contrast: "Color Contrast (1.4.3)",
    focus: "Focus Indicators (2.4.7)",
    alt: "Alt Text (1.1.1)",
    semantic: "Semantic HTML (1.3.1)",
    taborder: "Tab Order (2.4.3)",
    skip: "Skip Navigation (2.4.1)",
    labels: "Form Labels (3.3.2)",
    errors: "Error Identification (3.3.1)",
    captions: "Video Captions (1.2.2)",
    pause: "Pause / Stop / Hide (2.2.2)",
    keyboard: "Keyboard Accessible (2.1.1)",
    lang: "Language of Page (3.1.1)",
    textspacing: "Text Spacing (1.4.12)",
  };

  var FAKE_LABELS = {
    colorblind: "Colorblind Simulation Mode",
    hoveralt: "Hover-to-Reveal Alt Text",
    newtab: "All Links Open in New Tab",
    srremove: "Hidden Text is Always Bad",
    leftalign: "All Text Must Be Left-Aligned",
    darkmode: "Dark Mode",
  };

  var state = {
    real: {},
    fake: {},
  };

  REAL_KEYS.forEach(function (k) {
    state.real[k] = false;
  });
  FAKE_KEYS.forEach(function (k) {
    state.fake[k] = false;
  });

  var docEl = document.documentElement;
  var body = document.body;

  function isRealOn(key) {
    return !!state.real[key];
  }

  function isFakeOn(key) {
    return !!state.fake[key];
  }

  function applyBodyClasses() {
    REAL_KEYS.forEach(function (key) {
      var c = "fix-" + key;
      if (state.real[key]) body.classList.add(c);
      else body.classList.remove(c);
    });
    FAKE_KEYS.forEach(function (key) {
      var c = "fake-" + key;
      if (state.fake[key]) body.classList.add(c);
      else body.classList.remove(c);
    });
  }

  var semanticTargets = {
    main: null,
    navToc: null,
    headings: [],
  };

  function cacheSemanticTargets() {
    semanticTargets.main = document.querySelector("main#content");
    semanticTargets.navToc = document.querySelector("nav.vector-toc");
    semanticTargets.headings = Array.prototype.slice.call(
      document.querySelectorAll("#mw-content-text h2, #mw-content-text h3")
    );
  }

  function applySemanticRoles() {
    if (!semanticTargets.main) cacheSemanticTargets();
    var on = isRealOn("semantic");
    var presentation = on ? null : "presentation";

    function setRole(el) {
      if (!el) return;
      if (on) {
        el.removeAttribute("role");
      } else {
        el.setAttribute("role", "presentation");
      }
    }

    setRole(semanticTargets.main);
    setRole(semanticTargets.navToc);
    semanticTargets.headings.forEach(function (h) {
      if (on) {
        h.removeAttribute("role");
        h.removeAttribute("aria-level");
      } else {
        h.setAttribute("role", "presentation");
      }
    });
  }

  function applyLang() {
    if (isRealOn("lang")) {
      docEl.setAttribute("lang", "en");
    } else {
      docEl.removeAttribute("lang");
    }
  }

  var tabEls = [];

  function applyTabOrder() {
    tabEls.forEach(function (el) {
      if (el) el.removeAttribute("tabindex");
    });
    tabEls = [];

    if (isRealOn("taborder")) return;

    var map = [
      { sel: "#demo-lead-link", tab: 1 },
      { sel: "#demo-search-input", tab: 2 },
      { tab: 3 },
      { sel: "#demo-toc-history", tab: 4 },
    ];

    map.forEach(function (entry) {
      if (entry.tab === 3) {
        var searchEl = isRealOn("keyboard")
          ? document.getElementById("demo-search-btn")
          : document.getElementById("demo-search-btn-fake");
        if (searchEl) {
          searchEl.setAttribute("tabindex", "3");
          tabEls.push(searchEl);
        }
        return;
      }
      var el = document.querySelector(entry.sel);
      if (el) {
        el.setAttribute("tabindex", String(entry.tab));
        tabEls.push(el);
      }
    });
  }

  function applySkipLink() {
    var link = document.querySelector(".mw-jump-link");
    if (!link) return;
    if (isRealOn("skip")) {
      link.removeAttribute("tabindex");
    } else {
      link.setAttribute("tabindex", "-1");
    }
  }

  function applyAltImages() {
    var imgs = document.querySelectorAll("img[data-good-alt]");
    imgs.forEach(function (img) {
      var good = img.getAttribute("data-good-alt") || "";
      if (isRealOn("alt")) {
        img.setAttribute("alt", good);
      } else {
        img.setAttribute("alt", "");
      }
    });
  }

  function applyHoverAltTooltip() {
    var imgs = document.querySelectorAll("img[data-good-alt]");
    imgs.forEach(function (img) {
      var good = img.getAttribute("data-good-alt") || "";
      if (isFakeOn("hoveralt")) {
        img.setAttribute("title", good);
      } else {
        img.removeAttribute("title");
      }
    });
  }

  function applyNewTabLinks() {
    var links = document.querySelectorAll(
      '#mw-content-text a[href^="http"], .mw-footer a[href^="http"], .vector-header a[href^="http"]'
    );
    links.forEach(function (a) {
      if (isFakeOn("newtab")) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      } else {
        a.removeAttribute("target");
        a.removeAttribute("rel");
      }
    });
  }

  function applySearchKeyboard() {
    var realBtn = document.getElementById("demo-search-btn");
    var fakeBtn = document.getElementById("demo-search-btn-fake");
    if (!realBtn || !fakeBtn) return;
    fakeBtn.setAttribute("tabindex", "-1");
    if (isRealOn("keyboard")) {
      realBtn.removeAttribute("tabindex");
    }
  }

  function updateCookieLayer() {
    var overlay = document.getElementById("demo-cookie-overlay");
    var banner = document.getElementById("demo-cookie-banner");
    var dismissed = sessionStorage.getItem("demoCookieDismissed") === "1";
    var show = !isRealOn("pause") && !dismissed;
    var v = show ? "true" : "false";
    if (overlay) {
      overlay.setAttribute("data-active", v);
      overlay.setAttribute("aria-hidden", show ? "false" : "true");
    }
    if (banner) banner.setAttribute("data-active", v);
  }

  function applyAll() {
    applyBodyClasses();
    applySemanticRoles();
    applyLang();
    applySkipLink();
    applyAltImages();
    applyHoverAltTooltip();
    applyNewTabLinks();
    applySearchKeyboard();
    applyTabOrder();
    updateCookieLayer();
  }

  function bindToggles() {
    REAL_KEYS.forEach(function (key) {
      var input = document.getElementById("toggle-" + key);
      if (!input) return;
      input.addEventListener("change", function () {
        state.real[key] = input.checked;
        applyAll();
      });
    });
    FAKE_KEYS.forEach(function (key) {
      var input = document.getElementById("toggle-fake-" + key);
      if (!input) return;
      input.addEventListener("change", function () {
        state.fake[key] = input.checked;
        applyAll();
      });
    });
  }

  function scoreReveal() {
    var realScore = 0;
    REAL_KEYS.forEach(function (k) {
      if (state.real[k]) realScore++;
    });

    var fakeEnabled = 0;
    FAKE_KEYS.forEach(function (k) {
      if (state.fake[k]) fakeEnabled++;
    });

    var html =
      '<p class="demo-modal__score">Real fixes enabled: ' +
      realScore +
      " / " +
      REAL_KEYS.length +
      "</p>" +
      "<p>Fake toggles left <em>off</em> is ideal. Each fake you turned <em>on</em> can mislead users or harm accessibility (" +
      fakeEnabled +
      " on).</p>" +
      '<ul class="demo-modal__list">';

    REAL_KEYS.forEach(function (k) {
      html +=
        "<li><span class=\"tag tag--real\">WCAG</span> " +
        REAL_LABELS[k] +
        " — <strong>" +
        (state.real[k] ? "On" : "Off") +
        "</strong></li>";
    });
    FAKE_KEYS.forEach(function (k) {
      html +=
        "<li><span class=\"tag tag--fake\">Not WCAG</span> " +
        FAKE_LABELS[k] +
        " — <strong>" +
        (state.fake[k] ? "On (avoid)" : "Off") +
        "</strong></li>";
    });
    html += "</ul>";

    var bodyEl = document.getElementById("demo-modal-body");
    if (bodyEl) bodyEl.innerHTML = html;
  }

  function openModal() {
    scoreReveal();
    var overlay = document.getElementById("demo-reveal-modal");
    if (overlay) {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
    }
  }

  function closeModal() {
    var overlay = document.getElementById("demo-reveal-modal");
    if (overlay) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    }
  }

  /* --- Cookie --- */
  function initCookie() {
    var dismiss = document.getElementById("demo-cookie-dismiss");
    if (dismiss) {
      dismiss.addEventListener("click", function () {
        sessionStorage.setItem("demoCookieDismissed", "1");
        updateCookieLayer();
      });
    }
  }

  /* --- Timer --- */
  function initTimer() {
    var el = document.getElementById("demo-timer-display");
    if (!el) return;
    var n = 99;
    setInterval(function () {
      if (!isRealOn("pause")) {
        n--;
        if (n < 0) n = 99;
        el.textContent = String(n);
      }
    }, 1000);
  }

  /* --- Form --- */
  function initForm() {
    var form = document.getElementById("demo-feedback-form");
    var err = document.getElementById("demo-form-error");
    var email = document.getElementById("demo-email");
    if (!form || !err) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!email) {
        err.hidden = true;
        return;
      }

      var emailVal = String(email.value || "").trim();
      var valid = emailVal.length > 0 && email.checkValidity();

      if (isRealOn("errors")) {
        if (valid) {
          err.hidden = true;
          err.textContent = "";
        } else {
          err.hidden = false;
          err.textContent = "Please enter a valid email address.";
        }
      } else {
        err.hidden = true;
        err.textContent = "";
      }
    });
  }

  function initRevealButton() {
    var btn = document.getElementById("demo-reveal-btn");
    if (btn) btn.addEventListener("click", openModal);
    var closeBtn = document.getElementById("demo-modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    var overlay = document.getElementById("demo-reveal-modal");
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  function initInputsFromState() {
    REAL_KEYS.forEach(function (key) {
      var input = document.getElementById("toggle-" + key);
      if (input) {
        input.checked = state.real[key];
      }
    });
    FAKE_KEYS.forEach(function (key) {
      var input = document.getElementById("toggle-fake-" + key);
      if (input) {
        input.checked = state.fake[key];
      }
    });
  }

  function init() {
    if (!body.classList.contains("demo-page")) return;
    cacheSemanticTargets();
    initInputsFromState();
    bindToggles();
    initCookie();
    initTimer();
    initForm();
    initRevealButton();
    applyAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

