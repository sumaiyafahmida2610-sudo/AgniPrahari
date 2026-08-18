import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const initialForm = {
  fullName: '',
  staffId: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
  nid: '',
  joiningDate: '',
  experience: '',
  shift: '',
  address: '',
  certification: '',
  password: '',
  confirmPassword: '',
  terms: false,
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

export default function AssignerRegistration() {
  const [form, setForm] = useState(initialForm)
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
      profilePhoto: photoName || null,
      createdAt: new Date().toISOString(),
    }

    console.log('Assigner registration:', staffRecord)
    setError('')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    setForm(initialForm)
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
    form.joiningDate,
    form.experience,
    form.shift,
    form.password,
    form.confirmPassword,
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
<Link to="/" className="back-home-btn">
    ← Back to Home
  </Link>

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
              Register as an <em>Assigner</em>
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
                <span><strong>Operational profile</strong><small>Shift, experience and details</small></span>
                <i>↗</i>
              </a>
              <a href="#account-security">
                <b>03</b>
                <span><strong>Account security</strong><small>Protected access to the staff portal</small></span>
                <i>↗</i>
              </a>
            </nav>

            <div className="side-stats" aria-label="Record information">
              <div><strong>03</strong><span>Profile sections</span></div>
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
              <h2 id="registration-title">Assigner Registration</h2>
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
                description="Basic identity and contact details of the assigner."
              />

              <div className="profile-row">
                <div className="photo-preview">
                  {photo ? (
                    <img src={photo} alt="Selected assigner" />
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
                    placeholder="e.g. AS-2026-0142"
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
                description="Availability and operational capabilities."
              />

              <div className="form-grid">
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
                    placeholder="e.g. CPR, Incident Command Level 1"
                  />
                </Field>
              </div>
            </section>

            <section id="account-security" className="form-section last-section">
              <SectionTitle
                icon={<LockIcon />}
                eyebrow="Section 03"
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
                Register as an Assigner <ArrowIcon />
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
    color-scheme: dark;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    --red-accent: #d90429;
    --red-dark: #b8001f;
    --red-glow: rgba(217, 4, 41, 0.25);
    --bg-black: #000000;
    --surface-dark: #0a0a0c;
    --card-dark: #121215;
    --input-dark: #18181c;
    --ink-light: #f1f5f9;
    --muted: #94a3b8;
    --line: #222228;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 320px; background: var(--bg-black); color: var(--ink-light); }
  button, input, select, textarea { font: inherit; }
  button, label, select { -webkit-tap-highlight-color: transparent; }

  .registration-page { min-height: 100vh; background: var(--bg-black); }

  .topbar {
    height: 82px;
    padding: 0 clamp(22px, 5vw, 76px);
    background: rgba(10, 10, 12, 0.9);
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(14px);
    gap: 18px;
  }

  .brand { display: flex; align-items: center; color: #ffffff; text-decoration: none; }
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
  .brand-prahari { color: var(--red-accent); }

  .secure-note { display: flex; align-items: center; gap: 10px; }
  .secure-note svg { width: 28px; fill: none; stroke: #34d399; stroke-width: 1.8; }
  .secure-note span { display: grid; }
  .secure-note strong { color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; }
  .secure-note small { color: var(--muted); font-size: 12px; margin-top: 2px; }
.back-home-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 15px;
  color: #cbd5e1;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: .2s ease;
}
.back-home-btn:hover {
  color: var(--red-accent);
  border-color: var(--red-accent);
  transform: translateY(-1px);
}
  .page-shell {
    width: min(1480px, calc(100% - 32px));
    margin: 32px auto;
    display: grid;
    grid-template-columns: minmax(310px, .72fr) minmax(600px, 1.55fr);
    background: var(--surface-dark);
    border: 1px solid var(--line);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.8);
  }

  .intro-panel {
    position: relative;
    overflow: hidden;
    color: white;
    background: linear-gradient(155deg, #180507 0%, #080203 100%);
    border-right: 1px solid var(--line);
  }
  .intro-panel::before {
    content: "";
    position: absolute;
    width: 340px;
    height: 340px;
    right: -185px;
    top: 22%;
    border: 1px solid rgba(217, 4, 41, 0.2);
    border-radius: 50%;
    box-shadow: 0 0 0 50px rgba(217, 4, 41, 0.03), 0 0 0 110px rgba(217, 4, 41, 0.015);
  }
  .intro-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: .08;
    background-image: linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(to bottom, black, transparent 70%);
  }
  .intro-glow { position: absolute; width: 270px; height: 270px; left: -80px; bottom: -70px; background: var(--red-accent); filter: blur(100px); opacity: .25; }
  .intro-content { position: sticky; top: 115px; padding: 64px 48px; z-index: 1; }
  .intro-badge {
    width: max-content;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(217, 4, 41, 0.4);
    border-radius: 999px;
    background: rgba(217, 4, 41, 0.1);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .12em;
    font-weight: 700;
    color: #ff8a93;
  }
  .intro-badge span { width: 7px; height: 7px; border-radius: 50%; background: var(--red-accent); box-shadow: 0 0 0 5px var(--red-glow); }
  .intro-content h1 { margin: 30px 0 18px; max-width: 440px; font-size: clamp(40px, 4vw, 66px); line-height: .98; letter-spacing: -.06em; color: #ffffff; }
  .intro-content h1 em { font-style: normal; color: var(--red-accent); }
  .intro-content > p { max-width: 400px; margin: 0; color: var(--muted); line-height: 1.75; font-size: 15px; }

  .response-card { padding: 18px; display: flex; gap: 14px; align-items: center; border: 1px solid var(--line); background: var(--card-dark); border-radius: 14px; }
  .response-card > div:last-child { display: grid; }
  .response-card strong { font-size: 13px; color: #ffffff; }
  .response-card small { color: var(--muted); margin-top: 4px; line-height: 1.4; }
  .pulse-dot { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: rgba(52, 211, 153, 0.1); flex: 0 0 auto; }
  .pulse-dot span { width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 6px rgba(52, 211, 153, 0.2); }

  .form-panel { min-width: 0; padding: clamp(30px, 4vw, 64px); background: var(--surface-dark); }
  .form-heading { padding-bottom: 34px; display: flex; justify-content: space-between; gap: 28px; align-items: flex-start; border-bottom: 1px solid var(--line); }
  .form-heading > div:first-child > span { color: var(--red-accent); font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  .form-heading h2 { margin: 8px 0 7px; color: #ffffff; font-size: clamp(28px, 3vw, 40px); line-height: 1.08; letter-spacing: -.04em; }
  .form-heading p { margin: 0; color: var(--muted); font-size: 14px; }
  .form-step { min-width: 58px; height: 58px; border: 1px solid var(--line); border-radius: 50%; display: grid; place-content: center; text-align: center; background: var(--card-dark); }
  .form-step b { color: var(--red-accent); font-size: 18px; line-height: 1; }
  .form-step span { color: var(--muted); font-size: 9px; margin-top: 2px; text-transform: uppercase; }

  .alert { margin: 26px 0 -4px; padding: 16px; display: flex; gap: 12px; align-items: flex-start; border-radius: 12px; }
  .alert > span { width: 26px; height: 26px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 50%; color: white; font-weight: 800; }
  .alert div { flex: 1; }
  .alert strong { font-size: 13px; }
  .alert p { margin: 3px 0 0; font-size: 12px; line-height: 1.5; }
  .alert button { border: 0; padding: 0 4px; background: none; color: inherit; font-size: 21px; cursor: pointer; }
  .alert.success { color: #34d399; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); }
  .alert.success > span { background: #059669; }
  .alert.error { color: #f87171; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); }
  .alert.error > span { background: var(--red-accent); }

  .form-section { padding: 42px 0; border-bottom: 1px solid var(--line); }
  .last-section { padding-bottom: 34px; border-bottom: none; }
  .section-title { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 28px; }
  .section-icon { width: 42px; height: 42px; flex: 0 0 auto; display: grid; place-items: center; color: var(--red-accent); background: rgba(217, 4, 41, 0.1); border: 1px solid rgba(217, 4, 41, 0.2); border-radius: 10px; }
  .section-icon svg { width: 21px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .section-title span { display: block; margin-bottom: 4px; color: var(--red-accent); font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  .section-title h2 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; }
  .section-title p { margin: 4px 0 0; color: var(--muted); font-size: 13px; }

  .profile-row { display: flex; gap: 20px; align-items: center; margin-bottom: 24px; padding: 18px; background: var(--card-dark); border: 1px solid var(--line); border-radius: 12px; }
  .photo-preview { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; background: var(--input-dark); display: grid; place-items: center; border: 2px dashed #334155; }
  .photo-preview img { width: 100%; height: 100%; object-fit: cover; }
  .photo-preview div { display: flex; flex-direction: column; align-items: center; color: var(--muted); font-size: 10px; font-weight: 700; }
  .photo-preview svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; }
  .photo-copy strong { display: block; font-size: 14px; color: #ffffff; }
  .photo-copy p { margin: 2px 0 10px; font-size: 12px; color: var(--muted); }
  .upload-button { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: var(--red-accent); color: white; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .upload-button:hover { background: var(--red-dark); }
  .upload-button input { display: none; }
  .upload-button svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; }
  .photo-copy small { display: block; margin-top: 6px; font-size: 11px; color: var(--muted); }

  .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field-full { grid-column: 1 / -1; }
  .field label { font-size: 12px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: .04em; }
  .field label b { color: var(--red-accent); }
  .field input, .field select, .field textarea { width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px; font-size: 14px; background: var(--input-dark); color: #ffffff; transition: border-color .15s, box-shadow .15s; }
  .field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--red-accent); box-shadow: 0 0 0 3px var(--red-glow); }
  .field small { font-size: 11px; color: var(--muted); }

  .terms-row { display: flex; gap: 10px; align-items: flex-start; margin-top: 18px; cursor: pointer; font-size: 13px; color: #cbd5e1; line-height: 1.4; }
  .terms-row input { margin-top: 2px; accent-color: var(--red-accent); }

  .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; }
  .secondary-button { padding: 12px 20px; border: 1px solid var(--line); background: var(--card-dark); border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; color: #cbd5e1; transition: background 0.2s; }
  .secondary-button:hover { background: #1a1a20; }
  .primary-button { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--red-accent); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 14px var(--red-glow); transition: background 0.2s; }
  .primary-button:hover { background: var(--red-dark); }
  .primary-button svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; }

  .completion-card { margin: 28px 0; padding: 16px; background: var(--card-dark); border-radius: 12px; border: 1px solid var(--line); }
  .completion-card div:first-child { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 8px; color: #ffffff; }
  .progress-track { height: 6px; background: var(--input-dark); border-radius: 999px; overflow: hidden; margin-bottom: 8px; }
  .progress-track span { display: block; height: 100%; background: var(--red-accent); transition: width .3s; }
  .completion-card small { font-size: 11px; color: var(--muted); }

  .section-rail { display: flex; flex-direction: column; gap: 10px; margin: 28px 0; }
  .section-rail a { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 8px; color: white; text-decoration: none; background: var(--card-dark); border: 1px solid var(--line); transition: border-color 0.2s; }
  .section-rail a:hover { border-color: rgba(217, 4, 41, 0.4); }
  .section-rail b { font-size: 12px; color: var(--red-accent); }
  .section-rail span { display: flex; flex-direction: column; flex: 1; }
  .section-rail strong { font-size: 13px; color: #ffffff; }
  .section-rail small { font-size: 10px; color: var(--muted); }
  .section-rail i { font-style: normal; color: var(--muted); }

  .side-stats { display: flex; gap: 16px; margin-bottom: 24px; }
  .side-stats div { flex: 1; padding: 12px; background: var(--card-dark); border: 1px solid var(--line); border-radius: 8px; display: flex; flex-direction: column; }
  .side-stats strong { font-size: 18px; color: #ffffff; }
  .side-stats span { font-size: 11px; color: var(--muted); }

  footer { padding: 24px; text-align: center; display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); max-width: 1480px; margin: 0 auto; }

  @media (max-width: 900px) {
    .page-shell { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
    .topbar { padding: 0 20px; }
  }
`