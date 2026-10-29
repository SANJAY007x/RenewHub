import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/renewhub-logo.png";
import "./Navbar.css";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <>
      {/* ================================
          TOP BAR
      ================================= */}

      <div className="top-bar">

        <div className="top-bar-left">
          <span>RenewHub Digital Services</span>
        </div>

        <div className="top-bar-right">
          <span>Skip to Main Content</span>
          <span>|</span>
          <span>Accessibility</span>
          <span>|</span>
          <span>Help</span>
          <span>|</span>
          <span>English</span>
        </div>

      </div>


      {/* ================================
          MAIN HEADER
      ================================= */}

      <header className="main-navbar">

        <div className="navbar-container">


          {/* LOGO */}

          <Link to="/" className="brand">

            <img
              src={logo}
              alt="RenewHub - Digital Document Renewal Platform"
              className="renewhub-logo"
            />

          </Link>


          {/* SEARCH */}

          <div className="navbar-search">

            <input
              type="text"
              placeholder="Search services, documents..."
            />

            <select defaultValue="all">

              <option value="all">
                All Services
              </option>

              <option value="documents">
                Documents
              </option>

              <option value="renewal">
                Renewals
              </option>

              <option value="notifications">
                Notifications
              </option>

            </select>

            <button type="button">
              Search
            </button>

          </div>


          {/* ACCOUNT */}
<div className="navbar-account">

  <button
    type="button"
    className="theme-toggle"
    onClick={toggleTheme}
    aria-label={
      darkMode
        ? "Switch to light mode"
        : "Switch to dark mode"
    }
    title={
      darkMode
        ? "Switch to light mode"
        : "Switch to dark mode"
    }
  >
    <span className="theme-icon">
      {darkMode ? "☀️" : "🌙"}
    </span>

    <span className="theme-label">
      {darkMode ? "Light" : "Dark"}
    </span>
  </button>

  <Link to="/settings" className="settings-link">
    ⚙ Settings
  </Link>

  <Link to="/login">
    Login
  </Link>

  <Link to="/register" className="register-link">
    Register
  </Link>

  <button
    type="button"
    className="menu-button"
    aria-label="Open menu"
  >
    ☰
  </button>

</div>

        </div>


        {/* ================================
            NAVIGATION
        ================================= */}

        <nav className="navigation">

          <div className="navigation-container">

            <Link
              to="/"
              className="active-nav"
            >
              Home
            </Link>

            <Link to="/services">
              Services
            </Link>

            <Link to="/documents">
              Documents
            </Link>

            <Link to="/renewals">
              Renewals
            </Link>

            <Link to="/notifications">
              Notifications
            </Link>

            <Link to="/about">
              About RenewHub
            </Link>

            <Link to="/help">
              Help & Support
            </Link>

          </div>

        </nav>

      </header>
    </>
  );
}

export default Navbar;