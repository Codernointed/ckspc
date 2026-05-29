import { notFound } from "next/navigation";
import Link from "next/link";
import { Topbar } from "../../../../components/Topbar";
import { PageHead } from "../../../../components/PageHead";
import { Kpi } from "../../../../components/dashboard/Kpi";
import { members, getMember, formatGHS } from "../../../../lib/mock-data";
import { RestrictedBanner } from "../../../../components/Restricted";

export function generateStaticParams() {
  return members.map((m) => ({ id: m.id }));
}

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = getMember(id);
  if (!m) notFound();

  return (
    <>
      <Topbar crumbs={["CKSPC", "Members", m.name]} />
      <main className="main">
        <PageHead
          eyebrow={`${m.id} · ${m.branch}`}
          title={m.name}
          emphasis={m.minor ? "· minor" : ""}
          lede={`${m.status} since ${m.joined}. ${m.baptized ? "Baptised" : "Awaiting baptism"}. ${m.department ? `Serves in ${m.department}.` : ""}`}
          actions={
            <>
              <button className="btn btn-secondary">Print profile</button>
              <button className="btn btn-primary">Edit</button>
            </>
          }
        />

        {m.minor && <RestrictedBanner context="minor" />}

        <nav className="tabs">
          <a className="tab active" href="#bio">Bio</a>
          <a className="tab" href="#church">Church life</a>
          <a className="tab" href="#family">Family</a>
          <a className="tab" href="#attend">Attendance</a>
          <a className="tab" href="#giving">Giving</a>
          <a className="tab" href="#notes">Pastoral notes</a>
        </nav>

        <section className="card" id="bio">
          <div className="card-head"><h3>Bio <em>data</em></h3><span className="meta">Personal · contact</span></div>
          <dl className="dl">
            <div><dt>Full name</dt><dd>{m.name}</dd></div>
            <div><dt>Age · gender</dt><dd>{m.age} · {m.gender === "M" ? "Male" : "Female"}</dd></div>
            <div><dt>Phone</dt><dd className="mono">{m.phone}</dd></div>
            <div><dt>Email</dt><dd className="mono">{m.email}</dd></div>
            <div><dt>Home branch</dt><dd>{m.branch}</dd></div>
            <div><dt>Cell group</dt><dd>{m.cell ?? "—"}</dd></div>
          </dl>
        </section>

        <section className="card mt-6" id="church">
          <div className="card-head"><h3>Church <em>life</em></h3><span className="meta">Spiritual milestones</span></div>
          <dl className="dl">
            <div><dt>Status</dt><dd>{m.status}</dd></div>
            <div><dt>Date joined</dt><dd className="mono">{m.joined}</dd></div>
            <div><dt>Baptism</dt><dd>{m.baptized ? "Baptised" : "Awaiting"}</dd></div>
            <div><dt>Department</dt><dd>{m.department ?? "—"}</dd></div>
            <div><dt>Assigned pastor</dt><dd>Rev. Samuel Boateng</dd></div>
            <div><dt>Spiritual gifts</dt><dd>Hospitality · Service · Encouragement</dd></div>
          </dl>
        </section>

        <div className="two-col mt-8" id="attend">
          <section className="card">
            <div className="card-head"><h3>Attendance <em>· last 12 weeks</em></h3><span className="meta">{m.attendance}%</span></div>
            <div className="bar-chart" style={{ height: 120 }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const v = 40 + Math.round(Math.random() * 60);
                return (
                  <div key={i} className="col">
                    <div className="stack">
                      <div className="b brand" style={{ height: `${v}%` }} />
                    </div>
                    <span className="label">W{i + 8}</span>
                  </div>
                );
              })}
            </div>
            <div className="legend">
              <span className="item"><span className="swatch" style={{ background: "var(--brand)" }} /> Present</span>
            </div>
          </section>

          <section className="card" id="giving">
            <div className="card-head"><h3>Giving <em>· May</em></h3><span className="meta">Personal ledger</span></div>
            <ol className="rank">
              <li><span className="pos">25</span><div><div className="name">Tithe — Mobile Money</div><div className="meta">2026-05-25</div></div><span className="meta">{formatGHS(m.giving * 0.6)}</span></li>
              <li><span className="pos">18</span><div><div className="name">Offering — Cash</div><div className="meta">2026-05-18</div></div><span className="meta">{formatGHS(m.giving * 0.15)}</span></li>
              <li><span className="pos">11</span><div><div className="name">Building fund</div><div className="meta">2026-05-11</div></div><span className="meta">{formatGHS(m.giving * 0.20)}</span></li>
              <li><span className="pos">04</span><div><div className="name">Welfare fund</div><div className="meta">2026-05-04</div></div><span className="meta">{formatGHS(m.giving * 0.05)}</span></li>
            </ol>
          </section>
        </div>

        <section className="card mt-8" id="family">
          <div className="card-head"><h3>Family <em>links</em></h3><span className="meta">Household</span></div>
          <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>No linked family members. <Link href="#" style={{ color: "var(--brand)" }}>+ Link a spouse, child or parent</Link></p>
        </section>

        <section className="card mt-8" id="notes">
          <div className="card-head"><h3>Pastoral <em>notes</em></h3><span className="meta">For staff use only</span></div>
          <ol className="timeline">
            <li className="featured">
              <div className="when">2026-05-22 · Rev. Samuel Boateng</div>
              <div className="what" style={{ fontSize: "var(--fs-sm)", fontFamily: "var(--font-sans)" }}>Attended Saturday prayer. Requested prayer for upcoming visa interview. Following up after Pentecost.</div>
            </li>
            <li>
              <div className="when">2026-05-08 · Sis. Adwoa Pokuaa</div>
              <div className="what" style={{ fontSize: "var(--fs-sm)", fontFamily: "var(--font-sans)" }}>Visited at home — encouraged about new role at department. Said attendance was affected by night shifts at work.</div>
            </li>
          </ol>
        </section>

        <div className="folio-foot"><span>· member profile · {m.id} ·</span><span>Folio 07</span></div>
      </main>
    </>
  );
}
