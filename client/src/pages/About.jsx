import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">ABOUT RENEWHUB</span>

          <h1>
            Stay Ahead of Every
            <span> Expiry Date.</span>
          </h1>

          <p>
            RenewHub is a digital document management platform designed to
            help you organize important documents, track expiry dates, receive
            timely reminders, and stay prepared for renewals.
          </p>

          <div className="about-hero-actions">
            <Link to="/register" className="about-primary-btn">
              Create Your Account
            </Link>

            <Link to="/documents" className="about-secondary-btn">
              Explore Documents
            </Link>
          </div>
        </div>

        <div className="about-hero-visual">
          <div className="about-visual-card">
            <div className="visual-card-header">
              <span>RENEWAL CONTROL</span>
              <span className="visual-status">● ACTIVE</span>
            </div>

            <div className="visual-document">
              <div className="visual-document-icon">▣</div>

              <div>
                <strong>Driving Licence</strong>
                <span>Expires in 8 days</span>
              </div>

              <div className="visual-warning">!</div>
            </div>

            <div className="visual-progress">
              <div className="visual-progress-bar">
                <span></span>
              </div>
              <small>Renewal attention required</small>
            </div>

            <div className="visual-document">
              <div className="visual-document-icon blue">▤</div>

              <div>
                <strong>Passport</strong>
                <span>Expires in 34 days</span>
              </div>

              <div className="visual-safe">✓</div>
            </div>

            <div className="visual-document">
              <div className="visual-document-icon green">▥</div>

              <div>
                <strong>Health Insurance</strong>
                <span>Expires in 21 days</span>
              </div>

              <div className="visual-safe">✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro">
        <div className="about-section-label">OUR PURPOSE</div>

        <h2>
          Important documents should never
          <span> become a last-minute problem.</span>
        </h2>

        <p>
          Documents such as certificates, licences, insurance policies,
          registrations, permits, and memberships often have expiry dates.
          Keeping track of all of them manually can be difficult.
        </p>

        <p>
          RenewHub brings these documents together in one organized place so
          users can understand what is active, what is approaching expiry,
          and what needs attention.
        </p>
      </section>

      {/* Why RenewHub */}
      <section className="about-why">
        <div className="about-section-heading">
          <span>WHY RENEWHUB</span>
          <h2>Built around the renewal journey</h2>
          <p>
            RenewHub focuses on making document tracking simple, organized,
            and easy to understand.
          </p>
        </div>

        <div className="about-feature-grid">
          <div className="about-feature-card">
            <div className="feature-number">01</div>
            <div className="feature-icon">▣</div>
            <h3>Centralized Documents</h3>
            <p>
              Keep important certificates, licences, insurance documents,
              registrations, and other records organized in one place.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="feature-number">02</div>
            <div className="feature-icon">◷</div>
            <h3>Expiry Tracking</h3>
            <p>
              See document expiry dates clearly and identify documents that
              are approaching their renewal period.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="feature-number">03</div>
            <div className="feature-icon">♢</div>
            <h3>Timely Reminders</h3>
            <p>
              Receive reminders based on your preferred notification and
              renewal schedule.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="feature-number">04</div>
            <div className="feature-icon">✓</div>
            <h3>Renewal Planning</h3>
            <p>
              Track documents that require attention and keep your renewal
              activities organized.
            </p>
          </div>
        </div>
      </section>

      {/* What you can manage */}
      <section className="about-manage">
        <div className="manage-content">
          <div className="about-section-label">ONE PLATFORM</div>

          <h2>
            Manage more than
            <span> just certificates.</span>
          </h2>

          <p>
            RenewHub can be used to organize different types of documents
            that have validity periods or require periodic renewal.
          </p>

          <Link to="/documents" className="manage-link">
            View Your Documents →
          </Link>
        </div>

        <div className="manage-grid">
          <div className="manage-item">
            <span>01</span>
            <strong>Certificates</strong>
            <small>Income, Community & more</small>
          </div>

          <div className="manage-item">
            <span>02</span>
            <strong>Licences</strong>
            <small>Driving & other licences</small>
          </div>

          <div className="manage-item">
            <span>03</span>
            <strong>Insurance</strong>
            <small>Health, Vehicle & more</small>
          </div>

          <div className="manage-item">
            <span>04</span>
            <strong>Registrations</strong>
            <small>Vehicles & other records</small>
          </div>

          <div className="manage-item">
            <span>05</span>
            <strong>Permits</strong>
            <small>Validity-based permits</small>
          </div>

          <div className="manage-item">
            <span>06</span>
            <strong>Memberships</strong>
            <small>Renewable memberships</small>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="about-process">
        <div className="about-section-heading centered">
          <span>HOW IT WORKS</span>
          <h2>Track. Remind. Renew.</h2>
          <p>
            A simple workflow designed to keep your important documents
            visible and organized.
          </p>
        </div>

        <div className="process-line"></div>

        <div className="process-grid">
          <div className="process-step">
            <div className="process-circle">01</div>
            <h3>Add</h3>
            <p>
              Add your document and enter its important details, including
              the expiry date.
            </p>
          </div>

          <div className="process-step">
            <div className="process-circle">02</div>
            <h3>Track</h3>
            <p>
              Monitor your documents from a single dashboard and see which
              ones need attention.
            </p>
          </div>

          <div className="process-step">
            <div className="process-circle">03</div>
            <h3>Remind</h3>
            <p>
              Get reminders as important expiry dates approach according to
              your notification preferences.
            </p>
          </div>

          <div className="process-step">
            <div className="process-circle">04</div>
            <h3>Renew</h3>
            <p>
              Plan your renewal activity and keep your document status
              organized.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="about-principles">
        <div className="principles-heading">
          <span>OUR APPROACH</span>
          <h2>Designed with people in mind.</h2>
        </div>

        <div className="principles-list">
          <div className="principle">
            <div className="principle-icon">◈</div>
            <div>
              <h3>Simple</h3>
              <p>
                Clear information and straightforward workflows without
                unnecessary complexity.
              </p>
            </div>
          </div>

          <div className="principle">
            <div className="principle-icon">✓</div>
            <div>
              <h3>Organized</h3>
              <p>
                Important document information is structured so it is easier
                to find and understand.
              </p>
            </div>
          </div>

          <div className="principle">
            <div className="principle-icon">◷</div>
            <div>
              <h3>Timely</h3>
              <p>
                Expiry-focused tracking helps users prepare before important
                dates arrive.
              </p>
            </div>
          </div>

          <div className="principle">
            <div className="principle-icon">◎</div>
            <div>
              <h3>Accessible</h3>
              <p>
                The interface is designed to keep essential information easy
                to understand across devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div>
          <span>READY TO GET STARTED?</span>
          <h2>Take control of your renewal schedule.</h2>
          <p>
            Organize your documents today and stay prepared for tomorrow.
          </p>
        </div>

        <div className="about-cta-actions">
          <Link to="/register" className="about-cta-primary">
            Create Account
          </Link>

          <Link to="/login" className="about-cta-secondary">
            Already a member? Log In
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="about-footer-main">
          <div className="about-footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-mark">R</span>
              <span>RenewHub</span>
            </div>

            <p>
              Track. Remind. Renew.
            </p>

            <small>
              A digital platform for organized document and renewal
              management.
            </small>
          </div>

          <div className="about-footer-column">
            <h4>Platform</h4>
            <Link to="/documents">Documents</Link>
            <Link to="/renewals">Renewals</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="about-footer-column">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/settings">Settings</Link>
          </div>

          <div className="about-footer-column">
            <h4>RenewHub</h4>
            <Link to="/about">About</Link>
            <Link to="/help">Help & Support</Link>
            <Link to="/">Home</Link>
          </div>
        </div>

        <div className="about-footer-bottom">
          <span>© 2026 RenewHub. All rights reserved.</span>
          <span>Track. Remind. Renew.</span>
        </div>
      </footer>
    </div>
  );
}

export default About;