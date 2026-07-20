// Corevia Network — V3 site. Product showcases modeled on the FIB/PeakTravel
// card pattern: tinted rounded cards with static (non-floating) live phone
// screens; Bnari Kodo desktop + mobile brand panel; Peak Travel brand card.
import React from "react";
import { Button, Eyebrow, Field, Badge, Card, IconTile } from "./components/index.js";
import { CoreviaIcons as I } from "./icons.jsx";
import * as CV from "./cv2.jsx";

const { useState, useEffect, useRef } = React;

// Static files vendored from the design project live in public/ and are
// resolved against Vite's base so the site works at any deploy path.
const u = (p) => `${import.meta.env.BASE_URL}${p}`;

const NAV = [
  { name: "Work", href: "#work" },
  { name: "Tulip App", href: "#tulip" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

const STATS = [
  { to: 3, suffix: "", label: "Live products in market" },
  { to: 190, suffix: "+", label: "Countries with Tulip eSIM" },
  { to: 2, suffix: "", label: "App stores live — iOS & Android" },
  { to: 100, suffix: "%", label: "Owned, built & run in-house" },
];

const CAPS = [
  { n: "01", title: "Product Design", icon: I.Briefcase, desc: "Interfaces and product systems designed end-to-end — research, flows, UI, and the design systems that hold them together." },
  { n: "02", title: "Web Development", icon: I.Building, desc: "Fast, accessible, production-grade marketing sites and web apps, built to last and engineered to scale." },
  { n: "03", title: "Custom Systems", icon: I.Calculator, desc: "Internal platforms, dashboards and the operational tools a business actually runs on." },
  { n: "04", title: "Booking Platforms", icon: I.Map, desc: "Travel and reservation technology — from mobile apps to the systems behind them." },
  { n: "05", title: "Business Systems", icon: I.Headset, desc: "Accounting, HR, PBX and CRM — the operational backbone, implemented and connected." },
  { n: "06", title: "Brand & Identity", icon: I.Users, desc: "Naming, identity and digital presence — for our own ventures and the partners we build for." },
];

const PROCESS = [
  { n: "01", title: "Discover", desc: "We map the business, its operations, and what success actually looks like." },
  { n: "02", title: "Design", desc: "We shape the product and system — interfaces, flows and architecture." },
  { n: "03", title: "Build", desc: "We engineer it to production standard, integrated end-to-end." },
  { n: "04", title: "Launch", desc: "We ship, support, and keep improving what we run." },
];

const container = { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--container-pad)" };
const headingFont = { fontFamily: "var(--font-heading)" };

/* ───────── Header ───────── */
function Header({ scrolled, onNav }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{
      position: "fixed", top: 0, width: "100%", zIndex: 50,
      background: scrolled ? "rgba(8,8,8,0.8)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: `1px solid ${scrolled ? "rgba(58,58,58,0.5)" : "transparent"}`,
      transition: "all var(--dur-base) var(--ease-out)",
    }}>
      <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", height: "var(--header-h)" }}>
        <a href="#home" onClick={onNav} style={{ display: "inline-flex" }}>
          <img src={u("assets/corevia-logo.svg")} alt="Corevia Network" style={{ height: 38, width: "auto", filter: "brightness(0) invert(1)" }} />
        </a>
        <nav className="cv-desktop-nav" style={{ display: "flex", gap: 34 }}>
          {NAV.map((n) =>
            <a key={n.name} href={n.href} onClick={onNav} className="cv-navlink" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", position: "relative", paddingBottom: 4 }}>
              {n.name}<span className="cv-underline" />
            </a>)}
        </nav>
        <div className="cv-desktop-nav"><Button variant="secondary" size="sm" href="#contact" onClick={onNav}>Start a project</Button></div>
        <button className="cv-mobile-btn" onClick={() => setOpen(!open)} aria-label="Menu" style={{ display: "none", background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
          {open ? <I.X /> : <I.Menu />}
        </button>
      </div>
      {open &&
        <div style={{ background: "var(--black-800)", borderBottom: "1px solid var(--border-default)", padding: "8px 16px 16px" }}>
          {NAV.map((n) => <a key={n.name} href={n.href} onClick={(e) => { onNav(e); setOpen(false); }} style={{ display: "block", padding: 12, borderRadius: 8, fontWeight: 500, color: "var(--text-secondary)" }}>{n.name}</a>)}
        </div>}
    </header>);
}

/* ───────── Hero ───────── */
function Hero({ onNav }) {
  const spotRef = useRef(null);
  CV.useSpotlight(spotRef);
  return (
    <section id="home" ref={spotRef} className="cv-hero" style={{ position: "relative", overflow: "hidden", paddingTop: 132, paddingBottom: 72 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", top: "4%", left: "-12%", width: "44%", height: "55%", background: "var(--lime-08)", filter: "blur(130px)", borderRadius: 9999 }} />
        <div style={{ position: "absolute", bottom: "-6%", right: "-12%", width: "48%", height: "58%", background: "rgba(23,63,255,0.10)", filter: "blur(130px)", borderRadius: 9999 }} />
        <div className="cv-gridlines" />
        <div className="cv-spotlight" />
      </div>
      <div style={{ ...container, position: "relative", zIndex: 1 }}>
        <div className="cv-hero-grid">
          <div>
            <div className="cv-rise" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 15px", borderRadius: 999, border: "1px solid var(--border-default)", background: "rgba(22,22,22,0.55)", marginBottom: 30 }}>
              <span className="cv-livedot" />
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>A digital product studio — brands, products &amp; systems</span>
            </div>
            <h1 className="cv-rise cv-d1" style={{ ...headingFont, fontWeight: 800, fontSize: "clamp(2.5rem, 5.6vw, 4.7rem)", lineHeight: 1.02, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
              We design, build, and run premium digital products<span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <p className="cv-rise cv-d2" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 540, margin: "26px 0 34px" }}>
              Corevia Network is a product company. We build our own brands and ventures — and engineer the platforms, websites and operational systems that modern businesses run on.
            </p>
            <div className="cv-rise cv-d3" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 38 }}>
              <Button variant="primary" size="lg" href="#contact" onClick={onNav} icon={I.ArrowRight}>Start a project</Button>
              <Button variant="secondary" size="lg" href="#work" onClick={onNav}>View our work</Button>
            </div>
            <div className="cv-rise cv-d3 cv-hero-mini">
              {[["3", "live products"], ["2", "app stores"], ["RTL+EN", "bilingual builds"]].map(([a, b]) =>
                <div key={b} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ ...headingFont, fontWeight: 700, fontSize: 20, color: "var(--accent)" }}>{a}</span>
                  <span style={{ fontSize: 13, color: "var(--text-faint)" }}>{b}</span>
                </div>)}
            </div>
          </div>
          <div className="cv-rise cv-d2 cv-hero-visual">
            <div className="cv-net-frame">
              <div className="cv-net-corner">corevia://network</div>
              <CV.NetworkCanvas height={448} />
              <div className="cv-net-foot">
                <span className="cv-livedot" />
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>One network — brands, products &amp; the systems behind them</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

/* ───────── Brand strip (static) ───────── */
function BrandStrip() {
  return (
    <div style={{ borderBlock: "1px solid rgba(58,58,58,0.4)", padding: "24px 0", background: "var(--black-800)" }}>
      <div style={{ ...container, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px 38px" }}>
        <span style={{ ...headingFont, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-faint)", fontWeight: 600 }}>The network</span>
        {["Peak Travel", "Tulip Booking", "Bnari Kodo", "Hasnan"].map((b) =>
          <span key={b} style={{ ...headingFont, fontWeight: 600, fontSize: 17, color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--lime-30)" }} />{b}
          </span>)}
      </div>
    </div>);
}

function StatBand() {
  return (
    <section style={{ padding: "var(--space-20) 0" }}>
      <div style={container}>
        <div data-reveal className="cv-reveal cv-stat-band">
          {STATS.map((s, i) =>
            <div key={i} className="cv-stat-cell">
              <CV.CountUp to={s.to} suffix={s.suffix} style={{ ...headingFont, fontWeight: 800, fontSize: "clamp(2.4rem, 4vw, 3.4rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, display: "block" }} />
              <span style={{ display: "block", marginTop: 12, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 200 }}>{s.label}</span>
            </div>)}
        </div>
      </div>
    </section>);
}

function WorkIntro() {
  return (
    <div style={{ ...container }}>
      <div data-reveal className="cv-reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingTop: 12 }}>
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <h2 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(2rem,3.6vw,3rem)", color: "#fff", letterSpacing: "-0.02em", margin: "18px 0 0" }}>
            Brands we own. Systems we build.
          </h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.6, maxWidth: 360, margin: 0 }}>
          A flagship travel super-app, a client platform engineered end-to-end, and the travel venture behind it all.
        </p>
      </div>
    </div>);
}

function CaseHead({ n, name, tag }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
      <span style={{ ...headingFont, fontWeight: 700, fontSize: 15, color: "var(--accent)" }}>{n}</span>
      <span style={{ width: 28, height: 1, background: "var(--border-strong)" }} />
      <span style={{ ...headingFont, fontWeight: 600, fontSize: 15, color: "#fff" }}>{name}</span>
      <Badge variant="lime">{tag}</Badge>
    </div>);
}

/* ───────── 01 · Tulip — 3 live screens, tinted tour cards ───────── */
const TT = {
  blue: { bg: "linear-gradient(170deg, rgba(25,103,210,0.16), rgba(25,103,210,0.06))", border: "rgba(25,103,210,0.38)", accent: "#7FB1F2" },
  green: { bg: "linear-gradient(170deg, rgba(16,185,129,0.14), rgba(16,185,129,0.05))", border: "rgba(16,185,129,0.32)", accent: "#57D9AC" },
  amber: { bg: "linear-gradient(170deg, rgba(245,158,11,0.13), rgba(245,158,11,0.05))", border: "rgba(245,158,11,0.30)", accent: "#F2C36B" },
};

function TourPhone({ src, title, scale = 0.6, crop = 380 }) {
  const w = Math.round(393 * scale);
  return (
    <div style={{ width: w, height: crop, overflow: "hidden", borderRadius: "34px 34px 0 0", boxShadow: "0 30px 60px -18px rgba(0,0,0,0.6)" }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 393, height: 800 }}>
        <iframe src={src} title={title} scrolling="no" style={{ width: 393, height: 800, border: "none", display: "block", background: "transparent" }} />
      </div>
    </div>);
}

function TourCard({ tint, wide, eyebrow, title, desc, cta, src }) {
  const t = TT[tint];
  return (
    <div className={`cv3-tcard${wide ? " cv3-tcard-wide" : ""} cv-reveal`} data-reveal style={{ background: t.bg, borderColor: t.border }}>
      <div className="cv3-tcard-copy">
        <span className="cv3-teyebrow" style={{ color: t.accent }}>{eyebrow}</span>
        <h3 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(1.4rem,2.2vw,1.8rem)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>{title}</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: 15.5, lineHeight: 1.6, margin: 0 }}>{desc}</p>
        <a className="cv3-tcta" href="https://tulipbookings.com" target="_blank" rel="noopener noreferrer" style={{ borderColor: t.border, marginTop: 6 }}>{cta} <I.ArrowRight size={16} /></a>
      </div>
      <div className="cv3-tcard-phone">
        <TourPhone src={src} title={`Tulip Booking — ${eyebrow}`} scale={wide ? 0.66 : 0.6} crop={wide ? 468 : 375} />
      </div>
    </div>);
}

function CaseTulip() {
  return (
    <section id="tulip" style={{ padding: "var(--space-20) 0" }}>
      <div style={container}>
        <div data-reveal className="cv-reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
          <div style={{ maxWidth: 560 }}>
            <CaseHead n="01" name="Tulip Booking" tag="Flagship product" />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <img src={u("assets/tulip-mark.svg")} alt="" style={{ width: 28, height: 28 }} />
              <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>by Peak Travel · built by Corevia</span>
            </div>
            <h3 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              Every essential travel service, in one app.
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 500 }}>
              A mobile travel super-app we designed and built for our subsidiary Peak Travel. The screens below are the live product — try them.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
            <Button variant="primary" size="md" href="https://tulipbookings.com" icon={I.ArrowRight}>Visit tulipbookings.com</Button>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <CV.StoreButton top="Download on the" big="App Store" href="https://apps.apple.com/us/app/tulip-booking/id6759516330" />
              <CV.StoreButton top="Get it on" big="Google Play" href="https://play.google.com/store/apps/details?id=com.theesim.app&hl=en-US" />
            </div>
          </div>
        </div>

        <div className="cv3-tourgrid">
          <TourCard wide tint="blue" eyebrow="Home & Search" title="Every essential service, on one screen." desc="Flights, hotels, eSIM and transfers — the whole trip starts from a single search. One account, one wallet, one place to plan it all." cta="Explore the app" src={u("ui_kits/corevia-website/tulip-embed.html")} />
          <TourCard tint="green" eyebrow="eSIM Store" title="Instant data in 190+ countries." desc="Land connected. Plans by region and duration, activated in a tap." cta="Browse eSIM plans" src={u("ui_kits/corevia-website/tulip-embed-esim.html")} />
          <TourCard tint="amber" eyebrow="Bookings" title="Every booking, one timeline." desc="Trips, confirmations and history — organized and always at hand." cta="See how trips work" src={u("ui_kits/corevia-website/tulip-embed-bookings.html")} />
        </div>
      </div>
    </section>);
}

