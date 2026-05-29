export function Kpi({
  label,
  value,
  unit,
  delta,
  trend = "up",
  featured = false,
  foot,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  trend?: "up" | "down";
  featured?: boolean;
  foot?: string;
}) {
  return (
    <div className={`kpi${featured ? " featured" : ""}`}>
      <div className="label">{label}</div>
      <div className="value">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </div>
      {delta && (
        <div className={`delta ${trend}`}>
          <span>{trend === "up" ? "▲" : "▼"}</span>
          <span>{delta}</span>
        </div>
      )}
      {foot && <div className="foot">{foot}</div>}
    </div>
  );
}
