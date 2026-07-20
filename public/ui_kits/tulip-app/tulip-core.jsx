// tulip-core.jsx — faithful port of the live Tulip app's data + shared atoms.
// Mirrors src/data/services.ts, src/theme/tokens.ts and the shared components
// (ServiceTile, MultiServiceTabs, ActiveEsimCard, CurrencyPicker, Flag).

// ─── Extra icons (merged into the shared Icons map from data.jsx) ───
Object.assign(Icons, {
  Car:        ico('<path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M5 12h14"/>'),
  Ticket:     ico('<path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M13 5v2M13 17v2M13 11v2"/>'),
  Coins:      ico('<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/>'),
  Moon:       ico('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>'),
  MessageCircle: ico('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>'),
  Receipt:    ico('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1z"/><path d="M8 7h8M8 11h8M8 15h5"/>'),
  ArrowUpDown: ico('<path d="M7 4v16M7 4 4 7M7 4l3 3M17 20V4M17 20l3-3M17 20l-3-3"/>'),
  Minus:      ico('<path d="M5 12h14"/>'),
  BedDouble:  ico('<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M2 17h20M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/>'),
});

// ─── Brand service palette (1:1 with src/data/services.ts) ───
const SERVICES = [
  { id: 'flights',   label: 'Flights',    verb: 'Find flights',             I: 'Plane',      color: '#1967D2', tint: 'rgba(25,103,210,0.10)', hint: 'Where to next?' },
  { id: 'hotels',    label: 'Hotels',     verb: 'Find a place to stay',     I: 'Building',   color: '#7C3AED', tint: 'rgba(124,58,237,0.10)', hint: 'City or hotel name' },
  { id: 'esim',      label: 'eSIM',       verb: 'Stay connected',           I: 'Globe',      color: '#10B981', tint: 'rgba(16,185,129,0.12)', hint: 'Country or region' },
  { id: 'transfers', label: 'Transfers',  verb: 'Airport & city transfers', I: 'ArrowRight', color: '#F59E0B', tint: 'rgba(245,158,11,0.12)', hint: 'Pickup location' },
  { id: 'cars',      label: 'Car Rental', verb: 'Rent a car',               I: 'Car',        color: '#DC2626', tint: 'rgba(220,38,38,0.10)', hint: 'Pickup city' },
];

// ─── Bottom-tab / sidebar nav (1:1 with NAV) ───
const NAV = [
  { key: 'home',     label: 'Home',     I: 'Home' },
  { key: 'services', label: 'Services', I: 'Bookmark' },
  { key: 'bookings', label: 'Bookings', I: 'Ticket' },
  { key: 'profile',  label: 'Profile',  I: 'User' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$',   name: 'US Dollar',   flag: 'US' },
  { code: 'EUR', symbol: '€',   name: 'Euro',        flag: 'EU' },
  { code: 'IQD', symbol: 'IQD', name: 'Iraqi Dinar', flag: 'IQ' },
];

// ─── Mock domain data ───
const ACTIVE_ESIMS = [
  { id: 'gb-1', country: 'United Kingdom', iso: 'GB', planGb: 5, planDays: 14, remainingMb: 3225, usedMb: 1895, hoursLeft: 264 },
  { id: 'jp-1', country: 'Japan',          iso: 'JP', planGb: 3, planDays: 30, remainingMb: 410,  usedMb: 2662, hoursLeft: 40 },
];
const POPULAR = [
  { code: 'TR', name: 'Türkiye' }, { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' }, { code: 'US', name: 'United States' },
  { code: 'FR', name: 'France' }, { code: 'JP', name: 'Japan' },
];
const REGIONS = [
  { code: 'EU', name: 'Europe' }, { code: 'AS', name: 'Asia Pacific' }, { code: 'NA', name: 'North America' },
  { code: 'ME', name: 'Middle East' }, { code: 'AF', name: 'Africa' }, { code: 'GL', name: 'Global' },
];
const COUNTRIES = [
  'TR Türkiye', 'AE United Arab Emirates', 'GB United Kingdom', 'US United States', 'FR France',
  'JP Japan', 'IT Italy', 'ES Spain', 'DE Germany', 'TH Thailand', 'GR Greece', 'EG Egypt',
  'SA Saudi Arabia', 'IQ Iraq', 'NL Netherlands', 'CH Switzerland', 'SG Singapore', 'MA Morocco',
].map(s => ({ code: s.slice(0, 2), name: s.slice(3) }));
const GRADIENTS = [['#1967D2','#0B4FB0'],['#10B981','#047857'],['#7C3AED','#5B21B6'],['#F59E0B','#B45309'],['#EC4899','#9D174D'],['#0EA5E9','#0369A1']];

// ─── Circular flags (HatScripts/circle-flags — matches the app's Flag) ───
const circleFlag = (iso) => `https://cdn.jsdelivr.net/gh/HatScripts/circle-flags/flags/${(iso || '').toLowerCase()}.svg`;
function Flag({ iso, size = 28 }) {
  const [err, setErr] = React.useState(false);
  const code = (iso || '').toUpperCase();
  if (!iso || err) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: Math.max(8, Math.round(size * 0.34)), fontWeight: 800, color: '#4B5563' }}>{code.slice(0, 2)}</span>
      </div>
    );
  }
  return <img src={circleFlag(iso)} onError={() => setErr(true)} width={size} height={size} alt="" style={{ borderRadius: '50%', display: 'block', flexShrink: 0, objectFit: 'cover' }} />;
}

