import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineShieldExclamation,
  HiOutlineShieldCheck,
  HiOutlineDocumentSearch,
  HiOutlineExclamation,
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineEye,
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlineClock,
} from "react-icons/hi";
import scannedJobs from "../../data/scannedJobs";
import "./Dashboard.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Dashboard() {
  const totalScans = scannedJobs.length;
  const scamCount = scannedJobs.filter(
    (j) => j.aiAnalysis.verdict === "SCAM"
  ).length;
  const legitCount = scannedJobs.filter(
    (j) => j.aiAnalysis.verdict === "LEGITIMATE"
  ).length;
  const totalFlags = scannedJobs.reduce(
    (acc, j) => acc + j.aiAnalysis.flagsDetected.length,
    0
  );

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="dashboard-page">
      {/* Hero */}
      <section className="dashboard-hero">
        <div className="container hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="hero-badge-dot"></span>
            AI-Powered Protection Active
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Detect <span className="gradient-text">Fake Job Postings</span>{" "}
            Before They Deceive You
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our advanced AI engine analyzes job listings in real-time, identifying
            scam patterns, suspicious domains, and fraudulent compensation
            structures to keep you safe.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/scan-results" className="btn-primary">
              <HiOutlineDocumentSearch size={20} />
              View Scan Results
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
              <HiOutlineArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                icon: <HiOutlineDocumentSearch />,
                num: totalScans,
                label: "Total Scans",
                cls: "primary",
              },
              {
                icon: <HiOutlineShieldExclamation />,
                num: scamCount,
                label: "Scams Detected",
                cls: "scam",
              },
              {
                icon: <HiOutlineShieldCheck />,
                num: legitCount,
                label: "Verified Legitimate",
                cls: "legit",
              },
              {
                icon: <HiOutlineExclamation />,
                num: totalFlags,
                label: "Flags Raised",
                cls: "warning",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`stat-card ${stat.cls}`}
                variants={fadeUp}
                custom={i}
              >
                <div className={`stat-icon ${stat.cls}`}>{stat.icon}</div>
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Scans */}
      <section className="recent-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Scan Results</h2>
            <Link to="/scan-results" className="section-link">
              View all <HiOutlineArrowRight />
            </Link>
          </div>

          {scannedJobs.map((job, i) => {
            const isScam = job.aiAnalysis.verdict === "SCAM";
            const verdictClass = isScam ? "scam" : "legitimate";

            return (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  to={`/job/${job._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="job-card">
                    <div className="job-card-header">
                      <div className="job-card-info">
                        <h3 className="job-card-title">
                          {job.jobDetails.title}
                        </h3>
                        <span className="job-card-company">
                          {job.jobDetails.company}
                        </span>
                      </div>
                      <span className={`verdict-badge ${verdictClass}`}>
                        {isScam ? (
                          <HiOutlineShieldExclamation size={14} />
                        ) : (
                          <HiOutlineShieldCheck size={14} />
                        )}
                        {job.aiAnalysis.verdict}
                      </span>
                    </div>

                    <p className="job-card-description">
                      {job.jobDetails.description}
                    </p>

                    <div className="job-card-footer">
                      <div className="job-card-meta">
                        <span className="job-card-meta-item">
                          <HiOutlineMail size={14} />
                          {job.jobDetails.email}
                        </span>
                        <span className="job-card-meta-item">
                          <HiOutlineClock size={14} />
                          {formatDate(job.timestamp)}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-sm)",
                        }}
                      >
                        <span className={`score-text ${verdictClass}`}>
                          {job.aiAnalysis.authenticityScore}%
                        </span>
                        <div className="score-bar">
                          <div
                            className={`score-bar-fill ${verdictClass}`}
                            style={{
                              width: `${job.aiAnalysis.authenticityScore}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header" style={{ justifyContent: "center" }}>
            <h2 className="section-title">
              How <span className="gradient-text">FakeGuard AI</span> Protects
              You
            </h2>
          </div>

          <motion.div
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                icon: <HiOutlineLightningBolt />,
                title: "Instant Analysis",
                desc: "Our AI engine processes job listings in milliseconds, scanning for over 50 known scam indicators and patterns.",
              },
              {
                icon: <HiOutlineEye />,
                title: "Deep Inspection",
                desc: "We analyze email domains, website hosting, compensation structures, and language patterns for red flags.",
              },
              {
                icon: <HiOutlineGlobe />,
                title: "Global Database",
                desc: "Cross-references against our global database of known scam typologies and fraudulent company identifiers.",
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                className="feature-card"
                variants={fadeUp}
                custom={i}
              >
                <div className="feature-icon">{feat.icon}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
