import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShieldExclamation,
  HiOutlineShieldCheck,
  HiOutlineExclamation,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineDocumentSearch,
} from "react-icons/hi";
import scannedJobs from "../../data/scannedJobs";
import "./ScanResults.css";

export default function ScanResults() {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL"
      ? scannedJobs
      : scannedJobs.filter((j) => j.aiAnalysis.verdict === filter);

  const scamCount = scannedJobs.filter(
    (j) => j.aiAnalysis.verdict === "SCAM"
  ).length;
  const legitCount = scannedJobs.filter(
    (j) => j.aiAnalysis.verdict === "LEGITIMATE"
  ).length;

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="scan-results-page">
      <div className="container">
        <motion.div
          className="scan-results-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>
            Scan <span className="gradient-text">Results</span>
          </h1>
          <p>
            {scannedJobs.length} job listings analyzed by our AI engine
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="filter-bar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <button
            className={`filter-btn ${filter === "ALL" ? "active" : ""}`}
            onClick={() => setFilter("ALL")}
          >
            All Scans
            <span className="count">{scannedJobs.length}</span>
          </button>
          <button
            className={`filter-btn ${filter === "SCAM" ? "active" : ""}`}
            onClick={() => setFilter("SCAM")}
          >
            <HiOutlineShieldExclamation size={14} />
            Scams
            <span className="count">{scamCount}</span>
          </button>
          <button
            className={`filter-btn ${filter === "LEGITIMATE" ? "active" : ""}`}
            onClick={() => setFilter("LEGITIMATE")}
          >
            <HiOutlineShieldCheck size={14} />
            Legitimate
            <span className="count">{legitCount}</span>
          </button>
        </motion.div>

        {/* Results List */}
        <div className="scan-results-list">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((job, i) => {
                const isScam = job.aiAnalysis.verdict === "SCAM";
                const verdictClass = isScam ? "scam" : "legitimate";

                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                  >
                    <Link
                      to={`/job/${job._id}`}
                      className="scan-result-card"
                    >
                      <div
                        className={`scan-result-indicator ${verdictClass}`}
                      />
                      <div className="scan-result-content">
                        <div className="scan-result-top">
                          <div>
                            <h3 className="scan-result-title">
                              {job.jobDetails.title}
                            </h3>
                            <p className="scan-result-company">
                              {job.jobDetails.company}
                            </p>
                          </div>
                          <span
                            className={`verdict-badge ${verdictClass}`}
                          >
                            {isScam ? (
                              <HiOutlineShieldExclamation size={14} />
                            ) : (
                              <HiOutlineShieldCheck size={14} />
                            )}
                            {job.aiAnalysis.verdict}
                          </span>
                        </div>

                        <p className="scan-result-desc">
                          {job.jobDetails.description}
                        </p>

                        {job.aiAnalysis.flagsDetected.length > 0 && (
                          <div className="scan-result-flags">
                            {job.aiAnalysis.flagsDetected.map((flag, fi) => (
                              <span key={fi} className="flag-chip">
                                <HiOutlineExclamation size={12} />
                                {flag.type.replace(/_/g, " ")}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="scan-result-bottom">
                          <div className="scan-result-meta">
                            <span className="scan-result-meta-item">
                              <HiOutlineMail size={14} />
                              {job.jobDetails.email}
                            </span>
                            <span className="scan-result-meta-item">
                              <HiOutlineClock size={14} />
                              {formatDate(job.timestamp)}
                            </span>
                          </div>

                          <div className="scan-result-score">
                            <span
                              className={`score-text ${verdictClass}`}
                            >
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
                            <span className="scan-result-view">
                              Details <HiOutlineArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="empty-state-icon">
                  <HiOutlineDocumentSearch />
                </div>
                <p className="empty-state-text">
                  No results found for this filter.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
