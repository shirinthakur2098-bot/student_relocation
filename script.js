(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");

  /* Header: dark over the hero, light once the page scrolls past it */
  if (header && hero && "IntersectionObserver" in window) {
    var headerH = header.offsetHeight;
    new IntersectionObserver(function (entries) {
      header.dataset.theme = entries[0].isIntersecting ? "dark" : "light";
    }, { rootMargin: "-" + headerH + "px 0px 0px 0px" }).observe(hero);
  }

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    var label = toggle.querySelector(".menu-label");
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      header.classList.toggle("menu-open", open);
      label.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* Reveal sections as they enter the viewport */
  var revealTargets = document.querySelectorAll(
    ".section-head, .plans, .compare-wrap, .report, .rows, .faq-list, .book-card, .split-sticky > :first-child, .booking .split > :first-child"
  );
  var steps = document.querySelector("[data-steps]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });
    revealTargets.forEach(function (el) {
      el.setAttribute("data-reveal", "");
      io.observe(el);
    });
    if (steps) io.observe(steps);
  } else if (steps) {
    steps.classList.add("is-visible");
  }

  /* Statement: words darken as the paragraph scrolls through the viewport */
  var statement = document.querySelector("[data-reveal-words]");
  if (statement) {
    var text = statement.textContent.trim();
    statement.textContent = "";
    var srCopy = document.createElement("span");
    srCopy.className = "visually-hidden";
    srCopy.textContent = text;
    statement.appendChild(srCopy);
    text.split(/\s+/).forEach(function (w, i) {
      var span = document.createElement("span");
      span.className = "w";
      span.setAttribute("aria-hidden", "true");
      span.textContent = w;
      if (i) statement.appendChild(document.createTextNode(" "));
      statement.appendChild(span);
    });
    var spans = statement.querySelectorAll(".w");
    var ticking = false;
    var update = function () {
      ticking = false;
      if (reduceMotion.matches) {
        spans.forEach(function (s) { s.classList.remove("is-dim"); });
        return;
      }
      var r = statement.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = (vh * 0.9 - r.top) / (r.height + vh * 0.4);
      progress = Math.min(1, Math.max(0, progress));
      var lit = Math.round(progress * spans.length);
      spans.forEach(function (s, i) { s.classList.toggle("is-dim", i >= lit); });
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* Tabs in the example report (WAI-ARIA tabs pattern, manual activation on click, arrow keys move) */
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var select = function (tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    };
    tablist.addEventListener("click", function (e) {
      var t = e.target.closest('[role="tab"]');
      if (t) select(t);
    });
    tablist.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next);
        next.focus();
      }
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
