import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { roles } from "../../../lib/mock-data";

export default function RolesPage() {
  return (
    <>
      <Topbar crumbs={["CKSPC", "Administration", "Roles & access"]} />
      <main className="main">
        <PageHead
          eyebrow="Administration · RBAC"
          title="What you see is what"
          emphasis="you may."
          lede="Every action in the platform is filtered through the user's role. A welfare officer sees welfare. A finance officer sees finance. Access is never accidental — and never silent."
          actions={
            <>
              <button className="btn btn-secondary">Audit access</button>
              <button className="btn btn-primary">New role</button>
            </>
          }
        />

        <section className="card">
          <div className="card-head">
            <h3>Roles <em>matrix</em></h3>
            <span className="meta">{roles.length} configured · {roles.reduce((a, r) => a + r.users, 0).toLocaleString()} assignees</span>
          </div>
          <DataTable
            rows={roles}
            getKey={(r) => r.name}
            columns={[
              { header: "Role", render: (r) => <span className="serif">{r.name}</span> },
              { header: "Scope", render: (r) => r.scope },
              { header: "Users", align: "right", mono: true, render: (r) => r.users.toLocaleString() },
              { header: "Permissions", render: (r) => (
                <div className="row" style={{ gap: 4, flexWrap: "wrap" }}>
                  {r.permissions.map((p) => <span key={p} className="chip">{p}</span>)}
                </div>
              )},
              { header: "", align: "right", render: () => (
                <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Edit</button>
              )},
            ]}
          />
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Permission <em>primitives</em></h3>
            <span className="meta">Beyond role presets</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              ["read", "Can view the record"],
              ["write", "Can create or edit records"],
              ["approve", "Can approve / reject workflows · maker / checker"],
              ["delete", "Can archive or delete records · restricted to senior leadership"],
              ["export", "Can export data · sensitive exports require dual sign-off"],
            ].map(([k, v]) => (
              <li key={k} style={{ padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)", display: "flex", gap: 16 }}>
                <span className="mono" style={{ minWidth: 80, color: "var(--brand)" }}>{k}</span>
                <span className="muted" style={{ fontSize: "var(--fs-sm)" }}>{v}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="folio-foot"><span>· roles · what you may ·</span><span>Folio 19</span></div>
      </main>
    </>
  );
}
