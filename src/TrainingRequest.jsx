import { useState, useEffect } from "react";

const initialForm = {
  trainingId: "",
  email: "",
  contact: "",
  degree: "",
  name: "",
  experience: "",
  password: "",
  orgName: "",
  duration: "",
  numPeople: "",
};

const generateTrainingId = () => "TR-" + Date.now().toString().slice(-6);

export default function TrainingRequest({ onBackHome }) {
  const [trainingType, setTrainingType] = useState("New Trainee");
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Generate a fresh Training ID when the page loads
  useEffect(() => {
    setForm((f) => ({ ...f, trainingId: generateTrainingId() }));
  }, []);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  };

  const validate = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Enter a valid email address.";
    if (!/^01[3-9]\d{8}$/.test(form.contact.trim()))
      return "Enter a valid contact number (e.g. 01XXXXXXXXX).";

    if (trainingType === "New Trainee") {
      if (!form.name.trim()) return "Name is required.";
      if (!form.degree.trim()) return "Degree is required.";
      if (!form.experience.trim()) return "Experience is required.";
      if (form.password.length < 6) return "Password must be at least 6 characters.";
    } else {
      if (!form.orgName.trim()) return "Organization name is required.";
      if (!form.duration.trim()) return "Duration is required.";
      if (!form.numPeople.trim())
        return "Number of people to train is required.";
    }
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
  console.log("Training request submitted:", { trainingType, ...form });
  if (trainingType === "New Trainee") {
    localStorage.setItem("agni_trainee_profile", JSON.stringify(form));
  }
  setSubmitted(true);
};

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
          <h2 style={styles.successTitle}>Request Submitted</h2>
          <p style={styles.successText}>
            Your training request has been recorded.
            <br />
            Training ID: <b>{form.trainingId}</b>
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
        {/* LEFT — info panel */}
        <aside style={styles.leftPanel}>
          <div style={styles.leftGlow} />
          <div style={styles.leftContent}>
            <span style={styles.badge}>
              <span style={styles.badgeDot} /> TRAINING PROGRAM
            </span>
            <h1 style={styles.leftTitle}>
              Build skills<br />
              <em style={styles.leftTitleAccent}>that save lives.</em>
            </h1>
            <p style={styles.leftSub}>
              Register as a new trainee or request fire safety training for
              your organization — our teams coordinate the schedule directly
              with you.
            </p>

            <div style={styles.featureList}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🎓</span>
                <div>
                  <strong style={styles.featureTitle}>New Trainee</strong>
                  <p style={styles.featureText}>
                    Join our firefighter training pipeline as an individual.
                  </p>
                </div>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🏢</span>
                <div>
                  <strong style={styles.featureTitle}>
                    Fire Safety Training
                  </strong>
                  <p style={styles.featureText}>
                    Request on-site safety training for your organization.
                  </p>
                </div>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🆔</span>
                <div>
                  <strong style={styles.featureTitle}>Tracked requests</strong>
                  <p style={styles.featureText}>
                    Every submission gets a unique Training ID for follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT — form panel */}
        <div style={styles.formWrap}>
          <div style={styles.formCard}>
            <h1 style={styles.title}>Training Request</h1>
            <p style={styles.subtitle}>
              Fill out the form below based on the type of training you need.
            </p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <Field label="Training Type" required>
                <select
                  style={styles.input}
                  value={trainingType}
                  onChange={(e) => setTrainingType(e.target.value)}
                >
                  <option>New Trainee</option>
                  <option>Fire Safety Training</option>
                </select>
              </Field>

              <Field label="Training ID" hint="Auto-generated">
                <input
                  style={{ ...styles.input, ...styles.readOnlyInput }}
                  value={form.trainingId}
                  readOnly
                />
              </Field>

              {trainingType === "New Trainee" ? (
                <>
                  <Field label="Full Name" required>
                    <input
                      style={styles.input}
                      name="name"
                      value={form.name}
                      onChange={update}
                      placeholder="Enter full name"
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
                  <Field label="Contact No." required hint="e.g. 01XXXXXXXXX">
                    <input
                      style={styles.input}
                      name="contact"
                      value={form.contact}
                      onChange={update}
                      placeholder="01XXXXXXXXX"
                    />
                  </Field>
                  <Field label="Degree" required>
                    <input
                      style={styles.input}
                      name="degree"
                      value={form.degree}
                      onChange={update}
                      placeholder="e.g. BSc in CSE"
                    />
                  </Field>
                  <Field label="Experience" required>
                    <input
                      style={styles.input}
                      name="experience"
                      value={form.experience}
                      onChange={update}
                      placeholder="e.g. 2 years"
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
                </>
              ) : (
                <>
                  <Field label="Organization Name" required>
                    <input
                      style={styles.input}
                      name="orgName"
                      value={form.orgName}
                      onChange={update}
                      placeholder="Enter organization name"
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
                  <Field label="Contact No." required hint="e.g. 01XXXXXXXXX">
                    <input
                      style={styles.input}
                      name="contact"
                      value={form.contact}
                      onChange={update}
                      placeholder="01XXXXXXXXX"
                    />
                  </Field>
                  <Field label="Duration" required>
                    <input
                      style={styles.input}
                      name="duration"
                      value={form.duration}
                      onChange={update}
                      placeholder="e.g. 3 days"
                    />
                  </Field>
                  <Field label="Number of People to Train" required>
                    <input
                      type="number"
                      style={styles.input}
                      name="numPeople"
                      value={form.numPeople}
                      onChange={update}
                      placeholder="e.g. 20"
                    />
                  </Field>
                </>
              )}

              <button type="submit" style={styles.primaryBtn}>
                Submit Request
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
    fontSize: "44px",
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
  readOnlyInput: {
    color: "#9A9AA2",
    background: "#141416",
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