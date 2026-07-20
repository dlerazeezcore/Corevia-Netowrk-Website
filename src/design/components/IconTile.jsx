import React from "react";

/**
 * Corevia Network — IconTile
 * The rounded square that houses an icon on cards & contact rows.
 * Dark surface, faint lime border + inner glow; brightens on hover when
 * `interactive`.
 */
export function IconTile({ icon: Icon, size = "md", round = false, interactive = false, hover = false, style = {}, ...rest }) {
  const dims = { sm: 48, md: 64, lg: 72 };
  const px = dims[size] || dims.md;
  const iconPx = Math.round(px * 0.45);
  const active = interactive && hover;

  return (
    <div
      style={{
        width: px,
        height: px,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: active ? "var(--lime-20)" : "var(--surface-panel)",
        border: `1px solid ${active ? "var(--lime-80)" : "var(--lime-30)"}`,
        borderRadius: round ? "var(--radius-pill)" : "var(--radius-md)",
        boxShadow: active ? "var(--glow-icon)" : "var(--glow-faint)",
        transition: "all var(--dur-base) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      {Icon && <Icon size={iconPx} strokeWidth={2} color="var(--accent)" />}
    </div>
  );
}
