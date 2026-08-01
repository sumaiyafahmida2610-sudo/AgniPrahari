import { useState, useEffect } from "react";

// ---- FAKE DATA (swap with your Oracle DB API calls later) ----
const stations = [
  { name: "Mirpur Central", zone: "Zone 3", status: "Available", trucks: 4 },
  { name: "Motijheel HQ", zone: "Zone 1", status: "Responding", trucks: 1 },
  { name: "Uttara Station", zone: "Zone 5", status: "Available", trucks: 3 },
  { name: "Dhanmondi Sub", zone: "Zone 2", status: "Full Capacity", trucks: 0 },
];

const ticker = [
  "UNIT 4 DISPATCHED — Mirpur-10, structure fire",
  "UNIT 2 RETURNED — Gulshan, false alarm cleared",
  "UNIT 7 EN ROUTE — Dhanmondi 27, gas leak reported",
  "UNIT 1 ON SCENE — Motijheel, response time 10 min",
];

const stats = [
  { label: "Avg. Response Time", value: "7.2 min" },
  { label: "Incidents This Month", value: "184" },
  { label: "Active Stations", value: "12" },
  { label: "Units Available Now", value: "31" },
];

const statusColor = {
  Available: "#3DD16F",
  Responding: "#F5A623",
  "Full Capacity": "#E63927",
};

