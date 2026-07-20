import React from "react";

/**
 * Corevia Network — Eyebrow
 * The signature section kicker: a lime rule beside a small UPPERCASE
 * tracked label. `centered` mirrors a rule on both sides.
 */
export function Eyebrow({ children, centered = false, style = {}, ...rest }) {
  const Rule = () => (
    <span style={{ display: "block", width: "2rem", height: "0.25rem", background: "var(--accent)", flexShrink: 0 }} />
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: centered ? "center" : "flex-start",
        gap: "1rem",
        ...style,
      }}
      {...rest}
    >
      <Rule />
      <span
        style={{
          color: "var(--accent)",
          fontFamily: "var(--font-body)",
          fontWeight: "var(--fw-semibold)",
          fontSize: "var(--text-sm)",
          letterSpacing: "var(--tracking-wider)",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
      {centered && <Rule />}
    </div>
  );
}
