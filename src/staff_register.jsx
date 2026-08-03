import { useRef, useState } from 'react'

const initialForm = {
  fullName: '',
  staffId: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
  nid: '',
  rank: '',
  station: '',
  joiningDate: '',
  experience: '',
  shift: '',
  address: '',
  emergencyName: '',
  emergencyRelation: '',
  emergencyPhone: '',
  certification: '',
  medicalNotes: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

const skillOptions = [
  'Fire Suppression',
  'Emergency Rescue',
  'First Aid / CPR',
  'Hazardous Materials',
  'Search & Rescue',
  'Fire Vehicle Operation',
  'Disaster Response',
  'Equipment Maintenance',
]

function FlameIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M35.8 3.7c2.5 10.8-6.2 15.3-4.5 24.6 1-3.3 3.3-6.1 6.2-8 7 6 11 13.2 9.8 21.1C46 51.9 38.3 58 29.1 58 18 58 9.4 50.2 9.4 39.4c0-8.9 5-17.5 13.3-23.2-.2 5.8 1.6 9.4 5 11.4C25.4 17.5 29.4 9.2 35.8 3.7Z"
        fill="currentColor"
      />
      <path
        d="M31.6 34.2c.8 5.1-3.5 7.2-2.4 11.7.7-1.8 2-3.4 3.8-4.7 3.4 3 5.1 6.4 4.2 10.1-1 4-4.3 6.6-8.2 6.6-4.9 0-8.4-3.5-8.4-8.2 0-4.2 2.5-8.2 6.4-10.8.1 2.9 1.1 4.7 2.8 5.6-.6-4.1.2-7.6 1.8-10.3Z"
        fill="white"
        opacity=".92"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4.5 5v5.7c0 4.9 3.1 9.2 7.5 11.3 4.4-2.1 7.5-6.4 7.5-11.3V5L12 2Z" />
      <path d="m8.7 12 2.1 2.1 4.7-4.8" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6V4h6v2M3 8h18v12H3V8Zm0 5h18M10 13v2h4v-2" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M7 12h3l1.2-2.5 1.6 5L14 12h3" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 10h14v11H5V10Zm3 0V7a4 4 0 0 1 8 0v3M12 14v3" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 15v5h16v-5" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  )
}

