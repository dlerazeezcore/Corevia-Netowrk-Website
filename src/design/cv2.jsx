// Corevia Network — shared visual library.
// The "alive" layer: an animated network constellation, count-up proof
// stats, a cursor spotlight hook, scroll-reveal, and the live device /
// browser frames.
import React from "react";

const { useState, useEffect, useRef } = React;

export const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── scroll reveal (rAF + rect; failsafe reveals all) ── */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (reduceMotion()) { els.forEach((e) => e.setAttribute("data-in", "")); return; }
    let raf;
    const check = () => {
      const h = window.innerHeight;
      els.forEach((e) => { if (e.getBoundingClientRect().top < h - 70) e.setAttribute("data-in", ""); });
      raf = null;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const fs = setTimeout(() => els.forEach((e) => e.setAttribute("data-in", "")), 1600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(fs);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/* ── cursor spotlight: writes --mx/--my (%) onto a ref el ── */
export function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current; if (!el || reduceMotion()) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [ref]);
}

/* ── count-up number, fires once when scrolled into view ── */
export function CountUp({ to, prefix = "", suffix = "", dur = 1600, decimals = 0, style }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduceMotion()) { setVal(to); done.current = true; return; }
    let raf;
    const run = () => {
      if (done.current) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40 && r.bottom > 0) {
        done.current = true;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          setVal(to * e);
          if (p < 1) requestAnimationFrame(tick); else setVal(to);
        };
        requestAnimationFrame(tick);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = null; run(); }); };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    const fs = setTimeout(() => { if (!done.current) { done.current = true; setVal(to); } }, 2200);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(fs); if (raf) cancelAnimationFrame(raf); };
  }, [to, dur]);
  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref} style={style}>{prefix}{shown}{suffix}</span>;
}

/* ── the signature animated network constellation ── */
export function NetworkCanvas({ height = 460, style = {} }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999, on: false });

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [], hubs = [], raf;

    const HUBS = [
      { rx: 0.26, ry: 0.30, label: "Brands" },
      { rx: 0.74, ry: 0.24, label: "Products" },
      { rx: 0.52, ry: 0.74, label: "Systems" },
    ];

    const build = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height || height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      hubs = HUBS.map((h) => ({ x: h.rx * W, y: h.ry * H, r: 5, base: 5, label: h.label }));
      const N = Math.max(18, Math.min(34, Math.round(W / 26)));
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 1,
      }));
    };

    const lime = (a) => `rgba(216,255,68,${a})`;
    const draw = (anim) => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      const mx = mouse.current.x, my = mouse.current.y, mon = mouse.current.on;

      // move
      if (anim) nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        if (mon) { const dx = n.x - mx, dy = n.y - my, d = Math.hypot(dx, dy); if (d < 120 && d > 0.1) { n.x += (dx / d) * 0.5; n.y += (dy / d) * 0.5; } }
      });

      // node-node edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 116) { ctx.strokeStyle = lime(0.12 * (1 - d / 116)); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      // node-hub edges (always link to nearest hub)
      nodes.forEach((n) => {
        let best = null, bd = 1e9;
        hubs.forEach((h) => { const d = Math.hypot(n.x - h.x, n.y - h.y); if (d < bd) { bd = d; best = h; } });
        if (best && bd < 240) { ctx.strokeStyle = lime(0.14 * (1 - bd / 240)); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(best.x, best.y); ctx.stroke(); }
      });
      // hub-hub spine
      ctx.strokeStyle = lime(0.22); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(hubs[0].x, hubs[0].y); ctx.lineTo(hubs[1].x, hubs[1].y); ctx.lineTo(hubs[2].x, hubs[2].y); ctx.lineTo(hubs[0].x, hubs[0].y); ctx.stroke();

      // mouse links
      if (mon) {
        nodes.forEach((n) => { const d = Math.hypot(n.x - mx, n.y - my); if (d < 150) { ctx.strokeStyle = lime(0.5 * (1 - d / 150)); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mx, my); ctx.stroke(); } });
      }

      // nodes
      nodes.forEach((n) => {
        const near = mon && Math.hypot(n.x - mx, n.y - my) < 150;
        ctx.fillStyle = near ? lime(0.95) : lime(0.6);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill();
      });
      // hubs (pulse + glow ring)
      hubs.forEach((h, i) => {
        const pulse = anim ? (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5) : 0.6;
        ctx.fillStyle = lime(0.18 + pulse * 0.12);
        ctx.beginPath(); ctx.arc(h.x, h.y, 14 + pulse * 7, 0, 7); ctx.fill();
        ctx.fillStyle = "#D8FF44";
        ctx.beginPath(); ctx.arc(h.x, h.y, h.base, 0, 7); ctx.fill();
        ctx.strokeStyle = lime(0.55); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(h.x, h.y, 9 + pulse * 3, 0, 7); ctx.stroke();
      });
    };

    build();
    if (reduceMotion()) { draw(false); }
    else { const loop = () => { draw(true); raf = requestAnimationFrame(loop); }; loop(); }

    let ro;
    if (window.ResizeObserver) { ro = new ResizeObserver(() => { build(); if (reduceMotion()) draw(false); }); ro.observe(wrap); }
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, on: true }; };
    const onLeave = () => { mouse.current.on = false; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [height]);

  return (
    <div ref={wrapRef} className="cv-net-stage" style={{ position: "relative", width: "100%", height, ...style }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      <span className="cv-net-chip" style={{ left: "26%", top: "30%" }}>Brands</span>
      <span className="cv-net-chip" style={{ left: "74%", top: "24%" }}>Products</span>
      <span className="cv-net-chip" style={{ left: "52%", top: "74%" }}>Systems</span>
    </div>
  );
}

