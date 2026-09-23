/*
  Event listings for events.html. One entry per event.
  Consumed by assets/events-render.js, which sorts by date and splits the list
  into "upcoming" and "past" automatically — no edit needed as dates roll by.

  ----------------------------------------------------------------------------
  HEADS UP: the oct2026 entry below is a PLACEHOLDER SKELETON.
  Only two things about it are known: it happens in October 2026 and it has its
  own site at https://events.lingenious.com.au/oct2026. Everything else (exact
  dates, venue, title, description, poster artwork) is marked TBC and is shown
  on the page behind a visible "Details to be confirmed" flag.
  Replace the TBC values and set `draft: false` to publish it properly.
  ----------------------------------------------------------------------------

  Fields:
    id            unique slug, also the URL fragment for deep links
    name          event title
    draft         true  -> card shows a "Details to be confirmed" flag
    dateLabel     human-readable date shown on the card (e.g. "14 October 2026")
    startDate     ISO yyyy-mm-dd. Used for sorting and upcoming/past split.
    endDate       optional ISO yyyy-mm-dd for multi-day events. Defaults to startDate.
    dateConfirmed false -> renderer appends a "date to be confirmed" note
    location      venue / city, or "Online"
    format        e.g. "In person", "Online", "Hybrid"
    summary       1-2 sentences for the card body
    poster        path to poster artwork. Portrait (A-series) reads best.
                  Shown contained, never cropped, and click-to-enlarge.
    posterAlt     alt text describing the poster
    url           where the event lives (external subdomain or internal page)
    urlLabel      link text
    topics        tag chips, rendered with .card-tag

  Chinese (Simplified) counterparts, matching the site's data-zh convention:
    nameZh, dateLabelZh, locationZh, formatZh, summaryZh, urlLabelZh, topicsZh
  Each is optional. When one is missing the renderer falls back to the English
  value, so a half-translated entry degrades gracefully instead of rendering
  blank. topicsZh is positional — it lines up index-for-index with topics.
*/
window.LINGENIOUS_EVENTS = [
  {
    id: "oct2026",
    name: "Lingenious October 2026 Event",
    nameZh: "Lingenious 2026 年 10 月活动",
    draft: true,
    dateLabel: "October 2026",
    dateLabelZh: "2026 年 10 月",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    dateConfirmed: false,
    location: "To be confirmed",
    locationZh: "待确认",
    format: "To be confirmed",
    formatZh: "待确认",
    summary:
      "Programme, speakers and registration details are being finalised. " +
      "The dedicated event site carries the current information as it is released.",
    summaryZh:
      "活动议程、讲者与报名详情正在确认中。最新信息将在活动专属网站上陆续发布。",
    poster: "assets/events/poster-placeholder.svg",
    posterAlt: "Placeholder — poster artwork for the October 2026 event is still to be added",
    url: "https://events.lingenious.com.au/oct2026",
    urlLabel: "Visit the event site",
    urlLabelZh: "访问活动网站",
    topics: ["To be confirmed"],
    topicsZh: ["待确认"]
  }

  /* Template — copy, fill in, and drop the poster into assets/events/:
  ,{
    id: "example-2027",
    name: "Façade Compliance Briefing",
    nameZh: "Façade（幕墙）合规简报会",
    draft: false,
    dateLabel: "18 March 2027",
    dateLabelZh: "2027 年 3 月 18 日",
    startDate: "2027-03-18",
    dateConfirmed: true,
    location: "Box Hill, Victoria",
    locationZh: "维多利亚州 Box Hill",
    format: "In person",
    formatZh: "线下",
    summary: "A short session on façade compliance pathways for building owners and managing agents.",
    summaryZh: "面向业主与物业管理方的幕墙合规路径简介。",
    poster: "assets/events/facade-briefing-2027.jpg",
    posterAlt: "Poster for the Façade Compliance Briefing, 18 March 2027",
    url: "https://events.lingenious.com.au/facade-2027",
    urlLabel: "Event details + registration",
    urlLabelZh: "活动详情与报名",
    topics: ["Façade", "Compliance"],
    topicsZh: ["Façade（幕墙）", "Compliance（合规）"]
  }
  */
];
