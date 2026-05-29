type Row = { label: string; segments: { value: number; tone: "brand" | "accent" | "vine" }[] };

export function StackedBars({ rows, max }: { rows: Row[]; max?: number }) {
  const top = max ?? Math.max(...rows.map((r) => r.segments.reduce((a, b) => a + b.value, 0)));
  return (
    <div className="bar-chart">
      {rows.map((r, i) => {
        const total = r.segments.reduce((a, b) => a + b.value, 0);
        return (
          <div className="col" key={i}>
            <div className="stack">
              {r.segments.map((s, j) => {
                const pct = (s.value / top) * 100;
                return <div key={j} className={`b ${s.tone}`} style={{ height: `${pct}%` }} />;
              })}
            </div>
            <span className="label">{r.label}</span>
            <span className="label" style={{ opacity: 0.6 }}>{total.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}
