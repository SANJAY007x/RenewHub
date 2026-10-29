import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ServiceSearch from "../components/ServiceSearch";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="portal-home">

        {/* =====================================
            HERO / SEARCH AREA
        ===================================== */}

        <section className="hero-portal">

          <div className="hero-overlay">

            <div className="hero-content">

              <div className="hero-title">
                <span className="hero-small">
                  DIGITAL DOCUMENT SERVICES
                </span>

                <h1>
                  Manage Your Documents
                  <br />
                  <strong>Renew Them On Time</strong>
                </h1>

                <p>
                  A centralized platform to track certificates,
                  licenses, registrations and other important
                  documents before they expire.
                </p>
              </div>


             <ServiceSearch />

              <div className="trending">

                <strong>Popular Services:</strong>

                <Link to="/documents">
                  Add Document
                </Link>

                <Link to="/renewals">
                  Check Expiry
                </Link>

                <Link to="/notifications">
                  Renewal Alerts
                </Link>

                <Link to="/services">
                  All Services
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            STATISTICS
        ===================================== */}

        <section className="statistics-section">

          <div className="statistics-container">

            <div className="stat-item">
              <div className="stat-icon">▣</div>

              <div>
                <strong>12+</strong>
                <span>Document Types</span>
              </div>
            </div>


            <div className="stat-item">
              <div className="stat-icon">◫</div>

              <div>
                <strong>05</strong>
                <span>Renewal Categories</span>
              </div>
            </div>


            <div className="stat-item">
              <div className="stat-icon">◷</div>

              <div>
                <strong>24/7</strong>
                <span>Expiry Tracking</span>
              </div>
            </div>


            <div className="stat-item">
              <div className="stat-icon">✓</div>

              <div>
                <strong>100%</strong>
                <span>Digital Management</span>
              </div>
            </div>


            <div className="stat-item">
              <div className="stat-icon">!</div>

              <div>
                <strong>Alerts</strong>
                <span>Renewal Reminders</span>
              </div>
            </div>

          </div>

        </section>


        {/* =====================================
            ONLINE SERVICES
        ===================================== */}

        <section className="online-services">

          <div className="section-container">

            <div className="section-title red-title">
              <h2>Online Services</h2>
            </div>


            <div className="service-layout">

              <div className="service-red-panel">

                <div className="service-panel-heading">
                  <h3>RenewHub Services</h3>

                  <p>
                    Access digital tools for managing
                    your important documents.
                  </p>
                </div>


                <div className="service-small-grid">

                  <Link to="/documents" className="service-small-card">
                    <span className="service-number">01</span>
                    <strong>My Documents</strong>
                    <small>Manage documents</small>
                  </Link>


                  <Link to="/renewals" className="service-small-card">
                    <span className="service-number">02</span>
                    <strong>Renewal Tracker</strong>
                    <small>Track expiry dates</small>
                  </Link>


                  <Link to="/notifications" className="service-small-card">
                    <span className="service-number">03</span>
                    <strong>Renewal Alerts</strong>
                    <small>View reminders</small>
                  </Link>


                  <Link to="/services" className="service-small-card">
                    <span className="service-number">04</span>
                    <strong>All Services</strong>
                    <small>Explore services</small>
                  </Link>

                </div>

              </div>


              <div className="featured-services">

                <div className="featured-card">

                  <div className="featured-image certificate-image">
                    CERTIFICATE
                  </div>

                  <div className="featured-content">
                    <span>DOCUMENT SERVICE</span>

                    <h3>
                      Certificate Renewal
                    </h3>

                    <p>
                      Keep track of important
                      certificate expiry dates.
                    </p>
                  </div>

                </div>


                <div className="featured-card">

                  <div className="featured-image license-image">
                    LICENSE
                  </div>

                  <div className="featured-content">
                    <span>RENEWAL SERVICE</span>

                    <h3>
                      License Tracking
                    </h3>

                    <p>
                      Monitor licenses that require
                      periodic renewal.
                    </p>
                  </div>

                </div>


                <div className="featured-card">

                  <div className="featured-image document-image">
                    DOCUMENT
                  </div>

                  <div className="featured-content">
                    <span>DOCUMENT SERVICE</span>

                    <h3>
                      Important Documents
                    </h3>

                    <p>
                      Organize all important documents
                      in one place.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            INFORMATION CATEGORIES
        ===================================== */}

        <section className="categories-section">

          <div className="section-container">

            <div className="section-title">

              <span>EXPLORE SERVICES</span>

              <h2>
                Information Categories
              </h2>

              <div className="title-line"></div>

            </div>


            <div className="categories-grid">

              <div className="category-card">
                <div className="category-icon">01</div>

                <div>
                  <h3>Certificates</h3>

                  <p>
                    Track educational, professional
                    and other important certificates.
                  </p>
                </div>
              </div>


              <div className="category-card">
                <div className="category-icon">02</div>

                <div>
                  <h3>Licenses</h3>

                  <p>
                    Manage licenses and monitor
                    upcoming renewal dates.
                  </p>
                </div>
              </div>


              <div className="category-card">
                <div className="category-icon">03</div>

                <div>
                  <h3>Registrations</h3>

                  <p>
                    Keep track of registrations
                    requiring periodic renewal.
                  </p>
                </div>
              </div>


              <div className="category-card">
                <div className="category-icon">04</div>

                <div>
                  <h3>Insurance</h3>

                  <p>
                    Monitor insurance policies
                    and important expiry dates.
                  </p>
                </div>
              </div>


              <div className="category-card">
                <div className="category-icon">05</div>

                <div>
                  <h3>Memberships</h3>

                  <p>
                    Track memberships and
                    subscription renewal periods.
                  </p>
                </div>
              </div>


              <div className="category-card">
                <div className="category-icon">06</div>

                <div>
                  <h3>Other Documents</h3>

                  <p>
                    Add and track any other
                    document with an expiry date.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            NOTICE + NEWS
        ===================================== */}

        <section className="information-section">

          <div className="section-container">

            <div className="information-grid">


              {/* Announcements */}

              <div className="information-box">

                <div className="information-header">

                  <h2>
                    Announcements
                  </h2>

                  <Link to="/notifications">
                    View All
                  </Link>

                </div>


                <div className="announcement">

                  <div className="date-box">
                    <strong>01</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <h3>
                      Keep your document information updated
                    </h3>

                    <p>
                      Review your important documents
                      and upcoming renewal dates regularly.
                    </p>
                  </div>

                </div>


                <div className="announcement">

                  <div className="date-box">
                    <strong>15</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <h3>
                      Renewal reminders available
                    </h3>

                    <p>
                      Add your documents to receive
                      timely expiry notifications.
                    </p>
                  </div>

                </div>

              </div>


              {/* Important Information */}

              <div className="information-box">

                <div className="information-header">

                  <h2>
                    Important Information
                  </h2>

                  <span className="info-badge">
                    NOTICE
                  </span>

                </div>


                <div className="important-message">

                  <div className="important-icon">
                    !
                  </div>

                  <div>
                    <h3>
                      Don't wait until the last day
                    </h3>

                    <p>
                      Add your documents to RenewHub
                      and monitor their expiry dates
                      in advance.
                    </p>
                  </div>

                </div>


                <Link
                  to="/register"
                  className="notice-button"
                >
                  Get Started
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            DIRECTORIES
        ===================================== */}

        <section className="directory-section">

          <div className="section-container">

            <div className="section-title">

              <span>RENEWALHUB DIRECTORY</span>

              <h2>
                Quick Access
              </h2>

              <div className="title-line"></div>

            </div>


            <div className="directory-grid">

              <Link to="/documents">
                <span>▣</span>
                <strong>My Documents</strong>
                <small>View documents</small>
              </Link>


              <Link to="/renewals">
                <span>◷</span>
                <strong>Renewal History</strong>
                <small>Past renewals</small>
              </Link>


              <Link to="/notifications">
                <span>!</span>
                <strong>Notifications</strong>
                <small>Renewal alerts</small>
              </Link>


              <Link to="/settings">
                <span>⚙</span>
                <strong>Settings</strong>
                <small>Account settings</small>
              </Link>


              <Link to="/help">
                <span>?</span>
                <strong>Help Centre</strong>
                <small>Get assistance</small>
              </Link>

            </div>

          </div>

        </section>


        {/* =====================================
            FEATURED RENEWAL SECTION
        ===================================== */}

        <section className="featured-renewal">

          <div className="featured-renewal-inner">

            <div className="featured-copy">

              <span>
                RENEWHUB
              </span>

              <h2>
                Never Miss an Important Renewal
              </h2>

              <p>
                Stay informed about upcoming document
                expiries and organize your renewal activities
                from a single dashboard.
              </p>

              <Link
                to="/register"
                className="featured-button"
              >
                Create Your Account
              </Link>

            </div>


            <div className="renewal-visual">

              <div className="visual-card">

                <span>RENEWAL STATUS</span>

                <strong>
                  03
                </strong>

                <small>
                  Documents Expiring Soon
                </small>

                <div className="visual-progress">
                  <div></div>
                </div>

                <p>
                  Review your dashboard for details.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            FOOTER
        ===================================== */}

        <footer className="portal-footer">

          <div className="footer-top">

            <div className="footer-container">


              <div className="footer-brand">

                <div className="footer-brand-logo">

                  <span>R</span>

                  <strong>
                    renewhub
                  </strong>

                </div>

                <p>
                  Digital Document & Renewal
                  Management Platform
                </p>

                <p className="footer-note">
                  Track. Remind. Renew.
                </p>

              </div>


              <div className="footer-column">

                <h3>
                  Services
                </h3>

                <Link to="/documents">
                  Document Management
                </Link>

                <Link to="/renewals">
                  Renewal Tracking
                </Link>

                <Link to="/notifications">
                  Notifications
                </Link>

                <Link to="/services">
                  All Services
                </Link>

              </div>


              <div className="footer-column">

                <h3>
                  Quick Links
                </h3>

                <Link to="/">
                  Home
                </Link>

                <Link to="/login">
                  Login
                </Link>

                <Link to="/register">
                  Register
                </Link>

                <Link to="/settings">
                  Settings
                </Link>

              </div>


              <div className="footer-column">

                <h3>
                  Support
                </h3>

                <Link to="/help">
                  Help Centre
                </Link>

                <Link to="/about">
                  About RenewHub
                </Link>

                <span>
                  Accessibility
                </span>

                <span>
                  Contact Us
                </span>

              </div>


              <div className="footer-column">

                <h3>
                  Connect
                </h3>

                <span>
                  Digital Services
                </span>

                <span>
                  Privacy Policy
                </span>

                <span>
                  Terms of Service
                </span>

                <span>
                  Sitemap
                </span>

              </div>

            </div>

          </div>


          <div className="footer-bottom">

            <div>
              © 2026 RenewHub. All Rights Reserved.
            </div>

            <div>
              Digital Document Renewal Platform
            </div>

          </div>

        </footer>

      </main>
    </>
  );
}

export default Home;