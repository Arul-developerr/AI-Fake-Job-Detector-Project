import { Link } from "react-router-dom";
import { HiOutlineShieldCheck } from "react-icons/hi";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ display: "inline-flex" }}>
              <span className="navbar-logo-icon">
                <HiOutlineShieldCheck />
              </span>
              <span className="gradient-text">FakeGuard AI</span>
            </Link>
            <p className="footer-brand-desc">
              Protecting job seekers from fraudulent postings with advanced AI
              analysis. Our machine learning algorithms detect scams before they
              can cause harm.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Platform</h4>
            <div className="footer-link-list">
              <Link to="/">Dashboard</Link>
              <Link to="/scan-results">Scan Results</Link>
              <Link to="/about">About</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Resources</h4>
            <div className="footer-link-list">
              <a href="#" onClick={(e) => e.preventDefault()}>Documentation</a>
              <a href="#" onClick={(e) => e.preventDefault()}>API Reference</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Blog</a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Legal</h4>
            <div className="footer-link-list">
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © 2026 FakeGuard AI. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Status</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Security</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
