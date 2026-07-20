import React from "react";

/**
 * Corevia Network — Field
 * Labelled input / textarea matching the contact form: dark surface,
 * strong-gray border that turns lime on focus with a soft lime focus
 * ring. Set `as="textarea"` for the message field.
 */
export function Field({ label, id, as = "input", type = "text", rows = 4, required = false, placeholder, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fieldStyle = {
    width: "100%",
    background: "var(--surface-input)",
    border: `1px solid ${focus ? "var(--accent)" : "var(--border-strong)"}`,
    borderRadius: "var(--radius-md)",
    padding: "0.875rem 1rem",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-base)",
    outline: "none",
    boxShadow: focus ? "var(--ring)" : "none",
    transition: "all var(--dur-base) var(--ease-out)",
    resize: as === "textarea" ? "vertical" : undefined,
  };
  const El = as;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label && (
        <label htmlFor={id} style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-muted)" }}>
          {label}
        </label>
      )}
      <El
        id={id}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? rows : undefined}
        required={required}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={fieldStyle}
        {...rest}
      />
    </div>
  );
}