/* ───────── 02 · Bnari Kodo — brand panel (navy + gold, desktop + mobile) ───────── */
const BN = { navy: "#0B1F3A", navyDeep: "#081729", gold: "#C8A45D", goldSoft: "#D9BC7F", goldDim: "rgba(200,164,93,0.35)", goldBg: "rgba(200,164,93,0.10)" };

function BnariTab({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: "var(--font-heading)", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
      padding: "9px 18px", borderRadius: 999, transition: "all var(--dur-base) var(--ease-out)",
      background: active ? BN.gold : "transparent", color: active ? BN.navyDeep : BN.goldSoft,
      border: `1px solid ${active ? BN.gold : BN.goldDim}`,
    }}>{children}</button>);
}

function BnariPhone() {
  const scale = 0.56, w = Math.round(393 * scale), h = Math.round(800 * scale);
  return (
    <div style={{ width: w + 16, borderRadius: 42, background: "#0A0E14", border: "1px solid rgba(200,164,93,0.35)", padding: 8, boxShadow: "0 34px 70px -24px rgba(0,0,0,0.8)", position: "relative" }}>
      <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 84, height: 17, background: "#0A0E14", borderRadius: "0 0 12px 12px", zIndex: 2 }} />
      <div style={{ width: w, height: h, overflow: "hidden", borderRadius: 34 }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 393, height: 800 }}>
          <iframe src={u("vendor/bnari/ui_kits/app/index.html?demo=1")} title="Bnari Kodo — mobile app" scrolling="no" style={{ width: 393, height: 800, border: "none", display: "block", background: "#F8F7F3" }} />
        </div>
      </div>
    </div>);
}

