/*
  Site-wide search. Injects a search trigger into the nav and a results
  overlay into the body on every page, so no per-page markup is needed.
  Reads window.LINGENIOUS_SEARCH_INDEX (assets/search-data.js).
*/
(function () {
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function highlight(text, query) {
    if (!query) return escapeHtml(text);
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(text);
    return (
      escapeHtml(text.slice(0, idx)) +
      "<mark>" + escapeHtml(text.slice(idx, idx + query.length)) + "</mark>" +
      escapeHtml(text.slice(idx + query.length))
    );
  }

  function score(entry, query) {
    var q = query.toLowerCase();
    var title = entry.title.toLowerCase();
    var desc = (entry.description || "").toLowerCase();
    var cat = (entry.category || "").toLowerCase();
    if (title === q) return 100;
    if (title.startsWith(q)) return 80;
    if (title.indexOf(q) !== -1) return 60;
    if (cat.indexOf(q) !== -1) return 40;
    if (desc.indexOf(q) !== -1) return 20;
    return 0;
  }

  function search(query) {
    var index = window.LINGENIOUS_SEARCH_INDEX || [];
    if (!query.trim()) return [];
    return index
      .map(function (entry) { return { entry: entry, s: score(entry, query) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 8)
      .map(function (r) { return r.entry; });
  }

  function init() {
    var nav = document.querySelector(".nav");
    if (!nav) return;

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "search-trigger";
    trigger.setAttribute("aria-label", "Search the site");
    trigger.innerHTML =
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
    var navToggle = nav.querySelector(".nav-toggle");
    if (navToggle) {
      nav.insertBefore(trigger, navToggle);
    } else {
      nav.appendChild(trigger);
    }

    var overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.innerHTML =
      '<div class="search-panel" role="dialog" aria-modal="true" aria-label="Site search">' +
      '  <div class="search-input-row">' +
      '    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
      '    <input type="text" class="search-input" placeholder="Search services, sectors, projects…" autocomplete="off" spellcheck="false">' +
      '    <button type="button" class="search-close" aria-label="Close search">&times;</button>' +
      '  </div>' +
      '  <div class="search-results" id="searchResults"></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector(".search-input");
    var results = overlay.querySelector(".search-results");
    var closeBtn = overlay.querySelector(".search-close");
    var activeIndex = -1;
    var currentResults = [];

    function renderResults(query) {
      currentResults = search(query);
      activeIndex = -1;
      if (!query.trim()) {
        results.innerHTML = '<div class="search-hint">Try “structural”, “fire safety”, “commercial”, or a service name.</div>';
        return;
      }
      if (!currentResults.length) {
        results.innerHTML = '<div class="search-empty">No pages match “' + escapeHtml(query) + '”.</div>';
        return;
      }
      results.innerHTML = currentResults
        .map(function (r, i) {
          return (
            '<a class="search-result" href="' + r.url + '" data-index="' + i + '">' +
            '  <span class="search-result-category">' + escapeHtml(r.category) + '</span>' +
            '  <span class="search-result-title">' + highlight(r.title, query) + '</span>' +
            '  <span class="search-result-desc">' + escapeHtml(r.description) + '</span>' +
            '</a>'
          );
        })
        .join("");
    }

    function setActive(i) {
      var items = results.querySelectorAll(".search-result");
      items.forEach(function (el) { el.classList.remove("active"); });
      if (i >= 0 && i < items.length) {
        items[i].classList.add("active");
        items[i].scrollIntoView({ block: "nearest" });
        activeIndex = i;
      }
    }

    function openSearch() {
      overlay.classList.add("open");
      document.body.classList.add("search-open");
      input.value = "";
      renderResults("");
      setTimeout(function () { input.focus(); }, 10);
    }

    function closeSearch() {
      overlay.classList.remove("open");
      document.body.classList.remove("search-open");
    }

    trigger.addEventListener("click", openSearch);
    closeBtn.addEventListener("click", closeSearch);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeSearch();
    });

    input.addEventListener("input", function () { renderResults(input.value); });

    input.addEventListener("keydown", function (e) {
      var items = results.querySelectorAll(".search-result");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive(Math.min(activeIndex + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(Math.max(activeIndex - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        var target = activeIndex >= 0 ? currentResults[activeIndex] : currentResults[0];
        if (target) window.location.href = target.url;
      } else if (e.key === "Escape") {
        closeSearch();
      }
    });

    document.addEventListener("keydown", function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      var typing = tag === "INPUT" || tag === "TEXTAREA" || document.activeElement.isContentEditable;
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape" && overlay.classList.contains("open")) {
        closeSearch();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