export default function App() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerIndex((i) => (i + 1) % ticker.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={styles.page}>
      <style>{globalCss}</style>

      {/* NAV */}
      <header style={styles.nav}>
        <div style={styles.logo}>
          AGNI<span style={{ color: "#E63927" }}>PRAHARI</span>
        </div>
        <nav style={styles.navLinks}>
          <a href="#stations" style={styles.navLink}>Stations</a>
          <a href="#stats" style={styles.navLink}>Live Stats</a>
          <a href="#safety" style={styles.navLink}>Safety</a>
          <a href="#" style={styles.navLink}>Staff Login</a>
        </nav>
        <a href="tel:999" style={styles.callBtn}>☎ Emergency: 999</a>
      </header>

      {/* DISPATCH TICKER — signature element */}
      <div style={styles.tickerBar}>
        <span style={styles.tickerDot} />
        <span style={styles.tickerLabel}>LIVE DISPATCH</span>
        <span key={tickerIndex} style={styles.tickerText}>
          {ticker[tickerIndex]}
        </span>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Fire doesn't wait.<br />Neither do we.
        </h1>
        <p style={styles.heroSub}>
          Centralized monitoring across Dhaka's fire stations — real-time
          incident tracking, resource dispatch, and rapid response coordination.
        </p>
        <div style={styles.heroActions}>
          {/*}
          <button style={styles.primaryBtn}>Report Incident</button>
          */}
          <button
  style={styles.primaryBtn}
  onClick={() => setShowReportModal(true)}>
  report incident

</button>
          <button style={styles.secondaryBtn}>Find Nearest Station</button>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" style={styles.statsSection}>
        {stats.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* STATIONS */}
      <section id="stations" style={styles.section}>
        <h2 style={styles.sectionTitle}>Station Status</h2>
        <div style={styles.stationGrid}>
          {stations.map((st) => (
            <div key={st.name} style={styles.stationCard}>
              <div style={styles.stationTop}>
                <h3 style={styles.stationName}>{st.name}</h3>
                <span
                  style={{
                    ...styles.pill,
                    color: statusColor[st.status],
                    borderColor: statusColor[st.status],
                  }}
                >
                  {st.status}
                </span>
              </div>
              <p style={styles.stationZone}>{st.zone}</p>
              <p style={styles.stationTrucks}>{st.trucks} unit(s) available</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" style={styles.safetySection}>
        <h2 style={styles.sectionTitle}>Before Help Arrives</h2>
        <div style={styles.safetyGrid}>
          <div style={styles.safetyCard}>
            <h4 style={styles.safetyHead}>Evacuate first</h4>
            <p style={styles.safetyText}>Leave immediately. Don't stop for belongings.</p>
          </div>
          <div style={styles.safetyCard}>
            <h4 style={styles.safetyHead}>Stay low</h4>
            <p style={styles.safetyText}>Smoke rises — crawl beneath it if needed.</p>
          </div>
          <div style={styles.safetyCard}>
            <h4 style={styles.safetyHead}>Never use elevators</h4>
            <p style={styles.safetyText}>Always take the stairs during a fire.</p>
          </div>
      </div>
      </section>

       
     {/*} 
      <footer style={styles.footer}>
        <p>AGNIPRAHARI — Centralized Fire Station Management System</p>
        <p style={styles.footerSmall}>Built for MIST · CSE Database Project</p>
      </footer>
      */}
{showReportModal && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h2>Report Fire Incident</h2>

      <div style={styles.formGroup}>
  <label>Incident Type</label>

  <select style={styles.input}>
    <option>Residential Fire</option>
    <option>Commercial Fire</option>
    <option>Industrial Fire</option>
    <option>Electrical Fire</option>
    <option>Vehicle Fire</option>
    <option>Forest Fire</option>
    <option>Gas Leak</option>
    <option>Chemical Fire</option>
    <option>Other</option>
  </select>
</div>

      <button onClick={() => setShowReportModal(false)}>
        Close
      </button>
    </div>
  </div>
)}

      <footer style={styles.footer}>
  <p>AGNIPRAHARI — Centralized Fire Station Management System</p>
  <p style={styles.footerSmall}>
    © 2026 AGNIPRAHARI. All rights reserved.
  </p>
</footer>
   </div>
  );
}

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #17171A; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
`;

const styles = {
  page: {
    fontFamily: "'Inter', sans-serif",
    background: "#17171A",
    color: "#F5F3EF",
    minHeight: "100vh",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #2A2A2E",
  },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "1px",
  },
  navLinks: { display: "flex", gap: "28px" },
  navLink: {
    color: "#B8B8BE",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
  },
  callBtn: {
    background: "#E63927",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
  },
  tickerBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#0E0E10",
    borderBottom: "1px solid #2A2A2E",
    padding: "10px 40px",
    overflow: "hidden",
  },
  tickerDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#E63927",
    animation: "blink 1.4s infinite",
  },
  tickerLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    color: "#F5A623",
    fontSize: "13px",
    letterSpacing: "1.5px",
    fontWeight: 700,
  },
  tickerText: {
    color: "#D8D8DE",
    fontSize: "13px",
    fontFamily: "monospace",
    animation: "fadeIn 0.4s ease",
  },
  hero: {
    padding: "90px 40px 60px",
    maxWidth: "780px",
  },
  heroTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "64px",
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "0.5px",
    color: "#F5F3EF",
  },
  heroSub: {
    marginTop: "20px",
    fontSize: "17px",
    color: "#B8B8BE",
    lineHeight: 1.6,
    maxWidth: "560px",
  },
  heroActions: { display: "flex", gap: "14px", marginTop: "32px" },
  primaryBtn: {
    background: "#E63927",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "transparent",
    color: "#F5F3EF",
    border: "1px solid #3A3A40",
    padding: "14px 26px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    background: "#2A2A2E",
    margin: "0 40px",
    border: "1px solid #2A2A2E",
  },
  statCard: {
    background: "#1B1B1F",
    padding: "28px 24px",
  },
  statValue: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "36px",
    fontWeight: 700,
    color: "#F5A623",
  },
  statLabel: {
    fontSize: "13px",
    color: "#9A9AA2",
    marginTop: "6px",
  },
  section: { padding: "70px 40px 20px" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "28px",
  },
  stationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  stationCard: {
    background: "#1E1E22",
    border: "1px solid #2A2A2E",
    borderRadius: "10px",
    padding: "20px",
  },
  stationTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  stationName: { fontSize: "16px", fontWeight: 600 },
  pill: {
    fontSize: "11px",
    fontWeight: 700,
    border: "1px solid",
    borderRadius: "20px",
    padding: "3px 10px",
    whiteSpace: "nowrap",
  },
  stationZone: { color: "#9A9AA2", fontSize: "13px", marginTop: "8px" },
  stationTrucks: { color: "#D8D8DE", fontSize: "13px", marginTop: "4px" },
  safetySection: { padding: "50px 40px 90px" },
  safetyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  safetyCard: {
    borderLeft: "3px solid #F5A623",
    paddingLeft: "16px",
  },
  safetyHead: { fontSize: "15px", fontWeight: 600, marginBottom: "6px" },
  safetyText: { fontSize: "13px", color: "#9A9AA2", lineHeight: 1.5 },
  footer: {
   // borderTop: "1px solid #2A2A2E",
    //padding: "24px 40px",
    //fontSize: "13px",
    //color: "#7A7A82",

marginTop: "60px",
  padding: "30px 20px",
  borderTop: "1px solid #333",
  textAlign: "center",


  },
  footerSmall: { marginTop: "6px", fontSize: "14px",
    // color: "#5A5A62"
    colllor:"#A0A0A0", },

modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},

modal: {
  background: "#fff",
  padding: "35px",
  borderRadius: "16px",
  width: "380px",
  minHeight: "520px",

},
formGroup: {
  display: "flex",
  flexDirection: "column",
  marginBottom: "18px",
},

input: {
  marginTop: "8px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
},
};