// import { useState } from 'react'
import { useState, useEffect } from 'react'

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

// ---- MOCK DATA (swap with real Oracle/Next.js API calls later) ----

const FIRE_STATIONS = {
  'FS-01': 'Mirpur Central',
  'FS-02': 'Motijheel HQ',
  'FS-03': 'Uttara Station',
  'FS-04': 'Dhanmondi Sub',
  'FS-05': 'Gulshan Station',
}

// mirrors the `location` table: area -> [priority_1, priority_2, priority_3]
const LOCATION_PRIORITIES = {
  'Mirpur-10': ['FS-01', 'FS-03', 'FS-05'],
  Dhanmondi: ['FS-04', 'FS-01', 'FS-02'],
  'Gulshan-1': ['FS-05', 'FS-02', 'FS-04'],
}

// mirrors `complaint` + `emergency`
const initialEmergencyComplaints = [
  {
    complaintId: 'CMP-3001',
    reportTime: '2026-08-29 14:32',
    incidentType: 'Fire',
    fireSize: 'Medium',
    buildingType: 'Residential',
    trappedPersonCount: 2,
    incidentStatus: 'Reported',
    area: 'Mirpur-10',
    detailedLocation: 'Road 5, House 12, near Mirpur-10 circle',
    requests: Object.fromEntries(
      (LOCATION_PRIORITIES['Mirpur-10'] || []).map((sid) => [sid, 'not_requested'])
    ),
  },
  {
    complaintId: 'CMP-3002',
    reportTime: '2026-08-29 15:10',
    incidentType: 'Rescue',
    fireSize: null,
    buildingType: 'Commercial',
    trappedPersonCount: 0,
    incidentStatus: 'Reported',
    area: 'Dhanmondi',
    detailedLocation: 'Road 27, Dhanmondi, near the lake',
    requests: Object.fromEntries(
      (LOCATION_PRIORITIES['Dhanmondi'] || []).map((sid) => [sid, 'not_requested'])
    ),
  },
]

// mirrors `complaint` + `general_feedback`
const initialCitizenComplaints = [
  {
    complaintId: 'CMP-4001',
    complaintDate: '2026-08-20',
    stationId: 'FS-01',
    complaintText: 'Delayed response time during last incident near Mirpur-10.',
    status: 'Pending',
  },
  {
    complaintId: 'CMP-4002',
    complaintDate: '2026-08-24',
    stationId: 'FS-04',
    complaintText: 'Firefighting team was very professional and quick.',
    status: 'Pending',
  },
]

// mirrors `complaint` + `org_feedback`
const initialOrgComplaints = [
  {
    complaintId: 'CMP-5001',
    complaintDate: '2026-08-18',
    stationId: 'FS-02',
    trainingId: 'TRN-01',
    trainingType: 'new trainee',
    complaintText: 'Training schedule conflicted with duty shifts.',
    status: 'Pending',
  },
]

// mirrors `request` + `citizen` + `training` + `new_trainee`
const initialTrainingRequests = [
  {
    requestId: 'REQ-T1',
    citizenName: 'Abdul Karim',
    trainingId: 'TRN-01',
    trainingName: 'Basic Firefighting Orientation',
    yearOfExperience: 0,
    degree: 'HSC',
    status: 'pending',
  },
  {
    requestId: 'REQ-T2',
    citizenName: 'Nusrat Jahan',
    trainingId: 'TRN-02',
    trainingName: 'Advanced Rescue Techniques',
    yearOfExperience: 2,
    degree: 'BSc',
    status: 'pending',
  },
]

// mirrors `Fire_Safety_Inspection` + `assigner_as_insp`
const initialInspectionRequests = [
  {
    requestId: 'REQ-I1',
    inspectionId: 'INSP-01',
    location: 'Bashundhara City Shopping Mall',
    riskLevel: 'High',
    inspectionType: 'Routine',
    status: 'pending',
  },
  {
    requestId: 'REQ-I2',
    inspectionId: 'INSP-02',
    location: 'Uttara Sector 7 Apartment Complex',
    riskLevel: 'Medium',
    inspectionType: 'Complaint-based',
    status: 'pending',
  },
]

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

