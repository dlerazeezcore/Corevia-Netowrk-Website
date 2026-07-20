// tulip-screens.jsx — faithful ports of the live app's screens.
// Each screen takes { wide } so one set serves the phone frames AND the web
// sidebar shell (mirrors the app's useIsWideWeb branch).

const HERO_PHOTO = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85';

// ════════════════════════════ HOME ════════════════════════════
function THome({ wide }) {
  const [active, setActive] = React.useState('flights');
  const svc = SERVICES.find(s => s.id === active);
  return (
    <div style={{ padding: wide ? 28 : 20, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: 'var(--fg-muted)', fontWeight: 500 }}>Good morning, Jane</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, letterSpacing: -0.8, color: 'var(--fg)', marginTop: 4 }}>Where to next?</div>
        </div>
        <CurrencyChip />
      </div>

      {/* Photo-glass hero search */}
      <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-2)' }}>
        <img src={HERO_PHOTO} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.30), rgba(15,23,42,0.55))' }} />
        <div style={{ position: 'relative', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, background: 'rgba(15,23,42,0.18)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <MultiServiceTabs active={active} onSelect={setActive} onDark />
          <div onClick={() => window.__nav && window.__nav.svc(active)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.92)', cursor: 'pointer' }}>
            <Icons.Search size={18} color="#717182" />
            <span style={{ flex: 1, fontSize: 14, color: '#9AA0AB' }}>{svc.verb}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '8px 14px', background: svc.color, borderRadius: 999, color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              Search <Icons.ArrowRight size={12} color="#fff" strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </div>

      <ActiveEsimCard />

      {/* Services */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--fg)', letterSpacing: -0.3 }}>Services</span>
          <span onClick={() => window.__nav && window.__nav.root('services')} style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)', gap: 10 }}>
          {SERVICES.map(s => <ServiceTile key={s.id} svc={s} />)}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════ SERVICES ════════════════════════════
function TServices({ wide }) {
  return (
    <div style={{ padding: wide ? 28 : 20, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <ScreenHeader title="Services" subtitle="Everything for your trip, in one place." />
      <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: 14 }}>
        {SERVICES.map(s => {
          const Ic = Icons[s.I];
          return (
            <div key={s.id} onClick={() => window.__nav && window.__nav.svc(s.id)} className="tu-card tu-press" style={{ borderRadius: 18, padding: 22, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 70, background: s.tint, opacity: 0.6 }} />
              <div style={{ position: 'relative' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ic size={26} color={s.color} strokeWidth={2} />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--fg)', marginTop: 14 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 4 }}>{s.verb}</div>
                <span style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: s.color, borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-display)' }}>
                  Open <Icons.ArrowRight size={12} color="#fff" strokeWidth={2.4} />
                </span>
              </div>
            </div>
          );
        })}
        {/* More soon slot */}
        <div style={{ borderRadius: 18, border: '2px dashed var(--border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 12, padding: 22 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, border: '2px dashed var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Plus size={24} color="var(--fg-faint)" strokeWidth={2} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--fg-muted)' }}>More soon</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', textAlign: 'center' }}>New services are on the way.</div>
        </div>
      </div>
      {/* Bundle promo */}
      <div style={{ padding: 20, borderRadius: 18, background: 'linear-gradient(90deg, var(--tu-blue-50), var(--tu-blue-100))', display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icons.Star size={26} color="#fff" strokeWidth={2.2} fill="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--tu-blue-800)' }}>Bundle &amp; save</div>
          <div style={{ fontSize: 12, color: 'var(--tu-blue-700)', marginTop: 3 }}>Book flights, hotels and eSIM together for member pricing.</div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════ BOOKINGS ════════════════════════════
function TBookings({ wide }) {
  const rows = SERVICES.map(s => {
    const esim = s.id === 'esim';
    const title = esim ? 'My eSIMs' : s.id === 'hotels' ? 'My stays' : `My ${s.label}`;
    const sub = esim ? '2 items · 2 active' : 'Coming soon';
    return { ...s, title, sub, esim };
  });
  return (
    <div style={{ padding: wide ? 28 : 20, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <ScreenHeader title="Bookings" subtitle="Manage your trips and saved items." />
      <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(2, 1fr)' : '1fr', gap: 10 }}>
        {rows.map(s => {
          const Ic = Icons[s.I];
          return (
            <div key={s.id} onClick={() => window.__nav && window.__nav.go(s.esim ? 'esimDetail' : 'home')} className="tu-card tu-press" style={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 16, padding: 16, cursor: 'pointer' }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: s.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic size={22} color={s.color} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--fg)' }}>{s.title}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{s.sub}</div>
              </div>
              <Icons.ChevronRight size={18} color="var(--fg-faint)" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════ PROFILE ════════════════════════════
function TToggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{ width: 46, height: 28, borderRadius: 999, background: on ? 'var(--primary)' : 'var(--bg-sunken)', padding: 3, cursor: 'pointer', transition: 'background .15s', display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start' }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
    </div>
  );
}
function TProfile({ wide }) {
  const [dark, setDark] = React.useState((window.__theme || 'light') === 'dark');
  const [notif, setNotif] = React.useState(true);
  const toggleDark = () => { const next = !dark; setDark(next); window.__setTheme && window.__setTheme(next ? 'dark' : 'light'); };

  const travelers = (
    <Section label="Travelers">
      <Row icon={<Icons.User size={16} color="var(--fg-muted)" />} title="Saved travelers" sub="2 people · passports & preferences" right={<Icons.ChevronRight size={16} color="var(--fg-faint)" />} onClick={() => {}} last />
    </Section>
  );
  const prefs = (
    <Section label="Preferences">
      <Row icon={<Icons.Moon size={16} color="var(--fg-muted)" />} title="Dark mode" sub={dark ? 'On' : 'Off'} right={<TToggle on={dark} onClick={toggleDark} />} />
      <Row icon={<Icons.Coins size={16} color="var(--fg-muted)" />} title="Currency" sub={(window.__cur && window.__cur.code) || 'USD'} right={<CurrencyChip />} />
      <Row icon={<Icons.Globe size={16} color="var(--fg-muted)" />} title="Language" sub="English" right={<Icons.ChevronRight size={16} color="var(--fg-faint)" />} />
      <Row icon={<Icons.Bell size={16} color="var(--fg-muted)" />} title="Notifications" sub={notif ? 'On' : 'Off'} right={<TToggle on={notif} onClick={() => setNotif(n => !n)} />} last />
    </Section>
  );
  const account = (
    <Section label="Account & support">
      <Row icon={<Icons.Settings size={16} color="var(--fg-muted)" />} title="Edit profile" sub="Name, email, photo" right={<Icons.ChevronRight size={16} color="var(--fg-faint)" />} onClick={() => {}} />
      <Row icon={<Icons.Receipt size={16} color="var(--fg-muted)" />} title="Order history" sub="Receipts & invoices" right={<Icons.ChevronRight size={16} color="var(--fg-faint)" />} onClick={() => {}} />
      <Row icon={<Icons.MessageCircle size={16} color="var(--fg-muted)" />} title="Support" sub="We usually reply in minutes" right={<Icons.ChevronRight size={16} color="var(--fg-faint)" />} onClick={() => {}} last />
    </Section>
  );

  return (
    <div style={{ padding: wide ? 28 : 20, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: wide ? 1080 : 760, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <ScreenHeader title="Profile" />
      {/* Hero */}
      <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-2)' }}>
        <img src={HERO_PHOTO} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 82%, transparent), rgba(15,23,42,0.78))' }} />
        <div style={{ position: 'relative', padding: 22, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: 'rgba(255,255,255,0.28)', border: '1.5px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: -0.4 }}>JO</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: -0.4 }}>Jane Olsen</div>
            <div style={{ fontSize: 12, color: '#fff', opacity: 0.88 }}>jane@peaktravel.co</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, padding: '4px 10px', background: 'rgba(255,255,255,0.22)', borderRadius: 999 }}>
              <Icons.Star size={11} color="#fff" fill="#fff" />
              <span style={{ color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: 0.6 }}>TULIP+ MEMBER · SINCE 2021</span>
            </div>
          </div>
        </div>
      </div>

      {wide ? (
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>{travelers}{prefs}</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>{account}<SignOut /></div>
        </div>
      ) : (
        <>{travelers}{prefs}{account}<SignOut /></>
      )}
      <div style={{ textAlign: 'center', paddingTop: 4 }}>
        <div style={{ fontSize: 11, color: 'var(--fg-faint)' }}>Brought to you by</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--fg-muted)', letterSpacing: -0.2 }}>Corevia Network</div>
      </div>
    </div>
  );
}
function SignOut() {
  return <div style={{ padding: 14, borderRadius: 14, border: '1.5px solid var(--danger)', textAlign: 'center', cursor: 'pointer' }}><span style={{ color: 'var(--danger)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)' }}>Sign out</span></div>;
}

Object.assign(window, { THome, TServices, TBookings, TProfile });
