
export const Gamemodes = [
  { name: "Antsy", icon: "antsy", link: "/antsy", },
  { name: "Babel", icon: "babel", link: "/babel" },
  { name: "Copycat", icon: "copycat", link: "/copycat" },
  { name: "Lexicity", icon: "lexicity", link: "/lexicity" },
  { name: "Rhyme", icon: "rhyme", link: "/rhyme" },
  { name: "Survey Senses", icon: "survey senses", link: "/surveysenses" },
  { name: "Affixated", icon: "affixated", link: "/affixated", locked: true },
  { name: "Chaser", icon: "chaser", link: "/chaser", locked: true },
  { name: "Nexus", icon: "abc", link: "/nexus", locked: true },
  { name: "Origin", icon: "origin", link: "/origin", locked: true },
  { name: "Rooted", icon: "rooted", link: "/rooted", locked: true },

]
// World-building elements and their corresponding SVG representations

export const worldElements: { [key: string]: string } = {
  BARN: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 20V8L12 2L21 8V20H3Z" /></svg>`,
  COURT: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><line x1="2" y1="12" x2="22" y2="12" stroke="white" /></svg>`,
  TRAIN: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="8" width="16" height="12" /><circle cx="7" cy="20" r="2" /><circle cx="17" cy="20" r="2" /></svg>`,
  HOUSE: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12 L12 2 L22 12 L22 22 L2 22 Z" /></svg>`,
  MUSEUM: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" /><rect x="7" y="7" width="10" height="10" /></svg>`,
  ROOM: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" /><line x1="4" y1="8" x2="20" y2="8" stroke="white" /></svg>`,
  STUDIO: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><circle cx="12" cy="12" r="4" /></svg>`,
  HALL: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" /><rect x="7" y="7" width="10" height="10" /></svg>`,
  POOL: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" /></svg>`,
  POND: `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="6" /></svg>`,
  LAKE: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="8" width="16" height="8" rx="4" /></svg>`,
  LIBRARY: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" /><line x1="4" y1="8" x2="20" y2="8" stroke="white" /><line x1="4" y1="16" x2="20" y2="16" stroke="white" /></svg>`,
  SCHOOL: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" /><polygon points="12,2 4,10 20,10" /></svg>`,
  CHURCH: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="8" width="12" height="12" /><polygon points="12,2 10,8 14,8" /></svg>`,
  CHAPEL: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="8" y="8" width="8" height="12" /><polygon points="12,2 10,8 14,8" /></svg>`,
  PARK: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /><rect x="10" y="2" width="4" height="8" /></svg>`,
  BENCH: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="10" width="16" height="4" /><rect x="6" y="6" width="12" height="4" /></svg>`,
  ROAD: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="16" height="20" /><line x1="12" y1="2" x2="12" y2="22" stroke="white" /><line x1="12" y1="10" x2="12" y2="14" stroke="black" /></svg>`,
  LANE: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="2" width="12" height="20" /><line x1="12" y1="2" x2="12" y2="22" stroke="white" /></svg>`,
  APARTMENT: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="12" height="16" /><rect x="8" y="6" width="4" height="4" /><rect x="12" y="6" width="4" height="4" /><rect x="8" y="12" width="4" height="4" /><rect x="12" y="12" width="4" height="4" /></svg>`,
  SKYSCRAPER: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="8" y="2" width="8" height="20" /><line x1="8" y1="8" x2="16" y2="8" stroke="white" /><line x1="8" y1="16" x2="16" y2="16" stroke="white" /></svg>`,
  CONCERTHALL: `<svg width="24" height="24" viewBox="0 0 24 24">
  <rect x="2" y="4" width="20" height="16" fill="#808080" />
  <polygon points="12,2 22,10 2,10" fill="#606060" />
  <rect x="8" y="8" width="8" height="4" fill="#fff" />  </svg>`,

  "PILLAR": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="8" y="2" width="8" height="20" /><rect x="6" y="2" width="12" height="2" /><rect x="6" y="20" width="12" height="2" /></svg>`,
  "LOT": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" /><path d="M2 8 L22 8 M2 16 L22 16 M8 2 L8 22 M16 2 L16 22" stroke="currentColor" /></svg>`,
  "FACTORY": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 10 L16 6 L16 2 L8 2 L8 10 L2 14 Z" /><rect x="5" y="14" width="4" height="4" /><rect x="15" y="14" width="4" height="4" /></svg>`,
  "POWERPLANT": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M12 2 L12 22 M7 12 L17 12" stroke="white" /></svg>`,
  "SOLARFARM": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="12" /><path d="M2 10 L22 10 M2 14 L22 14 M8 6 L8 18 M16 6 L16 18" stroke="white" /></svg>`,
  "WINDTURBINE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22 L12 2" /><path d="M12 6 L18 2 M12 6 L6 2 M12 6 L12 12" /></svg>`,
  "HOSPITAL": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><path d="M12 6 L12 18 M6 12 L18 12" stroke="white" /></svg>`,
  "CLINIC": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8 L12 16 M8 12 L16 12" stroke="white" /></svg>`,
  "POLICESTATION": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M8 12 L16 12 M12 8 L12 16" stroke="white" /></svg>`,
  "FIRESTATION": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M8 22 L8 12 L16 12 L16 22" stroke="white" /></svg>`,
  "AIRPORT": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="12" width="20" height="10" /><path d="M12 2 L8 12 L16 12 Z" /><rect x="10" y="12" width="4" height="10" /></svg>`,
  "TRAINSTATION": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="16" /><path d="M2 18 L22 18" /><circle cx="7" cy="22" r="2" /><circle cx="17" cy="22" r="2" /></svg>`,
  "BUSSTOP": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 22 L20 22 L20 6 L4 6 Z" /><path d="M2 6 L22 6" /><rect x="8" y="10" width="8" height="8" /></svg>`,
  "SUBWAYSTATION": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 12 L22 12" /><circle cx="8" cy="16" r="2" /><circle cx="16" cy="16" r="2" /></svg>`,
  "SEAPORT": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12 C 8 8, 16 8, 22 12" /><path d="M2 22 L22 22" /><path d="M6 22 L6 14 L10 14 L10 22" /></svg>`,
  "MARINA": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12 C 8 8, 16 8, 22 12" /><path d="M2 22 L22 22" /><path d="M6 22 L6 14 M12 22 L12 14 M18 22 L18 14" /></svg>`,
  "LIGHTHOUSE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 22 L16 22 L16 2 L8 2 Z" /><path d="M6 22 L18 22" /><path d="M8 12 L16 12" /><path d="M2 2 L22 2" /></svg>`,
  "BRIDGE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 8 Q12 2 22 8" stroke="currentColor" fill="none" stroke-width="2" /><path d="M2 12 L22 12" stroke="currentColor" stroke-width="4" /></svg>`,
  "TUNNEL": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6 C 8 2, 16 2, 22 6" /><path d="M2 18 C 8 22, 16 22, 22 18" /><path d="M2 6 L2 18 M22 6 L22 18" /></svg>`,
  "HIGHWAY": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><path d="M2 12 L22 12" stroke="white" /><path d="M2 8 L22 8 M2 16 L22 16" stroke="white" stroke-dasharray="2 2" /></svg>`,
  "OVERPASS": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12 L22 12" stroke-width="4" /><path d="M2 18 L22 18" /><path d="M8 12 C 8 18, 16 18, 16 12" fill="none" stroke="currentColor" stroke-width="2" /></svg>`,
  "PARKINGLOT": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" /><path d="M2 8 L22 8 M2 16 L22 16 M8 2 L8 22 M16 2 L16 22" stroke="currentColor" /></svg>`,
  "MALL": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><path d="M2 8 L22 8" stroke="white" /><path d="M8 2 L8 22 M16 2 L16 22" stroke="white" /></svg>`,
  "SUPERMARKET": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><circle cx="8" cy="20" r="2" /><circle cx="16" cy="20" r="2" /><path d="M2 8 L22 8" stroke="white" /></svg>`,
  "RESTAURANT": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><circle cx="8" cy="10" r="2" fill="white" /><circle cx="16" cy="10" r="2" fill="white" /><path d="M6 16 L18 16" stroke="white" /></svg>`,
  "CAFE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4 L20 4 L18 20 L6 20 Z" /><path d="M2 4 L22 4" /><path d="M20 8 C 22 8, 22 12, 20 12" fill="none" stroke="white" /></svg>`,
  "BAR": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><path d="M2 8 L22 8" stroke="white" /><rect x="6" y="12" width="4" height="4" fill="white" /><rect x="14" y="12" width="4" height="4" fill="white" /></svg>`,
  "NIGHTCLUB": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><path d="M2 8 L22 8" stroke="white" /><circle cx="8" cy="14" r="2" fill="white" /><circle cx="16" cy="14" r="2" fill="white" /></svg>`,
  "THEATER": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 6 L12 2 L2 6 Z" /><path d="M2 6 L22 6" /><path d="M8 6 C 8 10, 16 10, 16 6" fill="none" stroke="white" /></svg>`,
  "CINEMA": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><path d="M2 8 L22 8" stroke="white" /><path d="M2 12 L22 12" stroke="white" /><path d="M2 16 L22 16" stroke="white" /></svg>`,
  "STADIUM": `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="8" /><ellipse cx="12" cy="12" rx="6" ry="4" fill="none" stroke="white" /></svg>`,
  "ARENA": `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" fill="none" stroke="white" /></svg>`,
  "GYM": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><circle cx="8" cy="12" r="2" fill="white" /><circle cx="16" cy="12" r="2" fill="white" /><path d="M8 12 L16 12" stroke="white" /></svg>`,
  "ZOO": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><circle cx="8" cy="8" r="2" fill="white" /><circle cx="16" cy="8" r="2" fill="white" /><path d="M8 16 C 8 14, 16 14, 16 16" fill="none" stroke="white" /></svg>`,
  "AQUARIUM": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6 C 8 2, 16 2, 22 6 C 22 18, 2 18, 2 6" /><path d="M6 10 Q 12 14, 18 10" fill="none" stroke="white" /></svg>`,
  "BOTANICALGARDEN": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M12 2 C 8 8, 16 8, 12 14" fill="none" stroke="white" /><path d="M12 14 L12 22" stroke="white" /></svg>`,
  "UNIVERSITY": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M2 8 L22 8" /><rect x="6" y="12" width="4" height="6" /><rect x="14" y="12" width="4" height="6" /></svg>`,
  "COLLEGE": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><path d="M2 8 L22 8" stroke="white" /><rect x="6" y="12" width="4" height="4" fill="white" /><rect x="14" y="12" width="4" height="4" fill="white" /></svg>`,
  "KINDERGARTEN": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" /><circle cx="8" cy="10" r="2" fill="white" /><circle cx="16" cy="10" r="2" fill="white" /><path d="M8 16 C 8 14, 16 14, 16 16" fill="none" stroke="white" /></svg>`,
  "DAYCARECENTER": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" /><circle cx="8" cy="10" r="2" fill="white" /><circle cx="16" cy="10" r="2" fill="white" /><path d="M8 16 C 8 14, 16 14, 16 16" fill="none" stroke="white" /></svg>`,
  "RETIREMENTHOME": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" /><path d="M2 8 L22 8" stroke="white" /><rect x="6" y="12" width="4" height="4" fill="white" /><rect x="14" y="12" width="4" height="4" fill="white" /><path d="M8 20 L16 20" stroke="white" /></svg>`,
  "CEMETERY": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><path d="M6 6 L6 18 M10 6 L10 18 M14 6 L14 18 M18 6 L18 18" stroke="white" /></svg>`,
  "CREMATORIUM": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M8 22 L8 12 L16 12 L16 22" stroke="white" /><path d="M12 2 L12 8" stroke="white" /></svg>`,
  "SYNAGOGUE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M8 2 L16 2" /><path d="M12 2 L12 22" stroke="white" /></svg>`,
  "MOSQUE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 10 C 22 6, 12 2, 12 2 C 12 2, 2 6, 2 10 Z" /><path d="M2 10 L22 10" stroke="white" /></svg>`,
  "TEMPLE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M2 8 L22 8" stroke="white" /><path d="M12 2 L12 22" stroke="white" /></svg>`,
  "MONASTERY": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="16" /><path d="M2 10 L22 10" stroke="white" /><path d="M12 2 L12 10" stroke="currentColor" stroke-width="4" /></svg>`,
  "COURTHOUSE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M2 8 L22 8" stroke="white" /><rect x="6" y="12" width="4" height="6" fill="white" /><rect x="14" y="12" width="4" height="6" fill="white" /></svg>`,
  "PRISON": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><path d="M6 2 L6 22 M10 2 L10 22 M14 2 L14 22 M18 2 L18 22" stroke="white" /></svg>`,
  "POSTOFFICE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6 L12 2 L22 6 L22 22 L2 22 Z" /><path d="M2 6 L12 12 L22 6" fill="none" stroke="white" /></svg>`,
  "BANK": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 L12 2 L2 8 Z" /><path d="M2 8 L22 8" stroke="white" /><rect x="6" y="12" width="4" height="6" fill="white" /><rect x="14" y="12" width="4" height="6" fill="white" /></svg>`,
  "STOCKEXCHANGE": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><path d="M2 12 L22 12" stroke="white" /><path d="M6 6 L18 18 M18 6 L6 18" stroke="white" /></svg>`,
  "HOTEL": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><path d="M2 8 L22 8" stroke="white" /><rect x="6" y="12" width="4" height="4" fill="white" /><rect x="14" y="12" width="4" height="4" fill="white" /></svg>`,
  "MOTEL": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 6 L12 2 L2 6 Z" /><path d="M2 10 L22 10" stroke="white" /><rect x="6" y="14" width="4" height="4" fill="white" /><rect x="14" y="14" width="4" height="4" fill="white" /></svg>`,
  "RESORT": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 8 C 22 4, 12 2, 12 2 C 12 2, 2 4, 2 8 Z" /><circle cx="12" cy="12" r="4" fill="white" /></svg>`,
  "CAMPGROUND": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L12 2 L22 22 Z" /><path d="M7 22 L17 22" stroke="white" /></svg>`,
  "AMUSEMENTPARK": `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><path d="M12 2 C 8 8, 16 8, 12 14 C 8 20, 16 20, 12 22" fill="none" stroke="white" /></svg>`,
  "WATERPARK": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M6 8 Q 12 2, 18 8 Q 12 14, 6 8" fill="white" /><path d="M6 16 Q 12 10, 18 16 Q 12 22, 6 16" fill="white" /></svg>`,
  "PLAYGROUND": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><circle cx="8" cy="8" r="2" fill="white" /><circle cx="16" cy="8" r="2" fill="white" /><path d="M6 16 C 6 14, 18 14, 18 16" fill="none" stroke="white" /></svg>`,
  "SPORTSFIELD": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><circle cx="12" cy="12" r="6" fill="none" stroke="white" /><path d="M2 12 L22 12" stroke="white" /></svg>`,
  "GOLFCOURSE": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><circle cx="12" cy="12" r="2" fill="white" /><path d="M12 6 L12 2" stroke="white" /></svg>`,
  "TENNISCOURT": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M2 12 L22 12" stroke="white" /><path d="M12 2 L12 22" stroke="white" /></svg>`,
  "SOCCERFIELD": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><circle cx="12" cy="12" r="6" fill="none" stroke="white" /><path d="M2 12 L22 12" stroke="white" /></svg>`,
  "BASEBALLFIELD": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M2 12 L22 12" stroke="white" /><path d="M12 2 Q 2 12, 12 22" fill="none" stroke="white" /></svg>`,
  "SWIMMINGPOOL": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M4 12 Q 8 10, 12 12 Q 16 14, 20 12" stroke="white" fill="none" /></svg>`,
  "BEACH": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 C 22 12, 2 12, 2 22" /><circle cx="20" cy="4" r="2" fill="white" /></svg>`,
  "FOREST": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 22 L12 8 L18 22 Z" /><path d="M2 22 L8 8 L14 22 Z" /><path d="M10 22 L16 8 L22 22 Z" /></svg>`,
  "MOUNTAIN": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L12 2 L22 22 Z" /><path d="M8 22 L16 10 L20 22 Z" fill="white" /></svg>`,
  "DESERT": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 Q 6 18, 12 22 Q 18 18, 22 22" /><circle cx="20" cy="4" r="2" fill="white" /></svg>`,
  "ISLAND": `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="8" /><path d="M8 14 Q 12 8, 16 14" fill="white" /></svg>`,
  "RIVER": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6 C 8 2, 16 10, 22 6 C 16 10, 8 18, 2 14 C 8 18, 16 10, 22 14" /></svg>`,
  "CANAL": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 8 L22 8 L22 16 L2 16 Z" /><path d="M6 8 L6 16 M18 8 L18 16" stroke="white" /></svg>`,
  "DAM": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L22 6 L2 6 Z" /><path d="M2 14 L22 14" stroke="white" /><path d="M6 6 L6 14 M12 6 L12 14 M18 6 L18 14" stroke="white" /></svg>`,
  "GLACIER": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L12 2 L22 22 Z" /><path d="M2 22 L22 22" /><path d="M7 22 L12 12 L17 22" fill="white" /></svg>`,
  "VOLCANO": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L8 6 L16 6 L22 22 Z" /><path d="M12 2 L12 6" /><path d="M10 12 L14 12 L12 6 Z" fill="white" /></svg>`,
  "CLIFF": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L12 2 L22 2 L22 22 Z" /></svg>`,
  "CAVE": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L2 6 C 2 2, 22 2, 22 6 L22 22 Z" /><ellipse cx="12" cy="6" rx="6" ry="4" fill="white" /></svg>`,
  "OASIS": `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" fill="white" /><path d="M8 12 C 8 8, 16 8, 16 12" fill="none" stroke="currentColor" /></svg>`,
  "GEYSER": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 22 L16 22 L16 8 C 16 4, 8 4, 8 8 Z" /><path d="M12 2 L12 8" stroke="white" /><path d="M10 4 L14 4" stroke="white" /></svg>`,
  "MARSH": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="12" width="20" height="10" /><path d="M2 16 Q 6 12, 12 16 Q 18 12, 22 16" fill="none" stroke="white" /></svg>`,
  "SWAMP": `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="12" width="20" height="10" /><path d="M2 16 Q 6 12, 12 16 Q 18 12, 22 16" fill="none" stroke="white" /><path d="M6 12 L6 8 M12 12 L12 6 M18 12 L18 8" stroke="currentColor" /></svg>`,
  "REEF": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12 C 8 8, 16 8, 22 12 C 16 16, 8 16, 2 12" /><path d="M4 12 C 8 8, 16 16, 20 12" fill="none" stroke="white" /></svg>`,
  "ICEBERG": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 22 L22 22 L18 6 L6 6 Z" /><path d="M6 6 L2 22 M18 6 L22 22" /><path d="M6 14 L18 14" stroke="white" /></svg>`,
  "COTTAGE": `<svg viewBox="0 0 24 24" fill="currentColor">
  <rect x="6" y="10" width="12" height="10" fill="#D4BBA5" />
  <polygon points="12,4 4,10 20,10" fill="#C8B1A1" />
  <rect x="9" y="12" width="3" height="5" fill="#7A4B3A" />
  <rect x="12" y="12" width="3" height="5" fill="#7A4B3A" />
  <rect x="10" y="15" width="4" height="1" fill="#FFF" />
  <rect x="8" y="12" width="2" height="2" fill="#FFF" />
  <rect x="14" y="12" width="2" height="2" fill="#FFF" />
  <rect x="2" y="12" width="2" height="1" fill="#7A4B3A" />
  <rect x="20" y="12" width="2" height="1" fill="#7A4B3A" />
</svg>
`,
  "GATE": `<svg viewBox="0 0 24 24" fill="currentColor">
  <rect x="8" y="4" width="8" height="16" fill="#7A4B3A" />
  <rect x="9" y="0" width="6" height="4" fill="#C8B1A1" />
  <rect x="8" y="12" width="1" height="8" fill="#FFF" />
  <rect x="15" y="12" width="1" height="8" fill="#FFF" />
  <polygon points="8,4 12,0 16,4" fill="#A0522D" />
</svg>
`,
  "CAGE": `<svg viewBox="0 0 24 24" fill="currentColor">
  <rect x="5" y="3" width="14" height="18" fill="#8B4513" />
  <line x1="5" y1="3" x2="19" y2="3" stroke="#FFF" stroke-width="2" />
  <line x1="5" y1="21" x2="19" y2="21" stroke="#FFF" stroke-width="2" />
  <line x1="5" y1="7" x2="19" y2="7" stroke="#FFF" stroke-width="2" />
  <line x1="5" y1="11" x2="19" y2="11" stroke="#FFF" stroke-width="2" />
  <line x1="5" y1="15" x2="19" y2="15" stroke="#FFF" stroke-width="2" />
  <line x1="12" y1="3" x2="12" y2="21" stroke="#FFF" stroke-width="2" />
</svg>
`,
  "TREE": `<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Tree trunk -->
  <rect x="10" y="14" width="4" height="6" fill="#8B4513"/>

  <!-- Tree foliage -->
  <circle cx="12" cy="10" r="6" fill="#228B22"/>
  <circle cx="9" cy="7" r="5" fill="#228B22"/>
  <circle cx="15" cy="7" r="5" fill="#228B22"/>
</svg>
`
}

