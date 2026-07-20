// tulip-esim.jsx — eSIM store + detail, and the service search screen.

// ════════════════════════════ eSIM STORE ════════════════════════════
function TEsimStore({ wide }) {
  const [tab, setTab] = React.useState('popular');
  const [q, setQ] = React.useState('');
  const max = wide ? 1120 : 900;
  const filtered = COUNTRIES.filter(c => !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.code.toLowerCase().includes(q.toLowerCase()));

  const tabSwitcher = (
    <div style={{ display: 'flex', background: 'var(--bg-sunken)', borderRadius: 12, padding: 4 }}>
      {[['popular', 'Popular'], ['countries', 'Countries'], ['regions', 'Regions']].map(([id, label]) => {
        const on = id === tab;
        return (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', cursor: 'pointer', background: on ? 'var(--bg-elev)' : 'transparent', boxShadow: on ? 'var(--shadow-1)' : 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: on ? 'var(--fg)' : 'var(--fg-muted)' }}>{label}</button>
        );
      })}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px' }}>
        <div onClick={() => window.__nav && window.__nav.back()} style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icons.ChevronLeft size={18} color="var(--fg)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Globe size={20} color="#10B981" strokeWidth={2} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap' }}>eSIM Store</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }} className="tu-noscroll">
        <div style={{ padding: wide ? 28 : 20, paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: max, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          {tabSwitcher}

          {tab === 'popular' && (
            <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(2, 1fr)' : '1fr', gap: 10 }}>
              {POPULAR.map(c => (
                <div key={c.code} onClick={() => window.__nav && window.__nav.go('esimDetail')} className="tu-card tu-press" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 16, cursor: 'pointer' }}>
                  <Flag iso={c.code} size={34} />
                  <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--fg)' }}>{c.name}</span>
                  <Icons.ChevronRight size={20} color="var(--fg-faint)" />
                </div>
              ))}
            </div>
          )}

          {tab === 'countries' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, background: 'var(--bg-sunken)' }}>
                <Icons.Search size={18} color="var(--fg-muted)" />
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search countries" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: 'var(--fg)', fontFamily: 'var(--font-body)' }} />
              </div>
              <div className="tu-card" style={{ borderRadius: 14, overflow: 'hidden', padding: 0 }}>
                {filtered.map((c, i) => (
                  <div key={c.code} onClick={() => window.__nav && window.__nav.go('esimDetail')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i === filtered.length - 1 ? 'none' : '1px solid var(--border)', cursor: 'pointer' }}>
                    <Flag iso={c.code} size={28} />
                    <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--fg)' }}>{c.name}</span>
                    <Icons.ChevronRight size={16} color="var(--fg-faint)" />
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'regions' && (
            <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: 10 }}>
              {REGIONS.map((r, idx) => {
                const g = GRADIENTS[idx % GRADIENTS.length];
                return (
                  <div key={r.code} onClick={() => window.__nav && window.__nav.go('esimDetail')} className="tu-press" style={{ borderRadius: 16, padding: 14, minHeight: 116, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`, boxShadow: 'var(--shadow-1)', cursor: 'pointer' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icons.Globe size={20} color="#fff" strokeWidth={2.2} />
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#fff' }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>Multi-country plan</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════ eSIM DETAIL ════════════════════════════
function KV({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-muted)', letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--fg)', marginTop: 3 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 1 }}>{sub}</div>}
    </div>
  );
}
function TEsimDetail({ wide }) {
  const left = (
    <>
      {/* Hero */}
      <div style={{ borderRadius: 20, padding: 20, background: 'linear-gradient(135deg, #10B981, #047857)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.2), transparent 70%)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Flag iso="GB" size={40} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600, letterSpacing: 0.4 }}>READY TO INSTALL</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', marginTop: 2 }}>United Kingdom</div>
          </div>
        </div>
        <div style={{ position: 'relative', marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: 48, fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: -2, lineHeight: 1 }}>5</div><div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85 }}>GB · LTE/5G</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)' }}>14 days</div><div style={{ fontSize: 11, opacity: 0.85 }}>from first use</div></div>
        </div>
      </div>
      {/* Install CTA */}
      <button className="tu-btn-primary" style={{ marginTop: 14, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 999 }}>
        <Icons.QrCode size={18} color="#fff" strokeWidth={2.2} /> Install eSIM
      </button>
    </>
  );
  const right = (
    <>
      {/* Scan QR */}
      <div className="tu-card" style={{ borderRadius: 18, padding: 20, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--fg)', marginBottom: 12 }}>Scan to install on another phone</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}><TulipQR size={wide ? 220 : 200} /></div>
        <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 12, lineHeight: 1.5 }}>Settings → Cellular → Add eSIM → Use QR Code</p>
      </div>
      {/* Plan */}
      <div className="tu-card" style={{ borderRadius: 18, padding: 18 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--fg)', marginBottom: 12 }}>Plan details</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <KV label="NETWORKS" value="EE · Vodafone · O2" sub="auto-switches" />
          <KV label="HOTSPOT" value="Allowed" sub="up to 5 devices" />
          <KV label="STARTS" value="Jun 9" sub="on arrival at LHR" />
          <KV label="EXPIRES" value="Jun 23" sub="auto-deactivates" />
        </div>
      </div>
    </>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px' }}>
        <div onClick={() => window.__nav && window.__nav.back()} style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icons.ChevronLeft size={18} color="var(--fg)" />
        </div>
        <h2 style={{ fontSize: 18, flex: 1 }}>UK eSIM</h2>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} className="tu-noscroll">
        <div style={{ padding: wide ? 28 : 20, paddingTop: 4, maxWidth: 1000, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          {wide ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 18, alignItems: 'start' }}>
              <div>{left}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{right}</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{left}{right}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════ SEARCH (flights/hotels/etc.) ════════════════════════════
function Stepper({ label, value, unit, onDec, onInc }) {
  return (
    <div className="tu-card" style={{ padding: 14, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icons.User size={18} color="var(--fg-muted)" />
        <div>
          <div style={{ fontSize: 10, color: 'var(--fg-faint)', textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--fg)' }}>{value} {unit}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div onClick={onDec} style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icons.Minus size={14} color="var(--fg)" /></div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, minWidth: 18, textAlign: 'center', color: 'var(--fg)' }}>{value}</span>
        <div onClick={onInc} style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icons.Plus size={14} color="#fff" /></div>
      </div>
    </div>
  );
}
function TSearch({ wide }) {
  const [active, setActive] = React.useState(window.__lastSvc || 'flights');
  const [tripType, setTripType] = React.useState('roundtrip');
  const [travelers, setTravelers] = React.useState(2);
  const [rooms, setRooms] = React.useState(1);
  const svc = SERVICES.find(s => s.id === active);
  const isHotel = svc.id === 'hotels';
  const onSelect = (id) => { if (id === 'esim') { window.__nav.go('store'); return; } window.__lastSvc = id; setActive(id); };
  const onSearch = () => window.__nav.go(isHotel ? 'resultsHotels' : 'resultsFlights');
  const labelStyle = { fontSize: 10, color: 'var(--fg-faint)', textTransform: 'uppercase', letterSpacing: 0.4 };
  const fieldVal = { fontSize: 15, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--fg)', marginTop: 4 };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px' }}>
        <div onClick={() => window.__nav && window.__nav.back()} style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icons.ChevronLeft size={18} color="var(--fg)" />
        </div>
        <h2 style={{ fontSize: 22, flex: 1, fontFamily: 'var(--font-display)' }}>Search</h2>
      </div>
      <div style={{ padding: 20, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1100, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <MultiServiceTabs active={active} onSelect={onSelect} />

        {svc.id === 'flights' && (
          <div style={{ display: 'flex', gap: 6 }}>
            {[['roundtrip', 'Round trip'], ['oneway', 'One way']].map(([id, label]) => {
              const on = id === tripType;
              return <button key={id} onClick={() => setTripType(id)} style={{ padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', background: on ? 'var(--primary)' : 'var(--bg-sunken)', color: on ? '#fff' : 'var(--fg-muted)', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>{label}</button>;
            })}
          </div>
        )}

        {/* From / To */}
        <div className="tu-card" style={{ borderRadius: 16, overflow: 'hidden', padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, padding: 14 }}>
              <div style={labelStyle}>{isHotel ? 'Destination' : 'From'}</div>
              <div style={{ ...fieldVal, color: 'var(--fg-faint)' }}>{svc.hint}</div>
            </div>
            {!isHotel && <div style={{ width: 38, height: 38, borderRadius: 19, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 8px', cursor: 'pointer' }}><Icons.ArrowUpDown size={16} color="var(--fg-muted)" /></div>}
          </div>
          {!isHotel && (
            <div style={{ borderTop: '1px solid var(--border)', padding: 14 }}>
              <div style={labelStyle}>To</div>
              <div style={{ ...fieldVal, color: 'var(--fg-faint)' }}>Destination</div>
            </div>
          )}
        </div>

        {/* Dates */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="tu-card" style={{ flex: 1, padding: 14, borderRadius: 16 }}>
            <div style={labelStyle}>{isHotel ? 'Check-in' : 'Depart'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><Icons.Calendar size={14} color="var(--fg-muted)" /><span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--fg)', whiteSpace: 'nowrap' }}>Mon, Jun 9</span></div>
          </div>
          {(svc.id !== 'flights' || tripType === 'roundtrip') && (
            <div className="tu-card" style={{ flex: 1, padding: 14, borderRadius: 16 }}>
              <div style={labelStyle}>{isHotel ? 'Check-out' : 'Return'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><Icons.Calendar size={14} color="var(--fg-muted)" /><span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--fg)', whiteSpace: 'nowrap' }}>Sun, Jun 22</span></div>
            </div>
          )}
        </div>

        {isHotel && <Stepper label="Rooms" value={rooms} unit={rooms === 1 ? 'room' : 'rooms'} onDec={() => setRooms(r => Math.max(1, r - 1))} onInc={() => setRooms(r => r + 1)} />}
        <Stepper label={isHotel ? 'Guests' : 'Travelers'} value={travelers} unit={isHotel ? (travelers === 1 ? 'guest' : 'guests') : (travelers === 1 ? 'adult' : 'adults')} onDec={() => setTravelers(v => Math.max(1, v - 1))} onInc={() => setTravelers(v => v + 1)} />

        <button onClick={onSearch} className="tu-btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 999, marginTop: 6 }}>
          <Icons.Search size={16} color="#fff" strokeWidth={2.2} /> Search
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════ RESULTS (coming-soon — matches live app) ════════════════════════════
function TResults({ kind }) {
  const hotel = kind === 'hotels';
  const Ic = hotel ? Icons.BedDouble : Icons.Plane;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px' }}>
        <div onClick={() => window.__nav && window.__nav.back()} style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icons.ChevronLeft size={18} color="var(--fg)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--fg)' }}>{hotel ? 'Stays' : 'New York → London'}</div>
          {!hotel && <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Mon, Jun 9 – Sun, Jun 22</div>}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ic size={28} color="var(--primary)" strokeWidth={2} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--fg)', whiteSpace: 'nowrap' }}>{hotel ? 'Stays coming soon' : 'Flights coming soon'}</div>
        <div style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 320 }}>{hotel ? 'Hotel' : 'Flight'} booking isn't live yet. eSIMs are available today from the eSIM store.</div>
      </div>
    </div>
  );
}

Object.assign(window, { TEsimStore, TEsimDetail, TSearch, TResults });