// ---- Shared view for review-based complaint lists (citizen / org) ----
function ReviewableComplaintsView({ title, subtitle, complaints, onReview, renderExtra }) {
  return (
    <section className="ad-view">
      <div className="ad-page-heading">
        <div>
          <span>Complaint history</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="ad-panel-list">
        {complaints.length === 0 && <p className="ad-empty-note">No complaints in this category yet.</p>}
        {complaints.map((c) => (
          <article key={c.complaintId} className="ad-complaint-card">
            <div className="ad-complaint-head">
              <div>
                <small>Complaint ID</small>
                <strong>{c.complaintId}</strong>
              </div>
              <span className={`ad-badge ad-badge-${c.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {c.status}
              </span>
            </div>

            <div className="ad-complaint-grid">
              <div><small>Date</small><strong>{c.complaintDate}</strong></div>
              <div><small>Station</small><strong>{FIRE_STATIONS[c.stationId] || c.stationId}</strong></div>
              {renderExtra && renderExtra(c)}
              <div className="ad-info-wide"><small>Details</small><strong>{c.complaintText}</strong></div>
            </div>

            <div className="ad-decision-row">
              <button
                type="button"
                className="ad-review-btn"
                disabled={c.status === 'Solved'}
                onClick={() => onReview(c.complaintId)}
              >
                {c.status === 'Pending' ? 'Mark In Review' : c.status === 'On Review' ? 'Mark Solved' : 'Solved'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ---- Shared view for accept/reject request lists (training / inspection) ----
function DecisionRequestsView({ title, subtitle, requests, onDecision, fields }) {
  return (
    <section className="ad-view">
      <div className="ad-page-heading">
        <div>
          <span>Requests</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="ad-panel-list">
        {requests.length === 0 && <p className="ad-empty-note">No requests right now.</p>}
        {requests.map((r) => (
          <article key={r.requestId} className="ad-complaint-card">
            <div className="ad-complaint-head">
              <div>
                <small>Request ID</small>
                <strong>{r.requestId}</strong>
              </div>
              <span className={`ad-badge ad-badge-${r.status}`}>
                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
              </span>
            </div>

            <div className="ad-complaint-grid">
              {fields.map((f) => (
                <div key={f.key}>
                  <small>{f.label}</small>
                  <strong>{r[f.key] ?? 'N/A'}</strong>
                </div>
              ))}
            </div>

            {r.status === 'pending' && (
              <div className="ad-decision-row">
                <button type="button" className="ad-accept-btn" onClick={() => onDecision(r.requestId, 'accepted')}>
                  Accept
                </button>
                <button type="button" className="ad-reject-btn" onClick={() => onDecision(r.requestId, 'rejected')}>
                  Reject
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

// ---- Emergency complaints view (per-complaint priority-station dispatch) ----
// function EmergencyComplaintsView({ complaints, onRequest }) {
//   return (
//     <section className="ad-view">
//       <div className="ad-page-heading">
//         <div>
//           <span>Complaint history</span>
//           <h1>Emergency Complaints</h1>
//           <p>Live emergency reports with priority station dispatch requests.</p>
//         </div>
//       </div>

//       <div className="ad-panel-list">
//         {complaints.length === 0 && <p className="ad-empty-note">No emergency reports right now.</p>}
//         {complaints.map((c) => {
//           const stationIds = Object.keys(c.requests)
//           return (
//             <article key={c.complaintId} className="ad-complaint-card">
//               <div className="ad-complaint-head">
//                 <div>
//                   <small>Complaint ID</small>
//                   <strong>{c.complaintId}</strong>
//                 </div>
//                 <span className={`ad-badge ad-badge-${(c.incidentStatus || 'pending').toLowerCase().replace(/\s+/g, '-')}`}>
//                   {c.incidentStatus}
//                 </span>
//               </div>

//               <div className="ad-complaint-grid">
//                 <div><small>Incident Type</small><strong>{c.incidentType}</strong></div>
//                 {c.incidentType === 'Fire' && (
//                   <div><small>Fire Size</small><strong>{c.fireSize || 'N/A'}</strong></div>
//                 )}
//                 <div><small>Building Type</small><strong>{c.buildingType || 'N/A'}</strong></div>
//                 <div><small>Trapped Persons</small><strong>{c.trappedPersonCount}</strong></div>
//                 <div><small>Area</small><strong>{c.area}</strong></div>
//                 <div><small>Report Time</small><strong>{c.reportTime}</strong></div>
//                 <div className="ad-info-wide"><small>Detailed Location</small><strong>{c.detailedLocation}</strong></div>
//               </div>

//               <div className="ad-station-list">
//                 <small className="ad-station-list-label">Priority stations</small>
//                 {stationIds.map((sid, idx) => (
//                   <div key={sid} className="ad-station-row">
//                     <span className="ad-station-priority">P{idx + 1}</span>
//                     <span className="ad-station-name">{FIRE_STATIONS[sid] || sid}</span>
//                     {c.requests[sid] === 'not_requested' ? (
//                       <button type="button" className="ad-request-btn" onClick={() => onRequest(c.complaintId, sid)}>
//                         Request
//                       </button>
//                     ) : (
//                       <span className={`ad-badge ad-badge-${c.requests[sid]}`}>
//                         {c.requests[sid] === 'pending' ? 'Pending' : c.requests[sid] === 'accepted' ? 'Accepted' : 'Rejected'}
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </article>
//           )
//         })}
//       </div>
//     </section>
//   )
// }



function EmergencyComplaintsView({ complaints, onRequest }) {
  return (
    <section className="ad-view">
      <div className="ad-page-heading">
        <div>
          <span>Complaint history</span>
          <h1>Emergency Complaints</h1>
          <p>Live emergency reports with priority station dispatch requests.</p>
        </div>
      </div>

      <div className="ad-panel-list">
        {complaints.length === 0 && <p className="ad-empty-note">No emergency reports right now.</p>}
        {complaints.map((c) => (
          <article key={c.COMPLAINT_ID} className="ad-complaint-card">
            <div className="ad-complaint-head">
              <div>
                <small>Complaint ID</small>
                <strong>{c.COMPLAINT_ID}</strong>
              </div>
              <span className={`ad-badge ad-badge-${(c.INCIDENT_STATUS || 'pending').toLowerCase().replace(/\s+/g, '-')}`}>
                {c.INCIDENT_STATUS}
              </span>
            </div>

            <div className="ad-complaint-grid">
              <div><small>Reported By</small><strong>{c.CITIZEN_NAME}</strong></div>
              <div><small>Phone</small><strong>{c.PHONE_NO}</strong></div>
              <div><small>Incident Type</small><strong>{c.INCIDENT_TYPE}</strong></div>
              {c.INCIDENT_TYPE?.toLowerCase() === 'fire' && (
                <div><small>Fire Size</small><strong>{c.FIRE_SIZE || 'N/A'}</strong></div>
              )}
              <div><small>Building Type</small><strong>{c.BUILDING_TYPE || 'N/A'}</strong></div>
              <div><small>Trapped Persons</small><strong>{c.TRAPPED_PERSON_COUNT}</strong></div>
              <div><small>Area</small><strong>{c.AREA}</strong></div>
              <div className="ad-info-wide"><small>Detailed Location</small><strong>{c.DETAILED_LOCATION}</strong></div>
            </div>

            <div className="ad-station-list">
              <small className="ad-station-list-label">Active stations available</small>
              {c.STATIONS.length === 0 && (
                <p className="ad-empty-note">No active stations available for this area right now.</p>
              )}
              {c.STATIONS.map((station, idx) => (
                <div key={station.STATION_ID} className="ad-station-row">
                  <span className="ad-station-priority">P{idx + 1}</span>
                  <span className="ad-station-name">{station.STATION_NAME}</span>
                  <button
                    type="button"
                    className="ad-request-btn"
                    onClick={() => onRequest(c, station.STATION_ID)}
                  >
                    Dispatch
                  </button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
export default function AssignerDashboard({
  assigner = defaultAssigner,
  onSubmitSummary,
  onLogout,
  onBackHome,
}) {
  const [activeView, setActiveView] = useState('dashboard')
  const [complaintsOpen, setComplaintsOpen] = useState(false)
  const [requestsOpen, setRequestsOpen] = useState(false)

  const [summary, setSummary] = useState(createEmptySummary)
  const [submittedSummaries, setSubmittedSummaries] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [timelineError, setTimelineError] = useState('')

  // const [emergencyComplaints, setEmergencyComplaints] = useState(initialEmergencyComplaints)
  const [emergencyComplaints, setEmergencyComplaints] = useState([])

useEffect(() => {
  fetch('http://localhost:3000/api/assignment/pending')
    .then((res) => res.json())
    .then((data) => setEmergencyComplaints(data.pendingReports || []))
    .catch((err) => console.error('Failed to load pending reports:', err))
}, [])
  const [citizenComplaints, setCitizenComplaints] = useState(initialCitizenComplaints)
  const [orgComplaints, setOrgComplaints] = useState(initialOrgComplaints)
  const [trainingRequests, setTrainingRequests] = useState(initialTrainingRequests)
  const [inspectionRequests, setInspectionRequests] = useState(initialInspectionRequests)

  const showView = (view) => {
    setActiveView(view)
    setSuccessMessage('')
    setTimelineError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateSummary = (event) => {
    const { name, value } = event.target
    setSummary((current) => ({ ...current, [name]: value }))
    setSuccessMessage('')
    setTimelineError('')
  }

  const handleSummarySubmit = (event) => {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    const arrivalDateTime = new Date(summary.arrivalTime).getTime()
    const controlledDateTime = new Date(summary.fireControlledTime).getTime()
    const completionDateTime = new Date(summary.completionTime).getTime()

    if (controlledDateTime < arrivalDateTime) {
      setTimelineError('Fire Controlled Date & Time cannot be earlier than Arrival Date & Time.')
      return
    }

    if (completionDateTime < controlledDateTime) {
      setTimelineError('Completion Date & Time cannot be earlier than Fire Controlled Date & Time.')
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
    setTimelineError('')
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

  // ---- Emergency: assigner requests a priority station ----
  // TODO: replace the setTimeout simulation below with a real POST to your
  // Next.js API once the backend is connected, then update state from the response.
  // const handleStationRequest = (complaintId, stationId) => {
  //   setEmergencyComplaints((prev) =>
  //     prev.map((c) => {
  //       if (c.complaintId !== complaintId) return c
  //       if (c.requests[stationId] !== 'not_requested') return c
  //       return { ...c, requests: { ...c.requests, [stationId]: 'pending' } }
  //     })
  //   )

  //   setTimeout(() => {
  //     setEmergencyComplaints((prev) =>
  //       prev.map((c) => {
  //         if (c.complaintId !== complaintId) return c
  //         if (c.requests[stationId] !== 'pending') return c
  //         const outcome = Math.random() > 0.3 ? 'accepted' : 'rejected'
  //         return { ...c, requests: { ...c.requests, [stationId]: outcome } }
  //       })
  //     )
  //   }, 1800)
  // }


const handleStationRequest = async (report, stationId) => {
  try {
    const res = await fetch('http://localhost:3000/api/assignment/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stationId,
        citizenId: report.CITIZEN_ID,
        complaintId: report.COMPLAINT_ID,
        assignmentId: report.ASSIGNMENT_ID,
      }),
    })

    if (!res.ok) throw new Error('Dispatch failed')

    // setEmergencyComplaints((prev) =>
    //   prev.filter((c) => c.COMPLAINT_ID !== report.COMPLAINT_ID)
    // )


setEmergencyComplaints((prev) =>
  prev.map((c) =>
    c.COMPLAINT_ID === report.COMPLAINT_ID
      ? { ...c, INCIDENT_STATUS: 'Dispatched', STATIONS: [] }
      : c
  )
)

  } catch (err) {
    console.error('Failed to dispatch station:', err)
    alert('Something went wrong dispatching this station. Please try again.')
  }
}



  // ---- Citizen / Org complaints: cycle Pending -> On Review -> Solved ----
  const cycleReview = (setList, complaintId) => {
    const order = ['Pending', 'On Review', 'Solved']
    setList((prev) =>
      prev.map((c) => {
        if (c.complaintId !== complaintId) return c
        const idx = order.indexOf(c.status)
        const next = order[Math.min(idx + 1, order.length - 1)]
        return { ...c, status: next }
      })
    )
  }
  const handleReviewCitizen = (id) => cycleReview(setCitizenComplaints, id)
  const handleReviewOrg = (id) => cycleReview(setOrgComplaints, id)

  // ---- Training / Inspection requests: accept/reject, then sort pending first ----
  const handleDecision = (setList, requestId, decision) => {
    setList((prev) => {
      const updated = prev.map((r) => (r.requestId === requestId ? { ...r, status: decision } : r))
      const rank = (status) => (status === 'pending' ? 0 : 1)
      return [...updated].sort((a, b) => rank(a.status) - rank(b.status))
    })
  }
  const handleTrainingDecision = (id, decision) => handleDecision(setTrainingRequests, id, decision)
  const handleInspectionDecision = (id, decision) => handleDecision(setInspectionRequests, id, decision)

  const complaintSubviews = ['emergency', 'citizen', 'org']
  const requestSubviews = ['training', 'inspection']

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

        <button type="button" className="back-home-btn" onClick={onBackHome}>
          ← Back to Home
        </button>
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
              className="ad-dropdown-toggle"
              onClick={() => setComplaintsOpen((o) => !o)}
              aria-expanded={complaintsOpen}
            >
              <Icon name="history" />
              <span>Complaint History</span>
              <span className="ad-chevron">{complaintsOpen ? '▲' : '▼'}</span>
            </button>
            {complaintsOpen && (
              <div className="ad-subnav">
                <button
                  type="button"
                  className={activeView === 'emergency' ? 'active' : ''}
                  onClick={() => showView('emergency')}
                >
                  Emergency Complain
                </button>
                <button
                  type="button"
                  className={activeView === 'citizen' ? 'active' : ''}
                  onClick={() => showView('citizen')}
                >
                  Citizen Complain
                </button>
                <button
                  type="button"
                  className={activeView === 'org' ? 'active' : ''}
                  onClick={() => showView('org')}
                >
                  Org Feedback
                </button>
              </div>
            )}

            <button
              type="button"
              className="ad-dropdown-toggle"
              onClick={() => setRequestsOpen((o) => !o)}
              aria-expanded={requestsOpen}
            >
              <Icon name="briefcase" />
              <span>Requests</span>
              <span className="ad-chevron">{requestsOpen ? '▲' : '▼'}</span>
            </button>
            {requestsOpen && (
              <div className="ad-subnav">
                <button
                  type="button"
                  className={activeView === 'training' ? 'active' : ''}
                  onClick={() => showView('training')}
                >
                  Training Request
                </button>
                <button
                  type="button"
                  className={activeView === 'inspection' ? 'active' : ''}
                  onClick={() => showView('inspection')}
                >
                  Inspection Request
                </button>
              </div>
            )}

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

          {activeView === 'emergency' && (
            <EmergencyComplaintsView complaints={emergencyComplaints} onRequest={handleStationRequest} />
          )}

          {activeView === 'citizen' && (
            <ReviewableComplaintsView
              title="Citizen Complaints"
              subtitle="Feedback and complaints submitted directly by citizens."
              complaints={citizenComplaints}
              onReview={handleReviewCitizen}
            />
          )}

          {activeView === 'org' && (
            <ReviewableComplaintsView
              title="Organization Feedback"
              subtitle="Feedback related to trainings and organizational programs."
              complaints={orgComplaints}
              onReview={handleReviewOrg}
              renderExtra={(c) => (
                <>
                  <div><small>Training ID</small><strong>{c.trainingId}</strong></div>
                  <div><small>Training Type</small><strong>{c.trainingType}</strong></div>
                </>
              )}
            />
          )}

          {activeView === 'training' && (
            <DecisionRequestsView
              title="Training Requests"
              subtitle="Citizen requests to join firefighting training programs."
              requests={trainingRequests}
              onDecision={handleTrainingDecision}
              fields={[
                { key: 'citizenName', label: 'Applicant' },
                { key: 'trainingName', label: 'Training' },
                { key: 'degree', label: 'Degree' },
                { key: 'yearOfExperience', label: 'Experience (yrs)' },
              ]}
            />
          )}

          {activeView === 'inspection' && (
            <DecisionRequestsView
              title="Inspection Requests"
              subtitle="Fire safety inspection requests awaiting assignment."
              requests={inspectionRequests}
              onDecision={handleInspectionDecision}
              fields={[
                { key: 'location', label: 'Location' },
                { key: 'riskLevel', label: 'Risk Level' },
                { key: 'inspectionType', label: 'Inspection Type' },
              ]}
            />
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

                {timelineError && (
                  <div className="ad-timeline-error" role="alert">
                    <Icon name="alert" />
                    <span>{timelineError}</span>
                  </div>
                )}

                <div className="ad-form-grid ad-three-columns">
                  <FormField label="Arrival Date & Time" required>
                    <input
                      type="datetime-local"
                      name="arrivalTime"
                      value={summary.arrivalTime}
                      onChange={updateSummary}
                      required
                    />
                  </FormField>
                  <FormField label="Fire Controlled Date & Time" required>
                    <input
                      type="datetime-local"
                      name="fireControlledTime"
                      value={summary.fireControlledTime}
                      onChange={updateSummary}
                      min={summary.arrivalTime || undefined}
                      required
                    />
                  </FormField>
                  <FormField label="Completion Date & Time" required>
                    <input
                      type="datetime-local"
                      name="completionTime"
                      value={summary.completionTime}
                      onChange={updateSummary}
                      min={summary.fireControlledTime || summary.arrivalTime || undefined}
                      required
                    />
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
                      setTimelineError('')
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
  body {
    margin: 0;
    min-width: 320px;
    background:
      radial-gradient(circle at 12% 2%, rgba(213,41,48,.16), transparent 29rem),
      radial-gradient(circle at 92% 24%, rgba(255,113,56,.06), transparent 26rem),
      #08090c;
    color: var(--ad-white);
  }
  body::before { content: ""; position: fixed; inset: 0; pointer-events: none; opacity: .22; background-image: linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px); background-size: 44px 44px; }
  button, input, textarea { font: inherit; }
  button { -webkit-tap-highlight-color: transparent; }

  .assigner-dashboard { min-height: 100vh; background: transparent; color: var(--ad-white); isolation: isolate; }
  .ad-icon { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

  .ad-topbar {
    height: 76px;
    padding: 0 clamp(20px, 4.5vw, 72px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 30;
    background: rgba(8,9,12,.82);
    border-bottom: 1px solid rgba(255,255,255,.08);
    backdrop-filter: blur(14px);
    box-shadow: 0 12px 36px rgba(0,0,0,.2);
  }
  .ad-brand { border: 0; padding: 0; background: none; color: white; cursor: pointer; font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif; font-size: 29px; font-weight: 900; line-height: 1; letter-spacing: .035em; }
  .ad-brand-prahari { color: #f04444; text-shadow: 0 0 18px rgba(240,68,68,.18); }
  .ad-secure-note { display: flex; align-items: center; gap: 10px; padding: 9px 13px; border: 1px solid rgba(97,226,154,.16); border-radius: 10px; background: rgba(42,118,76,.08); }
  .ad-secure-note > svg { width: 25px; height: 25px; color: #62df9a; }
  .ad-secure-note span { display: grid; }
  .ad-secure-note strong { color: #77e5a8; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; }
  .ad-secure-note small { margin-top: 2px; color: #778191; font-size: 12px; }

  .back-home-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,.16);
    color: var(--ad-white);
    padding: 9px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 650;
    transition: border-color .18s, background .18s;
  }
  .back-home-btn:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.28); }

  .ad-shell {
    width: min(1460px, calc(100% - 36px));
    min-height: calc(100vh - 150px);
    margin: 28px auto;
    display: grid;
    grid-template-columns: 31.65% minmax(0, 1fr);
    overflow: hidden;
    background: #0d0f13;
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 22px;
    box-shadow: 0 30px 90px rgba(0,0,0,.38);
  }

  .ad-sidebar {
    min-height: 100%;
    padding: 30px 20px 22px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 96% 7%, rgba(255,179,70,.24), transparent 20rem),
      linear-gradient(158deg, rgba(171,27,38,.98), rgba(77,12,22,.99) 48%, rgba(30,10,16,.99));
    border-right: 1px solid rgba(255,164,104,.14);
  }
  .ad-sidebar::before { content: ""; position: absolute; width: 380px; height: 380px; right: -225px; top: 18%; border: 1px solid rgba(255,255,255,.11); border-radius: 50%; box-shadow: 0 0 0 58px rgba(255,255,255,.025), 0 0 0 125px rgba(255,255,255,.017); }
  .ad-sidebar::after { content: ""; position: absolute; inset: 0; opacity: .22; pointer-events: none; background-image: linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px); background-size: 36px 36px; mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,.45) 70%, transparent); }
  .ad-sidebar > * { position: relative; z-index: 1; }

  .ad-profile { padding: 14px; display: flex; align-items: center; gap: 12px; background: rgba(16,5,9,.18); border: 1px solid rgba(255,255,255,.18); border-radius: 14px; box-shadow: inset 0 1px rgba(255,255,255,.035); }
  .ad-avatar, .ad-hero-avatar { display: grid; place-items: center; color: white; background: linear-gradient(145deg, var(--ad-red), #750013); box-shadow: 0 8px 22px var(--ad-red-glow); font-weight: 850; }
  .ad-avatar { width: 46px; height: 46px; flex: 0 0 auto; border: 1px solid rgba(255,193,111,.32); border-radius: 12px; background: #731621; box-shadow: 0 8px 22px rgba(54,4,12,.22); font-size: 19px; }
  .ad-profile div:last-child { min-width: 0; display: grid; }
  .ad-profile span { color: rgba(255,255,255,.48); font-size: 9px; text-transform: uppercase; letter-spacing: .1em; }
  .ad-profile strong { overflow: hidden; margin: 2px 0; color: white; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
  .ad-profile small { color: #ffc16f; font-size: 10px; }

  .ad-nav { margin-top: 32px; display: flex; flex-direction: column; gap: 8px; }
  .ad-nav-label { margin: 0 10px 5px; color: rgba(255,255,255,.42); font-size: 9px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; }
  .ad-nav button, .ad-logout, .ad-dropdown-toggle { width: 100%; padding: 12px 13px; display: flex; align-items: center; gap: 11px; border: 1px solid transparent; border-radius: 9px; background: transparent; color: rgba(255,255,255,.76); cursor: pointer; font-size: 13px; font-weight: 650; text-align: left; transition: .18s ease; }
  .ad-nav button:hover, .ad-dropdown-toggle:hover { background: rgba(255,255,255,.075); color: white; transform: translateX(2px); }
  .ad-nav button.active { color: white; background: rgba(10,4,7,.2); border-color: rgba(255,255,255,.14); box-shadow: inset 3px 0 0 #ffc16f; }
  .ad-nav button.active svg { color: #ffc16f; }
  .ad-nav button:nth-of-type(4) { align-items: flex-start; }
  .ad-nav button:nth-of-type(4) span { line-height: 1.35; }
  .ad-dropdown-toggle span:last-child { margin-left: auto; font-size: 9px; color: rgba(255,255,255,.5); }

  .ad-subnav { display: flex; flex-direction: column; gap: 4px; margin: 2px 0 6px 14px; padding-left: 10px; border-left: 2px solid rgba(255,255,255,.12); }
  .ad-subnav button { padding: 9px 11px; border: 0; border-radius: 7px; background: transparent; color: rgba(255,255,255,.62); font-size: 12px; font-weight: 600; text-align: left; cursor: pointer; transition: .15s ease; }
  .ad-subnav button:hover { background: rgba(255,255,255,.06); color: white; }
  .ad-subnav button.active { color: white; background: rgba(255,255,255,.09); box-shadow: inset 2px 0 0 #ffc16f; }

  .ad-sidebar-status { margin-top: auto; margin-bottom: 14px; padding: 14px; display: grid; background: rgba(17,63,42,.13); border: 1px solid rgba(118,234,164,.15); border-radius: 10px; }
  .ad-sidebar-status span { display: flex; align-items: center; gap: 7px; color: #78eda9; font-size: 11px; font-weight: 700; }
  .ad-sidebar-status i, .ad-live-badge i { width: 7px; height: 7px; display: inline-block; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 5px rgba(52, 211, 153, .13); }
  .ad-sidebar-status small { margin-top: 6px; color: rgba(255,255,255,.42); font-size: 10px; }
  .ad-logout { border-color: rgba(255,255,255,.13); background: rgba(10,4,7,.2); }
  .ad-logout:hover { color: white; border-color: rgba(255,193,111,.32); background: rgba(255,255,255,.075); }
  .ad-logout svg { color: #ffc16f; }

  .ad-content { min-width: 0; padding: clamp(30px, 4vw, 62px); background: var(--ad-surface); }
  .ad-view { animation: adFade .23s ease; }
  @keyframes adFade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  .ad-page-heading { padding-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; gap: 25px; border-bottom: 1px solid var(--ad-line); margin-bottom: 26px; }
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

  .ad-empty-note { color: var(--ad-muted); font-size: 13px; padding: 20px; text-align: center; background: var(--ad-card); border: 1px dashed var(--ad-line); border-radius: 12px; }

  .ad-panel-list { display: grid; gap: 16px; }
  .ad-complaint-card { padding: 20px; background: var(--ad-card); border: 1px solid var(--ad-line); border-radius: 12px; }
  .ad-complaint-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--ad-line); }
  .ad-complaint-head small { display: block; color: var(--ad-muted); font-size: 9px; text-transform: uppercase; letter-spacing: .07em; }
  .ad-complaint-head strong { color: #fff; font-size: 14px; }
  .ad-complaint-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px 16px; margin-bottom: 14px; }
  .ad-complaint-grid > div small { display: block; color: var(--ad-muted); font-size: 9px; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 3px; }
  .ad-complaint-grid > div strong { color: #e2e8f0; font-size: 13px; overflow-wrap: anywhere; }
  .ad-complaint-grid .ad-info-wide { grid-column: 1 / -1; }

  .ad-station-list { margin-top: 6px; padding-top: 14px; border-top: 1px solid var(--ad-line); display: grid; gap: 8px; }
  .ad-station-list-label { display: block; margin-bottom: 2px; color: var(--ad-muted); font-size: 9px; text-transform: uppercase; letter-spacing: .08em; }
  .ad-station-row { display: flex; align-items: center; gap: 11px; padding: 9px 11px; background: var(--ad-input); border: 1px solid var(--ad-line); border-radius: 9px; }
  .ad-station-priority { width: 24px; height: 24px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 6px; background: rgba(217, 4, 41, .14); color: #ff9aa3; font-size: 10px; font-weight: 800; }
  .ad-station-name { flex: 1; color: #e2e8f0; font-size: 13px; font-weight: 600; }

  .ad-request-btn, .ad-review-btn, .ad-accept-btn, .ad-reject-btn { border: 0; border-radius: 7px; padding: 8px 14px; font-size: 12px; font-weight: 700; cursor: pointer; transition: .15s ease; }
  .ad-request-btn { background: var(--ad-red); color: #fff; }
  .ad-request-btn:hover { background: var(--ad-red-dark); }
  .ad-review-btn { background: rgba(255,193,111,.14); color: #ffc16f; border: 1px solid rgba(255,193,111,.28); }
  .ad-review-btn:hover:not(:disabled) { background: rgba(255,193,111,.24); }
  .ad-review-btn:disabled { opacity: .55; cursor: not-allowed; }
  .ad-decision-row { display: flex; gap: 10px; margin-top: 4px; }
  .ad-accept-btn { background: rgba(52,211,153,.15); color: #5eead4; border: 1px solid rgba(52,211,153,.3); }
  .ad-accept-btn:hover { background: rgba(52,211,153,.26); }
  .ad-reject-btn { background: rgba(217,4,41,.14); color: #ff9aa3; border: 1px solid rgba(217,4,41,.3); }
  .ad-reject-btn:hover { background: rgba(217,4,41,.24); }

  .ad-badge { padding: 5px 10px; border-radius: 999px; font-size: 10px; font-weight: 750; text-transform: uppercase; letter-spacing: .05em; white-space: nowrap; }
  .ad-badge-pending, .ad-badge-reported { color: #ffc16f; background: rgba(255,193,111,.12); border: 1px solid rgba(255,193,111,.25); }
  .ad-badge-accepted, .ad-badge-solved { color: #5eead4; background: rgba(52,211,153,.12); border: 1px solid rgba(52,211,153,.25); }
  .ad-badge-rejected { color: #ff9aa3; background: rgba(217,4,41,.12); border: 1px solid rgba(217,4,41,.25); }
  .ad-badge-on-review { color: #93c5fd; background: rgba(96,165,250,.12); border: 1px solid rgba(96,165,250,.25); }
  .ad-badge-not_requested { color: var(--ad-muted); background: rgba(255,255,255,.05); border: 1px solid var(--ad-line); }

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
  .ad-timeline-error { margin: -4px 0 18px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; color: #fda4af; background: rgba(225,29,72,.08); border: 1px solid rgba(225,29,72,.24); border-radius: 9px; font-size: 12px; line-height: 1.45; }
  .ad-timeline-error svg { width: 19px; height: 19px; flex: 0 0 auto; }
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

  @media (max-width: 1120px) {
    .ad-shell { grid-template-columns: 31.65% minmax(0, 1fr); }
    .ad-content { padding: 32px 26px; }
    .ad-three-columns { grid-template-columns: 1fr; }
  }

  @media (max-width: 860px) {
    .ad-topbar { height: 72px; padding: 0 18px; }
    .ad-secure-note small { display: none; }
    .ad-shell { width: min(100% - 20px, 1480px); margin: 18px auto; grid-template-columns: 1fr; }
    .ad-sidebar { min-height: auto; padding: 18px; border-right: 0; border-bottom: 1px solid var(--ad-line); }
    .ad-profile, .ad-sidebar-status { display: none; }
    .ad-nav { margin-top: 0; display: grid; grid-template-columns: 1fr; gap: 7px; }
    .ad-nav-label { display: none; }
    .ad-nav button, .ad-dropdown-toggle { min-height: 50px; padding: 9px 12px; justify-content: flex-start; gap: 10px; font-size: 12px; }
    .ad-nav button.active { box-shadow: inset 3px 0 0 var(--ad-red); }
    .ad-logout { margin-top: 11px; justify-content: center; }
    .ad-content { padding: 27px 18px; }
    .ad-info-grid, .ad-form-grid { grid-template-columns: 1fr; }
    .ad-info-wide, .ad-field-wide { grid-column: auto; }
    .ad-quick-action { align-items: stretch; flex-direction: column; }
    .ad-quick-action button { width: 100%; }
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