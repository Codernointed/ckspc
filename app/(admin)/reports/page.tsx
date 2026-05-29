import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { standardReports } from "../../../lib/mock-data";

export default function ReportsPage() {
  return (
    <>
      <Topbar crumbs={["CKSPC", "Administration", "Reports"]} />
      <main className="main">
        <PageHead
          eyebrow="Reports · standard library"
          title="Every Sunday's"
          emphasis="numbers."
          lede="Standard reports — attendance, finance, membership, welfare, HR — generated to PDF or Excel on the cadence each one needs."
          actions={
            <>
              <button className="btn btn-secondary">Custom builder</button>
              <button className="btn btn-primary">Schedule report</button>
            </>
          }
        />

        <section className="card">
          <div className="card-head">
            <h3>Standard <em>reports</em></h3>
            <span className="meta">{standardReports.length} templates</span>
          </div>
          <DataTable
            rows={standardReports}
            getKey={(r) => r.title}
            columns={[
              { header: "Report", render: (r) => <span className="serif">{r.title}</span> },
              { header: "Frequency", render: (r) => <span className="chip">{r.frequency}</span> },
              { header: "Audience", render: (r) => r.audience },
              { header: "Last run", mono: true, render: (r) => r.lastRun },
              { header: "Format", mono: true, render: (r) => r.format },
              { header: "", align: "right", render: () => (
                <div className="row" style={{ gap: 4, justifyContent: "flex-end" }}>
                  <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Schedule</button>
                  <button className="btn btn-primary" style={{ padding: "4px 10px", fontSize: 11 }}>Run now</button>
                </div>
              )},
            ]}
          />
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Custom <em>report builder</em></h3>
            <span className="meta">Advanced · save as template</span>
          </div>
          <form className="form" action="#">
            <div className="field">
              <label>Data source</label>
              <select><option>Members</option><option>Attendance</option><option>Finance · collections</option><option>Finance · tithes</option><option>Welfare cases</option><option>Inventory · assets</option></select>
            </div>
            <div className="field">
              <label>Date range</label>
              <select><option>Last 30 days</option><option>Last 90 days</option><option>This year</option><option>Custom…</option></select>
            </div>
            <div className="field">
              <label>Branch filter</label>
              <select><option>All branches</option><option>Madina Central</option><option>Kasoa</option></select>
            </div>
            <div className="field">
              <label>Department filter</label>
              <select><option>Any</option><option>Choir / Music</option><option>Ushering</option></select>
            </div>
            <div className="field full"><label>Columns to include</label><input placeholder="member_id, name, branch, status, attendance_pct, giving_may" /></div>
            <div className="field"><label>Group by</label><select><option>Branch</option><option>Department</option><option>Status</option></select></div>
            <div className="field"><label>Format</label><select><option>PDF</option><option>Excel</option><option>CSV</option></select></div>
            <div className="field full row" style={{ gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-secondary">Save template</button>
              <button type="submit" className="btn btn-primary">Generate</button>
            </div>
          </form>
        </section>

        <div className="folio-foot"><span>· reports · the numbers ·</span><span>Folio 18</span></div>
      </main>
    </>
  );
}