function SectionTitle({ icon, eyebrow, title, description }) {
  return (
    <div className="section-title">
      <div className="section-icon">{icon}</div>
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function Field({ label, required, hint, children, full = false }) {
  return (
    <div className={`field ${full ? 'field-full' : ''}`}>
      <label>
        {label} {required && <b aria-hidden="true">*</b>}
      </label>
      {children}
      {hint && <small>{hint}</small>}
    </div>
  )
}

export default function FirefighterRegistration() {
  const [form, setForm] = useState(initialForm)
  const [skills, setSkills] = useState([])
  const [photo, setPhoto] = useState(null)
  const [photoName, setPhotoName] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const updateField = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
    setSubmitted(false)
  }

  const toggleSkill = (skill) => {
    setSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill],
    )
    setError('')
  }

  const handlePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Profile photo must be smaller than 5 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setPhoto(reader.result)
      setPhotoName(file.name)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(false)

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    if (skills.length === 0) {
      setError('Please select at least one professional skill.')
      document.getElementById('skills-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      return
    }

    if (form.password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password do not match.')
      return
    }

    const staffRecord = {
      ...form,
      skills,
      profilePhoto: photoName || null,
      createdAt: new Date().toISOString(),
    }

    // Replace this console statement with your API request.
    // Example: await fetch('/api/firefighters', { method: 'POST', ... })
    console.log('Firefighter registration:', staffRecord)
    setError('')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    setForm(initialForm)
    setSkills([])
    setPhoto(null)
    setPhotoName('')
    setError('')
    setSubmitted(false)
    formRef.current?.reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const requiredProgressValues = [
    form.fullName,
    form.staffId,
    form.email,
    form.phone,
    form.dateOfBirth,
    form.gender,
    form.bloodGroup,
    form.nid,
    form.address,
    form.rank,
    form.station,
    form.joiningDate,
    form.experience,
    form.shift,
    form.emergencyName,
    form.emergencyRelation,
    form.emergencyPhone,
    form.password,
    form.confirmPassword,
    skills.length > 0,
    form.terms,
  ]
  const completedRequiredFields = requiredProgressValues.filter((value) =>
    typeof value === 'boolean' ? value : String(value).trim().length > 0,
  ).length
  const completion = Math.round(
    (completedRequiredFields / requiredProgressValues.length) * 100,
  )

  return (
    <div className="registration-page">
      <style>{pageStyles}</style>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="AGNIPRAHARI home">
          <span className="brand-wordmark" aria-label="AGNIPRAHARI">
            <span className="brand-agni">AGNI</span>
            <span className="brand-prahari">PRAHARI</span>
          </span>
        </a>

        <div className="secure-note">
          <ShieldIcon />
          <span>
            <strong>Secure registration</strong>
            <small>Authorized personnel only</small>
          </span>
        </div>
      </header>

      <main id="top" className="page-shell">
        <aside className="intro-panel" aria-label="Registration overview">
          <div className="intro-glow" />
          <div className="intro-content">
            <span className="intro-badge">
              <span /> Personnel enrollment · Live
            </span>
            <h1>
              Register a new <em>firefighter</em>
            </h1>
            <p>
              Build a complete, verified personnel profile for faster
              deployment and safer emergency response.
            </p>

            <div className="completion-card" aria-label={`${completion}% complete`}>
              <div>
                <span>Registration progress</span>
                <strong>{completion}%</strong>
              </div>
              <div className="progress-track" aria-hidden="true">
                <span style={{ width: `${completion}%` }} />
              </div>
              <small>{completedRequiredFields} of {requiredProgressValues.length} required items completed</small>
            </div>

            <nav className="section-rail" aria-label="Registration sections">
              <a href="#personal-information">
                <b>01</b>
                <span><strong>Personal identity</strong><small>Verified staff and contact details</small></span>
                <i>↗</i>
              </a>
              <a href="#service-details">
                <b>02</b>
                <span><strong>Operational profile</strong><small>Rank, station, shift and expertise</small></span>
                <i>↗</i>
              </a>
              <a href="#emergency-information">
                <b>03</b>
                <span><strong>Emergency readiness</strong><small>Blood group and emergency contact</small></span>
                <i>↗</i>
              </a>
              <a href="#account-security">
                <b>04</b>
                <span><strong>Account security</strong><small>Protected access to the staff portal</small></span>
                <i>↗</i>
              </a>
            </nav>

            <div className="side-stats" aria-label="Record information">
              <div><strong>04</strong><span>Profile sections</span></div>
              <div><strong>256-bit</strong><span>Protected record</span></div>
            </div>

            <div className="response-card">
              <div className="pulse-dot"><span /></div>
              <div>
                <strong>Response-ready records</strong>
                <small>Keep your team information accurate and accessible.</small>
              </div>
            </div>
          </div>
        </aside>

        <section className="form-panel" aria-labelledby="registration-title">
          <div className="form-heading">
            <div>
              <span>New personnel record</span>
              <h2 id="registration-title">Firefighter Registration</h2>
              <p>Complete all required information marked with an asterisk.</p>
            </div>
            <div className="form-step"><b>{completion}%</b><span>complete</span></div>
          </div>

          {submitted && (
            <div className="alert success" role="status">
              <span>✓</span>
              <div>
                <strong>Registration information is ready.</strong>
                <p>
                  The form works correctly. Connect the submit function to your
                  backend API to save this staff record permanently.
                </p>
              </div>
              <button type="button" onClick={() => setSubmitted(false)} aria-label="Close message">×</button>
            </div>
          )}

          {error && (
            <div className="alert error" role="alert">
              <span>!</span>
              <div><strong>Please check the form</strong><p>{error}</p></div>
              <button type="button" onClick={() => setError('')} aria-label="Close error">×</button>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit}>
            <section id="personal-information" className="form-section">
              <SectionTitle
                icon={<UserIcon />}
                eyebrow="Section 01"
                title="Personal Information"
                description="Basic identity and contact details of the firefighter."
              />

              <div className="profile-row">
                <div className="photo-preview">
                  {photo ? (
                    <img src={photo} alt="Selected firefighter" />
                  ) : (
                    <div><UserIcon /><span>PHOTO</span></div>
                  )}
                </div>
                <div className="photo-copy">
                  <strong>Profile photograph</strong>
                  <p>Upload a clear, recent passport-style photo.</p>
                  <label className="upload-button">
                    <UploadIcon />
                    {photoName ? 'Change photo' : 'Choose photo'}
                    <input type="file" accept="image/*" onChange={handlePhoto} />
                  </label>
                  <small>{photoName || 'JPG, PNG or WEBP · Maximum 5 MB'}</small>
                </div>
              </div>

              <div className="form-grid">
                <Field label="Full name" required>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    placeholder="e.g. Mohammad Rahman"
                    autoComplete="name"
                    required
                  />
                </Field>
                <Field label="Staff ID" required hint="Use your official service ID">
                  <input
                    name="staffId"
                    value={form.staffId}
                    onChange={updateField}
                    placeholder="e.g. FS-2026-0142"
                    required
                  />
                </Field>
                <Field label="Email address" required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="name@fireservice.gov"
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field label="Mobile number" required>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="e.g. 01700 000000"
                    autoComplete="tel"
                    pattern="[0-9+() -]{7,20}"
                    required
                  />
                </Field>
                <Field label="Date of birth" required>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={updateField}
                    required
                  />
                </Field>
                <Field label="Gender" required>
                  <select name="gender" value={form.gender} onChange={updateField} required>
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </Field>
                <Field label="Blood group" required>
                  <select name="bloodGroup" value={form.bloodGroup} onChange={updateField} required>
                    <option value="">Select blood group</option>
                    {['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'].map((group) => (
                      <option key={group}>{group}</option>
                    ))}
                  </select>
                </Field>
                <Field label="National ID / Passport No." required>
                  <input
                    name="nid"
                    value={form.nid}
                    onChange={updateField}
                    placeholder="Enter identification number"
                    required
                  />
                </Field>
                <Field label="Present address" required full>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={updateField}
                    placeholder="House, road, area, city and postal code"
                    rows="3"
                    autoComplete="street-address"
                    required
                  />
                </Field>
              </div>
            </section>

            <section id="service-details" className="form-section">
              <SectionTitle
                icon={<BriefcaseIcon />}
                eyebrow="Section 02"
                title="Service & Professional Details"
                description="Assignment, availability and operational capabilities."
              />

              <div className="form-grid">
                <Field label="Rank / Designation" required>
                  <select name="rank" value={form.rank} onChange={updateField} required>
                    <option value="">Select designation</option>
                    <option>Firefighter</option>
                    <option>Leading Firefighter</option>
                    <option>Station Officer</option>
                    <option>Senior Station Officer</option>
                    <option>Sub-Assistant Director</option>
                    <option>Driver / Operator</option>
                    <option>Rescue Specialist</option>
                  </select>
                </Field>
                <Field label="Assigned fire station" required>
                  <input
                    name="station"
                    value={form.station}
                    onChange={updateField}
                    placeholder="e.g. Mirpur Fire Station"
                    required
                  />
                </Field>
                <Field label="Joining date" required>
                  <input
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={updateField}
                    required
                  />
                </Field>
                <Field label="Years of experience" required>
                  <input
                    type="number"
                    name="experience"
                    value={form.experience}
                    onChange={updateField}
                    placeholder="e.g. 4"
                    min="0"
                    max="50"
                    required
                  />
                </Field>
                <Field label="Preferred duty shift" required>
                  <select name="shift" value={form.shift} onChange={updateField} required>
                    <option value="">Select shift</option>
                    <option>Day Shift</option>
                    <option>Night Shift</option>
                    <option>Rotating Shift</option>
                    <option>On-call / Flexible</option>
                  </select>
                </Field>
                <Field label="Certificates / Training">
                  <input
                    name="certification"
                    value={form.certification}
                    onChange={updateField}
                    placeholder="e.g. CPR, HazMat Level 1"
                  />
                </Field>
              </div>

              <fieldset id="skills-section" className="skills-box">
                <legend>Professional skills <b>*</b></legend>
                <p>Select every skill that applies to this firefighter.</p>
                <div className="skill-grid">
                  {skillOptions.map((skill) => (
                    <label className={`skill-chip ${skills.includes(skill) ? 'selected' : ''}`} key={skill}>
                      <input
                        type="checkbox"
                        checked={skills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      <span className="checkmark">✓</span>
                      {skill}
                    </label>
                  ))}
                </div>
              </fieldset>
            </section>

            <section id="emergency-information" className="form-section">
              <SectionTitle
                icon={<HeartIcon />}
                eyebrow="Section 03"
                title="Emergency & Medical Information"
                description="Critical contact and health notes for responder safety."
              />

              <div className="form-grid three-column">
                <Field label="Emergency contact name" required>
                  <input
                    name="emergencyName"
                    value={form.emergencyName}
                    onChange={updateField}
                    placeholder="Full name"
                    required
                  />
                </Field>
                <Field label="Relationship" required>
                  <input
                    name="emergencyRelation"
                    value={form.emergencyRelation}
                    onChange={updateField}
                    placeholder="e.g. Spouse"
                    required
                  />
                </Field>
                <Field label="Emergency phone" required>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={form.emergencyPhone}
                    onChange={updateField}
                    placeholder="e.g. 01800 000000"
                    pattern="[0-9+() -]{7,20}"
                    required
                  />
                </Field>
                <Field label="Medical conditions / allergies" full hint="Write “None” if there are no known conditions">
                  <textarea
                    name="medicalNotes"
                    value={form.medicalNotes}
                    onChange={updateField}
                    placeholder="List any allergies, regular medication or medical restrictions..."
                    rows="3"
                  />
                </Field>
              </div>
            </section>

            <section id="account-security" className="form-section last-section">
              <SectionTitle
                icon={<LockIcon />}
                eyebrow="Section 04"
                title="Account Security"
                description="Create secure login credentials for the staff portal."
              />

              <div className="form-grid">
                <Field label="Password" required hint="Minimum 8 characters">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={updateField}
                    placeholder="Create a strong password"
                    minLength="8"
                    autoComplete="new-password"
                    required
                  />
                </Field>
                <Field label="Confirm password" required>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={updateField}
                    placeholder="Enter the password again"
                    minLength="8"
                    autoComplete="new-password"
                    required
                  />
                </Field>
              </div>

              <label className="terms-row">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={updateField}
                  required
                />
                <span>
                  I confirm that the information provided is accurate and I
                  agree to the personnel data and privacy policy.
                </span>
              </label>
            </section>

            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={resetForm}>
                Clear form
              </button>
              <button type="submit" className="primary-button">
                Register firefighter <ArrowIcon />
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer>
        <span>© 2026 AGNIPRAHARI</span>
        <span>Emergency personnel records · Protected access</span>
      </footer>
    </div>
  )
}

const pageStyles = `
  :root {
    color-scheme: light;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    --red: #c51b24;
    --red-dark: #94131a;
    --orange: #f36b21;
    --navy: #0d2237;
    --ink: #172434;
    --muted: #647486;
    --line: #dfe5ea;
    --soft: #f4f7f9;
    --white: #ffffff;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 320px; background: #eef2f5; color: var(--ink); }
  button, input, select, textarea { font: inherit; }
  button, label, select { -webkit-tap-highlight-color: transparent; }

  .registration-page { min-height: 100vh; background: #eef2f5; }

  .topbar {
    height: 82px;
    padding: 0 clamp(22px, 5vw, 76px);
    background: rgba(255,255,255,.96);
    border-bottom: 1px solid #dde3e8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(14px);
  }

  .brand { display: flex; align-items: center; color: var(--navy); text-decoration: none; }
  .brand-wordmark {
    display: inline-flex;
    align-items: center;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 29px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: .035em;
    text-transform: uppercase;
  }
  .brand-agni { color: currentColor; }
  .brand-prahari { color: var(--red); }

  .secure-note { display: flex; align-items: center; gap: 10px; }
  .secure-note svg { width: 28px; fill: none; stroke: #20825b; stroke-width: 1.8; }
  .secure-note span { display: grid; }
  .secure-note strong { color: #1f6148; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; }
  .secure-note small { color: var(--muted); font-size: 12px; margin-top: 2px; }

  .page-shell {
    width: min(1480px, calc(100% - 32px));
    margin: 32px auto;
    display: grid;
    grid-template-columns: minmax(310px, .72fr) minmax(600px, 1.55fr);
    background: var(--white);
    border: 1px solid #dfe4e8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 22px 70px rgba(21, 41, 59, .09);
  }

  .intro-panel {
    position: relative;
    overflow: hidden;
    color: white;
    background:
      linear-gradient(155deg, rgba(197,27,36,.96), rgba(122,12,25,.99)),
      var(--red);
  }
  .intro-panel::before {
    content: "";
    position: absolute;
    width: 340px;
    height: 340px;
    right: -185px;
    top: 22%;
    border: 1px solid rgba(255,255,255,.13);
    border-radius: 50%;
    box-shadow: 0 0 0 50px rgba(255,255,255,.035), 0 0 0 110px rgba(255,255,255,.025);
  }
  .intro-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: .16;
    background-image: linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(to bottom, black, transparent 70%);
  }
  .intro-glow { position: absolute; width: 270px; height: 270px; left: -80px; bottom: -70px; background: #ff8a29; filter: blur(80px); opacity: .35; }
  .intro-content { position: sticky; top: 115px; padding: 64px 48px; z-index: 1; }
  .intro-badge {
    width: max-content;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 999px;
    background: rgba(255,255,255,.11);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .12em;
    font-weight: 700;
  }
  .intro-badge span { width: 7px; height: 7px; border-radius: 50%; background: #ffb673; box-shadow: 0 0 0 5px rgba(255,182,115,.14); }
  .intro-content h1 { margin: 30px 0 18px; max-width: 440px; font-size: clamp(40px, 4vw, 66px); line-height: .98; letter-spacing: -.06em; }
  .intro-content h1 em { font-style: normal; color: #ffc398; }
  .intro-content > p { max-width: 400px; margin: 0; color: rgba(255,255,255,.78); line-height: 1.75; font-size: 15px; }

  .feature-list { margin: 48px 0; display: grid; gap: 4px; }
  .feature-list > div { padding: 16px 0; display: flex; gap: 17px; border-bottom: 1px solid rgba(255,255,255,.13); }
  .feature-list > div > span { color: #ffc398; font-size: 11px; font-weight: 800; padding-top: 3px; letter-spacing: .09em; }
  .feature-list p { margin: 0; color: rgba(255,255,255,.62); font-size: 12px; line-height: 1.55; }
  .feature-list strong { display: block; color: white; font-size: 14px; margin-bottom: 3px; }

  .response-card { padding: 18px; display: flex; gap: 14px; align-items: center; border: 1px solid rgba(255,255,255,.16); background: rgba(42,0,7,.16); border-radius: 14px; }
  .response-card > div:last-child { display: grid; }
  .response-card strong { font-size: 13px; }
  .response-card small { color: rgba(255,255,255,.6); margin-top: 4px; line-height: 1.4; }
  .pulse-dot { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: rgba(255,255,255,.11); flex: 0 0 auto; }
  .pulse-dot span { width: 8px; height: 8px; border-radius: 50%; background: #70eca2; box-shadow: 0 0 0 6px rgba(112,236,162,.12); }

  .form-panel { min-width: 0; padding: clamp(30px, 4vw, 64px); background: white; }
  .form-heading { padding-bottom: 34px; display: flex; justify-content: space-between; gap: 28px; align-items: flex-start; border-bottom: 1px solid var(--line); }
  .form-heading > div:first-child > span { color: var(--red); font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  .form-heading h2 { margin: 8px 0 7px; color: var(--navy); font-size: clamp(28px, 3vw, 40px); line-height: 1.08; letter-spacing: -.04em; }
  .form-heading p { margin: 0; color: var(--muted); font-size: 14px; }
  .form-step { min-width: 58px; height: 58px; border: 1px solid #e1e5e9; border-radius: 50%; display: grid; place-content: center; text-align: center; background: #f8fafb; }
  .form-step b { color: var(--red); font-size: 18px; line-height: 1; }
  .form-step span { color: #8b98a5; font-size: 9px; margin-top: 2px; text-transform: uppercase; }

  .alert { margin: 26px 0 -4px; padding: 16px; display: flex; gap: 12px; align-items: flex-start; border-radius: 12px; }
  .alert > span { width: 26px; height: 26px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 50%; color: white; font-weight: 800; }
  .alert div { flex: 1; }
  .alert strong { font-size: 13px; }
  .alert p { margin: 3px 0 0; font-size: 12px; line-height: 1.5; }
  .alert button { border: 0; padding: 0 4px; background: none; color: inherit; font-size: 21px; cursor: pointer; }
  .alert.success { color: #176543; background: #eaf8f1; border: 1px solid #c3ead6; }
  .alert.success > span { background: #269467; }
  .alert.error { color: #8c1e24; background: #fff1f1; border: 1px solid #f2c7c9; }
  .alert.error > span { background: var(--red); }

  .form-section { padding: 42px 0; border-bottom: 1px solid var(--line); }
  .last-section { padding-bottom: 34px; }
  .section-title { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 28px; }
  .section-icon { width: 42px; height: 42px; flex: 0 0 auto; display: grid; place-items: center; color: var(--red); background: #fff1f1; border: 1px solid #f4d0d2; border-radius: 10px; }
  .section-icon svg { width: 21px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .section-title span { display: block; margin-bottom: 4px; color: var(--red); font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  .section-title h2 { margin: 0; color: var(--navy); font-size: 20px; letter-spacing: -.02em; }
  .section-title p { margin: 5px 0 0; color: var(--muted); font-size: 12px; line-height: 1.5; }

  .profile-row { margin-bottom: 30px; padding: 18px; display: flex; align-items: center; gap: 18px; background: var(--soft); border: 1px dashed #c9d2da; border-radius: 14px; }
  .photo-preview { width: 84px; height: 96px; flex: 0 0 auto; overflow: hidden; display: grid; place-items: center; border-radius: 10px; background: #e7ecef; border: 3px solid white; box-shadow: 0 5px 18px rgba(34,49,64,.1); }
  .photo-preview img { width: 100%; height: 100%; object-fit: cover; }
  .photo-preview > div { display: grid; place-items: center; color: #9aa7b1; }
  .photo-preview svg { width: 32px; fill: none; stroke: currentColor; stroke-width: 1.4; }
  .photo-preview span { font-size: 8px; letter-spacing: .15em; margin-top: 4px; }
  .photo-copy { min-width: 0; }
  .photo-copy strong { color: var(--navy); font-size: 14px; }
  .photo-copy p { margin: 4px 0 12px; color: var(--muted); font-size: 12px; }
  .photo-copy small { display: block; margin-top: 8px; color: #83909c; font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .upload-button { width: max-content; display: flex; align-items: center; gap: 7px; padding: 9px 13px; background: white; border: 1px solid #d4dbe0; border-radius: 7px; color: var(--navy); font-size: 11px; font-weight: 700; cursor: pointer; transition: .2s ease; }
  .upload-button:hover { color: var(--red); border-color: #df969a; transform: translateY(-1px); }
  .upload-button svg { width: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .upload-button input { display: none; }

  .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 20px; }
  .three-column { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .three-column .field-full { grid-column: 1 / -1; }
  .field { min-width: 0; }
  .field-full { grid-column: 1 / -1; }
  .field > label, .skills-box legend { display: block; margin-bottom: 8px; color: #263749; font-size: 11px; font-weight: 750; letter-spacing: .02em; }
  .field b, .skills-box b { color: var(--red); }
  .field input, .field select, .field textarea {
    width: 100%;
    min-height: 46px;
    padding: 12px 13px;
    color: var(--ink);
    background: #fbfcfd;
    border: 1px solid #d9e0e5;
    border-radius: 8px;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
    font-size: 13px;
  }
  .field textarea { resize: vertical; line-height: 1.5; }
  .field input::placeholder, .field textarea::placeholder { color: #9aa5af; }
  .field input:focus, .field select:focus, .field textarea:focus { background: white; border-color: var(--red); box-shadow: 0 0 0 3px rgba(197,27,36,.1); }
  .field small { display: block; margin-top: 6px; color: #8b97a2; font-size: 10px; }

  .skills-box { margin: 30px 0 0; padding: 20px; border: 1px solid #dce2e7; border-radius: 12px; }
  .skills-box legend { padding: 0 8px; margin: 0; }
  .skills-box > p { margin: -2px 0 15px; color: var(--muted); font-size: 11px; }
  .skill-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
  .skill-chip { min-height: 42px; padding: 10px 12px; display: flex; align-items: center; gap: 9px; color: #4e5f6f; background: #f8fafb; border: 1px solid #e0e5e9; border-radius: 8px; cursor: pointer; font-size: 11px; transition: .18s ease; }
  .skill-chip:hover { border-color: #d39a9d; color: var(--red-dark); }
  .skill-chip input { position: absolute; opacity: 0; pointer-events: none; }
  .checkmark { width: 18px; height: 18px; display: grid; place-items: center; flex: 0 0 auto; color: transparent; background: white; border: 1px solid #cbd3d9; border-radius: 5px; font-size: 11px; }
  .skill-chip.selected { color: #8f1820; background: #fff3f3; border-color: #e8aeb1; font-weight: 700; }
  .skill-chip.selected .checkmark { color: white; background: var(--red); border-color: var(--red); }

  .terms-row { margin-top: 24px; padding: 15px; display: flex; gap: 11px; align-items: flex-start; border: 1px solid #dfe5e9; border-radius: 9px; background: #fafbfc; color: #566777; font-size: 11px; line-height: 1.6; cursor: pointer; }
  .terms-row input { margin: 2px 0 0; width: 16px; height: 16px; accent-color: var(--red); flex: 0 0 auto; }

  .form-actions { padding-top: 30px; display: flex; align-items: center; justify-content: flex-end; gap: 12px; }
  .form-actions button { min-height: 48px; padding: 0 20px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 750; transition: .2s ease; }
  .secondary-button { color: #526474; background: white; border: 1px solid #d7dee3; }
  .secondary-button:hover { background: #f4f6f8; border-color: #bfc9d1; }
  .primary-button { min-width: 205px; display: flex; align-items: center; justify-content: center; gap: 10px; color: white; background: linear-gradient(135deg, #cf2029, #a20f18); border: 1px solid #9c1118; box-shadow: 0 9px 20px rgba(181,22,31,.22); }
  .primary-button svg { width: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .2s; }
  .primary-button:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(181,22,31,.28); }
  .primary-button:hover svg { transform: translateX(3px); }

  footer { width: min(1480px, calc(100% - 40px)); margin: -4px auto 30px; padding: 0 4px; display: flex; justify-content: space-between; gap: 20px; color: #7b8995; font-size: 10px; letter-spacing: .02em; }

  @media (max-width: 1080px) {
    .page-shell { grid-template-columns: 330px minmax(0, 1fr); }
    .intro-content { padding: 52px 32px; }
    .intro-content h1 { font-size: 45px; }
    .form-panel { padding: 42px 34px; }
    .three-column { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 820px) {
    .topbar { height: 72px; }
    .secure-note { display: none; }
    .page-shell { width: min(100% - 20px, 720px); margin: 16px auto; grid-template-columns: 1fr; }
    .intro-content { position: relative; top: 0; padding: 44px 32px; }
    .intro-content h1 { max-width: 570px; font-size: clamp(38px, 9vw, 57px); }
    .intro-content > p { max-width: 560px; }
    .feature-list { grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 34px 0; }
    .feature-list > div { display: block; border: 0; padding: 0; }
    .feature-list p { margin-top: 8px; }
    .response-card { max-width: 560px; }
    .form-panel { padding: 38px 28px; }
  }

  @media (max-width: 580px) {
    .topbar { padding: 0 17px; }
    .brand-wordmark { font-size: 25px; }
    .page-shell { width: 100%; margin: 0; border: 0; border-radius: 0; box-shadow: none; }
    .intro-content { padding: 38px 22px; }
    .intro-content h1 { font-size: 39px; }
    .feature-list { grid-template-columns: 1fr; gap: 0; }
    .feature-list > div { padding: 12px 0; display: flex; border-bottom: 1px solid rgba(255,255,255,.13); }
    .feature-list p { margin-top: 0; }
    .form-panel { padding: 34px 19px; }
    .form-heading { gap: 12px; }
    .form-heading h2 { font-size: 29px; }
    .form-step { display: none; }
    .form-grid, .three-column, .skill-grid { grid-template-columns: 1fr; }
    .field-full, .three-column .field-full { grid-column: auto; }
    .profile-row { align-items: flex-start; }
    .photo-preview { width: 72px; height: 84px; }
    .form-actions { align-items: stretch; flex-direction: column-reverse; }
    .form-actions button { width: 100%; }
    footer { margin: 20px auto; flex-direction: column; text-align: center; gap: 6px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
  }

  /* Dark operations-console redesign */
  :root {
    color-scheme: dark;
    --red: #f04444;
    --red-dark: #c5262f;
    --orange: #ff7138;
    --amber: #ffbd4a;
    --navy: #f7f8fb;
    --ink: #edf0f5;
    --muted: #9098a8;
    --line: rgba(255,255,255,.09);
    --soft: #171a20;
    --white: #111318;
    --panel: #111318;
    --panel-raised: #171a20;
    --field: #0d0f13;
  }

  body {
    background:
      radial-gradient(circle at 12% 2%, rgba(213,41,48,.16), transparent 29rem),
      radial-gradient(circle at 92% 24%, rgba(255,113,56,.06), transparent 26rem),
      #08090c;
    color: var(--ink);
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: .22;
    background-image:
      linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
    background-size: 44px 44px;
  }

  ::selection { color: #fff; background: rgba(240,68,68,.72); }

  .registration-page {
    min-height: 100vh;
    background: transparent;
    isolation: isolate;
  }

  .topbar {
    height: 76px;
    padding: 0 clamp(20px, 4.5vw, 72px);
    background: rgba(8,9,12,.82);
    border-bottom: 1px solid rgba(255,255,255,.08);
    box-shadow: 0 12px 36px rgba(0,0,0,.2);
  }

  .brand { color: #f7f8fb; }
  .brand-prahari {
    color: #f04444;
    text-shadow: 0 0 18px rgba(240,68,68,.18);
  }

  .secure-note {
    padding: 9px 13px;
    border: 1px solid rgba(97,226,154,.16);
    border-radius: 10px;
    background: rgba(42,118,76,.08);
  }
  .secure-note svg { width: 25px; stroke: #62df9a; }
  .secure-note strong { color: #77e5a8; }
  .secure-note small { color: #778191; }

  .page-shell {
    width: min(1460px, calc(100% - 36px));
    margin: 28px auto;
    grid-template-columns: minmax(330px, .75fr) minmax(610px, 1.62fr);
    align-items: stretch;
    background: #0d0f13;
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 22px;
    box-shadow: 0 30px 90px rgba(0,0,0,.38);
  }

  .intro-panel {
    min-width: 0;
    background:
      radial-gradient(circle at 96% 7%, rgba(255,179,70,.24), transparent 20rem),
      linear-gradient(158deg, rgba(171,27,38,.98), rgba(77,12,22,.99) 48%, rgba(30,10,16,.99));
    border-right: 1px solid rgba(255,164,104,.14);
  }

  .intro-panel::before {
    width: 380px;
    height: 380px;
    right: -225px;
    top: 18%;
    border-color: rgba(255,255,255,.11);
    box-shadow:
      0 0 0 58px rgba(255,255,255,.025),
      0 0 0 125px rgba(255,255,255,.017);
  }

  .intro-panel::after {
    opacity: .22;
    background-size: 36px 36px;
    mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,.45) 70%, transparent);
  }

  .intro-glow {
    width: 330px;
    height: 330px;
    left: -115px;
    bottom: 6%;
    background: #ff783e;
    filter: blur(105px);
    opacity: .25;
  }

  .intro-content {
    position: sticky;
    top: 94px;
    min-height: calc(100vh - 122px);
    padding: 38px clamp(27px, 3vw, 44px);
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  .intro-badge {
    padding: 7px 11px;
    border-color: rgba(255,255,255,.18);
    background: rgba(16,5,9,.18);
    color: rgba(255,255,255,.88);
    font-size: 9px;
  }
  .intro-badge span {
    width: 6px;
    height: 6px;
    background: #78eda9;
    box-shadow: 0 0 0 5px rgba(120,237,169,.12);
  }

  .intro-content h1 {
    margin: 21px 0 12px;
    max-width: 390px;
    font-size: clamp(40px, 3.5vw, 57px);
    line-height: .98;
    letter-spacing: -.065em;
  }
  .intro-content h1 em {
    color: #ffc16f;
    text-shadow: 0 8px 25px rgba(255,167,69,.12);
  }
  .intro-content > p {
    max-width: 410px;
    color: rgba(255,255,255,.66);
    line-height: 1.6;
    font-size: 12px;
  }

  .completion-card {
    margin-top: 22px;
    padding: 14px 15px;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 12px;
    background: rgba(10,4,7,.2);
    box-shadow: inset 0 1px rgba(255,255,255,.04);
  }
  .completion-card > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .completion-card > div:first-child span {
    color: rgba(255,255,255,.68);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
  .completion-card strong { color: #ffc16f; font-size: 17px; }
  .completion-card small { display: block; margin-top: 7px; color: rgba(255,255,255,.46); font-size: 9px; }
  .progress-track {
    height: 5px;
    margin-top: 10px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255,255,255,.1);
  }
  .progress-track span {
    display: block;
    height: 100%;
    min-width: 3px;
    border-radius: inherit;
    background: linear-gradient(90deg, #ff6b3c, #ffc15c);
    box-shadow: 0 0 14px rgba(255,176,76,.34);
    transition: width .3s ease;
  }

  .section-rail {
    position: relative;
    margin: 18px 0;
    display: grid;
  }
  .section-rail::before {
    content: "";
    position: absolute;
    top: 25px;
    bottom: 25px;
    left: 15px;
    width: 1px;
    background: linear-gradient(rgba(255,193,111,.5), rgba(255,255,255,.08));
  }
  .section-rail a {
    position: relative;
    min-height: 54px;
    padding: 8px 6px 8px 45px;
    display: grid;
    grid-template-columns: minmax(0,1fr) auto;
    align-items: center;
    gap: 9px;
    color: #fff;
    text-decoration: none;
    border-radius: 10px;
    transition: background .18s ease, transform .18s ease;
  }
  .section-rail a:hover {
    background: rgba(255,255,255,.075);
    transform: translateX(3px);
  }
  .section-rail a > b {
    position: absolute;
    left: 3px;
    top: 50%;
    width: 25px;
    height: 25px;
    display: grid;
    place-items: center;
    transform: translateY(-50%);
    color: #ffc16f;
    background: #731621;
    border: 1px solid rgba(255,193,111,.35);
    border-radius: 50%;
    font-size: 8px;
    z-index: 1;
  }
  .section-rail a > span { min-width: 0; }
  .section-rail strong { display: block; font-size: 11px; letter-spacing: .01em; }
  .section-rail small { display: block; margin-top: 3px; color: rgba(255,255,255,.47); font-size: 9px; }
  .section-rail i { color: rgba(255,255,255,.4); font-size: 11px; font-style: normal; }

  .side-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 11px;
    background: rgba(10,4,7,.16);
  }
  .side-stats div { padding: 11px 13px; display: grid; }
  .side-stats div + div { border-left: 1px solid rgba(255,255,255,.1); }
  .side-stats strong { color: #ffc16f; font-size: 13px; }
  .side-stats span { margin-top: 3px; color: rgba(255,255,255,.45); font-size: 8px; text-transform: uppercase; letter-spacing: .06em; }

  .response-card {
    margin-top: 13px;
    padding: 13px 14px;
    border-color: rgba(118,234,164,.15);
    background: rgba(17,63,42,.13);
    border-radius: 11px;
  }
  .response-card strong { font-size: 10px; }
  .response-card small { color: rgba(255,255,255,.42); font-size: 9px; }
  .pulse-dot { width: 30px; height: 30px; background: rgba(112,236,162,.08); }

  .form-panel {
    min-width: 0;
    padding: clamp(26px, 3.1vw, 48px);
    background:
      radial-gradient(circle at 98% 0, rgba(255,110,55,.045), transparent 28rem),
      #0d0f13;
  }

  .form-heading {
    margin-bottom: 18px;
    padding: 5px 4px 24px;
    border-bottom-color: rgba(255,255,255,.09);
  }
  .form-heading > div:first-child > span { color: #ff7d4b; }
  .form-heading h2 { color: #f7f8fb; font-size: clamp(29px, 3vw, 42px); }
  .form-heading p { color: #7f8898; }
  .form-step {
    min-width: 68px;
    height: 68px;
    border-color: rgba(255,126,74,.25);
    background: radial-gradient(circle at 35% 30%, rgba(255,112,58,.16), rgba(255,255,255,.025));
    box-shadow: inset 0 0 0 5px rgba(255,255,255,.02);
  }
  .form-step b { color: #ffbd65; font-size: 17px; }
  .form-step span { color: #737c8c; }

  form { display: grid; gap: 18px; }

  .alert {
    margin: 0 0 18px;
    border-radius: 12px;
  }
  .alert.success { color: #a4eac1; background: rgba(26,119,75,.13); border-color: rgba(75,207,133,.23); }
  .alert.error { color: #ffb0b4; background: rgba(193,37,48,.13); border-color: rgba(240,68,68,.24); }

  .form-section {
    scroll-margin-top: 96px;
    padding: clamp(24px, 3vw, 34px);
    border: 1px solid rgba(255,255,255,.085);
    border-radius: 16px;
    background:
      linear-gradient(145deg, rgba(255,255,255,.022), transparent 38%),
      #14171d;
    box-shadow: 0 16px 36px rgba(0,0,0,.14), inset 0 1px rgba(255,255,255,.025);
  }
  .form-section:hover { border-color: rgba(255,126,74,.14); }
  .last-section { padding-bottom: clamp(24px, 3vw, 34px); }

  .section-title { margin-bottom: 26px; }
  .section-icon {
    color: #ff7750;
    background: linear-gradient(145deg, rgba(240,68,68,.18), rgba(255,113,56,.06));
    border-color: rgba(255,107,64,.2);
    box-shadow: 0 8px 18px rgba(218,38,46,.08);
  }
  .section-title span { color: #ff7649; }
  .section-title h2 { color: #f0f2f6; }
  .section-title p { color: #7c8595; }

  .profile-row {
    background: rgba(9,11,14,.52);
    border-color: rgba(255,255,255,.13);
  }
  .photo-preview {
    background: #20242c;
    border-color: #2c313b;
    box-shadow: 0 8px 22px rgba(0,0,0,.28);
  }
  .photo-preview > div { color: #747d8d; }
  .photo-copy strong { color: #eef1f6; }
  .photo-copy p { color: #818a99; }
  .photo-copy small { color: #697282; }
  .upload-button {
    color: #f4f5f8;
    background: #20242c;
    border-color: rgba(255,255,255,.11);
  }
  .upload-button:hover {
    color: #ffb668;
    background: #272b34;
    border-color: rgba(255,126,74,.42);
  }

  .field > label, .skills-box legend { color: #cbd0d9; }
  .field b, .skills-box b { color: #ff694d; }
  .field input, .field select, .field textarea {
    color: #edf0f5;
    color-scheme: dark;
    background: #0d0f13;
    border-color: rgba(255,255,255,.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.18);
  }
  .field select option { color: #edf0f5; background: #14171d; }
  .field input::placeholder, .field textarea::placeholder { color: #555e6d; }
  .field input:hover, .field select:hover, .field textarea:hover { border-color: rgba(255,255,255,.18); }
  .field input:focus, .field select:focus, .field textarea:focus {
    color: #fff;
    background: #0a0c0f;
    border-color: #ff6946;
    box-shadow: 0 0 0 3px rgba(255,105,70,.11), inset 0 1px 2px rgba(0,0,0,.2);
  }
  .field small { color: #687181; }

  .skills-box {
    border-color: rgba(255,255,255,.1);
    background: rgba(8,10,13,.25);
  }
  .skills-box > p { color: #777f8f; }
  .skill-chip {
    color: #969eac;
    background: #0e1014;
    border-color: rgba(255,255,255,.08);
  }
  .skill-chip:hover { color: #ffc078; border-color: rgba(255,128,75,.32); background: #15171c; }
  .checkmark { background: #181b21; border-color: #343943; }
  .skill-chip.selected {
    color: #ffd0a0;
    background: linear-gradient(135deg, rgba(229,54,50,.18), rgba(255,113,56,.07));
    border-color: rgba(255,104,72,.35);
  }
  .skill-chip.selected .checkmark {
    background: linear-gradient(135deg, #f14b43, #e36a2d);
    border-color: #f16a46;
  }

  .terms-row {
    color: #969eac;
    background: #0e1014;
    border-color: rgba(255,255,255,.09);
  }

  .form-actions {
    padding: 4px 0 0;
  }
  .form-actions button { min-height: 50px; border-radius: 9px; }
  .secondary-button {
    color: #aab1bd;
    background: #15181e;
    border-color: rgba(255,255,255,.11);
  }
  .secondary-button:hover { color: #fff; background: #1c2027; border-color: rgba(255,255,255,.19); }
  .primary-button {
    color: #fff;
    background: linear-gradient(135deg, #ff7340, #e43439 55%, #bd1d2a);
    border-color: rgba(255,151,93,.36);
    box-shadow: 0 12px 28px rgba(216,42,48,.25), inset 0 1px rgba(255,255,255,.16);
  }
  .primary-button:hover { box-shadow: 0 16px 34px rgba(216,42,48,.34); }

  footer { color: #505866; }

  @media (max-width: 1120px) {
    .page-shell { grid-template-columns: 340px minmax(0, 1fr); }
    .intro-content { padding: 34px 27px; }
    .intro-content h1 { font-size: 43px; }
    .form-panel { padding: 32px 27px; }
    .three-column { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 860px) {
    .page-shell {
      width: min(100% - 22px, 760px);
      margin: 16px auto;
      grid-template-columns: 1fr;
    }
    .intro-panel { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.1); }
    .intro-content {
      position: relative;
      top: 0;
      min-height: auto;
      padding: 40px 34px;
    }
    .intro-content h1 { max-width: 570px; font-size: clamp(40px, 8vw, 57px); }
    .intro-content > p { max-width: 590px; }
    .section-rail { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px 12px; }
    .section-rail::before { display: none; }
    .side-stats { max-width: 450px; }
    .response-card { max-width: 520px; }
    .form-panel { padding: 30px 25px; }
  }

  @media (max-width: 580px) {
    .topbar { height: 68px; padding: 0 16px; }
    .brand-wordmark { font-size: 23px; }
    .page-shell { width: 100%; margin: 0; border: 0; border-radius: 0; }
    .intro-content { padding: 34px 20px; }
    .intro-content h1 { font-size: 40px; }
    .section-rail { grid-template-columns: 1fr; }
    .form-panel { padding: 27px 14px 34px; }
    .form-heading { padding-inline: 5px; }
    .form-heading h2 { font-size: 28px; }
    .form-section { padding: 23px 17px; border-radius: 13px; }
    .form-grid, .three-column, .skill-grid { grid-template-columns: 1fr; }
    .field-full, .three-column .field-full { grid-column: auto; }
    .profile-row { align-items: flex-start; }
    .photo-preview { width: 72px; height: 84px; }
    .form-actions { align-items: stretch; flex-direction: column-reverse; }
    .form-actions button { width: 100%; }
    footer { margin: 20px auto; padding: 0 16px; flex-direction: column; text-align: center; gap: 6px; }
  }
`
