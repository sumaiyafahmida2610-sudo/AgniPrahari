import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EmergencyInfo({ onBackHome }) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/stations")
      .then((res) => res.json())
      .then((data) => {
        setStations(data.stations || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load stations:", err);
        setError("Could not load station information.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          AGNI<span style={{ color: "#E63927" }}>PRAHARI</span>
        </div>
        <button style={styles.backBtn} onClick={onBackHome}>
          ← Back to Home
        </button>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Emergency Contact Information</h1>
        <p style={styles.subtitle}>
          Reach out directly to any fire station below in case of emergency.
        </p>

        {loading && <p style={styles.status}>Loading stations...</p>}
        {error && <p style={styles.status}>{error}</p>}

        <div style={styles.grid}>
          {stations.map((s) => (
            <div key={s.STATION_ID} style={styles.card}>
              <h3 style={styles.cardTitle}>{s.STATION_NAME}</h3>
              <p style={styles.cardAddress}>{s.ADDRESS}</p>
              <a href={`tel:${s.CONTACT_NUMBER}`} style={styles.cardContact}>
                📞 {s.CONTACT_NUMBER}
              </a>

              <a href={`mailto:${s.CONTACT_EMAIL}`} style={styles.cardEmail}>
  ✉️ {s.CONTACT_EMAIL}
</a>
              <span
                style={{
                  ...styles.badge,
                  color: s.STATION_STATUS === "ACTIVE" ? "#3DD16F" : "#E63927",
                  borderColor: s.STATION_STATUS === "ACTIVE" ? "#3DD16F" : "#E63927",
                }}
              >
                {s.STATION_STATUS}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Inter', sans-serif", background: "#17171A", color: "#F5F3EF", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #2A2A2E" },
  logo: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "26px", fontWeight: 700, letterSpacing: "1px" },
  backBtn: { background: "transparent", color: "#F5F3EF", border: "1px solid #3A3A40", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "14px" },
  main: { padding: "50px 40px" },
  title: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "38px", marginBottom: "10px" },
  subtitle: { color: "#9A9AA2", marginBottom: "30px" },
  status: { color: "#9A9AA2" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" },
  card: { background: "#1E1E22", border: "1px solid #2A2A2E", borderRadius: "10px", padding: "20px" },
  cardTitle: { fontSize: "17px", fontWeight: 600, marginBottom: "8px" },
  cardAddress: { color: "#9A9AA2", fontSize: "13px", marginBottom: "12px" },
  cardContact: { display: "block", color: "#F5A623", fontSize: "15px", fontWeight: 600, textDecoration: "none", marginBottom: "12px" },
  cardEmail: {
  display: "block",
  color: "#9A9AA2",
  fontSize: "13px",
  textDecoration: "none",
  marginBottom: "12px",
},
  badge: { fontSize: "11px", fontWeight: 700, border: "1px solid", borderRadius: "20px", padding: "3px 10px" },
};