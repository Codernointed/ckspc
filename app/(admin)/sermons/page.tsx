import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { sermons } from "../../../lib/mock-data";

export default function SermonsPage() {
  const series = Array.from(new Set(sermons.map((s) => s.series).filter(Boolean)));

  return (
    <>
      <Topbar crumbs={["CKSPC", "Worship & Word", "Sermons"]} />
      <main className="main">
        <PageHead
          eyebrow="Worship & Word · sermon library"
          title="The"
          emphasis="archive."
          lede="Every Sunday and special program preached at CKSPC — audio, video, transcript, and tagged for the day a member needs to find them again."
          actions={
            <>
              <button className="btn btn-secondary">Manage series</button>
              <button className="btn btn-primary">Upload sermon</button>
            </>
          }
        />

        <div className="filter-bar">
          <input className="grow" placeholder="Search sermons, scripture, preacher…" />
          <select><option>Any series</option>{series.map((s) => <option key={s}>{s}</option>)}</select>
          <select><option>Any preacher</option></select>
          <select><option>Any branch</option></select>
          <select><option>Any visibility</option><option>Public</option><option>Members Only</option><option>Branch Only</option></select>
        </div>

        <div className="module-grid">
          {sermons.map((s) => (
            <a key={s.id} href="#" className="module-card">
              <div className="head">
                <div>
                  <div className="meta">{s.series ?? "Standalone"} · {s.duration}</div>
                  <div className="name serif-italic" style={{ marginTop: 4 }}>{s.title}</div>
                </div>
                <span className={`chip ${s.visibility === "Public" ? "success" : "anoint"}`}>{s.visibility}</span>
              </div>
              <div className="body">
                <strong>{s.preacher}</strong> · {s.branch}<br />
                <span className="mono">{s.date}</span> · <span style={{ fontStyle: "italic" }}>{s.scripture}</span>
              </div>
              <div className="row" style={{ gap: 4, flexWrap: "wrap" }}>
                {s.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <div className="foot">
                <span className="mono">{s.views.toLocaleString()} views</span>
                <span className="serif-italic" style={{ color: "var(--brand)" }}>Listen →</span>
              </div>
            </a>
          ))}
        </div>

        <div className="folio-foot"><span>· sermons · the archive ·</span><span>Folio 14</span></div>
      </main>
    </>
  );
}
