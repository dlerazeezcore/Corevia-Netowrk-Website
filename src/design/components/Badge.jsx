import React from "react";

/**
 * Corevia Network — Badge / Tag
 * Small status & label chip. Lime is the emphasis tone.
 */
export function Badge({ children, variant = "lime", size = "md", style = {}, ...rest }) {
  const sizes = {
    sm: { padding: "0.2rem 0.55rem", fontSize: "0.7rem" },
    md: { padding: "0.3rem 0.7rem", fontSize: "0.78rem" },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    lime: { background: "var(--lime-10)", color: "var(--accent)", border: "1px solid var(--lime-30)" },
    solid: { background: "var(--accent)", color: "var(--text-on-accent)", border: "1px solid var(--accent)" },
    outline: { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-strong)" },
    muted: { background: "var(--surface-nested)", color: "var(--text-muted)", border: "1px solid var(--border-default)" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontFamily: "var(--font-body)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1,
        ...s,
        ...(variants[variant] || variants.lime),
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
