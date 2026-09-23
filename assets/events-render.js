/*
  Renders events.html from window.LINGENIOUS_EVENTS (assets/events-data.js).

  Splits the list into upcoming and past against today's date, so the page stays
  correct as dates roll by without anyone editing markup. The soonest upcoming
  event is promoted to a featured block; the rest render as poster cards.

  Posters are click-to-enlarge: a poster is only useful if its text is readable,
  and card-sized thumbnails are not.
*/
(function () {
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function todayISO() {
    var d = new Date();
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  // ISO yyyy-mm-dd strings compare correctly as plain strings, which sidesteps
  // timezone drift from Date parsing.
  function isPast(ev, today) {
    return (ev.endDate || ev.startDate || "") < today;
  }

  function posterHTML(ev) {
    if (!ev.poster) return "";
    var alt = escapeHtml(ev.posterAlt || (ev.name ? "Poster for " + ev.name : "Event poster"));
    return '<button type="button" class="event-poster is-zoomable"' +
      ' data-poster="' + escapeHtml(ev.poster) + '" data-poster-alt="' + alt + '"' +
      ' aria-label="Enlarge poster: ' + alt + '">' +
      '<img src="' + escapeHtml(ev.poster) + '" alt="' + alt + '" loading="lazy">' +
      '<span class="event-poster-hint" aria-hidden="true">Click to enlarge</span>' +
      '</button>';
  }

  function dateHTML(ev) {
    var label = escapeHtml(ev.dateLabel || "Date to be confirmed");
    if (ev.dateConfirmed === false && ev.dateLabel) label += " &mdash; date to be confirmed";
    return label;
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url || "");
  }

  function topicsHTML(ev) {
    var topics = (ev.topics || []).map(function (t) {
      return '<span class="card-tag">' + escapeHtml(t) + '</span>';
    }).join("");
    return topics ? '<div class="card-tag-row">' + topics + '</div>' : "";
  }

  function linkHTML(ev) {
    if (!ev.url) return "";
    var ext = isExternal(ev.url);
    return '<a class="event-link" href="' + escapeHtml(ev.url) + '"' +
      (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + '>' +
      escapeHtml(ev.urlLabel || "Event details") +
      '<span class="btn-arrow">' + (ext ? "&#8599;" : "&rarr;") + '</span>' +
      '</a>';
  }

  function featuredHTML(ev) {
    var ext = isExternal(ev.url);
    var cta = ev.url
      ? '<a class="btn btn-primary" href="' + escapeHtml(ev.url) + '"' +
        (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + '>' +
        escapeHtml(ev.urlLabel || "Event details") +
        ' <span class="btn-arrow">' + (ext ? "&#8599;" : "&rarr;") + '</span></a>'
      : "";

    return '<div class="event-featured" id="' + escapeHtml(ev.id || "") + '">' +
      posterHTML(ev) +
      '<div>' +
        (ev.draft ? '<span class="event-draft">Details to be confirmed</span>' : "") +
        '<div class="event-date">' + dateHTML(ev) + '</div>' +
        '<h2>' + escapeHtml(ev.name) + '</h2>' +
        '<p>' + escapeHtml(ev.summary) + '</p>' +
        '<ul class="event-facts">' +
          '<li><span class="label">When</span>' + escapeHtml(ev.dateLabel || "To be confirmed") + '</li>' +
          '<li><span class="label">Where</span>' + escapeHtml(ev.location || "To be confirmed") + '</li>' +
          '<li><span class="label">Format</span>' + escapeHtml(ev.format || "To be confirmed") + '</li>' +
        '</ul>' +
        '<div class="event-actions">' + cta +
          '<a class="btn btn-secondary" href="contact.html">Ask us about this event</a>' +
        '</div>' +
        topicsHTML(ev) +
      '</div>' +
    '</div>';
  }

  function cardHTML(ev, past) {
    return '<div class="event-card' + (past ? " is-past" : "") + '" id="' + escapeHtml(ev.id || "") + '">' +
      posterHTML(ev) +
      '<div class="event-body">' +
        (ev.draft ? '<span class="event-draft">Details to be confirmed</span>' : "") +
        '<div class="event-date">' + dateHTML(ev) + '</div>' +
        '<h3>' + escapeHtml(ev.name) + '</h3>' +
        '<p>' + escapeHtml(ev.summary) + '</p>' +
        topicsHTML(ev) +
        '<div class="event-meta">' + escapeHtml(ev.location || "Location to be confirmed") +
          (ev.format ? " &middot; " + escapeHtml(ev.format) : "") + '</div>' +
        linkHTML(ev) +
      '</div>' +
    '</div>';
  }

  /* ---------- poster lightbox ---------- */

  function initLightbox() {
    var box = document.createElement("div");
    box.className = "poster-lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Event poster");
    box.innerHTML =
      '<button type="button" class="poster-lightbox-close" aria-label="Close poster">&times;</button>' +
      '<img src="" alt="">';
    document.body.appendChild(box);

    var img = box.querySelector("img");
    var closeBtn = box.querySelector(".poster-lightbox-close");
    var lastTrigger = null;

    function open(src, alt, trigger) {
      lastTrigger = trigger || null;
      img.src = src;
      img.alt = alt || "";
      box.classList.add("open");
      document.body.classList.add("poster-open");
      closeBtn.focus();
    }

    function close() {
      box.classList.remove("open");
      document.body.classList.remove("poster-open");
      img.removeAttribute("src");
      if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
    }

    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("open")) close();
    });

    // Delegated, so it also covers posters rendered after this runs.
    document.addEventListener("click", function (e) {
      if (!e.target.closest) return;
      var btn = e.target.closest(".event-poster.is-zoomable");
      if (!btn) return;
      open(btn.getAttribute("data-poster"), btn.getAttribute("data-poster-alt"), btn);
    });
  }

  /* ---------- page render ---------- */

  function render() {
    var all = (window.LINGENIOUS_EVENTS || []).slice().sort(function (a, b) {
      return String(a.startDate || "").localeCompare(String(b.startDate || ""));
    });
    var today = todayISO();

    var upcoming = all.filter(function (ev) { return !isPast(ev, today); });
    var past = all.filter(function (ev) { return isPast(ev, today); }).reverse();

    var featuredWrap = document.getElementById("eventFeatured");
    var featuredSection = document.getElementById("eventFeaturedSection");
    var upcomingWrap = document.getElementById("eventUpcoming");
    var upcomingSection = document.getElementById("eventUpcomingSection");
    var pastWrap = document.getElementById("eventPast");
    var pastSection = document.getElementById("eventPastSection");

    var featured = upcoming.length ? upcoming[0] : null;
    var restUpcoming = upcoming.slice(1);

    if (featuredWrap) {
      if (featured) {
        featuredWrap.innerHTML = featuredHTML(featured);
      } else {
        featuredWrap.innerHTML =
          '<div class="empty-state">No events are scheduled at the moment. ' +
          '<a href="contact.html" style="color:var(--navy);text-decoration:underline;">Get in touch</a> ' +
          'to hear about upcoming sessions.</div>';
        if (featuredSection) {
          var head = featuredSection.querySelector(".section-head h2");
          if (head) head.textContent = "Nothing scheduled right now";
        }
      }
    }

    if (upcomingWrap) {
      upcomingWrap.innerHTML = restUpcoming.map(function (ev) { return cardHTML(ev, false); }).join("");
      if (upcomingSection && !restUpcoming.length) upcomingSection.hidden = true;
    }

    if (pastWrap) {
      pastWrap.innerHTML = past.map(function (ev) { return cardHTML(ev, true); }).join("");
      if (pastSection && !past.length) pastSection.hidden = true;
    }

    initLightbox();
  }

  window.LingeniousEvents = { render: render, cardHTML: cardHTML };
})();
