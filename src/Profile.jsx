import { useState, useEffect } from "react";

const STATIONS = [
  "Mirpur Central",
  "Motijheel HQ",
  "Uttara Station",
  "Dhanmondi Sub",
  "Gulshan Station",
  "Banani Station",
];

const statusColor = {
  Pending: "#F5A623",
  Ongoing: "#4A90E2",
  Accepted: "#3DD16F",
  Rejected: "#E63927",
};

export default function Profile({ onBackHome, onLogout, initialSection = "profile" }) {
  const [section, setSection] = useState(initialSection);
  
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [station, setStation] = useState(STATIONS[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("agni_citizen_profile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedComplaints = localStorage.getItem("agni_complaints");
    if (savedComplaints) setComplaints(JSON.parse(savedComplaints));
  }, []);

  const startEdit = () => {
    setEditForm(profile);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditForm(null);
  };

  const updateEditField = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const saveEdit = () => {
    setProfile(editForm);
    localStorage.setItem("agni_citizen_profile", JSON.stringify(editForm));
    setEditMode(false);
  };

  const submitComplaint = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please describe your complaint.");
      return;
    }
    const newComplaint = {
      id: Date.now(),
      station,
      message: message.trim(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };
    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem("agni_complaints", JSON.stringify(updated));
    setMessage("");
    setStation(STATIONS[0]);
    setError("");
    setSuccess("Complaint submitted successfully.");
    setTimeout(() => setSuccess(""), 3000);
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

      <div style={styles.shell}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarGlow} />
          <div style={styles.sidebarContent}>
            <SidebarBtn
              active={section === "profile"}
              onClick={() => setSection("profile")}
              label="Profile"
              icon="👤"
            />
            <SidebarBtn
              active={section === "complain"}
              onClick={() => setSection("complain")}
              label="Give Complain"
              icon="📝"
            />
            <SidebarBtn
              active={section === "history"}
              onClick={() => setSection("history")}
              label="Previous Complains"
              icon="📋"
            />
          </div>

          <div style={styles.logoutWrap}>
            <button style={styles.logoutBtn} onClick={onLogout}>
              <span style={{ marginRight: "10px" }}>🚪</span>
              Log Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main}>
          {section === "profile" && (
            <div style={styles.profileWrap}>
              <h1 style={styles.pageTitle}>Profile</h1>

              {/* BANNER */}
              <div style={styles.banner}>
                <div style={styles.bannerGlow} />
                <div style={styles.bannerLeft}>
                  <NoFaceAvatar size={64} />
                  <div>
                    <div style={styles.bannerName}>
                      {profile?.fullName || "Citizen Name Not Found"}
                    </div>
                    <div style={styles.bannerRow}>
                      <span>📞</span>
                      <span>{profile?.phone || "—"}</span>
                    </div>
                    <div style={styles.bannerRow}>
                      <span>🆔</span>
                      <span>{profile?.incidentId || "—"}</span>
                    </div>
                  </div>
                </div>

                {!editMode ? (
                  <button style={styles.editBtn} onClick={startEdit}>
                    Edit
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={styles.cancelBtn} onClick={cancelEdit}>
                      Cancel
                    </button>
                    <button style={styles.editBtn} onClick={saveEdit}>
                      Save
                    </button>
                  </div>
                )}
              </div>

              {/* PERSONAL INFORMATION */}
              <h2 style={styles.sectionHeading}>Personal Information</h2>

              {!profile ? (
                <p style={styles.noProfileNote}>
                  No registration data found on this device. Please complete
                  the Citizen Registration form first.
                </p>
              ) : (
                <div style={styles.infoFormGrid}>
                  <InfoField
                    label="Full Name"
                    name="fullName"
                    value={editMode ? editForm.fullName : profile.fullName}
                    editable={editMode}
                    onChange={updateEditField}
                  />
                  <InfoField
                    label="NID Number"
                    name="nid"
                    value={editMode ? editForm.nid : profile.nid}
                    editable={editMode}
                    onChange={updateEditField}
                  />
                  <InfoField
                    label="Phone Number"
                    name="phone"
                    value={editMode ? editForm.phone : profile.phone}
                    editable={editMode}
                    onChange={updateEditField}
                  />
                  <InfoField
                    label="Email"
                    name="email"
                    value={editMode ? editForm.email : profile.email}
                    editable={editMode}
                    onChange={updateEditField}
                  />
                  <InfoField
                    label="Incident ID"
                    name="incidentId"
                    value={profile.incidentId}
                    editable={false}
                    onChange={updateEditField}
                  />
                </div>
              )}
            </div>
          )}

          {section === "complain" && (
            <div style={{ ...styles.card, ...styles.wideCard }}>
              <h2 style={styles.sectionTitle}>Give Complain</h2>
              <p style={styles.subLabel}>
                Describe your issue and select the relevant station.
              </p>

              {error && <div style={styles.errorBox}>{error}</div>}
              {success && <div style={styles.successBox}>{success}</div>}

              <form onSubmit={submitComplaint} style={styles.form}>
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
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your complaint in detail..."
                    rows={12}
                  />
                </div>

                <button type="submit" style={styles.primaryBtn}>
                  Submit Complaint
                </button>
              </form>
            </div>
          )}

          {section === "history" && (
            <div style={{ ...styles.card, ...styles.wideCard }}>
              <h2 style={styles.sectionTitle}>Previous Complains</h2>
              {complaints.length === 0 ? (
                <p style={styles.subLabel}>
                  You haven't submitted any complaints yet.
                </p>
              ) : (
                <div style={styles.complaintList}>
                  {complaints.map((c) => (
                    <div key={c.id} style={styles.complaintItem}>
                      <div style={styles.complaintTop}>
                        <span style={styles.complaintStation}>
                          {c.station}
                        </span>
                        <span
                          style={{
                            ...styles.pill,
                            color: statusColor[c.status],
                            borderColor: statusColor[c.status],
                          }}
                        >
                          {c.status}
                        </span>
                      </div>
                      <p style={styles.complaintMsg}>{c.message}</p>
                      <span style={styles.complaintDate}>{c.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SidebarBtn({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.sidebarBtn,
        ...(active ? styles.sidebarBtnActive : {}),
      }}
    >
      <span style={{ marginRight: "10px" }}>{icon}</span>
      {label}
    </button>
  );
}

function InfoField({ label, name, value, editable, onChange }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {editable ? (
        <input
          style={styles.input}
          name={name}
          value={value || ""}
          onChange={onChange}
        />
      ) : (
        <div style={styles.readOnlyBox}>{value || "—"}</div>
      )}
    </div>
  );
}

function NoFaceAvatar({ size = 88 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ flexShrink: 0, border: "2px solid rgba(255,255,255,0.4)", borderRadius: "50%" }}
    >
      <circle cx="50" cy="50" r="50" fill="#2A2A2E" />
      <circle cx="50" cy="40" r="18" fill="#6A6A72" />
      <path d="M15 90c3-22 19-34 35-34s32 12 35 34" fill="#6A6A72" />
    </svg>
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
    gridTemplateColumns: "240px 1fr",
    minHeight: "calc(100vh - 73px)",
  },

  /* SIDEBAR */
  sidebar: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(165deg, rgba(230,57,39,0.95), rgba(122,20,12,0.98))",
    borderRight: "1px solid #3A1A16",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sidebarGlow: {
    position: "absolute",
    width: "220px",
    height: "220px",
    right: "-100px",
    top: "20%",
    background: "#F5A623",
    filter: "blur(90px)",
    opacity: 0.3,
  },
  sidebarContent: {
    position: "relative",
    zIndex: 1,
    padding: "32px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sidebarBtn: {
    textAlign: "left",
    background: "transparent",
    border: "1px solid transparent",
    color: "rgba(255,255,255,0.78)",
    padding: "14px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  sidebarBtnActive: {
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.32)",
    color: "#fff",
    fontWeight: 700,
  },
  logoutWrap: {
    position: "relative",
    zIndex: 1,
    padding: "16px",
    borderTop: "1px solid rgba(255,255,255,0.15)",
  },
  logoutBtn: {
    width: "100%",
    textAlign: "left",
    background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "14px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },

  main: {
    padding: "48px 40px",
  },

  /* PROFILE SECTION — banner style */
  profileWrap: { maxWidth: "780px" },
  pageTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "34px",
    fontWeight: 700,
    margin: "0 0 24px",
  },
  banner: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "24px 28px",
    borderRadius: "12px",
    background:
      "linear-gradient(120deg, rgba(230,57,39,0.95), rgba(122,20,12,0.98))",
    marginBottom: "36px",
  },
  bannerGlow: {
    position: "absolute",
    width: "220px",
    height: "220px",
    right: "-80px",
    top: "-60px",
    background: "#F5A623",
    filter: "blur(100px)",
    opacity: 0.35,
  },
  bannerLeft: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  bannerName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "6px",
  },
  bannerRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.85)",
    marginTop: "3px",
  },
  editBtn: {
    position: "relative",
    zIndex: 1,
    background: "#fff",
    color: "#17171A",
    border: "none",
    padding: "10px 22px",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  cancelBtn: {
    position: "relative",
    zIndex: 1,
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.5)",
    padding: "10px 18px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },

  sectionHeading: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    margin: "0 0 18px",
  },
  infoFormGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px 20px",
  },
  readOnlyBox: {
    background: "#1E1E22",
    border: "1px solid #2A2A2E",
    borderRadius: "6px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#F5F3EF",
  },
  noProfileNote: {
    fontSize: "13px",
    color: "#F5A623",
  },

  /* Shared card style for complain/history */
  card: {
    background: "#1E1E22",
    border: "1px solid #2A2A2E",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "620px",
  },
  wideCard: { maxWidth: "720px" },

  sectionTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
    textAlign: "left",
  },
  subLabel: {
    color: "#9A9AA2",
    fontSize: "13px",
    marginTop: "6px",
    marginBottom: "28px",
  },
  errorBox: {
    background: "rgba(230,57,39,0.1)",
    border: "1px solid rgba(230,57,39,0.4)",
    color: "#FF8577",
    padding: "12px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  successBox: {
    background: "rgba(61,209,111,0.1)",
    border: "1px solid rgba(61,209,111,0.4)",
    color: "#3DD16F",
    padding: "12px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
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
  complaintList: { display: "flex", flexDirection: "column", gap: "18px" },
  complaintItem: {
    background: "#0E0E10",
    border: "1px solid #2A2A2E",
    borderRadius: "10px",
    padding: "22px",
  },
  complaintTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  complaintStation: { fontSize: "16px", fontWeight: 700 },
  pill: {
    fontSize: "11px",
    fontWeight: 700,
    border: "1px solid",
    borderRadius: "20px",
    padding: "4px 12px",
  },
  complaintMsg: {
    color: "#D8D8DE",
    fontSize: "14px",
    marginTop: "12px",
    lineHeight: 1.6,
  },
  complaintDate: {
    display: "block",
    color: "#7A7A82",
    fontSize: "11px",
    marginTop: "14px",
  },
};