function CaseBnari() {
  const [view, setView] = useState("system");
  const results = [["1 platform", "Website + internal system, one team"], ["RTL + EN", "Kurdish-first, fully bilingual"], ["End-to-end", "Properties, contracts, payments, reports"]];
  const chips = ["Properties & availabilities", "Official Sorani contracts", "Payments · expenses · reports", "Kurdish-first · کوردی / EN"];
  return (
    <section style={{ padding: "var(--space-20) 0", background: "var(--bg-section)", borderBlock: "1px solid rgba(58,58,58,0.4)" }}>
      <div style={container}>
        <div data-reveal className="cv-reveal" style={{ maxWidth: 760 }}>
          <CaseHead n="02" name="Bnari Kodo" tag="Client · Real estate SaaS" />
          <h3 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            We built the system — not just the site.
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 660 }}>
            For a real-estate company in Erbil we delivered both halves: a premium bilingual marketing website <em style={{ color: "var(--text-secondary)", fontStyle: "normal" }}>and</em> the internal platform their team runs on every day — on desktop and on the phone.
          </p>
        </div>

        <div data-reveal className="cv-reveal cv3-bnari-panel" style={{ transitionDelay: "100ms" }}>
          <div className="cv3-bnari-grid" />
          <div className="cv3-bnari-glow" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="cv3-bnari-head">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img src={u("vendor/bnari/assets/logo-mark-bare.svg")} alt="" style={{ width: 46, height: 46 }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 23, fontWeight: 600, letterSpacing: "0.18em", color: "#F3EFE6", whiteSpace: "nowrap" }}>BNARI KODO</div>
                  <div style={{ ...headingFont, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: BN.gold, marginTop: 3 }}>Real Estate · Erbil</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <BnariTab active={view === "system"} onClick={() => setView("system")}>Internal system</BnariTab>
                  <BnariTab active={view === "site"} onClick={() => setView("site")}>Company website</BnariTab>
                </div>
              </div>
            </div>

            <div className="cv3-live-chip" style={{ marginTop: 22 }}>
              <span className="cv3-golddot" />Live demo — everything below is the real product. Click around.
            </div>

            <div className="cv3-bnari-stage">
              <div>
                <div className="cv3-vis-label">Desktop · {view === "system" ? "Internal system" : "Company website"}</div>
                <div style={{ display: view === "system" ? "block" : "none" }}>
                  <CV.BrowserFrame src={u("vendor/bnari/ui_kits/app/index.html?demo=1")} url="app.bnari-kodo.com" designW={1280} designH={820} accent />
                </div>
                <div style={{ display: view === "site" ? "block" : "none" }}>
                  <CV.BrowserFrame src={u("vendor/bnari/ui_kits/marketing/index.html")} url="bnari-kodo.com" designW={1280} designH={900} accent />
                </div>
              </div>
              <div className="cv3-bnari-mobilecol">
                <div className="cv3-vis-label">Mobile · the same system</div>
                <BnariPhone />
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
              {chips.map((c) =>
                <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, fontFamily: "var(--font-heading)", color: BN.goldSoft, background: BN.goldBg, border: `1px solid ${BN.goldDim}`, borderRadius: 999, padding: "7px 14px" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: BN.gold, flexShrink: 0 }} />{c}
                </span>)}
            </div>
          </div>
        </div>

        <div className="cv-result-row cv-reveal" data-reveal>
          {results.map(([big, small]) =>
            <div key={big} style={{ borderTop: "1px solid rgba(58,58,58,0.5)", paddingTop: 18 }}>
              <div style={{ ...headingFont, fontWeight: 700, fontSize: 24, color: "var(--accent)", marginBottom: 6 }}>{big}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.5 }}>{small}</div>
            </div>)}
        </div>
      </div>
    </section>);
}

