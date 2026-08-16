import { useState } from 'react'

const defaultAssigner = {
  assignmentId: 'ASN-2026-0048',
  name: 'Mohammad Rahman',
  address: 'House 18, Road 7, Dhanmondi, Dhaka 1209',
  designation: 'Senior Assigner',
  contactNo: '+880 1700-000000',
  email: 'rahman@agniprahari.gov.bd',
  salary: 'N/A',
}

const makeResponseId = () => {
  const year = new Date().getFullYear()
  const suffix = `${Date.now()}`.slice(-6)
  return `RES-${year}-${suffix}`
}

const createEmptySummary = () => ({
  responseId: makeResponseId(),
  incidentId: '',
  arrivalTime: '',
  fireControlledTime: '',
  completionTime: '',
  trucksUsed: '',
  firefightersUsed: '',
  fatality: '',
  injuredCount: '',
  propertyDamage: '',
  remarks: '',
})

function Icon({ name }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
    report: <><path d="M5 3h10l4 4v14H5V3Z" /><path d="M15 3v5h5M8 12h8M8 16h8" /></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    id: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8" cy="11" r="2" /><path d="M5.5 16a3 3 0 0 1 5 0M13 10h5M13 14h5" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    phone: <path d="M8.5 3H5.7C4.8 3 4 3.8 4.1 4.7 5 13 11 19 19.3 19.9c.9.1 1.7-.7 1.7-1.6v-2.8l-4.3-1-1.3 2.1a14 14 0 0 1-8-8l2.1-1.3-1-4.3Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    salary: <><circle cx="12" cy="12" r="9" /><path d="M15 8.5c-.6-.7-1.5-1-2.7-1-1.6 0-2.8.8-2.8 2s1 1.8 2.8 2.2c1.8.4 2.8 1 2.8 2.4s-1.2 2.4-3 2.4c-1.3 0-2.5-.4-3.2-1.3M12 5.5v13" /></>,
    shield: <><path d="M12 2 4.5 5v5.7c0 4.9 3.1 9.2 7.5 11.3 4.4-2.1 7.5-6.4 7.5-11.3V5L12 2Z" /><path d="m8.7 12 2.1 2.1 4.7-4.8" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    truck: <><path d="M3 6h11v11H3V6ZM14 10h4l3 3v4h-7v-7Z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    flame: <path d="M13.5 2c.6 4-2.1 5.2-1.4 8.1.7-1 1.7-1.8 2.9-2.4 2 2.1 3 4.2 3 6.3a6 6 0 0 1-12 0c0-2.8 1.5-5.5 4.3-8.2.1 2.3.7 3.8 1.7 4.6-.3-3.8 1.5-5.3 1.5-8.4Z" />,
    alert: <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v5M12 17.2v.1" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg className="ad-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function InfoCard({ icon, label, value, wide = false, accent = false }) {
  return (
    <article className={`ad-info-card ${wide ? 'ad-info-wide' : ''} ${accent ? 'ad-info-accent' : ''}`}>
      <span className="ad-info-icon"><Icon name={icon} /></span>
      <div>
        <small>{label}</small>
        <strong>{value || 'N/A'}</strong>
      </div>
    </article>
  )
}

function FormField({ label, required = false, wide = false, children }) {
  return (
    <label className={`ad-field ${wide ? 'ad-field-wide' : ''}`}>
      <span>{label}{required && <b> *</b>}</span>
      {children}
    </label>
  )
}

export default function AssignerDashboard({
  assigner = defaultAssigner,
  complaintHistory = [],
  onSubmitSummary,
  onLogout,
}) {
  const [activeView, setActiveView] = useState('dashboard')
  const [summary, setSummary] = useState(createEmptySummary)
  const [submittedSummaries, setSubmittedSummaries] = useState([])
  const [successMessage, setSuccessMessage] = useState('')

  const showView = (view) => {
    setActiveView(view)
    setSuccessMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateSummary = (event) => {
    const { name, value } = event.target
    setSummary((current) => ({ ...current, [name]: value }))
    setSuccessMessage('')
  }

  const handleSummarySubmit = (event) => {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    const responseRecord = {
      ...summary,
      submittedAt: new Date().toISOString(),
    }

    setSubmittedSummaries((current) => [responseRecord, ...current])
    onSubmitSummary?.(responseRecord)
    console.log('Response summary submitted:', responseRecord)
    setSuccessMessage(`Response ${summary.responseId} submitted successfully.`)
    setSummary(createEmptySummary())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
      return
    }
    console.log('Logout requested')
  }

  return (
    <div className="assigner-dashboard">
      <style>{dashboardStyles}</style>

      <header className="ad-topbar">
        <button className="ad-brand" type="button" onClick={() => showView('dashboard')}>
          <span className="ad-brand-agni">AGNI</span>
          <span className="ad-brand-prahari">PRAHARI</span>
        </button>

        <div className="ad-secure-note">
          <Icon name="shield" />
          <span>
            <strong>Secure dashboard</strong>
            <small>Authorized personnel only</small>
          </span>
        </div>
      </header>

      <div className="ad-shell">
        <aside className="ad-sidebar">
          <div className="ad-profile">
            <div className="ad-avatar">{assigner.name?.charAt(0)?.toUpperCase() || 'A'}</div>
            <div>
              <span>Signed in as</span>
              <strong>{assigner.name}</strong>
              <small>{assigner.designation}</small>
            </div>
          </div>

          <nav className="ad-nav" aria-label="Assigner dashboard navigation">
            <span className="ad-nav-label">Workspace</span>
            <button
              type="button"
              className={activeView === 'dashboard' ? 'active' : ''}
              onClick={() => showView('dashboard')}
            >
              <Icon name="grid" />
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              className={activeView === 'complaints' ? 'active' : ''}
              onClick={() => showView('complaints')}
            >
              <Icon name="history" />
              <span>Complaint History</span>
            </button>
            <button
              type="button"
              className={activeView === 'response' ? 'active' : ''}
              onClick={() => showView('response')}
            >
              <Icon name="report" />
              <span>Give a Response Summary</span>
            </button>
          </nav>

          <div className="ad-sidebar-status">
            <span><i /> System operational</span>
            <small>Emergency records are protected</small>
          </div>

          <button className="ad-logout" type="button" onClick={handleLogout}>
            <Icon name="logout" />
            <span>Log Out</span>
          </button>
        </aside>

        <main className="ad-content">
          {activeView === 'dashboard' && (
            <section className="ad-view" aria-labelledby="dashboard-title">
              <div className="ad-page-heading">
                <div>
                  <span>Personnel overview</span>
                  <h1 id="dashboard-title">Assigner Dashboard</h1>
                  <p>View your assignment details and manage emergency response records.</p>
                </div>
                <div className="ad-live-badge"><i /> Profile active</div>
              </div>

              <div className="ad-hero-card">
                <div className="ad-hero-glow" />
                <div className="ad-hero-avatar">{assigner.name?.charAt(0)?.toUpperCase() || 'A'}</div>
                <div className="ad-hero-copy">
                  <span>Assigner personnel record</span>
                  <h2>{assigner.name}</h2>
                  <p>{assigner.designation}</p>
                </div>
                <div className="ad-assignment-chip">
                  <small>Assignment ID</small>
                  <strong>{assigner.assignmentId}</strong>
                </div>
              </div>

              <div className="ad-section-heading">
                <div className="ad-section-icon"><Icon name="user" /></div>
                <div>
                  <span>Profile information</span>
                  <h2>Assignment & Personal Details</h2>
                  <p>Your registered information for emergency coordination.</p>
                </div>
              </div>

              <div className="ad-info-grid">
                <InfoCard icon="id" label="Assignment ID" value={assigner.assignmentId} />
                <InfoCard icon="user" label="Full Name" value={assigner.name} />
                <InfoCard icon="briefcase" label="Designation" value={assigner.designation} />
                <InfoCard icon="phone" label="Contact Number" value={assigner.contactNo} />
                <InfoCard icon="mail" label="Email Address" value={assigner.email} />
                <InfoCard icon="salary" label="Salary" value={assigner.salary || 'N/A'} accent />
                <InfoCard icon="pin" label="Address" value={assigner.address} wide />
              </div>

              <div className="ad-quick-action">
                <div>
                  <span className="ad-quick-icon"><Icon name="report" /></span>
                  <div>
                    <strong>Completed an emergency response?</strong>
                    <p>Submit the incident result, resources used and damage information.</p>
                  </div>
                </div>
                <button type="button" onClick={() => showView('response')}>
                  Give Response Summary <Icon name="arrow" />
                </button>
              </div>
            </section>
          )}

          {activeView === 'complaints' && (
            <section className="ad-view" aria-labelledby="complaints-title">
              <div className="ad-page-heading">
                <div>
                  <span>Record archive</span>
                  <h1 id="complaints-title">Complaint History</h1>
                  <p>Review complaints connected to your assignment profile.</p>
                </div>
                <div className="ad-count-badge">{complaintHistory.length} records</div>
              </div>

              {complaintHistory.length === 0 ? (
                <div className="ad-empty-state">
                  <span><Icon name="history" /></span>
                  <h2>No complaint history found</h2>
                  <p>Complaints connected to this assigner will appear here.</p>
                </div>
              ) : (
                <div className="ad-history-list">
                  {complaintHistory.map((complaint, index) => (
                    <article key={complaint.id || index}>
                      <div>
                        <small>Complaint ID</small>
                        <strong>{complaint.id || 'N/A'}</strong>
                      </div>
                      <div>
                        <small>Incident</small>
                        <strong>{complaint.incidentId || 'N/A'}</strong>
                      </div>
                      <div>
                        <small>Date</small>
                        <strong>{complaint.date || 'N/A'}</strong>
                      </div>
                      <span className="ad-history-status">{complaint.status || 'Pending'}</span>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeView === 'response' && (
            <section className="ad-view" aria-labelledby="response-title">
              <div className="ad-page-heading ad-form-title">
                <div>
                  <span>Emergency documentation</span>
                  <h1 id="response-title">Response Summary</h1>
                  <p>Record the final operational details after an incident is completed.</p>
                </div>
                <div className="ad-form-mark"><Icon name="report" /></div>
              </div>

              {successMessage && (
                <div className="ad-success" role="status">
                  <span><Icon name="check" /></span>
                  <div>
                    <strong>Response summary saved</strong>
                    <p>{successMessage}</p>
                  </div>
                  <button type="button" onClick={() => setSuccessMessage('')} aria-label="Close message">×</button>
                </div>
              )}

              <form className="ad-response-form" onSubmit={handleSummarySubmit}>
                <div className="ad-form-section-title">
                  <span className="ad-section-icon"><Icon name="id" /></span>
                  <div>
                    <small>Section 01</small>
                    <h2>Incident Identification</h2>
                  </div>
                </div>

                <div className="ad-form-grid">
                  <FormField label="Response ID" required>
                    <input
                      name="responseId"
                      value={summary.responseId}
                      readOnly
                      aria-describedby="response-id-hint"
                    />
                    <small id="response-id-hint">Automatically generated by the system</small>
                  </FormField>
                  <FormField label="Incident ID" required>
                    <input
                      name="incidentId"
                      value={summary.incidentId}
                      onChange={updateSummary}
                      placeholder="e.g. INC-2026-0198"
                      required
                    />
                  </FormField>
                </div>

                <div className="ad-form-divider" />

                <div className="ad-form-section-title">
                  <span className="ad-section-icon"><Icon name="clock" /></span>
                  <div>
                    <small>Section 02</small>
                    <h2>Response Timeline</h2>
                  </div>
                </div>

                <div className="ad-form-grid ad-three-columns">
                  <FormField label="Arrival Time" required>
                    <input type="time" name="arrivalTime" value={summary.arrivalTime} onChange={updateSummary} required />
                  </FormField>
                  <FormField label="Fire Controlled Time" required>
                    <input type="time" name="fireControlledTime" value={summary.fireControlledTime} onChange={updateSummary} required />
                  </FormField>
                  <FormField label="Completion Time" required>
                    <input type="time" name="completionTime" value={summary.completionTime} onChange={updateSummary} required />
                  </FormField>
                </div>

                <div className="ad-form-divider" />

                <div className="ad-form-section-title">
                  <span className="ad-section-icon"><Icon name="truck" /></span>
                  <div>
                    <small>Section 03</small>
                    <h2>Resources & Impact</h2>
                  </div>
                </div>

                <div className="ad-form-grid">
                  <FormField label="Trucks Used" required>
                    <input type="number" name="trucksUsed" value={summary.trucksUsed} onChange={updateSummary} placeholder="0" min="0" required />
                  </FormField>
                  <FormField label="Firefighters Used" required>
                    <input type="number" name="firefightersUsed" value={summary.firefightersUsed} onChange={updateSummary} placeholder="0" min="0" required />
                  </FormField>
                  <FormField label="Fatality" required>
                    <input type="number" name="fatality" value={summary.fatality} onChange={updateSummary} placeholder="0" min="0" required />
                  </FormField>
                  <FormField label="Injured Count" required>
                    <input type="number" name="injuredCount" value={summary.injuredCount} onChange={updateSummary} placeholder="0" min="0" required />
                  </FormField>
                  <FormField label="Property Damage" wide>
                    <input
                      name="propertyDamage"
                      value={summary.propertyDamage}
                      onChange={updateSummary}
                      placeholder="Describe or enter estimated amount"
                    />
                  </FormField>
                  <FormField label="Remarks" wide>
                    <textarea
                      name="remarks"
                      value={summary.remarks}
                      onChange={updateSummary}
                      placeholder="Add observations, challenges or follow-up requirements"
                      rows="5"
                    />
                  </FormField>
                </div>

                <div className="ad-form-actions">
                  <button
                    type="button"
                    className="ad-secondary-button"
                    onClick={() => {
                      setSummary(createEmptySummary())
                      setSuccessMessage('')
                    }}
                  >
                    Clear Form
                  </button>
                  <button type="submit" className="ad-primary-button">
                    Submit Response <Icon name="arrow" />
                  </button>
                </div>
              </form>

              {submittedSummaries.length > 0 && (
                <div className="ad-recent-submissions">
                  <span>Submitted this session</span>
                  <strong>{submittedSummaries.length}</strong>
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      <footer className="ad-footer">
        <span>© 2026 AGNIPRAHARI</span>
        <span>Emergency personnel records · Protected access</span>
      </footer>
    </div>
  )
}

const dashboardStyles = `
  :root {
    color-scheme: dark;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    --ad-red: #d90429;
    --ad-red-dark: #b8001f;
    --ad-red-glow: rgba(217, 4, 41, 0.25);
    --ad-black: #000000;
    --ad-surface: #0a0a0c;
    --ad-card: #121215;
    --ad-input: #18181c;
    --ad-white: #f1f5f9;
    --ad-muted: #94a3b8;
    --ad-line: #222228;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 320px; background: var(--ad-black); color: var(--ad-white); }
  button, input, textarea { font: inherit; }
  button { -webkit-tap-highlight-color: transparent; }

  .assigner-dashboard { min-height: 100vh; background: var(--ad-black); color: var(--ad-white); }
  .ad-icon { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

  .ad-topbar {
    height: 82px;
    padding: 0 clamp(22px, 5vw, 76px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 30;
    background: rgba(10, 10, 12, 0.9);
    border-bottom: 1px solid var(--ad-line);
    backdrop-filter: blur(14px);
  }
  .ad-brand { border: 0; padding: 0; background: none; color: white; cursor: pointer; font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif; font-size: 29px; font-weight: 900; line-height: 1; letter-spacing: .035em; }
  .ad-brand-prahari { color: var(--ad-red); }
  .ad-secure-note { display: flex; align-items: center; gap: 10px; }
  .ad-secure-note > svg { width: 28px; height: 28px; color: #34d399; }
  .ad-secure-note span { display: grid; }
  .ad-secure-note strong { color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; }
  .ad-secure-note small { margin-top: 2px; color: var(--ad-muted); font-size: 12px; }

  .ad-shell {
    width: min(1480px, calc(100% - 32px));
    min-height: calc(100vh - 150px);
    margin: 32px auto;
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    overflow: hidden;
    background: var(--ad-surface);
    border: 1px solid var(--ad-line);
    border-radius: 20px;
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.8);
  }

  .ad-sidebar {
    min-height: 100%;
    padding: 30px 20px 22px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background: linear-gradient(155deg, #180507 0%, #080203 100%);
    border-right: 1px solid var(--ad-line);
  }
  .ad-sidebar::before { content: ""; position: absolute; width: 320px; height: 320px; right: -220px; top: 17%; border: 1px solid rgba(217, 4, 41, .18); border-radius: 50%; box-shadow: 0 0 0 50px rgba(217, 4, 41, .025), 0 0 0 100px rgba(217, 4, 41, .012); }
  .ad-sidebar::after { content: ""; position: absolute; inset: 0; opacity: .06; pointer-events: none; background-image: linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px); background-size: 34px 34px; mask-image: linear-gradient(to bottom, black, transparent 75%); }
  .ad-sidebar > * { position: relative; z-index: 1; }

  .ad-profile { padding: 14px; display: flex; align-items: center; gap: 12px; background: rgba(18, 18, 21, .88); border: 1px solid var(--ad-line); border-radius: 14px; }
  .ad-avatar, .ad-hero-avatar { display: grid; place-items: center; color: white; background: linear-gradient(145deg, var(--ad-red), #750013); box-shadow: 0 8px 22px var(--ad-red-glow); font-weight: 850; }
  .ad-avatar { width: 46px; height: 46px; flex: 0 0 auto; border-radius: 12px; font-size: 19px; }
  .ad-profile div:last-child { min-width: 0; display: grid; }
  .ad-profile span { color: var(--ad-muted); font-size: 9px; text-transform: uppercase; letter-spacing: .1em; }
  .ad-profile strong { overflow: hidden; margin: 2px 0; color: white; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
  .ad-profile small { color: #ff8a93; font-size: 10px; }

  .ad-nav { margin-top: 32px; display: flex; flex-direction: column; gap: 8px; }
  .ad-nav-label { margin: 0 10px 5px; color: #64748b; font-size: 9px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; }
  .ad-nav button, .ad-logout { width: 100%; padding: 12px 13px; display: flex; align-items: center; gap: 11px; border: 1px solid transparent; border-radius: 9px; background: transparent; color: #cbd5e1; cursor: pointer; font-size: 13px; font-weight: 650; text-align: left; transition: .18s ease; }
  .ad-nav button:hover { background: rgba(255,255,255,.04); color: white; }
  .ad-nav button.active { color: white; background: rgba(217, 4, 41, .13); border-color: rgba(217, 4, 41, .28); box-shadow: inset 3px 0 0 var(--ad-red); }
  .ad-nav button.active svg { color: var(--ad-red); }
  .ad-nav button:nth-of-type(3) { align-items: flex-start; }
  .ad-nav button:nth-of-type(3) span { line-height: 1.35; }

  .ad-sidebar-status { margin-top: auto; margin-bottom: 14px; padding: 14px; display: grid; background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 10px; }
  .ad-sidebar-status span { display: flex; align-items: center; gap: 7px; color: #34d399; font-size: 11px; font-weight: 700; }
  .ad-sidebar-status i, .ad-live-badge i { width: 7px; height: 7px; display: inline-block; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 5px rgba(52, 211, 153, .13); }
  .ad-sidebar-status small { margin-top: 6px; color: var(--ad-muted); font-size: 10px; }
  .ad-logout { border-color: var(--ad-line); background: var(--ad-card); }
  .ad-logout:hover { color: white; border-color: rgba(217, 4, 41, .35); background: rgba(217, 4, 41, .08); }
  .ad-logout svg { color: var(--ad-red); }

  .ad-content { min-width: 0; padding: clamp(30px, 4vw, 62px); background: var(--ad-surface); }
  .ad-view { animation: adFade .23s ease; }
  @keyframes adFade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  .ad-page-heading { padding-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; gap: 25px; border-bottom: 1px solid var(--ad-line); }
  .ad-page-heading > div:first-child > span { color: var(--ad-red); font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  .ad-page-heading h1 { margin: 7px 0 7px; color: white; font-size: clamp(30px, 4vw, 43px); line-height: 1.06; letter-spacing: -.045em; }
  .ad-page-heading p { margin: 0; color: var(--ad-muted); font-size: 14px; line-height: 1.55; }
  .ad-live-badge, .ad-count-badge { flex: 0 0 auto; padding: 9px 12px; border-radius: 999px; font-size: 10px; font-weight: 750; text-transform: uppercase; letter-spacing: .07em; }
  .ad-live-badge { display: flex; align-items: center; gap: 9px; color: #34d399; background: rgba(52, 211, 153, .08); border: 1px solid rgba(52, 211, 153, .18); }
  .ad-count-badge { color: #ff8a93; background: rgba(217, 4, 41, .1); border: 1px solid rgba(217, 4, 41, .25); }

  .ad-hero-card { margin: 30px 0 36px; padding: 24px; display: flex; align-items: center; gap: 17px; position: relative; overflow: hidden; background: linear-gradient(115deg, #170407, #0d0d10 62%); border: 1px solid rgba(217, 4, 41, .23); border-radius: 16px; }
  .ad-hero-glow { position: absolute; width: 190px; height: 190px; left: -80px; bottom: -120px; background: var(--ad-red); filter: blur(75px); opacity: .22; }
  .ad-hero-avatar { width: 68px; height: 68px; z-index: 1; flex: 0 0 auto; border-radius: 16px; font-size: 27px; }
  .ad-hero-copy { z-index: 1; min-width: 0; }
  .ad-hero-copy span { color: #ff8a93; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  .ad-hero-copy h2 { margin: 5px 0 3px; color: white; font-size: 23px; letter-spacing: -.025em; }
  .ad-hero-copy p { margin: 0; color: var(--ad-muted); font-size: 13px; }
  .ad-assignment-chip { margin-left: auto; z-index: 1; padding: 12px 15px; display: grid; text-align: right; background: rgba(0,0,0,.25); border: 1px solid var(--ad-line); border-radius: 10px; }
  .ad-assignment-chip small { color: var(--ad-muted); font-size: 9px; text-transform: uppercase; letter-spacing: .08em; }
  .ad-assignment-chip strong { margin-top: 3px; color: white; font-size: 13px; }

  .ad-section-heading, .ad-form-section-title { display: flex; align-items: flex-start; gap: 14px; }
  .ad-section-heading { margin-bottom: 22px; }
  .ad-section-icon { width: 42px; height: 42px; flex: 0 0 auto; display: grid; place-items: center; color: var(--ad-red); background: rgba(217, 4, 41, .1); border: 1px solid rgba(217, 4, 41, .2); border-radius: 10px; }
  .ad-section-heading span, .ad-form-section-title small { display: block; margin-bottom: 3px; color: var(--ad-red); font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  .ad-section-heading h2, .ad-form-section-title h2 { margin: 0; color: white; font-size: 20px; }
  .ad-section-heading p { margin: 4px 0 0; color: var(--ad-muted); font-size: 12px; }

  .ad-info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .ad-info-card { min-width: 0; padding: 17px; display: flex; align-items: flex-start; gap: 13px; background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 11px; transition: border-color .18s, transform .18s; }
  .ad-info-card:hover { border-color: #34343c; transform: translateY(-1px); }
  .ad-info-wide { grid-column: 1 / -1; }
  .ad-info-icon { width: 36px; height: 36px; flex: 0 0 auto; display: grid; place-items: center; color: var(--ad-red); background: rgba(217, 4, 41, .08); border-radius: 8px; }
  .ad-info-icon svg { width: 18px; height: 18px; }
  .ad-info-card div { min-width: 0; display: grid; }
  .ad-info-card small { color: var(--ad-muted); font-size: 9px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
  .ad-info-card strong { margin-top: 5px; overflow-wrap: anywhere; color: #e2e8f0; font-size: 13px; line-height: 1.45; }
  .ad-info-accent { border-color: rgba(217, 4, 41, .26); background: linear-gradient(130deg, rgba(217, 4, 41, .08), var(--ad-card)); }
  .ad-info-accent strong { color: #ff9aa3; font-size: 15px; }

  .ad-quick-action { margin-top: 30px; padding: 19px; display: flex; align-items: center; justify-content: space-between; gap: 20px; background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 13px; }
  .ad-quick-action > div { display: flex; align-items: center; gap: 14px; }
  .ad-quick-icon { width: 42px; height: 42px; flex: 0 0 auto; display: grid; place-items: center; color: #34d399; background: rgba(52, 211, 153, .08); border-radius: 10px; }
  .ad-quick-action strong { color: white; font-size: 13px; }
  .ad-quick-action p { margin: 3px 0 0; color: var(--ad-muted); font-size: 11px; }
  .ad-quick-action button, .ad-primary-button { padding: 11px 17px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex: 0 0 auto; color: white; background: var(--ad-red); border: 0; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 700; box-shadow: 0 4px 14px var(--ad-red-glow); transition: background .18s; }
  .ad-quick-action button:hover, .ad-primary-button:hover { background: var(--ad-red-dark); }
  .ad-quick-action button svg, .ad-primary-button svg { width: 15px; height: 15px; }

  .ad-empty-state { min-height: 350px; padding: 45px 20px; display: grid; place-content: center; justify-items: center; text-align: center; }
  .ad-empty-state > span { width: 72px; height: 72px; display: grid; place-items: center; color: var(--ad-red); background: rgba(217, 4, 41, .09); border: 1px solid rgba(217, 4, 41, .18); border-radius: 50%; }
  .ad-empty-state > span svg { width: 30px; height: 30px; }
  .ad-empty-state h2 { margin: 17px 0 7px; color: white; font-size: 20px; }
  .ad-empty-state p { margin: 0; color: var(--ad-muted); font-size: 13px; }
  .ad-history-list { margin-top: 27px; display: grid; gap: 11px; }
  .ad-history-list article { padding: 16px; display: grid; grid-template-columns: repeat(3, 1fr) auto; align-items: center; gap: 14px; background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 10px; }
  .ad-history-list article div { display: grid; }
  .ad-history-list small { color: var(--ad-muted); font-size: 9px; text-transform: uppercase; letter-spacing: .07em; }
  .ad-history-list strong { margin-top: 4px; color: #e2e8f0; font-size: 12px; }
  .ad-history-status { padding: 6px 9px; color: #fbbf24; background: rgba(251,191,36,.08); border: 1px solid rgba(251,191,36,.2); border-radius: 999px; font-size: 9px; font-weight: 700; text-transform: uppercase; }

  .ad-form-title { margin-bottom: 30px; }
  .ad-form-mark { width: 58px; height: 58px; flex: 0 0 auto; display: grid; place-items: center; color: var(--ad-red); background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 50%; }
  .ad-form-mark svg { width: 24px; height: 24px; }
  .ad-success { margin-bottom: 24px; padding: 15px; display: flex; align-items: flex-start; gap: 12px; color: #34d399; background: rgba(52, 211, 153, .08); border: 1px solid rgba(52, 211, 153, .18); border-radius: 11px; }
  .ad-success > span { width: 27px; height: 27px; flex: 0 0 auto; display: grid; place-items: center; color: white; background: #059669; border-radius: 50%; }
  .ad-success > span svg { width: 16px; height: 16px; stroke-width: 2.3; }
  .ad-success div { flex: 1; }
  .ad-success strong { font-size: 13px; }
  .ad-success p { margin: 3px 0 0; font-size: 11px; line-height: 1.5; }
  .ad-success button { padding: 0 4px; color: inherit; background: none; border: 0; cursor: pointer; font-size: 20px; }

  .ad-response-form { padding: clamp(20px, 3vw, 32px); background: #0e0e11; border: 1px solid var(--ad-line); border-radius: 15px; }
  .ad-form-section-title { margin-bottom: 22px; }
  .ad-form-section-title div:last-child { padding-top: 2px; }
  .ad-form-divider { height: 1px; margin: 31px 0; background: var(--ad-line); }
  .ad-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .ad-three-columns { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ad-field { min-width: 0; display: flex; flex-direction: column; gap: 7px; }
  .ad-field-wide { grid-column: 1 / -1; }
  .ad-field > span { color: #cbd5e1; font-size: 10px; font-weight: 750; letter-spacing: .055em; text-transform: uppercase; }
  .ad-field > span b { color: var(--ad-red); }
  .ad-field input, .ad-field textarea { width: 100%; padding: 11px 12px; color: white; background: var(--ad-input); border: 1px solid var(--ad-line); border-radius: 8px; font-size: 13px; transition: border-color .15s, box-shadow .15s; }
  .ad-field input:focus, .ad-field textarea:focus { outline: 0; border-color: var(--ad-red); box-shadow: 0 0 0 3px var(--ad-red-glow); }
  .ad-field input[readonly] { color: #ff8a93; background: rgba(217, 4, 41, .055); cursor: not-allowed; }
  .ad-field textarea { resize: vertical; line-height: 1.55; }
  .ad-field > small { color: var(--ad-muted); font-size: 10px; }
  .ad-form-actions { margin-top: 31px; padding-top: 24px; display: flex; justify-content: flex-end; gap: 11px; border-top: 1px solid var(--ad-line); }
  .ad-secondary-button { padding: 11px 18px; color: #cbd5e1; background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 650; }
  .ad-secondary-button:hover { background: #1a1a20; }
  .ad-recent-submissions { margin-top: 13px; padding: 12px 15px; display: flex; justify-content: space-between; color: var(--ad-muted); background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 9px; font-size: 11px; }
  .ad-recent-submissions strong { color: #34d399; }

  .ad-footer { width: min(1480px, calc(100% - 32px)); margin: 0 auto; padding: 0 0 25px; display: flex; justify-content: space-between; color: var(--ad-muted); font-size: 11px; }

  @media (max-width: 980px) {
    .ad-shell { grid-template-columns: 240px minmax(0, 1fr); }
    .ad-sidebar { padding-inline: 14px; }
    .ad-content { padding: 32px 26px; }
    .ad-three-columns { grid-template-columns: 1fr; }
  }

  @media (max-width: 760px) {
    .ad-topbar { height: 72px; padding: 0 18px; }
    .ad-secure-note small { display: none; }
    .ad-shell { width: min(100% - 20px, 1480px); margin: 18px auto; grid-template-columns: 1fr; }
    .ad-sidebar { min-height: auto; padding: 18px; border-right: 0; border-bottom: 1px solid var(--ad-line); }
    .ad-profile, .ad-sidebar-status { display: none; }
    .ad-nav { margin-top: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
    .ad-nav-label { display: none; }
    .ad-nav button { min-height: 66px; padding: 9px 7px; flex-direction: column; justify-content: center; gap: 5px; text-align: center; font-size: 10px; }
    .ad-nav button:nth-of-type(3) { align-items: center; }
    .ad-nav button.active { box-shadow: inset 0 3px 0 var(--ad-red); }
    .ad-logout { margin-top: 11px; justify-content: center; }
    .ad-content { padding: 27px 18px; }
    .ad-info-grid, .ad-form-grid { grid-template-columns: 1fr; }
    .ad-info-wide, .ad-field-wide { grid-column: auto; }
    .ad-quick-action { align-items: stretch; flex-direction: column; }
    .ad-quick-action button { width: 100%; }
    .ad-history-list article { grid-template-columns: 1fr 1fr; }
    .ad-history-status { justify-self: start; }
  }

  @media (max-width: 520px) {
    .ad-secure-note strong { font-size: 9px; }
    .ad-secure-note > svg { width: 23px; }
    .ad-page-heading { flex-direction: column; }
    .ad-page-heading h1 { font-size: 31px; }
    .ad-hero-card { align-items: flex-start; flex-wrap: wrap; }
    .ad-assignment-chip { width: 100%; margin-left: 0; text-align: left; }
    .ad-form-actions { flex-direction: column-reverse; }
    .ad-form-actions button { width: 100%; }
    .ad-footer { flex-direction: column; gap: 5px; text-align: center; }
  }
`