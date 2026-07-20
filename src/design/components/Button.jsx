import React from "react";

/**
 * Corevia Network — Button
 * Pill-shaped CTA. Primary = lime fill on black text with a glow that
 * intensifies on hover. Secondary = outlined ghost that adopts the lime
 * edge + text on hover.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const sizes = {
    sm: { padding: "0.625rem 1.25rem", fontSize: "0.875rem", gap: "0.4rem", icon: 16 },
    md: { padding: "0.875rem 1.75rem", fontSize: "1rem", gap: "0.5rem", icon: 18 },
    lg: { padding: "1rem 2rem", fontSize: "1.125rem", gap: "0.5rem", icon: 20 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: "var(--font-body)",
    fontWeight: "var(--fw-bold)",
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    border: "2px solid transparent",
    transition: "all var(--dur-base) var(--ease-out)",
    transform: press && !disabled ? "scale(0.96)" : hover && !disabled ? "translateY(-1px)" : "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...style,
  };

  const variants = {
    primary: {
      background: hover && !disabled ? "var(--accent-hover)" : "var(--accent)",
      color: "var(--text-on-accent)",
      boxShadow: hover && !disabled ? "var(--glow-strong)" : "var(--glow-soft)",
    },
    secondary: {
      background: "transparent",
      color: hover && !disabled ? "var(--accent)" : "var(--text-primary)",
      borderColor: hover && !disabled ? "var(--accent)" : "var(--border-strong)",
    },
    ghost: {
      background: hover && !disabled ? "var(--lime-10)" : "transparent",
      color: "var(--accent)",
      borderColor: "transparent",
    },
  };

  const cls = { ...base, ...(variants[variant] || variants.primary) };
  const sz = s.icon;
  const inner = (
    <>
      {Icon && iconPosition === "left" && <Icon size={sz} strokeWidth={2} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={sz} strokeWidth={2} />}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onClick: disabled ? undefined : onClick,
  };

  if (href && !disabled) {
    return (
      <a href={href} style={cls} {...handlers} {...rest}>{inner}</a>
    );
  }
  return (
    <button type={type} disabled={disabled} style={cls} {...handlers} {...rest}>{inner}</button>
  );
}
