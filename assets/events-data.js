/*
  Event listings for events.html. One entry per event.
  Consumed by assets/events-render.js, which sorts by date and splits the list
  into "upcoming" and "past" automatically — no edit needed as dates roll by.
  The soonest upcoming event also drives the registration form's hidden fields
  and its poster, so there is nothing to keep in sync by hand.

  Fields:
    id            unique slug, also the URL fragment for deep links
    name          event title
    draft         true  -> card shows a "Details to be confirmed" flag
    dateLabel     human-readable date shown on the card
    timeLabel     start time, e.g. "4:00pm start"
    startDate     ISO yyyy-mm-dd. Used for sorting and the upcoming/past split.
    endDate       optional ISO yyyy-mm-dd for multi-day events. Defaults to startDate.
    dateConfirmed false -> renderer appends a "date to be confirmed" note
    venue         venue name
    address       street address
    location      short location shown on cards (venue + suburb)
    format        e.g. "In person", "Online", "Hybrid"
    costLabel     entry cost. Payment is NOT taken on this site — see below.
    capacityLabel e.g. "40 places only"
    audience      who the session is for, worded as a full phrase ("For builders, ...")
    summary       1-2 sentences for the card body
    poster        path to poster artwork. Portrait (A-series) reads best.
                  Shown contained, never cropped, and click-to-enlarge.
    posterAlt     alt text describing the poster
    url           the event's own site
    urlLabel      link text for that site
    registerUrl   optional. When set, becomes the PRIMARY call to action and
                  demotes `url` to a secondary link. "#register" targets the
                  registration form further down events.html.
    registerLabel link text for the primary call to action
    topics        tag chips, rendered with .card-tag

  Chinese (Simplified) counterparts, matching the site's data-zh convention:
    nameZh, dateLabelZh, timeLabelZh, venueZh, addressZh, locationZh, formatZh,
    costLabelZh, capacityLabelZh, audienceZh, summaryZh, urlLabelZh,
    registerLabelZh, topicsZh
  Each is optional. When one is missing the renderer falls back to the English
  value, so a half-translated entry degrades gracefully instead of rendering
  blank. topicsZh is positional — it lines up index-for-index with topics.

  NOTE ON PAYMENT: entry is collected at the venue on the day. Neither this
  file nor the registration form handles payment, and no card details are
  collected anywhere on this site.
*/
window.LINGENIOUS_EVENTS = [
  {
    id: "oct2026",
    name: "Fire, Form & Function",
    nameZh: "Fire, Form & Function（防火、形态与功能）",
    draft: false,
    dateLabel: "Sunday 4 October 2026",
    dateLabelZh: "2026 年 10 月 4 日（星期日）",
    timeLabel: "4:00pm start",
    timeLabelZh: "下午 4:00 开始",
    startDate: "2026-10-04",
    dateConfirmed: true,
    venue: "Acidity Bar and Coffee",
    venueZh: "Acidity Bar and Coffee",
    address: "3/240 Victoria Street, Richmond VIC 3121",
    addressZh: "3/240 Victoria Street, Richmond VIC 3121",
    location: "Acidity Bar and Coffee, Richmond",
    locationZh: "Acidity Bar and Coffee，Richmond",
    format: "In person",
    formatZh: "线下",
    costLabel: "$15 entry, including one non-alcoholic drink",
    costLabelZh: "入场费 15 澳元，含一杯无酒精饮品",
    capacityLabel: "40 places only",
    capacityLabelZh: "仅限 40 个名额",
    audience: "For builders, architects, developers, building surveyors and engineers",
    audienceZh: "适合建筑商、建筑师、开发商、建筑审查师及工程师",
    summary:
      "A short technical sharing session for people who build. 25 minutes on " +
      "fire engineering and one other topic, then the rest of the afternoon is " +
      "yours to talk to each other.",
    summaryZh:
      "一场面向建造行业从业者的简短技术分享会。25 分钟聚焦消防工程及另一议题，" +
      "其余时间留给大家自由交流。",
    poster: "assets/events/fire-form-function-oct2026.jpg",
    posterAlt:
      "Poster for Fire, Form & Function — a short technical sharing session on Sunday 4 October 2026, " +
      "4:00pm at Acidity Bar and Coffee, 3/240 Victoria Street, Richmond VIC 3121. " +
      "$15 entry including one non-alcoholic drink. 40 places only.",
    url: "https://events.lingenious.com.au/oct2026",
    urlLabel: "Event site",
    urlLabelZh: "活动网站",
    registerUrl: "#register",
    registerLabel: "Register for this event",
    registerLabelZh: "报名参加",
    topics: ["Fire Engineering", "Technical Sharing"],
    topicsZh: ["Fire Engineering（消防工程）", "Technical Sharing（技术分享）"]
  }

  /* Template — copy, fill in, and drop the poster into assets/events/:
  ,{
    id: "example-2027",
    name: "Façade Compliance Briefing",
    nameZh: "Façade（幕墙）合规简报会",
    draft: false,
    dateLabel: "Thursday 18 March 2027",
    dateLabelZh: "2027 年 3 月 18 日（星期四）",
    timeLabel: "5:30pm start",
    timeLabelZh: "下午 5:30 开始",
    startDate: "2027-03-18",
    dateConfirmed: true,
    venue: "Lingenious Consulting",
    address: "Level 2, 18 Prospect Street, Box Hill VIC 3128",
    location: "Box Hill, Victoria",
    locationZh: "维多利亚州 Box Hill",
    format: "In person",
    formatZh: "线下",
    costLabel: "Free",
    costLabelZh: "免费",
    capacityLabel: "30 places only",
    audience: "For building owners and managing agents",
    summary: "A short session on façade compliance pathways for building owners and managing agents.",
    summaryZh: "面向业主与物业管理方的幕墙合规路径简介。",
    poster: "assets/events/facade-briefing-2027.jpg",
    posterAlt: "Poster for the Façade Compliance Briefing, 18 March 2027",
    url: "https://events.lingenious.com.au/facade-2027",
    urlLabel: "Event site",
    urlLabelZh: "活动网站",
    registerUrl: "#register",
    registerLabel: "Register for this event",
    registerLabelZh: "报名参加",
    topics: ["Façade", "Compliance"],
    topicsZh: ["Façade（幕墙）", "Compliance（合规）"]
  }
  */
];
