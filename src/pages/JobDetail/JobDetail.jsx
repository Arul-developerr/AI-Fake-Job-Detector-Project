import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineShieldExclamation,
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlineGlobe,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineFlag,
  HiOutlineShare,
  HiOutlineChevronRight,
  HiOutlineBriefcase,
} from "react-icons/hi";
import scannedJobs from "../../data/scannedJobs";
import "./JobDetail.css";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = scannedJobs.find((j) => j._id === id);

  if (!job) {
    return (
      <div className="job-detail-page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p className="empty-state-text">Job not found.</p>
            <Link to="/scan-results" className="btn-primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
              Back to Scan Results
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isScam = job.aiAnalysis.verdict === "SCAM";
  const verdictClass = isScam ? "scam" : "legitimate";
  const score = job.aiAnalysis.authenticityScore;
  const circumference = 2 * Math.PI * 64;
  const dashOffset = circumference - (score / 100) * circumference;

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getRiskLevel = () => {
    if (score < 30) return "high";
    if (score < 70) return "medium";
    return "low";
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="job-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <motion.div
          className="breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/">Dashboard</Link>
          <HiOutlineChevronRight className="breadcrumb-separator" />
          <Link to="/scan-results">Scan Results</Link>
          <HiOutlineChevronRight className="breadcrumb-separator" />
          <span className="breadcrumb-current">{job.jobDetails.title}</span>
        </motion.div>

        <div className="detail-layout">
          {/* Main Content */}
          <div className="detail-main">
            {/* Header Card */}
            <motion.div
              className={`detail-header-card ${verdictClass}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="detail-header-top">
                <div>
                  <h1 className="detail-title">{job.jobDetails.title}</h1>
                  <p className="detail-company">{job.jobDetails.company}</p>
                </div>
                <span className={`verdict-badge ${verdictClass}`}>
                  {isScam ? (
                    <HiOutlineShieldExclamation size={16} />
                  ) : (
                    <HiOutlineShieldCheck size={16} />
                  )}
                  {job.aiAnalysis.verdict}
                </span>
              </div>

              <div className="detail-description">
                {job.jobDetails.description}
              </div>

              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <HiOutlineMail />
                  </div>
                  <div>
                    <div className="detail-info-label">Contact Email</div>
                    <div className="detail-info-value">
                      {job.jobDetails.email}
                    </div>
                  </div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <HiOutlineGlobe />
                  </div>
                  <div>
                    <div className="detail-info-label">Website URL</div>
                    <div className="detail-info-value">
                      {job.jobDetails.url}
                    </div>
                  </div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <HiOutlineClock />
                  </div>
                  <div>
                    <div className="detail-info-label">Scanned At</div>
                    <div className="detail-info-value">
                      {formatDate(job.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <HiOutlineBriefcase />
                  </div>
                  <div>
                    <div className="detail-info-label">Scan ID</div>
                    <div className="detail-info-value" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                      {job._id}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Flags */}
            <motion.div
              className="detail-flags-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h2 className="detail-flags-title">
                <HiOutlineExclamation />
                Detected Red Flags
                {job.aiAnalysis.flagsDetected.length > 0 && (
                  <span className="count-badge">
                    {job.aiAnalysis.flagsDetected.length}
                  </span>
                )}
              </h2>

              {job.aiAnalysis.flagsDetected.length > 0 ? (
                job.aiAnalysis.flagsDetected.map((flag, i) => (
                  <motion.div
                    key={i}
                    className="flag-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                  >
                    <div className="flag-type">
                      <HiOutlineFlag size={14} />
                      {flag.type.replace(/_/g, " ")}
                    </div>
                    <div className="flag-message">{flag.message}</div>
                  </motion.div>
                ))
              ) : (
                <div className="no-flags">
                  <div className="no-flags-icon">
                    <HiOutlineShieldCheck />
                  </div>
                  <div className="no-flags-text">No Red Flags Detected</div>
                  <div className="no-flags-sub">
                    This listing passed all our checks successfully.
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="detail-sidebar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Score Ring */}
            <div className="score-card">
              <div className="score-card-label">Authenticity Score</div>
              <div className="score-ring">
                <svg viewBox="0 0 144 144">
                  <circle
                    className="score-ring-bg"
                    cx="72"
                    cy="72"
                    r="64"
                  />
                  <circle
                    className={`score-ring-fill ${verdictClass}`}
                    cx="72"
                    cy="72"
                    r="64"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                  />
                </svg>
                <div className="score-ring-text">
                  <span className={`score-ring-number ${verdictClass}`}>
                    {score}
                  </span>
                  <span className="score-ring-label">out of 100</span>
                </div>
              </div>
              <div className={`score-verdict ${verdictClass}`}>
                {isScam ? (
                  <HiOutlineShieldExclamation size={18} />
                ) : (
                  <HiOutlineShieldCheck size={18} />
                )}
                {isScam ? "LIKELY SCAM" : "VERIFIED SAFE"}
              </div>
            </div>

            {/* Risk Level */}
            <div className="risk-card">
              <div className="risk-card-title">Risk Assessment</div>
              {["high", "medium", "low"].map((level) => (
                <div
                  key={level}
                  className={`risk-level ${riskLevel === level ? "active" : "inactive"} ${level}`}
                >
                  <span className={`risk-dot ${level}`} />
                  <span className="risk-label">
                    {level === "high"
                      ? "● High Risk"
                      : level === "medium"
                      ? "◐ Medium Risk"
                      : "○ Low Risk"}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="detail-actions">
              <button
                className="detail-action-btn"
                onClick={() =>
                  navigator.clipboard?.writeText(window.location.href)
                }
              >
                <HiOutlineShare size={16} />
                Share Report
              </button>
              {isScam && (
                <button className="detail-action-btn danger">
                  <HiOutlineFlag size={16} />
                  Report Listing
                </button>
              )}
              <button
                className="detail-action-btn"
                onClick={() => navigate("/scan-results")}
              >
                Back to Results
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