/* ── scaled live browser frame ── */
export function BrowserFrame({ src, url, designW = 1280, designH = 820, accent = false, style = {} }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.4);
  useEffect(() => {
    const measure = () => { if (wrapRef.current) setScale(wrapRef.current.clientWidth / designW); };
    measure();
    let ro;
    if (window.ResizeObserver && wrapRef.current) { ro = new ResizeObserver(measure); ro.observe(wrapRef.current); }
    window.addEventListener("resize", measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [designW]);
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden", background: "var(--surface-card)",
      border: `1px solid ${accent ? "var(--lime-30)" : "var(--border-strong)"}`,
      boxShadow: accent ? "0 30px 70px -30px rgba(0,0,0,0.8), var(--glow-soft)" : "0 30px 70px -30px rgba(0,0,0,0.8)",
      ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, height: 42, padding: "0 16px", borderBottom: "1px solid var(--border-default)", background: "var(--surface-panel)" }}>
        <span style={{ display: "flex", gap: 7 }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#3A3A3A" }} />)}
        </span>
        <span style={{ flex: 1, maxWidth: 320, margin: "0 auto", textAlign: "center", background: "var(--bg-page)", borderRadius: 999, padding: "5px 14px", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{url}</span>
        <span style={{ width: 44 }} />
      </div>
      <div ref={wrapRef} style={{ position: "relative", width: "100%", height: designH * scale, overflow: "hidden", background: "var(--bg-page)" }}>
        <iframe src={src} title={url} loading="lazy" scrolling="no" style={{ position: "absolute", top: 0, left: 0, width: designW, height: designH, border: "none", transform: `scale(${scale})`, transformOrigin: "top left" }} />
      </div>
    </div>
  );
}

/* ── store download button ── */
export function StoreButton({ top, big, href }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", padding: "10px 18px", borderRadius: 12, border: `1px solid ${h ? "var(--accent)" : "var(--border-strong)"}`, background: "transparent", color: "#fff", transition: "all var(--dur-base)" }}
    >
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
        <span style={{ fontSize: 9, textTransform: "uppercase", fontWeight: 700, color: "var(--text-faint)", letterSpacing: ".06em" }}>{top}</span>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{big}</span>
      </span>
    </a>
  );
}

export const CV2 = { useReveal, useSpotlight, CountUp, NetworkCanvas, BrowserFrame, StoreButton, reduceMotion };
export default CV2;
