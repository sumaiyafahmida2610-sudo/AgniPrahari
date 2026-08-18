import { useState, useEffect, useRef } from "react";

const initialForm = {
  incidentId: "",
  fullName: "",
  nid: "",
  phone: "",
  email: "",
  password: "",
};

export default function CitizenRegister({ onBackHome }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const topRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  };

  const validate = () => {
    if (!form.incidentId.trim()) return "Incident ID is required.";
    if (!form.fullName.trim()) return "Full name is required.";
    if (!/^(\d{10}|\d{13}|\d{17})$/.test(form.nid.trim()))
      return "Enter a valid NID number (10, 13, or 17 digits).";
    if (!/^01[3-9]\d{8}$/.test(form.phone.trim()))
      return "Enter a valid phone number (e.g. 01XXXXXXXXX).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Enter a valid email address.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    // Replace with your Oracle DB API call later
    console.log("Citizen registered:", form);
    localStorage.setItem("agni_citizen_profile", JSON.stringify(form));
    setSubmitted(true);
  };

  // Scroll error into view whenever it appears
  useEffect(() => {
    if (error) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error]);

  // Auto-return to home a couple seconds after success
  useEffect(() => {
    if (!submitted) return;
    const id = setTimeout(() => onBackHome(), 2500);
    return () => clearTimeout(id);
  }, [submitted, onBackHome]);

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Registration Successful</h2>
          <p style={styles.successText}>
            Citizen record saved for Incident #{form.incidentId}.
            <br />
            Redirecting to home…
          </p>
          <button style={styles.primaryBtn} onClick={onBackHome}>
            Back to Home Now
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

      <div style={styles.shell}>
        {/* LEFT — feature panel */}
        <aside style={styles.leftPanel}>
          <div style={styles.leftGlow} />
          <div style={styles.leftContent}>
            <span style={styles.badge}>
              <span style={styles.badgeDot} /> CITIZEN INTAKE · LIVE
            </span>
            <h1 style={styles.leftTitle}>
              Every second<br />
              <em style={styles.leftTitleAccent}>counts</em> in a fire.
            </h1>
            <p style={styles.leftSub}>
              Registering citizen details against an active incident helps
              response teams coordinate faster and keep accurate records.
            </p>

            <div style={styles.featureList}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>⚡</span>
                <div>
                  <strong style={styles.featureTitle}>Fast intake</strong>
                  <p style={styles.featureText}>
                    Linked directly to the incident ID for quick lookup.
                  </p>
                </div>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🔒</span>
                <div>
                  <strong style={styles.featureTitle}>Secure records</strong>
                  <p style={styles.featureText}>
                    NID-verified entries kept confidential and accurate.
                  </p>
                </div>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📍</span>
                <div>
                  <strong style={styles.featureTitle}>Zone coordination</strong>
                  <p style={styles.featureText}>
                    Helps stations track affected citizens by area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT — form panel */}
        <div style={styles.formWrap}>
          <div style={styles.formCard} ref={topRef}>
            <h1 style={styles.title}>Citizen Registration</h1>
            <p style={styles.subtitle}>
              Register citizen details linked to a fire incident report.
            </p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <Field label="Incident ID" required>
                <input
                  style={styles.input}
                  name="incidentId"
                  value={form.incidentId}
                  onChange={update}
                  placeholder="e.g. INC-2026-0417"
                />
              </Field>

              <Field label="Full Name" required>
                <input
                  style={styles.input}
                  name="fullName"
                  value={form.fullName}
                  onChange={update}
                  placeholder="Enter full legal name"
                />
              </Field>

              <Field label="NID Number" required hint="10, 13, or 17 digits">
                <input
                  style={styles.input}
                  name="nid"
                  value={form.nid}
                  onChange={update}
                  placeholder="Enter NID number"
                />
              </Field>

              <Field label="Phone Number" required hint="e.g. 01XXXXXXXXX">
                <input
                  style={styles.input}
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="01XXXXXXXXX"
                />
              </Field>

              <Field label="Email" required>
                <input
                  type="email"
                  style={styles.input}
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="name@example.com"
                />
              </Field>

              <Field label="Password" required hint="Minimum 6 characters">
  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
    <input
      type={showPassword ? "text" : "password"}
      style={{ ...styles.input, width: "100%", paddingRight: "44px" }}
      name="password"
      value={form.password}
      onChange={update}
      placeholder="Enter password"
    />
    <button
      type="button"
      onClick={() => setShowPassword((s) => !s)}
      style={{
        position: "absolute",
        right: "10px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      {showPassword ? "🙈" : "👁"}
    </button>
  </div>
</Field>

              <button type="submit" style={styles.primaryBtn}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: "#E63927" }}>*</span>}
      </label>
      {children}
      {hint && <small style={styles.hint}>{hint}</small>}
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

  shell: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 0.85fr) minmax(420px, 1.15fr)",
    minHeight: "calc(100vh - 73px)",
  },

  /* LEFT PANEL */
  leftPanel: {
    position: "relative",
    overflow: "hidden",
    padding: "70px 48px",
    background:
      "linear-gradient(155deg, rgba(230,57,39,0.95), rgba(122,20,12,0.98))",
    borderRight: "1px solid #3A1A16",
  },
  leftGlow: {
    position: "absolute",
    width: "300px",
    height: "300px",
    right: "-120px",
    top: "10%",
    background: "#F5A623",
    filter: "blur(110px)",
    opacity: 0.3,
  },
  leftContent: { position: "relative", zIndex: 1 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.1)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1px",
  },
  badgeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#3DD16F",
    boxShadow: "0 0 0 4px rgba(61,209,111,0.2)",
  },
  leftTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "48px",
    fontWeight: 700,
    lineHeight: 1.05,
    margin: "26px 0 16px",
  },
  leftTitleAccent: {
    fontStyle: "normal",
    color: "#FFD8A8",
  },
  leftSub: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.82)",
    maxWidth: "380px",
  },
  featureList: {
    marginTop: "44px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },
  featureItem: {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
  },
  featureIcon: {
    fontSize: "20px",
    flexShrink: 0,
  },
  featureTitle: {
    display: "block",
    fontSize: "14px",
    marginBottom: "4px",
  },
  featureText: {
    fontSize: "12.5px",
    color: "rgba(255,255,255,0.68)",
    lineHeight: 1.5,
    margin: 0,
  },

  /* RIGHT PANEL */
  formWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "60px 32px",
  },
  formCard: {
    background: "#1E1E22",
    border: "1px solid #2A2A2E",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "480px",
    scrollMarginTop: "20px",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#D8D8DE",
  },
  hint: {
    fontSize: "11px",
    color: "#7A7A82",
  },
  input: {
    background: "#0E0E10",
    border: "1px solid #3A3A40",
    borderRadius: "6px",
    padding: "12px 14px",
    color: "#F5F3EF",
    fontSize: "14px",
    outline: "none",
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
    lineHeight: 1.5,
  },
};