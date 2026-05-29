import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { devotions } from "../../../lib/mock-data";

export default function DevotionsPage() {
  return (
    <>
      <Topbar crumbs={["CKSPC", "Worship & Word", "Devotions"]} />
      <main className="main">
        <PageHead
          eyebrow="Worship & Word · daily bread"
          title="A devotion"
          emphasis="for every morning."
          lede="Tomorrow's devotion at 5am. Scheduled, scripture-anchored, push-notified — the daily rhythm of the household."
          actions={
            <>
              <button className="btn btn-secondary">Schedule</button>
              <button className="btn btn-primary">New devotion</button>
            </>
          }
        />

        <div className="three-col">
          {devotions.map((d) => (
            <article key={d.id} className="card">
              <div className="card-head">
                <h3 style={{ fontSize: "var(--fs-md)" }}>{d.title}</h3>
                <span className={`chip ${d.published ? "success" : "warning"}`}>{d.published ? "Published" : "Draft"}</span>
              </div>
              <p className="serif-italic" style={{ color: "var(--brand)", fontSize: "var(--fs-md)" }}>{d.scripture}</p>
              <p className="muted mt-4" style={{ fontSize: "var(--fs-sm)", lineHeight: "var(--lh-relaxed)" }}>{d.reflection}</p>
              <div className="row between mt-6" style={{ paddingTop: "var(--space-3)", borderTop: "1px solid var(--border)" }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--fg-subtle)" }}>{d.date} · {d.author}</span>
                <a href="#" className="serif-italic" style={{ color: "var(--brand)" }}>Edit →</a>
              </div>
            </article>
          ))}
        </div>

        <div className="folio-foot"><span>· devotions · daily bread ·</span><span>Folio 15</span></div>
      </main>
    </>
  );
}
