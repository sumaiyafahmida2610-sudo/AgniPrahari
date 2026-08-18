import { Link } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

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

// ---- FORM OPTIONS ----
const INCIDENT_TYPES = ["Earthquake", "Fire", "Flood", "Cyclone", "Accident", "Rescue"];
const FIRE_SIZES = ["Small", "Medium", "Large"];
const BUILDING_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Educational",
  "Government",
  "Other",
];

// ---- LOGIN ROLE OPTIONS ----
const LOGIN_ROLES = [
  {
    key: "personnel",
    title: "Personnel Login",
    subtitle: "Firefighters & station staff",
    icon: "🚒",
    to: "/login/personnel",
  },
  {
    key: "trainee",
    title: "Trainee Login",
    subtitle: "Cadets & training program",
    icon: "🎓",
    to: "/login/trainee",
  },
  {
    key: "citizen",
    title: "Citizen Login",
    subtitle: "Track reports & alerts",
    icon: "🧑‍🤝‍🧑",
    to: "/login/citizen",
  },
];

const dhakaAreas = [
  "Adabor",
  "Agargaon",
  "Aftab Nagar",
  "Airport",
  "Azimpur",
  "Badda",
  "Bijoy Sarani",
  "Banasree",
  "Banani",
  "Bangshal",
  "Baridhara",
  "Basabo",
  "Bashundhara Residential Area",
  "Cantonment",
  "Chawkbazar",
  "Dakshinkhan",
  "Darus Salam",
  "Demra",
  "Dhanmondi",
  "Elephant Road",
  "Eskaton",
  "Farmgate",
  "Gabtoli",
  "Gendaria",
  "Goran",
  "Gulistan",
  "Gulshan-1",
  "Gulshan-2",
  "Hatirjheel",
  "Hatirpool",
  "Hazaribagh",
  "Islampur",
  "Jatrabari",
  "Jurain",
  "Kafrul",
  "Kalabagan",
  "Kakrail",
  "Kallyanpur",
  "Kamrangirchar",
  "Kawran Bazar",
  "Kazipara",
  "Keraniganj",
  "Khilgaon",
  "Khilkhet",
  "Kotwali",
  "Kuril",
  "Lalbagh",
  "Malibagh",
  "Mirpur-1",
  "Mirpur-2",
  "Mirpur-6",
  "Mirpur-10",
  "Mirpur-11",
  "Mirpur-12",
  "Mirpur-13",
  "Mirpur-14",
  "Mohakhali",
  "Mohammadpur",
  "Moghbazar",
  "Motijheel",
  "Nawabganj",
  "New Market",
  "Nikunja",
  "Nilkhet",
  "Pallabi",
  "Panthapath",
  "Paltan",
  "Ramna",
  "Rampura",
  "Rayerbazar",
  "Sabujbagh",
  "Shahbagh",
  "Shahjahanpur",
  "Shahjadpur",
  "Shantinagar",
  "Shegunbagicha",
  "Sher-e-Bangla Nagar",
  "Shyamoli",
  "Sutrapur",
  "Tejgaon",
  "Tejgaon Industrial Area",
  "Tikatuli",
  "Turag",
  "Uttara Sector 1",
  "Uttara Sector 2",
  "Uttara Sector 3",
  "Uttara Sector 4",
  "Uttara Sector 5",
  "Uttara Sector 6",
  "Uttara Sector 7",
  "Uttara Sector 9",
  "Uttara Sector 10",
  "Uttara Sector 11",
  "Uttara Sector 12",
  "Uttara Sector 13",
  "Uttara Sector 14",
  "Uttarkhan",
  "Vatara",
  "Wari",
];

const initialFormState = {
  name: "",
  phone: "",
  area: "",
  detailedLocation: "",
  incidentType: "",
  fireSize: "",
  trappedCount: "",
  buildingType: "",
};

