import { Link } from 'react-router-dom'

function FlameIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
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

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Z" />
      <path d="M6 6h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
      <path d="M9 11h6M9 15h6" />
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

const roles = [
  {
    key: 'firefighter',
    title: 'Firefighter',
    description:
      'Register as active response personnel — assigned rank, station, shift and field skill set.',
    to: '/staff_register/firefighter',
    icon: <FlameIcon />,
  },
  {
    key: 'assigner',
    title: 'Assigner',
    description:
      'Register as coordination and dispatch staff — schedules shifts, assigns units and manages responses.',
    to: '/staff_register/assigner',
    icon: <ClipboardIcon />,
  },
]

export default function StaffRegisterSelect() {
  return (
    <div className="select-page">
      <style>{pageStyles}</style>

      <header className="topbar">
        <Link className="brand" to="/" aria-label="AGNIPRAHARI home">
          <span className="brand-wordmark" aria-label="AGNIPRAHARI">
            <span className="brand-agni">AGNI</span>
            <span className="brand-prahari">PRAHARI</span>
          </span>
        </Link>

        <Link to="/" className="back-home-btn">
          <span aria-hidden="true">←</span> Back to Home
        </Link>
      </header>

      <main className="select-shell">
        <div className="select-heading">
          <span className="select-eyebrow">Personnel enrollment</span>
          <h1>Register as staff</h1>
          <p>Choose your role to continue to the right registration form.</p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <Link key={role.key} to={role.to} className="role-card">
              <div className="role-icon">{role.icon}</div>
              <h2>{role.title}</h2>
              <p>{role.description}</p>
              <span className="role-cta">
                Continue <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
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
    --red-accent: #d90429;
    --red-dark: #b8001f;
    --red-glow: rgba(217, 4, 41, 0.25);
    --bg-black: #000000;
    --surface-dark: #0a0a0c;
    --card-dark: #121215;
    --ink-light: #f1f5f9;
    --muted: #94a3b8;
    --line: #222228;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 320px; background: var(--bg-black); color: var(--ink-light); }
  button, a { font: inherit; }

  .select-page { min-height: 100vh; background: var(--bg-black); display: flex; flex-direction: column; }

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

  .select-shell {
    flex: 1;
    width: min(1000px, calc(100% - 40px));
    margin: 0 auto;
    padding: clamp(48px, 8vh, 96px) 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 48px;
  }

  .select-heading { text-align: center; }
  .select-eyebrow {
    display: inline-block;
    color: var(--red-accent);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .select-heading h1 {
    margin: 0 0 12px;
    color: #ffffff;
    font-size: clamp(32px, 5vw, 48px);
    letter-spacing: -.03em;
  }
  .select-heading p {
    margin: 0;
    color: var(--muted);
    font-size: 15px;
  }

  .role-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .role-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 36px 30px;
    background: var(--card-dark);
    border: 1px solid var(--line);
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
  }
  .role-card:hover {
    border-color: rgba(217, 4, 41, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(217, 4, 41, 0.12);
  }

  .role-icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    color: var(--red-accent);
    background: rgba(217, 4, 41, 0.1);
    border: 1px solid rgba(217, 4, 41, 0.2);
    border-radius: 12px;
  }
  .role-icon svg { width: 26px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
  .role-icon svg path[fill="currentColor"] { fill: currentColor; stroke: none; }

  .role-card h2 {
    margin: 4px 0 0;
    color: #ffffff;
    font-size: 22px;
    letter-spacing: -.01em;
  }
  .role-card p {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.6;
  }
  .role-cta {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--red-accent);
    font-size: 13px;
    font-weight: 700;
  }
  .role-cta svg { width: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .2s; }
  .role-card:hover .role-cta svg { transform: translateX(3px); }

  footer {
    padding: 24px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--muted);
    max-width: 1480px;
    margin: 0 auto;
    width: min(1000px, calc(100% - 40px));
  }

  @media (max-width: 720px) {
    .role-grid { grid-template-columns: 1fr; }
    .topbar { padding: 0 20px; }
    footer { flex-direction: column; gap: 6px; text-align: center; }
  }
`