// ─── Money (current currency from window.__cur, default USD) ───
const RATES = { USD: 1, EUR: 0.92, IQD: 1310 };
function money(usd) {
  const cur = (window.__cur && window.__cur.code) || 'USD';
  const c = CURRENCIES.find(x => x.code === cur);
  const v = usd * RATES[cur];
  const n = cur === 'IQD' ? Math.round(v).toLocaleString('en-US') : v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return cur === 'IQD' ? `${n} ${c.symbol}` : `${c.symbol}${n}`;
}

// ─── ScreenHeader ───
function ScreenHeader({ title, subtitle }) {
  return (
    <div>
      <h1 style={{ fontSize: 28, letterSpacing: -0.6 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 4, marginBottom: 0 }}>{subtitle}</p>}
    </div>
  );
}

// ─── Section + Row (Profile) ───
function Section({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8, paddingLeft: 4 }}>{label}</div>
      <div className="tu-card" style={{ borderRadius: 14, overflow: 'hidden', padding: 0 }}>{children}</div>
    </div>
  );
}
function Row({ icon, title, sub, right, onClick, last }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: last ? 'none' : '1px solid var(--border)', cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--fg)' }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// ─── MultiServiceTabs (pill row; onDark variant for the photo hero) ───
function MultiServiceTabs({ active, onSelect, onDark }) {
  return (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }} className="tu-noscroll">
      {SERVICES.map(s => {
        const on = s.id === active;
        const Ic = Icons[s.I];
        const bg = onDark ? (on ? '#FFFFFF' : 'rgba(255,255,255,0.16)') : (on ? s.tint : 'transparent');
        const bc = onDark ? (on ? '#FFFFFF' : 'rgba(255,255,255,0.28)') : (on ? s.color : 'transparent');
        const fc = onDark ? (on ? s.color : 'rgba(255,255,255,0.95)') : (on ? s.color : 'var(--fg-muted)');
        return (
          <button key={s.id} onClick={() => onSelect && onSelect(s.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 999,
            background: bg, border: `1.5px solid ${bc}`, color: fc, cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            <Ic size={15} color={fc} strokeWidth={2} /> {s.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── ServiceTile (home grid) ───
function ServiceTile({ svc }) {
  const Ic = Icons[svc.I];
  return (
    <div onClick={() => window.__nav && window.__nav.svc(svc.id)} className="tu-card tu-press" style={{ borderRadius: 16, padding: 14, height: 132, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: svc.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Ic size={18} color={svc.color} strokeWidth={2} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--fg)', letterSpacing: -0.2 }}>{svc.label}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>{svc.verb}</div>
      </div>
    </div>
  );
}

// ─── CurrencyChip (header) ───
function CurrencyChip() {
  const [code, setCode] = React.useState((window.__cur && window.__cur.code) || 'USD');
  const [open, setOpen] = React.useState(false);
  const pick = (c) => { window.__cur = { code: c }; setCode(c); setOpen(false); };
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} className="tu-card" style={{ display: 'flex', alignItems: 'center', gap: 5, height: 40, padding: '0 12px', borderRadius: 20, cursor: 'pointer', background: 'var(--bg-elev)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--fg)' }}>{code}</span>
        <Icons.ChevronDown size={14} color="var(--fg-muted)" strokeWidth={2.2} />
      </button>
      {open && (
        <div className="tu-card" style={{ position: 'absolute', top: 46, right: 0, width: 220, borderRadius: 16, overflow: 'hidden', zIndex: 30, boxShadow: 'var(--shadow-3)' }}>
          {CURRENCIES.map(c => (
            <div key={c.code} onClick={() => pick(c.code)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: c.code === code ? 'var(--bg-sunken)' : 'transparent', cursor: 'pointer' }}>
              <Flag iso={c.flag} size={24} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{c.code} · {c.symbol}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{c.name}</div>
              </div>
              {c.code === code && <Icons.Check size={16} color="var(--primary)" strokeWidth={2.4} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ActiveEsimCard (home widget) ───
function fmtMb(mb) { return mb >= 1024 ? `${(mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1)} GB` : `${mb} MB`; }
function fmtHours(h) { return h >= 48 ? `${Math.floor(h / 24)} days left` : `${h}h left`; }
function ActiveEsimCard() {
  const active = ACTIVE_ESIMS;
  if (!active.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icons.Signal size={16} color="var(--success)" strokeWidth={2.2} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--fg)', letterSpacing: -0.3, whiteSpace: 'nowrap' }}>{active.length > 1 ? 'Active eSIMs' : 'Active eSIM'}</span>
      </div>
      {active.map(e => {
        const frac = Math.max(0, Math.min(e.remainingMb / (e.planGb * 1024), 1));
        const low = frac <= 0.2 || e.hoursLeft <= 48;
        const bar = low ? 'var(--warning)' : 'var(--success)';
        return (
          <div key={e.id} onClick={() => window.__nav && window.__nav.go('esimDetail')} className="tu-card tu-press" style={{ borderRadius: 16, padding: 16, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Flag iso={e.iso} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>{e.country}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 1 }}>{e.planGb} GB · {e.planDays} days</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--fg)', whiteSpace: 'nowrap' }}>{fmtMb(e.remainingMb)}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>left</div>
              </div>
              <Icons.ChevronRight size={18} color="var(--fg-faint)" />
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                <div style={{ width: `${frac * 100}%`, height: 6, borderRadius: 3, background: bar }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{fmtMb(e.usedMb)} used</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: low ? 'var(--warning)' : 'var(--fg-muted)' }}>{fmtHours(e.hoursLeft)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Scannable QR with the Tulip mark centered on a white badge ───
function TulipQR({ size = 220 }) {
  return (
    <div style={{ width: size, height: size, background: '#fff', borderRadius: 16, padding: 16, position: 'relative' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        {Array(11).fill(0).map((_, y) => Array(11).fill(0).map((_, x) => {
          const seed = (x * 7 + y * 13 + 5) % 11;
          const fill = seed > 4 || (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
          return fill ? <rect key={x + '-' + y} x={x * 9 + 1} y={y * 9 + 1} width="7" height="7" fill="#0F1729" rx="1" /> : null;
        }))}
        {[[0, 0], [8, 0], [0, 8]].map(([x, y]) => (
          <g key={x + '-' + y}>
            <rect x={x * 9} y={y * 9} width="25" height="25" fill="none" stroke="#0F1729" strokeWidth="2.5" rx="2" />
            <rect x={x * 9 + 6} y={y * 9 + 6} width="13" height="13" fill="#0F1729" rx="1.5" />
          </g>
        ))}
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: size * 0.21, height: size * 0.21, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 5px #fff' }}>
        <img src="assets/tulip-mark.svg" width={size * 0.14} height={size * 0.14} alt="Tulip" />
      </div>
    </div>
  );
}

Object.assign(window, { SERVICES, NAV, CURRENCIES, ACTIVE_ESIMS, POPULAR, REGIONS, COUNTRIES, GRADIENTS, circleFlag, Flag, money, ScreenHeader, Section, Row, MultiServiceTabs, ServiceTile, CurrencyChip, ActiveEsimCard, TulipQR });
