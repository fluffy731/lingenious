/*
  Renders events.html from window.LINGENIOUS_EVENTS (assets/events-data.js).

  Splits the list into upcoming and past against today's date, so the page stays
  correct as dates roll by without anyone editing markup. The soonest upcoming
  event is promoted to a featured block; the rest render as poster cards.

  Registration is handled off-site, per each event's registerUrl. This page
  deliberately does not host its own form: the event's own registration page
  tracks remaining places, which a static form cannot.

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
    if (ev.timeLabel) {
      en += " &middot; " + escapeHtml(ev.timeLabel);
      zh += " &middot; " + escapeHtml(ev.timeLabelZh || ev.timeLabel);
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

  function factsHTML(ev) {
    var rows = [
      ["When", "时间", ev.dateLabel, ev.dateLabelZh],
      ["Time", "开始时间", ev.timeLabel, ev.timeLabelZh],
      ["Where", "地点", ev.venue || ev.location, ev.venueZh || ev.locationZh],
      ["Entry", "入场", ev.costLabel, ev.costLabelZh]
    ].filter(function (r) { return r[2]; });

    if (!rows.length) return "";

    return '<ul class="event-facts">' + rows.map(function (r) {
      return "<li>" +
        '<span class="label"' + zhAttr(r[1]) + ">" + escapeHtml(r[0]) + "</span>" +
        "<span" + zhAttr(r[3] || r[2]) + ">" + escapeHtml(r[2]) + "</span>" +
        "</li>";
    }).join("") + "</ul>";
  }

  // Address, capacity and audience sit under the facts grid rather than in it —
  // they are longer prose and would wreck the even column widths.
  function noteHTML(ev) {
    var parts = [];
    if (ev.address) parts.push(["address", ev.address, ev.addressZh]);
    if (ev.capacityLabel) parts.push(["capacity", ev.capacityLabel, ev.capacityLabelZh]);
    if (ev.audience) parts.push(["audience", ev.audience, ev.audienceZh]);
    if (!parts.length) return "";

    return '<p class="event-note">' + parts.map(function (p) {
      return "<span" + zhAttr(p[2] || p[1]) + ">" + escapeHtml(p[1]) + "</span>";
    }).join('<span class="event-note-sep" aria-hidden="true"> &middot; </span>') + "</p>";
  }

  function actionsHTML(ev) {
    var out = "";

    if (ev.registerUrl) {
      var internalAnchor = ev.registerUrl.charAt(0) === "#";
      var extReg = isExternal(ev.registerUrl);
      out += '<a class="btn btn-primary" href="' + escapeHtml(ev.registerUrl) + '"' +
        (extReg ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" +
        "<span" + zhAttr(ev.registerLabelZh) + ">" +
        escapeHtml(ev.registerLabel || "Register") + "</span> " +
        '<span class="btn-arrow">' + (internalAnchor ? "&darr;" : extReg ? "&#8599;" : "&rarr;") + "</span>" +
        "</a>";
    }

    if (ev.url && ev.url !== ev.registerUrl) {
      var ext = isExternal(ev.url);
      out += '<a class="btn ' + (ev.registerUrl ? "btn-secondary" : "btn-primary") + '"' +
        ' href="' + escapeHtml(ev.url) + '"' +
        (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" +
        "<span" + zhAttr(ev.urlLabelZh) + ">" +
        escapeHtml(ev.urlLabel || "Event details") + "</span> " +
        '<span class="btn-arrow">' + (ext ? "&#8599;" : "&rarr;") + "</span>" +
        "</a>";
    }

    out += '<a class="btn btn-secondary" href="contact.html" data-zh="咨询此活动">Ask us about this event</a>';

    return '<div class="event-actions">' + out + "</div>";
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
        noteHTML(ev) +
        actionsHTML(ev) +
        topicsHTML(ev) +
      "</div>" +
    "</div>";
  }

  function linkHTML(ev) {
    var target = ev.registerUrl || ev.url;
    if (!target) return "";
    var label = ev.registerUrl ? (ev.registerLabel || "Register") : (ev.urlLabel || "Event details");
    var labelZh = ev.registerUrl ? ev.registerLabelZh : ev.urlLabelZh;
    var internalAnchor = target.charAt(0) === "#";
    var ext = isExternal(target);
    return '<a class="event-link" href="' + escapeHtml(target) + '"' +
      (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" +
      "<span" + zhAttr(labelZh) + ">" + escapeHtml(label) + "</span>" +
      '<span class="btn-arrow">' + (internalAnchor ? "&darr;" : ext ? "&#8599;" : "&rarr;") + "</span>" +
      "</a>";
  }

  function cardHTML(ev, past) {
    var metaEn = (ev.location || ev.venue || "Location to be confirmed") +
      (ev.format ? " · " + ev.format : "");
    var metaZh = (ev.locationZh || ev.venueZh || ev.location || "地点待确认") +
      (ev.formatZh || ev.format ? " · " + (ev.formatZh || ev.format) : "");

    return '<div class="event-card' + (past ? " is-past" : "") + '" id="' + escapeHtml(ev.id || "") + '">' +
      posterHTML(ev) +
      '<div class="event-body">' +
        draftHTML(ev) +
        dateHTML(ev) +
        "<h3" + zhAttr(ev.nameZh) + ">" + escapeHtml(ev.name) + "</h3>" +
        "<p" + zhAttr(ev.summaryZh) + ">" + escapeHtml(ev.summary) + "</p>" +
        topicsHTML(ev) +
        '<div class="event-meta"' + zhAttr(metaZh) + ">" + escapeHtml(metaEn) + "</div>" +
        (past ? "" : linkHTML(ev)) +
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