/* ───────── 03 · Peak Travel — brand card ───────── */
function CasePeak() {
  const stats = [["68k+", "journeys curated"], ["120", "countries served"], ["4.9★", "average rating"]];
  return (
    <section style={{ padding: "var(--space-20) 0" }}>
      <div style={container}>
        <div className="cv3-peak-card cv-reveal" data-reveal>
          <div>
            <CaseHead n="03" name="Peak Travel" tag="Subsidiary" />
            <h3 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(1.8rem,3.1vw,2.5rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              Our travel house — the brand behind Tulip Booking.
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
              Peak Travel is Corevia's own premium travel brand: bespoke leisure and corporate travel, curated by real advisors. We built its identity, its website, and its flagship product.
            </p>
            <div className="cv3-peak-stats">
              {stats.map(([a, b]) =>
                <div key={b}>
                  <div style={{ ...headingFont, fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.02em" }}>{a}</div>
                  <div style={{ fontSize: 13, color: "var(--text-faint)", marginTop: 3 }}>{b}</div>
                </div>)}
            </div>
            <Button variant="primary" size="md" href="https://peaktravel.net" icon={I.ArrowRight}>Visit peaktravel.net</Button>
          </div>
          <div className="cv3-peak-brand">
            <div className="cv3-peak-arcs"><span /><span /><span /></div>
            <div style={{ position: "relative" }}>
              <div style={{ ...headingFont, fontSize: "clamp(30px, 3vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                <span style={{ fontWeight: 700, color: "#fff" }}>Peak</span><span style={{ fontWeight: 300, color: "#9AA3B0" }}>Travel</span>
              </div>
              <div style={{ ...headingFont, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C8A24B", marginTop: 14 }}>A travel house, not a booking site</div>
            </div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Bespoke journeys", "Corporate travel", "Visa & concierge"].map((s) =>
                  <span key={s} style={{ ...headingFont, fontSize: 12.5, fontWeight: 600, color: "#D9C08A", border: "1px solid rgba(200,162,75,0.35)", background: "rgba(200,162,75,0.10)", borderRadius: 999, padding: "6px 13px" }}>{s}</span>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(200,162,75,0.25)" }}>
                <span style={{ ...headingFont, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#081B3A", background: "#C8A24B", borderRadius: 999, padding: "4px 10px" }}>Coming soon</span>
                <span style={{ fontSize: 13.5, color: "#B9C2CE" }}><b style={{ color: "#fff" }}>Tulip B2B</b> — corporate travel console</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

/* ───────── Capabilities — uniform grid ───────── */
function CapCard({ c }) {
  return (
    <Card hoverable padding={28} style={{ height: "100%" }}>
      {(hover) => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 168 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <IconTile icon={c.icon} interactive hover={hover} />
            <span style={{ ...headingFont, fontSize: 13, fontWeight: 600, color: hover ? "var(--accent)" : "var(--text-faint)", transition: "color var(--dur-base)" }}>{c.n}</span>
          </div>
          <h3 style={{ ...headingFont, fontSize: 21, fontWeight: 600, color: hover ? "var(--accent)" : "#fff", margin: "22px 0 8px", transition: "color var(--dur-base)" }}>{c.title}</h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{c.desc}</p>
          <span style={{ position: "absolute", right: 24, bottom: 22, color: "var(--accent)", opacity: hover ? 1 : 0, transform: hover ? "translateX(0)" : "translateX(-6px)", transition: "all var(--dur-base)" }}><I.ArrowRight size={18} /></span>
        </div>
      )}
    </Card>);
}

function Capabilities() {
  return (
    <section id="capabilities" style={{ padding: "var(--section-y) 0", background: "var(--bg-section)", borderTop: "1px solid rgba(58,58,58,0.4)" }}>
      <div style={container}>
        <div data-reveal className="cv-reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <div style={{ maxWidth: 620 }}>
            <Eyebrow>What we do</Eyebrow>
            <h2 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(2rem,3.4vw,2.9rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "18px 0 0" }}>
              One team across the full product lifecycle.
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.6, maxWidth: 360, margin: 0 }}>
            Design, engineering and the operational systems behind the scenes — so the product and the business that runs it move together.
          </p>
        </div>
        <div className="cv-bento" data-reveal>
          {CAPS.map((c) => <CapCard key={c.title} c={c} />)}
        </div>
      </div>
    </section>);
}

function Process() {
  return (
    <section id="process" style={{ padding: "var(--section-y) 0" }}>
      <div style={container}>
        <div data-reveal className="cv-reveal" style={{ marginBottom: 56, maxWidth: 640 }}>
          <Eyebrow>How we work</Eyebrow>
          <h2 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(2rem,3.4vw,2.9rem)", color: "#fff", letterSpacing: "-0.02em", margin: "18px 0 0" }}>
            A clear path from idea to launch.
          </h2>
        </div>
        <div className="cv-proc-grid">
          <div className="cv-proc-line" />
          {PROCESS.map((p, i) =>
            <div key={p.n} data-reveal className="cv-reveal cv-proc-step" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="cv-proc-dot"><span /></div>
              <div style={{ ...headingFont, fontWeight: 700, fontSize: 14, color: "var(--accent)", margin: "22px 0 12px" }}>{p.n}</div>
              <h3 style={{ ...headingFont, fontWeight: 600, fontSize: 21, color: "#fff", margin: "0 0 10px" }}>{p.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </div>)}
        </div>
      </div>
    </section>);
}

function Contact() {
  const [status, setStatus] = useState("idle");
  const submit = (e) => { e.preventDefault(); setStatus("submitting"); setTimeout(() => setStatus("success"), 900); };
  return (
    <section id="contact" style={{ padding: "var(--section-y) 0", background: "var(--bg-section)", borderTop: "1px solid rgba(58,58,58,0.4)" }}>
      <div style={container}>
        <div className="cv-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div data-reveal className="cv-reveal">
            <Eyebrow>Start a project</Eyebrow>
            <h2 style={{ ...headingFont, fontWeight: 700, fontSize: "clamp(2.1rem,3.8vw,3.1rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, margin: "18px 0 22px" }}>
              Let's build something premium.
            </h2>
            <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 36, maxWidth: 440 }}>
              Tell us about your product, platform or system. We'll get back to you to talk through what you're building.
            </p>
            <div style={{ paddingTop: 26, borderTop: "1px solid rgba(58,58,58,0.5)" }}>
              <p style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 6px" }}>Email</p>
              <a href="mailto:info@corevia-network.com" style={{ fontSize: 19, fontWeight: 500, color: "#fff" }}>info@corevia-network.com</a>
            </div>
          </div>
          <div data-reveal className="cv-reveal" style={{ transitionDelay: "100ms" }}>
            <div style={{ background: "var(--surface-card)", padding: 38, borderRadius: "var(--radius-xl)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-lg)" }}>
              {status === "success" ?
                <div style={{ minHeight: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <span className="cv-pop" style={{ color: "var(--accent)" }}><I.CheckCircle2 size={68} /></span>
                  <h3 style={{ ...headingFont, fontWeight: 700, fontSize: 26, color: "#fff", margin: "20px 0 12px" }}>Message sent</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 16, margin: 0 }}>Thanks for reaching out. We'll be in touch shortly.</p>
                </div> :
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div className="cv-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <Field label="Full Name" id="name" required />
                    <Field label="Company" id="company" />
                  </div>
                  <Field label="Email Address" id="email" type="email" required />
                  <Field label="What are you building?" id="message" as="textarea" rows={4} required />
                  <Button type="submit" variant="primary" size="lg" fullWidth icon={I.ArrowRight} disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending…" : "Send message"}
                  </Button>
                </form>}
            </div>
          </div>
        </div>
      </div>
    </section>);
}

function Footer({ onNav }) {
  return (
    <footer style={{ background: "var(--bg-deep)", borderTop: "1px solid rgba(58,58,58,0.4)", padding: "64px 0 38px" }}>
      <div style={container}>
        <div className="cv-foot-top">
          <div>
            <img src={u("assets/corevia-logo.svg")} alt="Corevia Network" style={{ height: 38, filter: "brightness(0) invert(1)", marginBottom: 20 }} />
            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 320, margin: 0, lineHeight: 1.6 }}>We design, build, and run premium digital products.</p>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 18px" }}>Navigate</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV.map((n) => <a key={n.name} href={n.href} onClick={onNav} className="cv-footlink" style={{ fontSize: 15, color: "var(--text-muted)" }}>{n.name}</a>)}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 18px" }}>Properties</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["corevia-network.com", "https://corevia-network.com"], ["peaktravel.net", "https://peaktravel.net"], ["tulipbookings.com", "https://tulipbookings.com"]].map(([d, urlHref]) =>
                <a key={d} href={urlHref} target="_blank" rel="noopener noreferrer" className="cv-footlink" style={{ fontSize: 15, color: "var(--text-muted)" }}>{d}</a>)}
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 26, borderTop: "1px solid rgba(58,58,58,0.4)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16 }}>
          <p style={{ fontSize: 13, color: "var(--text-faint)", margin: 0 }}>© {new Date().getFullYear()} Corevia Network. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" className="cv-footlink" style={{ fontSize: 13, color: "var(--text-faint)" }}>Privacy</a>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <a href="#" className="cv-footlink" style={{ fontSize: 13, color: "var(--text-faint)" }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>);
}

/* ───────── App ───────── */
export default function CoreviaSiteV3() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  CV.useReveal();
  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 40); setShowTop(window.scrollY > 600); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const onNav = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };
  return (
    <div>
      <Header scrolled={scrolled} onNav={onNav} />
      <Hero onNav={onNav} />
      <BrandStrip />
      <StatBand />
      <div id="work"><WorkIntro /></div>
      <CaseTulip />
      <CaseBnari />
      <CasePeak />
      <Capabilities />
      <Process />
      <Contact />
      <Footer onNav={onNav} />
      {showTop &&
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top"
          style={{ position: "fixed", bottom: 30, right: 30, zIndex: 50, padding: 12, borderRadius: 9999, background: "var(--accent)", color: "#0A0A0A", border: "none", cursor: "pointer", boxShadow: "var(--glow-md)" }}>
          <I.ChevronUp />
        </button>}
    </div>);
}
