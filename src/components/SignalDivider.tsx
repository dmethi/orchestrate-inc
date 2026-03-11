interface SignalDividerProps {
  theme?: "light" | "dark";
  className?: string;
}

const LTR_DURATIONS = [3.8, 4.6, 5.5, 7.2];
const RTL_DURATIONS = [4.2, 5.8, 7.6];

export function SignalDivider({ theme = "dark", className }: SignalDividerProps) {
  const dotColor = theme === "light" ? "#1f4d64" : "#6bc4d8";
  const glowColor = theme === "light" ? "rgba(31,77,100,0.4)" : "rgba(107,196,216,0.4)";
  const lineColor = theme === "light" ? "rgba(31,77,100,0.1)" : "rgba(107,196,216,0.1)";

  return (
    <div
      className={`signal-divider${className ? ` ${className}` : ""}`}
      aria-hidden
      style={{ position: "relative", height: "2.5rem", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: lineColor }} />

      {LTR_DURATIONS.map((dur, i) => (
        <span
          key={`ltr-${i}`}
          style={{
            position: "absolute",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: dotColor,
            boxShadow: `0 0 8px ${glowColor}`,
            animation: `signal-ltr ${dur}s linear ${i * 0.9}s infinite`,
            top: "50%",
            marginTop: -2.5,
          }}
        />
      ))}

      {RTL_DURATIONS.map((dur, i) => (
        <span
          key={`rtl-${i}`}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: dotColor,
            opacity: 0.6,
            boxShadow: `0 0 6px ${glowColor}`,
            animation: `signal-rtl ${dur}s linear ${i * 1.3 + 0.6}s infinite`,
            top: "50%",
            marginTop: -2,
          }}
        />
      ))}
    </div>
  );
}
