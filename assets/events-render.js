/*
  Renders events.html from window.LINGENIOUS_EVENTS (assets/events-data.js).

  Splits the list into upcoming and past against today's date, so the page stays
  correct as dates roll by without anyone editing markup. The soonest upcoming
  event is promoted to a featured block; the rest render as poster cards.

  Posters are click-to-enlarge: a poster is only useful if its text is readable,
  and card-sized thumbnails are not.

  Bilingual: every translatable node carries data-zh, matching the rest of the
  site. assets/lang-toggle.js captures its [data-zh] node list once when it
  loads, so events.html deliberately loads this renderer BEFORE lang-toggle.js
  — otherwise the cards would render after the capture and never translate.
*/
(function () {
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // escapeHtml already turns " into &quot;, so this is attribute-safe.
  function zhAttr(zh) {
    return zh ? ' data-zh="' + escapeHtml(zh) + '"' : "";
  }

  // For values already escaped by the caller, which may carry entities such as
  // &mdash; that must survive into the attribute rather than be escaped again.
  function zhAttrRaw(zhHtml) {
    return zhHtml ? ' data-zh="' + zhHtml + '"' : "";
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

  function isExternal(url) {
    return /^https?:\/\//i.test(url || "");
  }

  function posterHTML(ev) {
    if (!ev.poster) return "";
    var alt = escapeHtml(ev.posterAlt || (ev.name ? "Poster for " + ev.name : "Event poster"));
    return '<button type="button" class="event-poster is-zoomable"' +
      ' data-poster="' + escapeHtml(ev.poster) + '" data-poster-alt="' + alt + '"' +
      ' aria-label="Enlarge poster: ' + alt + '">' +
      '<img src="' + escapeHtml(ev.poster) + '" alt="' + alt + '" loading="lazy">' +
      '<span class="event-poster-hint" aria-hidden="true" data-zh="点击放大">Click to enlarge</span>' +
      '</button>';
  }

  function draftHTML(ev) {
    return ev.draft
      ? '<span class="event-draft" data-zh="详情待确认">Details to be confirmed</span>'
      : "";
  }

  function dateHTML(ev) {
    var en = escapeHtml(ev.dateLabel || "Date to be confirmed");
    var zh = escapeHtml(ev.dateLabelZh || ev.dateLabel || "日期待确认");
    if (ev.dateConfirmed === false && ev.dateLabel) {
      en += " &mdash; date to be confirmed";
      zh += " &mdash; 日期待确认";
    }
    return '<div class="event-date"' + zhAttrRaw(zh) + ">" + en + "</div>";
  }

  function topicsHTML(ev) {
    var en = ev.topics || [];
    var zh = ev.topicsZh || [];
    if (!en.length) return "";
    var chips = en.map(function (t, i) {
      return '<span class="card-tag"' + zhAttr(zh[i]) + ">" + escapeHtml(t) + "</span>";
    }).join("");
    return '<div class="card-tag-row">' + chips + "</div>";
  }

  function ctaHTML(ev, cls) {
    if (!ev.url) return "";
    var ext = isExternal(ev.url);
    return '<a class="' + cls + '" href="' + escapeHtml(ev.url) + '"' +
      (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" +
      "<span" + zhAttr(ev.urlLabelZh) + ">" + escapeHtml(ev.urlLabel || "Event details") + "</span> " +
      '<span class="btn-arrow">' + (ext ? "&#8599;" : "&rarr;") + "</span>" +
      "</a>";
  }

  function factsHTML(ev) {
    function row(labelEn, labelZh, valueEn, valueZh) {
      return "<li>" +
        '<span class="label"' + zhAttr(labelZh) + ">" + escapeHtml(labelEn) + "</span>" +
        "<span" + zhAttr(valueZh || "待确认") + ">" + escapeHtml(valueEn || "To be confirmed") + "</span>" +
        "</li>";
    }
    return '<ul class="event-facts">' +
      row("When", "时间", ev.dateLabel, ev.dateLabelZh) +
      row("Where", "地点", ev.location, ev.locationZh) +
      row("Format", "形式", ev.format, ev.formatZh) +
      "</ul>";
  }

  function featuredHTML(ev) {
    return '<div class="event-featured" id="' + escapeHtml(ev.id || "") + '">' +
      posterHTML(ev) +
      "<div>" +
        draftHTML(ev) +
        dateHTML(ev) +
        "<h2" + zhAttr(ev.nameZh) + ">" + escapeHtml(ev.name) + "</h2>" +
        "<p" + zhAttr(ev.summaryZh) + ">" + escapeHtml(ev.summary) + "</p>" +
        factsHTML(ev) +
        '<div class="event-actions">' +
          ctaHTML(ev, "btn btn-primary") +
          '<a class="btn btn-secondary" href="contact.html" data-zh="咨询此活动">Ask us about this event</a>' +
        "</div>" +
        topicsHTML(ev) +
      "</div>" +
    "</div>";
  }

  function cardHTML(ev, past) {
    var metaEn = (ev.location || "Location to be confirmed") + (ev.format ? " · " + ev.format : "");
    var metaZh = (ev.locationZh || ev.location || "地点待确认") + (ev.formatZh || ev.format ? " · " + (ev.formatZh || ev.format) : "");

    return '<div class="event-card' + (past ? " is-past" : "") + '" id="' + escapeHtml(ev.id || "") + '">' +
      posterHTML(ev) +
      '<div class="event-body">' +
        draftHTML(ev) +
        dateHTML(ev) +
        "<h3" + zhAttr(ev.nameZh) + ">" + escapeHtml(ev.name) + "</h3>" +
        "<p" + zhAttr(ev.summaryZh) + ">" + escapeHtml(ev.summary) + "</p>" +
        topicsHTML(ev) +
        '<div class="event-meta"' + zhAttr(metaZh) + ">" + escapeHtml(metaEn) + "</div>" +
        (ev.url ? ctaHTML(ev, "event-link") : "") +
      "</div>" +
    "</div>";
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
          '<div class="empty-state" data-zh="目前暂无已安排的活动。<a href=&quot;contact.html&quot; style=&quot;color:var(--navy);text-decoration:underline;&quot;>联系我们</a>，以了解后续活动安排。">' +
          "No events are scheduled at the moment. " +
          '<a href="contact.html" style="color:var(--navy);text-decoration:underline;">Get in touch</a> ' +
          "to hear about upcoming sessions.</div>";
        if (featuredSection) {
          var head = featuredSection.querySelector(".section-head h2");
          if (head) {
            head.textContent = "Nothing scheduled right now";
            head.setAttribute("data-zh", "目前暂无安排");
          }
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
