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
    capacityLabel the seat cap, e.g. "Seats are limited to 40". State the cap only —
                  never a live "N left" count, which a static page cannot know.
    speakers      optional [{ name, role, roleZh }] shown as their own block
    audience      who the session is for, worded as a full phrase ("For builders, ...")
    summary       1-2 sentences for the card body
    poster        path to poster artwork. Portrait (A-series) reads best.
                  Shown contained, never cropped, and click-to-enlarge.
    posterAlt     alt text describing the poster
    url           the event's own site
    urlLabel      link text for that site
    registerUrl   optional. When set, becomes the PRIMARY call to action and
                  demotes `url` to a secondary link (skipped when both point at
                  the same place). Registration lives off-site, on the event's
                  own page, which can track remaining places.
    registerLabel link text for the primary call to action
    registerNote  optional line under the buttons, e.g. how a place is confirmed
    topics        tag chips, rendered with .card-tag

  Chinese (Simplified) counterparts, matching the site's data-zh convention:
    nameZh, dateLabelZh, timeLabelZh, venueZh, addressZh, locationZh, formatZh,
    costLabelZh, capacityLabelZh, audienceZh, summaryZh, urlLabelZh,
    registerLabelZh, registerNoteZh, topicsZh
  Each is optional. When one is missing the renderer falls back to the English
  value, so a half-translated entry degrades gracefully instead of rendering
  blank. topicsZh is positional — it lines up index-for-index with topics.

  NOTE ON PAYMENT: entry is collected at the venue on the day. This site takes
  no payment and collects no card details anywhere.
*/
window.LINGENIOUS_EVENTS = [
  {
    id: "oct2026",
    name: "Fire, Form & Function",
    nameZh: "Fire, Form & Function（防火、形态与功能）",
    draft: false,
    dateLabel: "Saturday 17 October 2026",
    dateLabelZh: "2026 年 10 月 17 日（星期六）",
    timeLabel: "4:30pm start",
    timeLabelZh: "下午 4:30 开始",
    startDate: "2026-10-17",
    dateConfirmed: false,
    venue: "Acidity Bar and Coffee",
    venueZh: "Acidity Bar and Coffee",
    address: "3/240 Victoria Street, Richmond VIC 3121",
    addressZh: "3/240 Victoria Street, Richmond VIC 3121",
    location: "Acidity Bar and Coffee, Richmond",
    locationZh: "Acidity Bar and Coffee，Richmond",
    format: "In person",
    formatZh: "线下",
    costLabel: "$25 entry, including one non-alcoholic drink",
    costLabelZh: "入场费 25 澳元，含一杯无酒精饮品",
    capacityLabel: "Seats are limited to 40",
    capacityLabelZh: "座位限 40 个",
    speakers: [
      { name: "Addison Tam", role: "Fire Safety Engineer", roleZh: "消防安全工程师" },
      { name: "Wilton Wong", role: "Registered Architect", roleZh: "注册建筑师" }
    ],
    audience: "For builders, architects, developers, building surveyors and engineers",
    audienceZh: "适合建筑商、建筑师、开发商、建筑审查师及工程师",
    summary:
      "A technical sharing session for people who build. Roughly 40 minutes from " +
      "Addison Tam and Wilton Wong, then a live band takes over for a Chinese R&B " +
      "set and the rest of the evening is for networking.",
    summaryZh:
      "一场面向建造行业从业者的技术分享会。由 Addison Tam 与 Wilton Wong 带来约 40 分钟的分享，" +
      "随后由乐队呈现中文 R&B 现场演出，其余时间用于自由交流。",
    poster: "assets/events/fire-form-function-oct2026-v4.jpg",
    posterAlt:
      "Poster for Fire, Form & Function — a technical sharing session followed by a live band " +
      "Chinese R&B set, with Addison Tam and Wilton Wong speaking. " +
      "Saturday 17 October 2026 (date to be confirmed), 4:30pm at " +
      "acidity. bar & coffee, 3/240 Victoria Street, Richmond VIC 3121. " +
      "$25 entry including one non-alcoholic drink. Seats are limited to 40.",
    url: "https://events.lingenious.com.au/oct2026",
    urlLabel: "Event site",
    urlLabelZh: "活动网站",
    registerUrl: "https://events.lingenious.com.au/oct2026",
    registerLabel: "Register for this event",
    registerLabelZh: "报名参加",
    registerNote: "Register early — we'll email you to confirm whether you have a seat.",
    registerNoteZh: "建议尽早报名——我们将通过电子邮件确认您是否获得座位。",
    topics: ["Fire Engineering", "Technical Sharing", "Live Music"],
    topicsZh: ["Fire Engineering（消防工程）", "Technical Sharing（技术分享）", "Live Music（现场音乐）"]
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
    venue: "Venue name",
    address: "Street address, Suburb VIC 0000",
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
    registerUrl: "https://events.lingenious.com.au/facade-2027",
    registerLabel: "Register for this event",
    registerLabelZh: "报名参加",
    topics: ["Façade", "Compliance"],
    topicsZh: ["Façade（幕墙）", "Compliance（合规）"]
  }
  */
];
