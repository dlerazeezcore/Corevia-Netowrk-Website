// tulip-frames.jsx — device/window chrome. WebShell (sidebar) + Phone (iOS/Android).
// Both render the real 4-item nav (Home / Services / Bookings / Profile).

// ─── Web desktop shell: 240px sidebar + scrolling content (no top bar — matches app) ───
function WebShell({ children, theme = 'light', active = 'home' }) {
  return (
    <div data-theme={theme} className="tulip" style={{ width: 1280, height: 832, borderRadius: 16, overflow: 'hidden', background: 'var(--bg)', display: 'flex', boxShadow: '0 24px 60px rgba(0,0,0,.18)', border: '1px solid var(--border)' }}>
      <aside style={{ width: 240, background: 'var(--bg-elev)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '24px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 28px' }}>
          <img src="assets/tulip-mark.svg" alt="" width="32" height="32" style={{ display: 'block' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--fg)' }}>Tulip Booking</div>
        </div>
        {NAV.map(n => {
          const on = n.key === active;
          const Ic = Icons[n.I];
          return (
            <div key={n.key} onClick={() => window.__nav && window.__nav.root(n.key)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, marginBottom: 4, background: on ? 'var(--primary)' : 'transparent', cursor: 'pointer' }}>
              <Ic size={18} color={on ? '#fff' : 'var(--fg-muted)'} strokeWidth={2} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: on ? '#fff' : 'var(--fg)' }}>{n.label}</span>
            </div>
          );
        })}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 6px 0', borderTop: '1px solid var(--border)' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12 }}>JO</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>Jane Olsen</div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>jane@peaktravel.co</div>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, minWidth: 0, position: 'relative', overflowY: 'auto' }} className="tu-noscroll">
        {children}
      </main>
    </div>
  );
}

// ─── Phone status bar ───
function StatusBar({ os }) {
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'relative', flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>9:41</span>
      {os === 'ios'
        ? <div style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', width: 92, height: 28, borderRadius: 16, background: '#000' }} />
        : <div style={{ position: 'absolute', left: '50%', top: 12, transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#000' }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Icons.Signal size={14} color="var(--fg)" strokeWidth={2.4} />
        <Icons.Wifi size={14} color="var(--fg)" strokeWidth={2.2} />
        <div style={{ width: 22, height: 11, borderRadius: 3, border: '1.5px solid var(--fg)', padding: 1.5, display: 'flex' }}><div style={{ flex: 1, background: 'var(--fg)', borderRadius: 1 }} /></div>
      </div>
    </div>
  );
}

// ─── Phone bottom tab bar (iOS blur / Android solid) ───
function TabBar({ os, active }) {
  const isAndroid = os === 'android';
  return (
    <div style={{
      display: 'flex', padding: `10px 8px ${isAndroid ? 14 : 26}px`, borderTop: '1px solid var(--border)',
      background: isAndroid ? 'var(--bg-elev)' : (
        'color-mix(in srgb, var(--bg-elev) 80%, transparent)'),
      backdropFilter: isAndroid ? 'none' : 'blur(20px)', WebkitBackdropFilter: isAndroid ? 'none' : 'blur(20px)',
      flexShrink: 0,
    }}>
      {NAV.map(n => {
        const on = n.key === active;
        const Ic = Icons[n.I];
        return (
          <div key={n.key} onClick={() => window.__nav && window.__nav.root(n.key)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
            <div style={{ padding: '5px 16px', borderRadius: 999, background: on ? 'color-mix(in srgb, var(--primary) 12%, transparent)' : 'transparent' }}>
              <Ic size={22} color={on ? 'var(--primary)' : 'var(--fg-muted)'} strokeWidth={on ? 2.4 : 2} />
            </div>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: on ? 700 : 600, color: on ? 'var(--primary)' : 'var(--fg-muted)' }}>{n.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Phone frame ───
function Phone({ children, theme = 'light', active = 'home', os = 'ios', w = 393, h = 852 }) {
  const radius = os === 'ios' ? 52 : 40;
  return (
    <div style={{ width: w, height: h, borderRadius: radius, background: '#000', padding: 12, boxShadow: '0 30px 70px rgba(0,0,0,.45)' }}>
      <div data-theme={theme} className="tulip" style={{ width: '100%', height: '100%', borderRadius: radius - 12, overflow: 'hidden', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar os={os} />
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', position: 'relative' }} className="tu-noscroll">{children}</div>
        <TabBar os={os} active={active} />
      </div>
    </div>
  );
}

Object.assign(window, { WebShell, Phone });