export default function App() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [areaSearch, setAreaSearch] = useState("");
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);

  // ---- Login dropdown state ----
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerIndex((i) => (i + 1) % ticker.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Close the login dropdown when clicking outside of it
  useEffect(() => {
    if (!loginOpen) return;
    const handleOutsideClick = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [loginOpen]);

  const handleLoginSelect = (role) => {
    // TODO: route to the actual login page / auth flow for this role
    console.log("Login selected:", role.key);
    setLoginOpen(false);
  };

  const isFire = form.incidentType === "Fire";

  const updateField = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // reset fire-only fields if incident type changes away from Fire
      if (field === "incidentType" && value !== "Fire") {
        next.fireSize = "";
        next.buildingType = "";
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 11);
    setForm((prev) => ({ ...prev, phone: digitsOnly }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const closeModal = () => {
    setShowReportModal(false);
    setForm(initialFormState);
    setErrors({});
    setAreaSearch("");
    setAreaDropdownOpen(false);
  };

  const selectArea = (area) => {
    setForm((prev) => ({ ...prev, area }));
    setErrors((prev) => ({ ...prev, area: undefined }));
    setAreaSearch("");
    setAreaDropdownOpen(false);
  };

  const filteredAreas = dhakaAreas.filter((a) =>
    a.toLowerCase().includes(areaSearch.toLowerCase())
  );

  const BD_PHONE_REGEX = /^01[3-9]\d{8}$/; // e.g. 017XXXXXXXX — 11 digits total

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!BD_PHONE_REGEX.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid 11-digit number (e.g. 017XXXXXXXX)";
    }
    if (!form.area) newErrors.area = "Required";
    if (!form.detailedLocation.trim()) newErrors.detailedLocation = "Required";
    if (!form.incidentType) newErrors.incidentType = "Required";
    // trappedCount, fireSize, and buildingType are all optional
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // TODO: wire this up to your Oracle DB / API endpoint
    console.log("Incident report submitted:", form);
    closeModal();
  };

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
          <Link to="/staff_register" style={styles.navLink}>Staff Register</Link>
        </nav>

        <div style={styles.navRight}>
          {/* LOGIN DROPDOWN */}
          <div style={styles.loginWrap} ref={loginRef}>
            <button
              type="button"
              style={styles.loginBtn}
              onClick={() => setLoginOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={loginOpen}
            >
              Login
              <span style={styles.chevronSmall}>{loginOpen ? "▲" : "▼"}</span>
            </button>

            {loginOpen && (
              <div style={styles.loginDropdown}>
                <div style={styles.loginDropdownHeader}>Continue as</div>
                {LOGIN_ROLES.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    className="login-option"
                    style={styles.loginOption}
                    onClick={() => handleLoginSelect(role)}
                  >
                    <span style={styles.loginOptionIcon}>{role.icon}</span>
                    <span style={styles.loginOptionTextWrap}>
                      <span style={styles.loginOptionTitle}>{role.title}</span>
                      <span style={styles.loginOptionSubtitle}>{role.subtitle}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="tel:999" style={styles.callBtn}>☎ Emergency: 999</a>
        </div>
      </header>

      {/* DISPATCH TICKER */}
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
          <button style={styles.primaryBtn} onClick={() => setShowReportModal(true)}>
            Report Incident
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

      {/* REPORT INCIDENT MODAL */}
      {showReportModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Report Incident</h2>
                <p style={styles.modalSubtitle}>
                  Fill in the details below. Emergency units will be dispatched immediately.
                </p>
              </div>
              <button style={styles.closeIcon} onClick={closeModal} aria-label="Close">
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Name + Phone */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Full Name <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
                    value={form.name}
                    onChange={updateField("name")}
                  />
                  {errors.name && <span style={styles.errorText}>{errors.name}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Phone No. <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="e.g. 01XXXXXXXXX"
                    style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
                    value={form.phone}
                    onChange={handlePhoneChange}
                  />
                  {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>

              {/* Location: Area (searchable dropdown) + Detailed Location */}
              <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, position: "relative" }}>
                  <label style={styles.label}>
                    Area <span style={styles.required}>*</span>
                  </label>
                  <button
                    type="button"
                    style={{
                      ...styles.input,
                      ...styles.areaSelectBtn,
                      ...(errors.area ? styles.inputError : {}),
                    }}
                    onClick={() => setAreaDropdownOpen((prev) => !prev)}
                  >
                    <span style={form.area ? {} : styles.placeholderText}>
                      {form.area || "Select area"}
                    </span>
                    <span style={styles.chevron}>{areaDropdownOpen ? "▲" : "▼"}</span>
                  </button>

                  {areaDropdownOpen && (
                    <div style={styles.areaDropdown}>
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search area..."
                        style={styles.areaSearchInput}
                        value={areaSearch}
                        onChange={(e) => setAreaSearch(e.target.value)}
                      />
                      <div style={styles.areaList}>
                        {filteredAreas.length === 0 && (
                          <div style={styles.areaEmpty}>No matching area</div>
                        )}
                        {filteredAreas.map((a) => (
                          <div
                            key={a}
                            className="area-option"
                            style={{
                              ...styles.areaOption,
                              ...(form.area === a ? styles.areaOptionActive : {}),
                            }}
                            onClick={() => selectArea(a)}
                          >
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.area && <span style={styles.errorText}>{errors.area}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Detailed Location <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Road, house no., landmark..."
                    style={{
                      ...styles.input,
                      ...(errors.detailedLocation ? styles.inputError : {}),
                    }}
                    value={form.detailedLocation}
                    onChange={updateField("detailedLocation")}
                  />
                  {errors.detailedLocation && (
                    <span style={styles.errorText}>{errors.detailedLocation}</span>
                  )}
                </div>
              </div>

              {/* Incident Type + Fire Size (conditional) */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Incident Type <span style={styles.required}>*</span>
                  </label>
                  <select
                    style={{ ...styles.input, ...(errors.incidentType ? styles.inputError : {}) }}
                    value={form.incidentType}
                    onChange={updateField("incidentType")}
                  >
                    <option value="" disabled>
                      Select incident type
                    </option>
                    {INCIDENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.incidentType && (
                    <span style={styles.errorText}>{errors.incidentType}</span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Fire Size <span style={styles.optional}>(optional)</span>
                  </label>
                  <select
                    style={{
                      ...styles.input,
                      ...(errors.fireSize ? styles.inputError : {}),
                      ...(!isFire ? styles.inputDisabled : {}),
                    }}
                    value={form.fireSize}
                    onChange={updateField("fireSize")}
                    disabled={!isFire}
                  >
                    <option value="" disabled>
                      {isFire ? "Select fire size" : "Only for Fire incidents"}
                    </option>
                    {FIRE_SIZES.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                  {errors.fireSize && <span style={styles.errorText}>{errors.fireSize}</span>}
                </div>
              </div>

              {/* Trapped Persons + Building Type */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Trapped Person Count <span style={styles.optional}>(optional)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    style={{ ...styles.input, ...(errors.trappedCount ? styles.inputError : {}) }}
                    value={form.trappedCount}
                    onChange={updateField("trappedCount")}
                  />
                  {errors.trappedCount && (
                    <span style={styles.errorText}>{errors.trappedCount}</span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Building Type <span style={styles.optional}>(optional)</span>
                  </label>
                  <select
                    style={styles.input}
                    value={form.buildingType}
                    onChange={updateField("buildingType")}
                  >
                    <option value="">Select building type</option>
                    {BUILDING_TYPES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button style={styles.submitBtn} onClick={handleSubmit}>
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <p>AGNIPRAHARI — Centralized Fire Station Management System</p>
        <p style={styles.footerSmall}>© 2026 AGNIPRAHARI. All rights reserved.</p>
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
  @keyframes modalIn { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
  select option { background: #1E1E22; color: #F5F3EF; }
  input::placeholder { color: #6E6E76; }
  .area-option:hover { background: rgba(255,255,255,0.08) !important; }
  .login-option:hover { background: rgba(255,255,255,0.07) !important; }
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
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
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

  // ---- Login button + dropdown ----
  loginWrap: {
    position: "relative",
  },
  loginBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    color: "#F5F3EF",
    border: "1px solid #3A3A40",
    padding: "10px 16px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  chevronSmall: {
    fontSize: "9px",
    color: "#9A9AA2",
  },
  loginDropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    width: "260px",
    background: "rgba(28, 28, 32, 0.98)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
    padding: "8px",
    zIndex: 30,
    animation: "dropIn 0.15s ease",
  },
  loginDropdownHeader: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#6E6E76",
    padding: "6px 10px 8px",
  },
  loginOption: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "'Inter', sans-serif",
  },
  loginOptionIcon: {
    fontSize: "18px",
    lineHeight: 1,
  },
  loginOptionTextWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  loginOptionTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#F5F3EF",
  },
  loginOptionSubtitle: {
    fontSize: "11px",
    color: "#9A9AA2",
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
    marginTop: "60px",
    padding: "30px 20px",
    borderTop: "1px solid #333",
    textAlign: "center",
  },
  footerSmall: { marginTop: "6px", fontSize: "14px", color: "#A0A0A0" },

  // ---- MODAL (transparent, theme-matched) ----
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(10, 10, 12, 0.65)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    background: "rgba(30, 30, 34, 0.75)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "32px",
    borderRadius: "16px",
    width: "560px",
    maxWidth: "100%",
    maxHeight: "88vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    animation: "modalIn 0.25s ease",
    color: "#F5F3EF",
    fontFamily: "'Inter', sans-serif",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  modalTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "26px",
    fontWeight: 700,
    color: "#F5F3EF",
  },
  modalSubtitle: {
    fontSize: "13px",
    color: "#9A9AA2",
    marginTop: "6px",
    maxWidth: "420px",
  },
  closeIcon: {
    background: "transparent",
    border: "1px solid #3A3A40",
    color: "#B8B8BE",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    flexShrink: 0,
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "28px",
  },
  cancelBtn: {
    background: "transparent",
    color: "#F5F3EF",
    border: "1px solid #3A3A40",
    padding: "12px 22px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
  submitBtn: {
    background: "#E63927",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  formRow: {
    display: "flex",
    gap: "16px",
  },
  label: {
    fontWeight: 500,
    marginBottom: "8px",
    fontSize: "13px",
    color: "#D8D8DE",
  },
  required: { color: "#E63927" },
  optional: { color: "#6E6E76", fontWeight: 400 },
  input: {
    padding: "11px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "#F5F3EF",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
  },
  inputDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  inputError: {
    border: "1px solid #E63927",
  },
  errorText: {
    color: "#E63927",
    fontSize: "12px",
    marginTop: "4px",
  },

  // ---- Searchable area dropdown ----
  areaSelectBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
  },
  placeholderText: {
    color: "#6E6E76",
  },
  chevron: {
    fontSize: "10px",
    color: "#9A9AA2",
    marginLeft: "8px",
  },
  areaDropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: 0,
    background: "rgba(28, 28, 32, 0.98)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
    zIndex: 20,
    padding: "8px",
  },
  areaSearchInput: {
    width: "100%",
    padding: "9px 10px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#F5F3EF",
    fontSize: "13px",
    outline: "none",
    marginBottom: "6px",
    fontFamily: "'Inter', sans-serif",
  },
  areaList: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  areaOption: {
    padding: "9px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#D8D8DE",
    cursor: "pointer",
  },
  areaOptionActive: {
    background: "rgba(230, 57, 39, 0.18)",
    color: "#F5F3EF",
  },
  areaEmpty: {
    padding: "9px 10px",
    fontSize: "13px",
    color: "#6E6E76",
  },
};