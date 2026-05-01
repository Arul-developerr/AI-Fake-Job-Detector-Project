import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineDocumentSearch,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineCash,
  HiOutlineTruck,
  HiOutlineUserAdd,
  HiOutlineLockClosed,
  HiOutlineKey,
  HiOutlineCode,
  HiOutlineChip,
  HiOutlineDatabase,
  HiOutlineArrowRight,
} from "react-icons/hi";
import "./About.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero */}
        <motion.div
          className="about-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>
            About <span className="gradient-text">FakeGuard AI</span>
          </h1>
          <p>
            FakeGuard AI is an advanced artificial intelligence platform designed
            to protect job seekers from fraudulent job postings. We analyze
            listings using machine learning algorithms that detect scam patterns,
            suspicious domains, unrealistic compensation, and other red flags in
            real-time.
          </p>
        </motion.div>

        {/* How It Works */}
        <div className="about-section">
          <h2 className="about-section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <motion.div
            className="how-it-works-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                icon: <HiOutlineDocumentSearch />,
                title: "Submit Listing",
                desc: "Paste a job listing URL or description for our AI to analyze.",
              },
              {
                icon: <HiOutlineChip />,
                title: "AI Analysis",
                desc: "Our ML engine scans 50+ indicators including email, domain, and language.",
              },
              {
                icon: <HiOutlineLightningBolt />,
                title: "Instant Results",
                desc: "Get a detailed authenticity score with specific red flags in seconds.",
              },
              {
                icon: <HiOutlineShieldCheck />,
                title: "Stay Protected",
                desc: "Make informed decisions with confidence knowing your safety is ensured.",
              },
            ].map((step, i) => (
              <motion.div key={step.title} className="step-card" variants={fadeUp} custom={i}>
                <div className="step-number">{i + 1}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Common Scam Types */}
        <div className="about-section">
          <h2 className="about-section-title">
            Common <span className="gradient-text">Scam Types</span> We Detect
          </h2>
          <motion.div
            className="scam-types-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                icon: "💰",
                title: "Upfront Fee Scams",
                desc: "Fraudulent listings that require payment for background checks, training materials, or equipment before starting work.",
              },
              {
                icon: "📦",
                title: "Reshipping Scams",
                desc: "Schemes that ask you to receive and forward packages, often linked to stolen credit card purchases and identity theft.",
              },
              {
                icon: "💸",
                title: "Unrealistic Pay",
                desc: "Listings offering extraordinarily high compensation for entry-level positions with no experience required.",
              },
              {
                icon: "📧",
                title: "Phishing Emails",
                desc: "Job offers from free email providers like Gmail or Yahoo instead of official corporate domains.",
              },
              {
                icon: "🌐",
                title: "Fake Websites",
                desc: "Company websites hosted on free builders like Weebly, Wix, or WordPress.com with no legitimate business presence.",
              },
              {
                icon: "⚡",
                title: "Instant Hire",
                desc: "Listings claiming to hire immediately without any interview, verification, or screening process.",
              },
            ].map((scam, i) => (
              <motion.div key={scam.title} className="scam-type-card" variants={fadeUp} custom={i}>
                <div className="scam-type-icon">{scam.icon}</div>
                <h3 className="scam-type-title">{scam.title}</h3>
                <p className="scam-type-desc">{scam.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technology */}
        <div className="about-section">
          <h2 className="about-section-title">
            Powered by <span className="gradient-text">Advanced Tech</span>
          </h2>
          <motion.div
            className="tech-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { icon: <HiOutlineChip />, name: "Machine Learning", desc: "Neural network models" },
              { icon: <HiOutlineCode />, name: "NLP Engine", desc: "Natural Language Processing" },
              { icon: <HiOutlineDatabase />, name: "Global Database", desc: "Scam pattern registry" },
              { icon: <HiOutlineLockClosed />, name: "Encrypted", desc: "End-to-end security" },
              { icon: <HiOutlineKey />, name: "API Access", desc: "Developer integration" },
              { icon: <HiOutlineBell />, name: "Real-time Alerts", desc: "Instant notifications" },
            ].map((tech, i) => (
              <motion.div key={tech.name} className="tech-card" variants={fadeUp} custom={i}>
                <div className="tech-icon">{tech.icon}</div>
                <div className="tech-name">{tech.name}</div>
                <div className="tech-desc">{tech.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            Ready to <span className="gradient-text">Protect Yourself</span>?
          </h2>
          <p>
            Start analyzing job listings now and stay safe from scams.
          </p>
          <Link to="/scan-results" className="btn-primary">
            View Scan Results
            <HiOutlineArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
