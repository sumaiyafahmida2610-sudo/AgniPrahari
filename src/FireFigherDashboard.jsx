import { useState } from 'react'

const defaultFireFighter = {
  FireFighterId: 'FF-2026-0048',
  name: 'Mohammad Rahman',
  address: 'House 18, Road 7, Dhanmondi, Dhaka 1209',
  designation: 'Senior Fire Fighter',
  contactNo: '+880 1700-000000',
  email: 'rahman@agniprahari.gov.bd',
  salary: 'N/A',
}

function Icon({ name }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    id: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8" cy="11" r="2" /><path d="M5.5 16a3 3 0 0 1 5 0M13 10h5M13 14h5" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    phone: <path d="M8.5 3H5.7C4.8 3 4 3.8 4.1 4.7 5 13 11 19 19.3 19.9c.9.1 1.7-.7 1.7-1.6v-2.8l-4.3-1-1.3 2.1a14 14 0 0 1-8-8l2.1-1.3-1-4.3Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    salary: <><circle cx="12" cy="12" r="9" /><path d="M15 8.5c-.6-.7-1.5-1-2.7-1-1.6 0-2.8.8-2.8 2s1 1.8 2.8 2.2c1.8.4 2.8 1 2.8 2.4s-1.2 2.4-3 2.4c-1.3 0-2.5-.4-3.2-1.3M12 5.5v13" /></>,
    shield: <><path d="M12 2 4.5 5v5.7c0 4.9 3.1 9.2 7.5 11.3 4.4-2.1 7.5-6.4 7.5-11.3V5L12 2Z" /><path d="m8.7 12 2.1 2.1 4.7-4.8" /></>,
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

export default function FireFighterDashboard({
  fireFighter = defaultFireFighter,
  onLogout,
}) {
  const [activeView, setActiveView] = useState('dashboard')

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
        <button className="ad-brand" type="button" onClick={() => setActiveView('dashboard')}>
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
            <div className="ad-avatar">{fireFighter.name?.charAt(0)?.toUpperCase() || 'F'}</div>
            <div>
              <span>Signed in as</span>
              <strong>{fireFighter.name}</strong>
              <small>{fireFighter.designation}</small>
            </div>
          </div>

          <nav className="ad-nav" aria-label="Fire Fighter dashboard navigation">
            <span className="ad-nav-label">Workspace</span>
            <button
              type="button"
              className={activeView === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveView('dashboard')}
            >
              <Icon name="grid" />
              <span>Dashboard</span>
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
          <section className="ad-view" aria-labelledby="dashboard-title">
            <div className="ad-page-heading">
              <div>
                <span>Personnel overview</span>
                <h1 id="dashboard-title">Fire Fighter Dashboard</h1>
                <p>View your profile details and operational duty status.</p>
              </div>
              <div className="ad-live-badge"><i /> Profile active</div>
            </div>

            <div className="ad-hero-card">
              <div className="ad-hero-glow" />
              <div className="ad-hero-avatar">{fireFighter.name?.charAt(0)?.toUpperCase() || 'F'}</div>
              <div className="ad-hero-copy">
                <span>Fire Fighter personnel record</span>
                <h2>{fireFighter.name}</h2>
                <p>{fireFighter.designation}</p>
              </div>
              <div className="ad-assignment-chip">
                <small>Fire Fighter ID</small>
                <strong>{fireFighter.assignmentId}</strong>
              </div>
            </div>

            <div className="ad-section-heading">
              <div className="ad-section-icon"><Icon name="user" /></div>
              <div>
                <span>Profile information</span>
                <h2>Fire Fighter Personal Details</h2>
                <p>Your registered information for emergency response operations.</p>
              </div>
            </div>

            <div className="ad-info-grid">
              <InfoCard icon="id" label="Fire Fighter ID" value={fireFighter.assignmentId} />
              <InfoCard icon="user" label="Full Name" value={fireFighter.name} />
              <InfoCard icon="briefcase" label="Designation" value={fireFighter.designation} />
              <InfoCard icon="phone" label="Contact Number" value={fireFighter.contactNo} />
              <InfoCard icon="mail" label="Email Address" value={fireFighter.email} />
              <InfoCard icon="salary" label="Salary" value={fireFighter.salary || 'N/A'} accent />
              <InfoCard icon="pin" label="Address" value={fireFighter.address} wide />
            </div>
          </section>
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
  .ad-nav button, .ad-logout { width: 100%; padding: 12px 13px; display: flex; align-items: center; gap: 11px; border: 1px solid transparent; border-radius: 9px; background: transparent; color: rgba(255,255,255,.76); cursor: pointer; font-size: 13px; font-weight: 650; text-align: left; transition: .18s ease; }
  .ad-nav button:hover { background: rgba(255,255,255,.075); color: white; transform: translateX(2px); }
  .ad-nav button.active { color: white; background: rgba(10,4,7,.2); border-color: rgba(255,255,255,.14); box-shadow: inset 3px 0 0 #ffc16f; }
  .ad-nav button.active svg { color: #ffc16f; }

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
  .ad-page-heading { padding-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; gap: 25px; border-bottom: 1px solid var(--ad-line); }
  .ad-page-heading > div:first-child > span { color: var(--ad-red); font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  .ad-page-heading h1 { margin: 7px 0 7px; color: white; font-size: clamp(30px, 4vw, 43px); line-height: 1.06; letter-spacing: -.045em; }
  .ad-page-heading p { margin: 0; color: var(--ad-muted); font-size: 14px; line-height: 1.55; }
  .ad-live-badge { flex: 0 0 auto; padding: 9px 12px; border-radius: 999px; font-size: 10px; font-weight: 750; text-transform: uppercase; letter-spacing: .07em; display: flex; align-items: center; gap: 9px; color: #34d399; background: rgba(52, 211, 153, .08); border: 1px solid rgba(52, 211, 153, .18); }

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

  .ad-section-heading { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
  .ad-section-icon { width: 42px; height: 42px; flex: 0 0 auto; display: grid; place-items: center; color: var(--ad-red); background: rgba(217, 4, 41, .1); border: 1px solid rgba(217, 4, 41, .2); border-radius: 10px; }
  .ad-section-heading span { display: block; margin-bottom: 3px; color: var(--ad-red); font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  .ad-section-heading h2 { margin: 0; color: white; font-size: 20px; }
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

  .ad-footer { width: min(1480px, calc(100% - 32px)); margin: 0 auto; padding: 0 0 25px; display: flex; justify-content: space-between; color: var(--ad-muted); font-size: 11px; }

  @media (max-width: 1120px) {
    .ad-shell { grid-template-columns: 31.65% minmax(0, 1fr); }
    .ad-content { padding: 32px 26px; }
  }

  @media (max-width: 860px) {
    .ad-topbar { height: 72px; padding: 0 18px; }
    .ad-secure-note small { display: none; }
    .ad-shell { width: min(100% - 20px, 1480px); margin: 18px auto; grid-template-columns: 1fr; }
    .ad-sidebar { min-height: auto; padding: 18px; border-right: 0; border-bottom: 1px solid var(--ad-line); }
    .ad-profile, .ad-sidebar-status { display: none; }
    .ad-nav { margin-top: 0; display: grid; grid-template-columns: 1fr; gap: 7px; }
    .ad-nav-label { display: none; }
    .ad-nav button { min-height: 50px; padding: 9px 12px; justify-content: flex-start; gap: 10px; font-size: 12px; }
    .ad-nav button.active { box-shadow: inset 3px 0 0 var(--ad-red); }
    .ad-logout { margin-top: 11px; justify-content: center; }
    .ad-content { padding: 27px 18px; }
    .ad-info-grid { grid-template-columns: 1fr; }
    .ad-info-wide { grid-column: auto; }
  }

  @media (max-width: 520px) {
    .ad-secure-note strong { font-size: 9px; }
    .ad-secure-note > svg { width: 23px; }
    .ad-page-heading { flex-direction: column; }
    .ad-page-heading h1 { font-size: 31px; }
    .ad-hero-card { align-items: flex-start; flex-wrap: wrap; }
    .ad-assignment-chip { width: 100%; margin-left: 0; text-align: left; }
    .ad-footer { flex-direction: column; gap: 5px; text-align: center; }
  }
`