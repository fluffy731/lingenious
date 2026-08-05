/*
  Single source of truth for case-study content.
  Sector pages, discipline pages and the Projects hub all read from this
  array at runtime rather than duplicating project content per page.
  All project details below are redacted/generalised — no client names,
  street addresses or identifying project numbers.
*/
window.LINGENIOUS_PROJECTS = [
  {
    id: "residential-structural-geotechnical",
    sector: "residential",
    sectorLabel: "Residential",
    name: "New Residential Dwelling",
    subtitle: "Structural & Geotechnical Design",
    location: "Private residence, eastern Melbourne",
    scope: "Multidisciplinary structural, civil and geotechnical design for an architecturally ambitious new home on a reactive clay site.",
    stats: ["Site Class “P” — highly reactive clay", "5 proposed floor levels rationalised", "Structural, Geotechnical & Civil coordinated"],
    disciplines: ["Structural", "Geotechnical", "Civil"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-residential-structural-geotechnical.html",
    challenge: "The architectural design called for a striking single dwelling featuring a curved first-floor façade, an open-plan living area spanning roughly 8m by 8m, and up to five different finished floor levels across the footprint. The site itself was classified as reactive Class “P” under AS 2870, meaning any footing solution had to accommodate significant potential ground movement. Left unresolved, the combination of long-span steel, curved framing and inconsistent floor levels risked driving up construction cost and introducing avoidable waterproofing and buildability issues.",
    approach: "Lingenious carried out a geotechnical site classification and footing recommendation, then led a structural design review working directly with the architect to rationalise the finished floor levels, reposition the roof drainage away from a problematic internally-located box gutter, and resolve the curved steel framing into a buildable, cost-effective solution. Long-span living area beams were re-sized in coordination with the architectural layout, and the brickwork and canopy details were reviewed for constructability.",
    outcome: "The result was a fully coordinated structural, civil and geotechnical package — including an engineered slab suited to the reactive site — that preserved the architect’s design intent while removing unnecessary cost and risk from the build."
  },
  {
    id: "residential-medium-density-development",
    sector: "residential",
    sectorLabel: "Residential",
    name: "Medium-Density Residential Development",
    subtitle: "Structural Design & Permit Coordination",
    location: "Residential development, eastern Melbourne",
    scope: "Structural design and civil coordination for a six-dwelling townhouse development delivered under a council planning permit.",
    stats: ["6 dwellings (two 4-storey + four 3-storey)", "Planning permit conditions coordinated end to end", "Structural + Civil scope"],
    disciplines: ["Structural", "Civil"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-residential-medium-density-development.html",
    challenge: "The planning permit for this six-dwelling development carried a long list of conditions — from on-site stormwater detention and legal point-of-discharge drainage requirements, to tree protection, privacy screening and construction staging — all of which needed to be reflected correctly in the structural and civil documentation before a building permit could be issued.",
    approach: "Lingenious prepared structural drawings and wind-bracing design across the six dwellings and coordinated closely with the civil and drainage documentation to make sure stormwater detention, drainage connections and structural detailing were consistent with the endorsed planning permit conditions.",
    outcome: "A coordinated structural package that supported the development through building permit stage without rework, keeping the project on program."
  },
  {
    id: "commercial-agricultural-portal-frame",
    sector: "commercial",
    sectorLabel: "Commercial",
    name: "Agricultural Production Facility",
    subtitle: "Portal Frame Performance Solution",
    location: "Agricultural production facility, regional Victoria",
    scope: "Performance-based structural justification for a 16.5m clear-span steel portal frame shed under the National Construction Code.",
    stats: ["16.5m clear-span portal frame", "NCC Performance Solution (B1P1)", "AS 4100 plastic analysis"],
    disciplines: ["Structural"],
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-commercial-agricultural-portal-frame.html",
    challenge: "A conventional Deemed-to-Satisfy structural check of the proposed steel portal frame shed left an unacceptably narrow safety margin (347MPa against a 350MPa yield limit) and an apex deflection that technically breached standard prescriptive limits — even though those limits exist to protect brittle internal linings the unlined agricultural building didn’t have. Meeting the prescriptive rules as written would have forced an expensive, unnecessary upgrade to the steel frame.",
    approach: "Lingenious prepared a Performance Solution under the National Construction Code, using plastic analysis in accordance with AS 4100 to demonstrate the frame’s true reserve strength, supported by a lifecycle risk-management plan covering extreme-weather protocols, post-event inspections and ongoing deflection monitoring.",
    outcome: "The existing steel frame was verified as fully compliant with NCC Performance Requirement B1P1 without any redesign, avoiding unnecessary material cost while maintaining full structural safety."
  },
  {
    id: "commercial-facade-glazing-certification",
    sector: "commercial",
    sectorLabel: "Commercial",
    name: "Multi-Building Development",
    subtitle: "Glazing Systems Certification",
    location: "Residential development, New South Wales",
    scope: "Independent structural verification of window and door glazing systems against project-specific wind loads across a three-building development.",
    stats: ["5 glazing product types verified", "3 buildings assessed", "AS/NZS 1170.2 & AS 2047 compliance"],
    disciplines: ["Facade"],
    image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-commercial-facade-glazing-certification.html",
    challenge: "A façade contractor needed to demonstrate that standard aluminium window and door systems — already independently tested by the manufacturer — would meet the specific wind and water-penetration requirements of this three-building development, without the cost and delay of commissioning new physical testing.",
    approach: "Lingenious engineered a structural adequacy check comparing the manufacturer’s independent test data against the project’s site-specific wind loads and water penetration requirements under AS/NZS 1170.2 and AS 2047, across fixed windows, hinged doors, awning windows and sliding door configurations.",
    outcome: "All five glazing systems were certified as structurally adequate for the project, allowing procurement to proceed on the existing product range without additional testing cost or delay."
  },
  {
    id: "commercial-tenancy-extension-advisory",
    sector: "commercial",
    sectorLabel: "Commercial",
    name: "Commercial Tenancy Extension",
    subtitle: "Contractor Selection Advisory",
    location: "Commercial retail extension, Melbourne",
    scope: "Independent tender comparison and contractor recommendation for a commercial tenancy extension.",
    stats: ["3 contractor tenders compared", "Accessibility (DDA) compliance gap identified", "Preferred contractor recommended on cost, compliance & program"],
    disciplines: ["Project Management & Advisory"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-commercial-tenancy-extension-advisory.html",
    challenge: "The client held three contractor quotes for a commercial tenancy extension that looked broadly similar on price, but used inconsistent scope definitions — making it difficult to compare like-for-like or to be confident that regulatory requirements, including DDA accessibility, were fully covered.",
    approach: "Lingenious prepared a line-by-line comparative analysis of all three tenders, flagging pricing outliers, scope gaps and — critically — that two of the three tenders omitted mandatory DDA-compliant bathrooms and access ramps and appeared to under-specify the mechanical ventilation system.",
    outcome: "The client engaged the recommended contractor with full visibility of scope, cost and compliance risk, on the shortest programmed construction period of the three tenders."
  },
  {
    id: "government-reserve-fencing-program",
    sector: "government-infrastructure",
    sectorLabel: "Government + Infrastructure",
    name: "Municipal Reserve Safety Fencing Program",
    subtitle: "Multi-Site Structural Design",
    location: "Community reserves, metropolitan Melbourne",
    scope: "Structural design of high safety fencing across multiple council-owned sporting reserves.",
    stats: ["4 reserve sites", "Fencing up to 6m high", "Site-specific footing design per soil conditions"],
    disciplines: ["Structural", "Civil"],
    image: "https://images.unsplash.com/photo-1642452446661-89641983bafc?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-government-reserve-fencing-program.html",
    challenge: "The council needed compliant high safety fencing installed across several community sporting reserves to protect the public from stray sports equipment and unauthorised access, with each site presenting different ground conditions, existing infrastructure and underground services to work around.",
    approach: "Lingenious designed site-specific fence post and footing details — including bored pier depths matched to each site’s soil report — for each reserve, coordinating around existing drainage pits, retaining walls and underground services identified at each location.",
    outcome: "A standardised, engineer-certified fencing solution ready for construction across the council’s reserve portfolio, with siting and footing details tailored to each location’s specific ground and services conditions."
  },
  {
    id: "government-school-construction-inspections",
    sector: "government-infrastructure",
    sectorLabel: "Government + Infrastructure",
    name: "School Construction",
    subtitle: "Structural Inspections & Certification",
    location: "School facility, Melbourne",
    scope: "Construction-stage structural inspections, certification and fencing/handrail engineering for new school buildings.",
    stats: ["Multiple construction-stage structural inspections", "Structural performance solution for a non-standard site", "Handrail & fencing certification"],
    disciplines: ["Structural"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-government-school-construction-inspections.html",
    challenge: "New school buildings needed continuous structural verification during construction — from footing and blockwork reinforcement through to structural steel framing — plus a compliant handrail and perimeter fencing solution for a sloping, multi-level site.",
    approach: "Lingenious prepared a structural performance solution to address the site's non-standard requirements and carried out a series of construction-stage inspections of footings, core-filled blockwork walls and structural steel framing, alongside bespoke handrail, palisade fencing and walkway barrier fencing designs suited to the site's retaining walls and level changes.",
    outcome: "Construction proceeded with each structural stage independently verified and certified, backed by a fully engineered fencing and handrail package tailored to the site's varying ground levels."
  },
  {
    id: "government-facility-refurbishment",
    sector: "government-infrastructure",
    sectorLabel: "Government + Infrastructure",
    name: "Government Facility Refurbishment",
    subtitle: "Structural Subconsultant Role",
    location: "Government facility, Victoria",
    scope: "Structural subconsultant input supporting refurbishment works at a government-owned facility, delivered as part of a multidisciplinary design team led by another consultancy.",
    stats: ["Structural subconsultant role", "Multidisciplinary design team coordination", "Refurbishment & repair works"],
    disciplines: ["Structural"],
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-government-facility-refurbishment.html",
    challenge: "The project required structural engineering input as one part of a larger multidisciplinary refurbishment program at a government-owned facility, coordinated through the project's lead consultant.",
    approach: "Lingenious provided structural design and certification input to the lead consultant's documentation, working within the design team's established coordination, review and reporting protocols for the facility.",
    outcome: "Structural design and certification were delivered to the standard required, supporting the lead consultant's overall delivery of the refurbishment works."
  },
  {
    id: "commercial-dealership-pylon-sign",
    sector: "commercial",
    sectorLabel: "Commercial",
    name: "Vehicle Dealership Pylon Sign",
    subtitle: "Structural Design",
    location: "Vehicle dealership, Melbourne",
    scope: "Structural design of a free-standing pylon sign for a vehicle dealership, engineered to reuse an existing footing.",
    stats: ["6.25m maximum free-standing height", "Reused existing pad footing", "Structural performance solution"],
    disciplines: ["Structural"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-commercial-dealership-pylon-sign.html",
    challenge: "The dealership wanted a tall pylon sign for street visibility, but the only footing available on site was an existing concrete pad left over from a previous structure — a full new footing wasn't in the budget or program.",
    approach: "Lingenious designed a free-standing steel column and framing solution engineered to work within the capacity of the existing footing, verified through a structural performance solution rather than a standard prescriptive design.",
    outcome: "A tender-ready structural package that let the dealership proceed with its preferred sign height while reusing existing site infrastructure, keeping cost and construction time down."
  },
  {
    id: "government-sports-facility-drainage",
    sector: "government-infrastructure",
    sectorLabel: "Government + Infrastructure",
    name: "Community Sports Facility Drainage Upgrade",
    subtitle: "Civil Design",
    location: "Community sports facility, metropolitan Melbourne",
    scope: "Civil drainage design for stormwater upgrade works at a council-owned tennis facility.",
    stats: ["New grated trench drainage & kerb/channel design", "Coordinated around existing vegetation and drainage assets", "Tender-ready civil works package"],
    disciplines: ["Civil"],
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=70",
    slug: "case-study-government-sports-facility-drainage.html",
    challenge: "Existing drainage around the courts at a council sporting facility was allowing stormwater to pond and encroach onto the playing surface, while any new works needed to work around mature trees, existing light poles and drainage infrastructure the council wanted retained.",
    approach: "Lingenious designed a new grated trench drainage system, kerb and channel upgrades, and earth bunding to redirect stormwater away from the courts, tying into the existing drainage network while protecting the reserve’s established vegetation.",
    outcome: "A fully documented, tender-ready civil works package that resolved the drainage issue while preserving the character and vegetation of the surrounding reserve."
  }
];

window.LINGENIOUS_SECTORS = [
  { id: "residential", label: "Residential", page: "project-sector-residential.html" },
  { id: "commercial", label: "Commercial", page: "project-sector-commercial.html" },
  { id: "government-infrastructure", label: "Government + Infrastructure", page: "project-sector-government-infrastructure.html" }
];

window.LINGENIOUS_DISCIPLINE_PAGES = {
  "Civil": "civil-engineering.html",
  "Structural": "structural-engineering.html",
  "Facade": "facade-engineering.html",
  "Geotechnical": "geotechnical-engineering.html",
  "Fire Safety": "fire-safety-engineering.html",
  "Project Management & Advisory": "services.html#project-management"
};
