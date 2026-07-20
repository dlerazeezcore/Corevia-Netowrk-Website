// tulip-v2/data.jsx — sample data + shared atoms (flags, icons, helpers)

// Twemoji flag SVGs by ISO-2 country code
const flagUrl = (iso2) => {
  const cps = [...iso2.toUpperCase()].map(c => (c.charCodeAt(0) - 65 + 0x1F1E6).toString(16)).join('-');
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${cps}.svg`;
};

// Tiny inline lucide-style icons (1.75 stroke). Avoids the runtime cost
// of pulling lucide for 30 artboards. Each returns an SVG element.
const ico = (path, opts = {}) => ({ size = 18, color = 'currentColor', strokeWidth = 1.75, fill = 'none' } = opts) =>
  React.createElement('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill,
    stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { flexShrink: 0, display: 'block' },
  }, React.createElement('g', { dangerouslySetInnerHTML: { __html: path } }));

const Icons = {
  Home:      ico('<path d="M3 12 12 4l9 8"/><path d="M5 10v10h14V10"/>'),
  Plane:     ico('<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>'),
  Building:  ico('<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>'),
  Signal:    ico('<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>'),
  Globe:     ico('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
  Bell:      ico('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
  User:      ico('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  CreditCard:ico('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
  QrCode:    ico('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/><path d="M20 14v7"/><path d="M14 20h3"/>'),
  Settings:  ico('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.16.66.43.86.78z"/>'),
  MapPin:    ico('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
  Search:    ico('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
  Bookmark:  ico('<path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>'),
  Heart:     ico('<path d="M19 14c1.5-1.5 3-3.5 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2 1.5 4 3 5.5l7 7z"/>'),
  ChevronRight: ico('<path d="m9 18 6-6-6-6"/>'),
  ChevronLeft:  ico('<path d="m15 18-6-6 6-6"/>'),
  ChevronDown:  ico('<path d="m6 9 6 6 6-6"/>'),
  Check:        ico('<path d="M20 6 9 17l-5-5"/>'),
  X:            ico('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
  Plus:         ico('<path d="M12 5v14"/><path d="M5 12h14"/>'),
  Filter:       ico('<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>'),
  Calendar:     ico('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>'),
  Clock:        ico('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  Wifi:         ico('<path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>'),
  ArrowRight:   ico('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
  ArrowLeft:    ico('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'),
  MoreVertical: ico('<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>'),
  Tulip: ico('<path d="M12 2c-2 3-5 5-5 9a5 5 0 0 0 10 0c0-4-3-6-5-9z"/><path d="M12 14v8"/><path d="M9 22h6"/>'),
  Star: ico('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
  Coffee: ico('<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/>'),
};

// ─── Sample data ───
const SAMPLE = {
  user: { firstName: 'Jane', initials: 'JO' },
  activeEsim: {
    country: 'Japan', flag: 'JP',
    used: 2.3, total: 5,    // GB
    daysLeft: 8,
  },
  popular: [
    { iso: 'JP', name: 'Japan',   from: 4.5,  hue: '#ef4444' },
    { iso: 'FR', name: 'France',  from: 5.0,  hue: '#3b82f6' },
    { iso: 'TH', name: 'Thailand',from: 3.5,  hue: '#10b981' },
    { iso: 'US', name: 'USA',     from: 6.0,  hue: '#6366f1' },
    { iso: 'IT', name: 'Italy',   from: 5.5,  hue: '#f59e0b' },
    { iso: 'ES', name: 'Spain',   from: 4.0,  hue: '#dc2626' },
  ],
  countries: [
    { iso: 'JP', name: 'Japan', from: 4.5 },
    { iso: 'FR', name: 'France', from: 5.0 },
    { iso: 'GB', name: 'United Kingdom', from: 5.5 },
    { iso: 'TH', name: 'Thailand', from: 3.5 },
    { iso: 'US', name: 'United States', from: 6.0 },
    { iso: 'IT', name: 'Italy', from: 5.5 },
    { iso: 'ES', name: 'Spain', from: 4.0 },
    { iso: 'DE', name: 'Germany', from: 5.0 },
  ],
  bundles: [
    { gb: 1,  days: 7,  price: 4.5  },
    { gb: 3,  days: 15, price: 10,  popular: true },
    { gb: 5,  days: 30, price: 15   },
    { gb: 10, days: 30, price: 25   },
    { gb: 20, days: 30, price: 39   },
  ],
  myEsims: [
    { id: 'jp-1', country: 'Japan', iso: 'JP', used: 2.3, total: 5, daysLeft: 8, status: 'active', iccid: '8981 1900 0000 1234' },
    { id: 'fr-1', country: 'France', iso: 'FR', used: 0.4, total: 3, daysLeft: 22, status: 'active', iccid: '8981 1900 0000 5678' },
  ],
  bookings: [
    { type: 'flight', code: 'AA 100', from: 'JFK', to: 'LHR', date: 'Mon, Jun 9',
      depart: '21:35', arrive: '09:30+1', terminal: 'T8', status: 'upcoming' },
    { type: 'hotel', name: 'Marriott Times Square', city: 'New York, NY',
      checkin: 'Jun 10', checkout: 'Jun 14', nights: 4, status: 'upcoming' },
    { type: 'flight', code: 'BA 175', from: 'LHR', to: 'JFK', date: 'Sun, Jun 22',
      depart: '14:20', arrive: '17:40', terminal: 'T5', status: 'upcoming' },
    { type: 'hotel', name: 'Park Hyatt Tokyo', city: 'Shinjuku, Tokyo',
      checkin: 'May 2', checkout: 'May 6', nights: 4, status: 'completed' },
  ],
};

Object.assign(window, { flagUrl, Icons, SAMPLE });
