import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { fellowships } from "../../../lib/mock-data";

export default function FellowshipsPage() {
  return (
    <>
      <Topbar crumbs={["CKSPC", "People", "Fellowships"]} />
      <main className="main">
        <PageHead
          eyebrow="People · Affinity groups"
          title="Where the rooms"
          emphasis="of the church meet."
          lede="Fellowships are the affinity groups — men, women, youth, singles, couples, professionals, students. Each meets on its own cadence, with its own head and roll."
          actions={<button className="btn btn-primary">New fellowship</button>}
        />

        <div className="module-grid">
          {fellowships.map((f) => (
            <a key={f.slug} href="#" className="module-card">
              <div className="head">
                <div>
                  <div className="name">{f.name}</div>
                  <div className="meta">{f.branch} · {f.type}</div>
                </div>
                <span className="chip anoint">{f.members}</span>
              </div>
              <div className="body">
                <strong>Head:</strong> {f.head}<br />
                <strong>Meeting:</strong> {f.meeting}
              </div>
              <div className="foot">
                <span className="mono">{f.members} active</span>
                <span className="serif-italic" style={{ color: "var(--brand)" }}>View →</span>
              </div>
            </a>
          ))}
        </div>

        <div className="folio-foot"><span>· fellowships · affinity groups ·</span><span>Folio 09</span></div>
      </main>
    </>
  );
}
