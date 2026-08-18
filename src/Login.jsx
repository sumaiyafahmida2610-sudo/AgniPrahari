import { useState } from "react";

export default function Login({ onBackHome, onLoginSuccess, role }) {
    
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


    const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginId.trim() || !password.trim()) {
      setError("Please enter both ID and Password.");
      return;
    }

    if (role === "citizen") {
      const savedCitizen = localStorage.getItem("agni_citizen_profile");
      if (savedCitizen) {
        const citizen = JSON.parse(savedCitizen);
        if (
          loginId.trim() === citizen.incidentId &&
          password === citizen.password
        ) {
          setError("");
          onLoginSuccess("citizen");
          return;
        }
      }
    }

    if (role === "trainee") {
      const savedTrainee = localStorage.getItem("agni_trainee_profile");
      if (savedTrainee) {
        const trainee = JSON.parse(savedTrainee);
        if (
          loginId.trim() === trainee.trainingId &&
          password === trainee.password
        ) {
          setError("");
          onLoginSuccess("trainee");
          return;
        }
      }
    }

    setError("Invalid ID or Password.");
  };

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
          <h1 style={styles.title}>Login</h1>
          <p style={styles.subtitle}>
  {role === "citizen"
    ? "Log in with your Incident ID."
    : "Log in with your Training ID."}
</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Incident ID / Training ID</label>
              <input
                style={styles.input}
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="e.g. INC-2026-0417 or TR-482913"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  style={{ ...styles.input, ...styles.passwordInput }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button type="submit" style={styles.primaryBtn}>
              Log In
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
    padding: "90px 20px",
  },
  card: {
    background: "#1E1E22",
    border: "1px solid #2A2A2E",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "32px",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "#9A9AA2",
    fontSize: "14px",
    marginTop: "8px",
    marginBottom: "28px",
    lineHeight: 1.5,
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
    width: "100%",
  },
  passwordWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    paddingRight: "44px",
  },
  eyeBtn: {
    position: "absolute",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px",
    lineHeight: 1,
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
};