// const cityBuildingBlocks = [
//     "Hall", "Pool", "Pond", "Lake", "House", "Museum", "Library", "School",
//     "Church", "Chapel", "Park", "Court", "Pillar", "Bench", "Road", "Lane",
//     "Cabin", "Garage", "Lot", "Apartment", "Skyscraper", "Office building",
//     "Factory", "Power plant", "Solar farm", "Wind turbine", "Hospital",
//     "Clinic", "Police station", "Fire station", "Airport", "Train station",
//     "Bus stop", "Subway station", "Seaport", "Marina", "Lighthouse", "Bridge",
//     "Tunnel", "Highway", "Overpass", "Parking lot", "Mall", "Supermarket",
//     "Restaurant", "Cafe", "Bar", "Nightclub", "Theater", "Cinema",
//     "Concert hall", "Stadium", "Arena", "Gym", "Zoo", "Aquarium",
//     "Botanical garden", "University", "College", "Kindergarten",
//     "Daycare center", "Retirement home", "Cemetery", "Crematorium",
//     "Synagogue", "Mosque", "Temple", "Monastery", "Courthouse", "Prison",
//     "Post office", "Bank", "Stock exchange", "Hotel", "Motel", "Resort",
//     "Campground", "Amusement park", "Water park", "Playground", "Sports field",
//     "Golf course", "Tennis court", "Basketball court", "Skateboard park",
//     "Bike lane", "Pedestrian walkway", "Fountain", "Monument", "Statue",
//     "Observatory", "Planetarium", "Warehouse", "Storage facility",
//     "Recycling center", "Waste treatment plant", "Water tower", "Dam", "Canal",
//     "Aqueduct", "Sewer system", "Electrical substation",
//     "Telecommunications tower", "Data center", "Greenhouse", "Farm", "Orchard",
//     "Vineyard", "Mine", "Quarry", "Refinery", "Brewery", "Winery", "Distillery",
//     "Bakery", "Farmers market", "Flea market", "Art gallery", "Craft workshop"
// ];