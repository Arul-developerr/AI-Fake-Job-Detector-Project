import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiOutlineShieldCheck, HiOutlineUser } from "react-icons/hi";
import { FiMenu, FiX, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/scan-results", label: "Scan Results" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="navbar-logo-icon">
              <HiOutlineShieldCheck />
            </span>
            <span className="gradient-text">FakeGuard AI</span>
          </Link>

          <div className="navbar-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="navbar-scan-btn-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-primary)",
                cursor: "pointer",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center"
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            <Link to="/auth" style={{ 
              color: "var(--color-text-primary)", 
              textDecoration: "none", 
              fontWeight: 600, 
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              fontSize: "0.95rem",
              transition: "var(--transition-fast)"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = "var(--color-accent-primary)"}
            onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
            >
              <HiOutlineUser size={18} />
              Sign In
            </Link>

            <Link to="/scan-results" className="navbar-scan-btn">
              <FiSearch size={16} />
              View Scans
            </Link>
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu ${mobileOpen ? "open" : ""}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
            onClick={closeMobile}
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/auth" className="navbar-link" onClick={closeMobile} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HiOutlineUser size={18} />
          Sign In / Sign Up
        </Link>
        <Link to="/scan-results" className="navbar-scan-btn" onClick={closeMobile}>
          <FiSearch size={16} />
          View Scans
        </Link>
        <button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
            closeMobile();
          }}
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            padding: "var(--space-md)",
            marginTop: "var(--space-sm)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
          }}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </>
  );
}
