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
    speakers      optional [{ name, role, roleZh, photo }] shown as their own block
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
    name: "Fire, Forms & Function",
    nameZh: "Fire, Forms & Function（防火、形态与功能）",
    draft: false,
    dateLabel: "Saturday 17 October 2026",
    dateLabelZh: "2026 年 10 月 17 日（星期六）",
    timeLabel: "4:30pm – 6:30pm",
    timeLabelZh: "下午 4:30 – 6:30",
    startDate: "2026-10-17",
    dateConfirmed: true,
    venue: "acidity. bar & coffee",
    venueZh: "acidity. bar & coffee",
    address: "3/240 Victoria Street, Richmond VIC 3121",
    addressZh: "3/240 Victoria Street, Richmond VIC 3121",
    location: "acidity. bar & coffee, Richmond",
    locationZh: "acidity. bar & coffee，Richmond",
    format: "In person",
    formatZh: "线下",
    costLabel: "$25 entry, including one non-alcoholic drink",
    costLabelZh: "入场费 25 澳元，含一杯无酒精饮品",
    capacityLabel: "Seats are limited to 40",
    capacityLabelZh: "座位限 40 个",
    speakers: [
      { name: "Addison Tam", role: "Director, ProAct · Fire Safety Engineer", roleZh: "ProAct 董事 · 消防安全工程师", photo: "assets/events/addison-tam.jpg" },
      { name: "Wilton Wong", role: "Director, Collabuild · Principal Architect", roleZh: "Collabuild 董事 · 首席建筑师" }
    ],
    audience: "For builders, architects, developers, building surveyors and engineers",
    audienceZh: "适合建筑商、建筑师、开发商、建筑审查师及工程师",
    summary:
      "A small room full of people who build. Approx. 40 minutes on fire engineering " +
      "and design from Addison Tam and Wilton Wong, a live Chinese R&B set from Calico " +
      "Duo, and the rest of the evening to meet each other over a drink.",
    summaryZh:
      "一场面向建造行业从业者的小型聚会。由 Addison Tam 与 Wilton Wong 带来约 40 分钟的消防工程与设计分享，" +
      "随后由 Calico Duo 呈现中文 R&B 现场演出，其余时间供大家小酌交流。",
    poster: "assets/events/fire-forms-function-oct2026-v7.jpg",
    posterAlt:
      "Poster for Fire, Forms & Function — Saturday 17 October 2026, 4:30pm to 6:30pm at "
      + "acidity. bar & coffee, 3/240 Victoria Street, Richmond. A 40-minute talk on fire "
      + "engineering and design from Addison Tam and Wilton Wong, a live Chinese R&B set from "
      + "Calico Duo featuring Yolanda Li, then networking. General entry $25 including one "
      + "non-alcoholic drink. 40 spots, applications close 14 October.",
    url: "https://events.lingenious.com.au/oct2026",
    urlLabel: "Event site",
    urlLabelZh: "活动网站",
    registerUrl: "https://events.lingenious.com.au/oct2026",
    registerLabel: "Register for this event",
    registerLabelZh: "报名参加",
    registerNote: "Applications close 14 October. Entry is by email confirmation only, checked at the door.",
    registerNoteZh: "报名于 10 月 14 日截止。入场仅凭电子邮件确认函，入口处查验。",
    topics: ["Fire Engineering", "Live Set", "Networking"],
    topicsZh: ["Fire Engineering（消防工程）", "Live Set（现场演出）", "Networking（交流）"]
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
