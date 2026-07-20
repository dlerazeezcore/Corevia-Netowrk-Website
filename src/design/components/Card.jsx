import React from "react";

/**
 * Corevia Network — Card
 * The base dark surface card: faint lime border, rounded, deep shadow.
 * When `hoverable`, it lifts, deepens its glow and brightens the border.
 * Exposes its hover state via render-prop children: (hover) => node.
 */
export function Card({
  children,
  hoverable = true,
  padding = "var(--space-8)",
  as = "div",
  href,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const El = href ? "a" : as;
  const active = hoverable && hover;

  return (
    <El
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        position: "relative",
        background: "var(--surface-card)",
        border: `1px solid ${active ? "var(--lime-80)" : "var(--border-accent)"}`,
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: active ? "var(--glow-md)" : "var(--shadow-sm)",
        transform: active ? "translateY(var(--lift))" : "none",
        transition: "all var(--dur-base) var(--ease-out)",
        overflow: "hidden",
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      {typeof children === "function" ? children(hover) : children}
    </El>
  );
}
