import { useRef, useState } from 'react'

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4.5 5v5.7c0 4.9 3.1 9.2 7.5 11.3 4.4-2.1 7.5-6.4 7.5-11.3V5L12 2Z" />
      <path d="m8.7 12 2.1 2.1 4.7-4.8" />
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

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
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

function EyeOpenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeClosedIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

export default function FirefighterLogin() {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const formRef = useRef(null)

  const updateField = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      console.log('Firefighter login:', {
        email: form.email,
        password: form.password,
        remember: form.remember,
        timestamp: new Date().toISOString(),
      })
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Unable to connect to the authentication server.')
    } finally {
      setLoading(false)
    }
  }

  const isFilled = form.email.trim().length > 0 && form.password.length > 0

  return (
    <div className="login-page">
      <style>{pageStyles}</style>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="AGNIPRAHARI home">
          <span className="brand-wordmark">
            <span className="brand-agni">AGNI</span>
            <span className="brand-prahari">PRAHARI</span>
          </span>
        </a>

        <div className="secure-note">
          <ShieldIcon />
          <span>
            <strong>Secure portal</strong>
            <small>Authorized personnel only</small>
          </span>
        </div>
      </header>

      <main id="top" className="page-shell">
        <aside className="intro-panel" aria-label="Login overview">
          <div className="intro-glow" />
          <div className="intro-content">
            <span className="intro-badge">
              <span /> Staff portal · Secure
            </span>
            <h1>
              Welcome back, <em>firefighter</em>
            </h1>
            <p>
              Access your duty roster, incident reports, training records, and
              emergency deployment status from one secure dashboard.
            </p>

            <div className="feature-list">
              <div>
                <span>01</span>
                <div>
                  <strong>Real-time dispatch</strong>
                  <p>Receive live alerts and station assignments instantly.</p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <strong>Shift management</strong>
                  <p>View schedules, request swaps, and track overtime.</p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <strong>Medical readiness</strong>
                  <p>Update health records and certification expiry dates.</p>
                </div>
              </div>
            </div>

            <div className="response-card">
              <div className="pulse-dot"><span /></div>
              <div>
                <strong>System operational</strong>
                <small>All stations reporting normal status.</small>
              </div>
            </div>
          </div>
        </aside>

        <section className="form-panel" aria-labelledby="login-title">
          <div className="form-heading">
            <div>
              <span>Staff portal</span>
              <h2 id="login-title">Firefighter Login</h2>
              <p>Enter your credentials to access the operations console.</p>
            </div>
            <div className="form-step">
              <LockIcon />
            </div>
          </div>

          {success && (
            <div className="alert success" role="status">
              <span>✓</span>
              <div>
                <strong>Authentication successful.</strong>
                <p>Redirecting you to the operations dashboard...</p>
              </div>
              <button type="button" onClick={() => setSuccess(false)} aria-label="Close message">×</button>
            </div>
          )}

          {error && (
            <div className="alert error" role="alert">
              <span>!</span>
              <div><strong>Login failed</strong><p>{error}</p></div>
              <button type="button" onClick={() => setError('')} aria-label="Close error">×</button>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="section-title">
                <div className="section-icon">
                  <UserIcon />
                </div>
                <div>
                  <span>Credentials</span>
                  <h2>Sign in to your account</h2>
                  <p>Use the email and password registered with your station.</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="field field-full">
                  <label htmlFor="email">
                    Email address <b aria-hidden="true">*</b>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="name@fireservice.gov"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="field field-full">
                  <label htmlFor="password">
                    Password <b aria-hidden="true">*</b>
                  </label>
                  <div className="password-wrap">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={updateField}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className="eye-toggle"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="login-extras">
                <label className="remember-row" htmlFor="remember">
                  <input
                    id="remember"
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={updateField}
                  />
                  <span>Keep me signed in on this device</span>
                </label>
                <a href="#forgot" className="forgot-link">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="form-actions">
              <a href="#register" className="register-link">
                New personnel? <strong>Register here</strong>
              </a>
              <button
                type="submit"
                className="primary-button"
                disabled={!isFilled || loading}
              >
                {loading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    Sign in to portal <ArrowIcon />
                  </>
                )}
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

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    min-width: 320px;
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
  button, input, select, textarea { font: inherit; }
  button, label, select { -webkit-tap-highlight-color: transparent; }

  .login-page { min-height: 100vh; background: transparent; isolation: isolate; }

  .topbar {
    height: 76px;
    padding: 0 clamp(20px, 4.5vw, 72px);
    background: rgba(8,9,12,.82);
    border-bottom: 1px solid rgba(255,255,255,.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(14px);
    box-shadow: 0 12px 36px rgba(0,0,0,.2);
  }

  .brand { display: flex; align-items: center; color: #f7f8fb; text-decoration: none; }
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
  .brand-prahari {
    color: #f04444;
    text-shadow: 0 0 18px rgba(240,68,68,.18);
  }

  .secure-note {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 13px;
    border: 1px solid rgba(97,226,154,.16);
    border-radius: 10px;
    background: rgba(42,118,76,.08);
  }
  .secure-note svg { width: 25px; fill: none; stroke: #62df9a; stroke-width: 1.8; }
  .secure-note span { display: grid; }
  .secure-note strong { color: #77e5a8; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; }
  .secure-note small { color: #778191; font-size: 12px; margin-top: 2px; }

  .page-shell {
    width: min(1460px, calc(100% - 36px));
    margin: 28px auto;
    display: grid;
    grid-template-columns: minmax(330px, .75fr) minmax(610px, 1.62fr);
    align-items: stretch;
    background: #0d0f13;
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 30px 90px rgba(0,0,0,.38);
  }

  .intro-panel {
    position: relative;
    overflow: hidden;
    color: white;
    background:
      radial-gradient(circle at 96% 7%, rgba(255,179,70,.24), transparent 20rem),
      linear-gradient(158deg, rgba(171,27,38,.98), rgba(77,12,22,.99) 48%, rgba(30,10,16,.99));
    border-right: 1px solid rgba(255,164,104,.14);
  }
  .intro-panel::before {
    content: "";
    position: absolute;
    width: 380px;
    height: 380px;
    right: -225px;
    top: 18%;
    border: 1px solid rgba(255,255,255,.11);
    border-radius: 50%;
    box-shadow:
      0 0 0 58px rgba(255,255,255,.025),
      0 0 0 125px rgba(255,255,255,.017);
  }
  .intro-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: .22;
    background-image:
      linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px);
    background-size: 36px 36px;
    mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,.45) 70%, transparent);
  }
  .intro-glow {
    position: absolute;
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
    width: max-content;
    padding: 7px 11px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 999px;
    background: rgba(16,5,9,.18);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: .12em;
    font-weight: 700;
    color: rgba(255,255,255,.88);
  }
  .intro-badge span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
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
    font-style: normal;
    color: #ffc16f;
    text-shadow: 0 8px 25px rgba(255,167,69,.12);
  }
  .intro-content > p {
    max-width: 410px;
    margin: 0;
    color: rgba(255,255,255,.66);
    line-height: 1.6;
    font-size: 12px;
  }

  .feature-list { margin: 48px 0; display: grid; gap: 4px; }
  .feature-list > div {
    padding: 16px 0;
    display: flex;
    gap: 17px;
    border-bottom: 1px solid rgba(255,255,255,.13);
  }
  .feature-list > div > span {
    color: #ffc398;
    font-size: 11px;
    font-weight: 800;
    padding-top: 3px;
    letter-spacing: .09em;
  }
  .feature-list p { margin: 0; color: rgba(255,255,255,.62); font-size: 12px; line-height: 1.55; }
  .feature-list strong { display: block; color: white; font-size: 14px; margin-bottom: 3px; }

  .response-card {
    margin-top: auto;
    padding: 13px 14px;
    display: flex;
    gap: 14px;
    align-items: center;
    border: 1px solid rgba(118,234,164,.15);
    background: rgba(17,63,42,.13);
    border-radius: 11px;
  }
  .response-card > div:last-child { display: grid; }
  .response-card strong { font-size: 10px; }
  .response-card small { color: rgba(255,255,255,.42); margin-top: 4px; line-height: 1.4; font-size: 9px; }
  .pulse-dot {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(112,236,162,.08);
    flex: 0 0 auto;
  }
  .pulse-dot span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #70eca2;
    box-shadow: 0 0 0 6px rgba(112,236,162,.12);
  }

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
    display: flex;
    justify-content: space-between;
    gap: 28px;
    align-items: flex-start;
    border-bottom: 1px solid rgba(255,255,255,.09);
  }
  .form-heading > div:first-child > span {
    color: #ff7d4b;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
  }
  .form-heading h2 {
    margin: 8px 0 7px;
    color: #f7f8fb;
    font-size: clamp(29px, 3vw, 42px);
    line-height: 1.08;
    letter-spacing: -.04em;
  }
  .form-heading p { margin: 0; color: #7f8898; font-size: 14px; }
  .form-step {
    min-width: 68px;
    height: 68px;
    border: 1px solid rgba(255,126,74,.25);
    border-radius: 50%;
    display: grid;
    place-content: center;
    text-align: center;
    background: radial-gradient(circle at 35% 30%, rgba(255,112,58,.16), rgba(255,255,255,.025));
    box-shadow: inset 0 0 0 5px rgba(255,255,255,.02);
  }
  .form-step svg { width: 24px; fill: none; stroke: #ffbd65; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

  .alert {
    margin: 0 0 18px;
    padding: 16px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    border-radius: 12px;
  }
  .alert > span {
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    border-radius: 50%;
    color: white;
    font-weight: 800;
    font-size: 12px;
  }
  .alert div { flex: 1; }
  .alert strong { font-size: 13px; }
  .alert p { margin: 3px 0 0; font-size: 12px; line-height: 1.5; }
  .alert button { border: 0; padding: 0 4px; background: none; color: inherit; font-size: 21px; cursor: pointer; }
  .alert.success { color: #a4eac1; background: rgba(26,119,75,.13); border: 1px solid rgba(75,207,133,.23); }
  .alert.success > span { background: #269467; }
  .alert.error { color: #ffb0b4; background: rgba(193,37,48,.13); border: 1px solid rgba(240,68,68,.24); }
  .alert.error > span { background: var(--red); }

  form { display: grid; gap: 18px; }

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

  .section-title { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 26px; }
  .section-icon {
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    color: #ff7750;
    background: linear-gradient(145deg, rgba(240,68,68,.18), rgba(255,113,56,.06));
    border: 1px solid rgba(255,107,64,.2);
    border-radius: 10px;
    box-shadow: 0 8px 18px rgba(218,38,46,.08);
  }
  .section-icon svg { width: 21px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .section-title span { display: block; margin-bottom: 4px; color: #ff7649; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  .section-title h2 { margin: 0; color: #f0f2f6; font-size: 20px; letter-spacing: -.02em; }
  .section-title p { margin: 5px 0 0; color: #7c8595; font-size: 12px; line-height: 1.5; }

  .form-grid { display: grid; grid-template-columns: 1fr; gap: 22px 20px; }
  .field { min-width: 0; }
  .field-full { grid-column: 1 / -1; }
  .field > label {
    display: block;
    margin-bottom: 8px;
    color: #cbd0d9;
    font-size: 11px;
    font-weight: 750;
    letter-spacing: .02em;
  }
  .field b { color: #ff694d; }
  .field input, .field select, .field textarea {
    width: 100%;
    min-height: 46px;
    padding: 12px 13px;
    color: #edf0f5;
    color-scheme: dark;
    background: #0d0f13;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 8px;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
    font-size: 13px;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.18);
  }
  .field input::placeholder, .field textarea::placeholder { color: #555e6d; }
  .field input:hover, .field select:hover, .field textarea:hover { border-color: rgba(255,255,255,.18); }
  .field input:focus, .field select:focus, .field textarea:focus {
    color: #fff;
    background: #0a0c0f;
    border-color: #ff6946;
    box-shadow: 0 0 0 3px rgba(255,105,70,.11), inset 0 1px 2px rgba(0,0,0,.2);
  }

  .password-wrap { position: relative; }
  .password-wrap input { padding-right: 44px; }
  .eye-toggle {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    background: transparent;
    border: 0;
    border-radius: 6px;
    color: #697382;
    cursor: pointer;
    transition: color .2s, background .2s;
  }
  .eye-toggle:hover { color: #ff9e6b; background: rgba(255,255,255,.04); }
  .eye-toggle svg { width: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

  .login-extras {
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .remember-row {
    display: flex;
    gap: 11px;
    align-items: center;
    color: #969eac;
    font-size: 11px;
    line-height: 1.6;
    cursor: pointer;
  }
  .remember-row input {
    margin: 0;
    width: 16px;
    height: 16px;
    accent-color: var(--red);
    flex: 0 0 auto;
  }
  .forgot-link {
    color: #ff8a5c;
    font-size: 11px;
    font-weight: 700;
    text-decoration: none;
    transition: color .2s;
  }
  .forgot-link:hover { color: #ffc078; text-decoration: underline; }

  .form-actions {
    padding-top: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
  }
  .register-link {
    color: #7f8898;
    font-size: 12px;
    text-decoration: none;
    transition: color .2s;
  }
  .register-link strong { color: #ff8a5c; font-weight: 700; }
  .register-link:hover strong { color: #ffc078; text-decoration: underline; }

  .form-actions button {
    min-height: 50px;
    padding: 0 20px;
    border-radius: 9px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 750;
    transition: .2s ease;
  }
  .primary-button {
    min-width: 205px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #fff;
    background: linear-gradient(135deg, #ff7340, #e43439 55%, #bd1d2a);
    border: 1px solid rgba(255,151,93,.36);
    box-shadow: 0 12px 28px rgba(216,42,48,.25), inset 0 1px rgba(255,255,255,.16);
  }
  .primary-button svg { width: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .2s; }
  .primary-button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 34px rgba(216,42,48,.34); }
  .primary-button:hover:not(:disabled) svg { transform: translateX(3px); }
  .primary-button:disabled {
    opacity: .55;
    cursor: not-allowed;
    filter: saturate(.6);
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,.25);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  footer {
    width: min(1460px, calc(100% - 40px));
    margin: -4px auto 30px;
    padding: 0 4px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    color: #505866;
    font-size: 10px;
    letter-spacing: .02em;
  }

  @media (max-width: 1120px) {
    .page-shell { grid-template-columns: 340px minmax(0, 1fr); }
    .intro-content { padding: 34px 27px; }
    .intro-content h1 { font-size: 43px; }
    .form-panel { padding: 32px 27px; }
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
    .feature-list { grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 34px 0; }
    .feature-list > div { display: block; border: 0; padding: 0; }
    .feature-list p { margin-top: 8px; }
    .response-card { max-width: 520px; margin-top: 18px; }
    .form-panel { padding: 30px 25px; }
  }

  @media (max-width: 580px) {
    .topbar { height: 68px; padding: 0 16px; }
    .brand-wordmark { font-size: 23px; }
    .secure-note { display: none; }
    .page-shell { width: 100%; margin: 0; border: 0; border-radius: 0; }
    .intro-content { padding: 34px 20px; }
    .intro-content h1 { font-size: 40px; }
    .feature-list { grid-template-columns: 1fr; gap: 0; }
    .feature-list > div { padding: 12px 0; display: flex; border-bottom: 1px solid rgba(255,255,255,.13); }
    .feature-list p { margin-top: 0; }
    .form-panel { padding: 27px 14px 34px; }
    .form-heading { padding-inline: 5px; }
    .form-heading h2 { font-size: 28px; }
    .form-step { display: none; }
    .form-section { padding: 23px 17px; border-radius: 13px; }
    .form-actions { align-items: stretch; flex-direction: column-reverse; }
    .form-actions button { width: 100%; }
    .register-link { text-align: center; }
    footer { margin: 20px auto; padding: 0 16px; flex-direction: column; text-align: center; gap: 6px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
  }
`