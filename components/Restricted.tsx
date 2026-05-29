export function RestrictedBanner({ context = "welfare" }: { context?: "welfare" | "hr" | "minor" }) {
  const text = {
    welfare:
      "Welfare records are restricted. Visible only to welfare officers, branch pastor, the national welfare coordinator, and the General Overseer. All access is logged.",
    hr: "Personnel records are restricted to HR officers and senior leadership.",
    minor: "Records flagged as minor require parental consent on file. Photos and exports are subject to additional approval.",
  }[context];

  return (
    <div className="restricted-banner">
      <span className="seal">✦</span>
      <div>
        <div className="title">Restricted view</div>
        <div className="body">{text}</div>
      </div>
    </div>
  );
}

export function MakerChecker({
  recorder,
  approver,
  status,
}: {
  recorder: string;
  approver?: string;
  status: "Pending" | "Approved" | "Reversed" | "Rejected" | "Disbursed";
}) {
  const cls =
    status === "Approved" || status === "Disbursed" ? "success" :
    status === "Reversed" || status === "Rejected" ? "danger" : "warning";
  return (
    <div className="row" style={{ gap: 12, fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>
      <span><span className="eyebrow" style={{ fontSize: 10 }}>Recorder · </span>{recorder}</span>
      <span style={{ opacity: 0.4 }}>→</span>
      <span><span className="eyebrow" style={{ fontSize: 10 }}>Approver · </span>{approver ?? "—"}</span>
      <span className={`chip ${cls}`}>{status}</span>
    </div>
  );
}
