import Image from "next/image";
import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { churchProfile } from "../../../lib/mock-data";

export default function SettingsPage() {
  return (
    <>
      <Topbar crumbs={["CKSPC", "Administration", "Settings"]} />
      <main className="main">
        <PageHead
          eyebrow="Settings · church profile"
          title="The"
          emphasis="church itself."
          lede="The top level of the system — name, denomination, contact, identity. Edit here propagates everywhere — letters, receipts, the public site."
          actions={<button className="btn btn-primary">Save changes</button>}
        />

        <section className="card">
          <div className="card-head"><h3>Identity</h3><span className="meta">Public-facing</span></div>
          <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "flex-start" }}>
            <div style={{ width: 96, height: 96, borderRadius: "var(--r-md)", overflow: "hidden", flex: "none", border: "1px solid var(--border)" }}>
              <Image src="/brand/logo.jpg" alt="logo" width={96} height={96} style={{ objectFit: "cover" }} />
            </div>
            <form className="form" action="#" style={{ flex: 1 }}>
              <div className="field full"><label>Official name</label><input defaultValue={churchProfile.name} /></div>
              <div className="field"><label>Short name / code</label><input defaultValue={churchProfile.short} /></div>
              <div className="field"><label>Denomination / network</label><input defaultValue={churchProfile.denomination} /></div>
              <div className="field full"><label>Mission statement</label><input defaultValue={churchProfile.mission} /></div>
              <div className="field full"><label>Vision</label><input defaultValue={churchProfile.vision} /></div>
              <div className="field"><label>Year founded</label><input defaultValue={churchProfile.founded} /></div>
              <div className="field"><label>HQ address</label><input defaultValue={churchProfile.hq} /></div>
            </form>
          </div>
        </section>

        <section className="card mt-8">
          <div className="card-head"><h3>Regional <em>settings</em></h3><span className="meta">Affects currency, dates, SMS gateway</span></div>
          <form className="form" action="#">
            <div className="field"><label>Country</label><select><option>{churchProfile.country}</option></select></div>
            <div className="field"><label>Currency</label><select><option>{churchProfile.currency}</option></select></div>
            <div className="field"><label>Timezone</label><select><option>{churchProfile.timezone}</option></select></div>
            <div className="field"><label>SMS gateway</label><select><option>Arkesel</option><option>Hubtel</option></select></div>
          </form>
        </section>

        <section className="card mt-8">
          <div className="card-head"><h3>Modules <em>enabled</em></h3><span className="meta">Per-church configuration</span></div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
            {[
              ["Members CRM", true],
              ["Finance", true],
              ["Welfare", true],
              ["HR & Staff", true],
              ["Inventory", true],
              ["Departments & Fellowships", true],
              ["Events", true],
              ["Sermons & Devotions", true],
              ["Communications", true],
              ["Online giving (Paystack)", true],
              ["Livestream integration", true],
              ["Multi-tenancy controls", false],
            ].map(([name, on]) => (
              <li key={String(name)} style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-3)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)" }}>
                <span style={{ fontSize: "var(--fs-sm)" }}>{name}</span>
                <span className={`chip ${on ? "success" : "danger"}`}>{on ? "ON" : "OFF"}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card mt-8">
          <div className="card-head"><h3>Founder</h3><span className="meta">For the colophon</span></div>
          <p className="serif-italic" style={{ color: "var(--brand)", fontSize: "var(--fs-lg)" }}>
            {churchProfile.founder}
          </p>
          <p className="muted mt-4" style={{ fontSize: "var(--fs-sm)", lineHeight: "var(--lh-relaxed)" }}>
            "Nyame som yɛ kyen kyen soo soo." — the call to serve God is to suffer before gain.
          </p>
        </section>

        <div className="folio-foot"><span>· settings · the church itself ·</span><span>Folio 21</span></div>
      </main>
    </>
  );
}
