import { useState } from "react";

const STATIONS = [
  "Mirpur Central",
  "Motijheel HQ",
  "Uttara Station",
  "Dhanmondi Sub",
  "Gulshan Station",
  "Banani Station",
];

export default function GeneralComplaint({ title, idLabel, complaintType, onBackHome }) {
  const [refId, setRefId] = useState("");
  const [station, setStation] = useState(STATIONS[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!refId.trim()) {
      setError(`${idLabel} is required.`);
      return;
    }
    if (!message.trim()) {
      setError("Please describe your complaint.");
      return;
    }

    const savedComplaints = localStorage.getItem("agni_complaints");
    const complaints = savedComplaints ? JSON.parse(savedComplaints) : [];

    const newComplaint = {
      id: Date.now(),
      type: complaintType,
      refId: refId.trim(),
      station,
      message: message.trim(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    localStorage.setItem(
      "agni_complaints",
      JSON.stringify([newComplaint, ...complaints])
    );

    setError("");
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Complaint Submitted</h2>
          <p style={styles.successText}>
            Your complaint has been recorded and will be reviewed shortly.
          </p>
          <button style={styles.primaryBtn} onClick={onBackHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.nav}>
        <div style={styles.logo}>
          AGNI<span style={{ color: "#E63927" }}>PRAHARI</span>
        </div>
        <button style={styles.backLink} onClick={onBackHome}>
          ← Back to Home
        </button>
      </header>

      <div style={styles.wrap}>
        <div style={styles.card}>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.subtitle}>
            Describe your issue and select the relevant station.
          </p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>
                {idLabel} <span style={{ color: "#E63927" }}>*</span>
              </label>
              <input
                style={styles.input}
                value={refId}
                onChange={(e) => {
                  setRefId(e.target.value);
                  setError("");
                }}
                placeholder={`Enter your ${idLabel}`}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Station Name</label>
              <select
                style={styles.input}
                value={station}
                onChange={(e) => setStation(e.target.value)}
              >
                {STATIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Complaint Details</label>
              <textarea
                style={{ ...styles.input, ...styles.textarea }}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError("");
                }}
                placeholder="Describe your complaint in detail..."
                rows={12}
              />
            </div>

            <button type="submit" style={styles.primaryBtn}>
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

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
  backLink: {
    background: "transparent",
    border: "1px solid #3A3A40",
    color: "#F5F3EF",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  wrap: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 32px",
  },
  card: {
    background: "#1E1E22",
    border: "1px solid #2A2A2E",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "720px",
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "30px",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "#9A9AA2",
    fontSize: "14px",
    marginTop: "8px",
    marginBottom: "28px",
  },
  errorBox: {
    background: "rgba(230,57,39,0.1)",
    border: "1px solid rgba(230,57,39,0.4)",
    color: "#FF8577",
    padding: "12px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "20px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: 600, color: "#D8D8DE" },
  input: {
    background: "#0E0E10",
    border: "1px solid #3A3A40",
    borderRadius: "6px",
    padding: "12px 14px",
    color: "#F5F3EF",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    resize: "vertical",
    fontFamily: "inherit",
    minHeight: "260px",
    lineHeight: 1.6,
  },
  primaryBtn: {
    background: "#E63927",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "8px",
  },
  successCard: {
    maxWidth: "420px",
    margin: "100px auto",
    textAlign: "center",
    background: "#1E1E22",
    border: "1px solid #2A2A2E",
    borderRadius: "12px",
    padding: "48px 32px",
  },
  successIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "rgba(61,209,111,0.15)",
    color: "#3DD16F",
    fontSize: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  successTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "26px",
    margin: 0,
  },
  successText: {
    color: "#9A9AA2",
    fontSize: "14px",
    marginTop: "10px",
    marginBottom: "24px",
    lineHeight: 1.6,
  },
};