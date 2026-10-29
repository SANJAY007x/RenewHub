import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { governmentServices } from "../data/governmentServices";
import "./Services.css";

function Services() {
  const categories = [
    {
      icon: "📄",
      title: "Certificates",
      description: "Government certificates and essential documents",
    },
    {
      icon: "🪪",
      title: "Licences",
      description: "Licences that need regular renewal",
    },
    {
      icon: "🚗",
      title: "Registrations",
      description: "Vehicle and other registration services",
    },
    {
      icon: "🛡️",
      title: "Insurance",
      description: "Track insurance expiry and renewal",
    },
    {
      icon: "📋",
      title: "Permits",
      description: "Important permits and approvals",
    },
    {
      icon: "🎫",
      title: "Memberships",
      description: "Memberships with renewal dates",
    },
  ];

  return (
    <div className="renewhub-services-page">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="services-hero">
          <div className="services-hero-content">
            <span className="services-eyebrow">
              RENEWHUB DIGITAL SERVICES
            </span>

            <h1>Services</h1>

            <p>
              Find important document and renewal services in one place.
              Explore service information, required documents and application
              guidance.
            </p>

            <div className="services-search">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search for a service..."
                aria-label="Search services"
              />
              <button type="button">Search</button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="services-section">
          <div className="services-section-heading">
            <span className="section-label">BROWSE BY CATEGORY</span>
            <h2>Explore Services</h2>
            <p>
              Choose a category to find the type of document or service you
              need.
            </p>
          </div>

          <div className="service-category-grid">
            {categories.map((category) => (
              <button
                type="button"
                className="service-category-card"
                key={category.title}
              >
                <div className="category-icon">{category.icon}</div>

                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>

                <span className="category-arrow">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Services */}
        <section className="services-section popular-services">
          <div className="services-section-heading services-heading-row">
            <div>
              <span className="section-label">POPULAR SERVICES</span>
              <h2>Government Services</h2>
              <p>
                Access guidance for commonly used certificate services.
              </p>
            </div>

            <span className="service-count">
              {governmentServices.length} Services
            </span>
          </div>

          <div className="services-grid">
            {governmentServices.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="service-card-top">
                  <div className="service-card-icon">📄</div>

                  <span className="service-status">Available</span>
                </div>

                <div className="service-card-body">
                  <span className="service-department">
                    {service.department}
                  </span>

                  <h3>{service.name}</h3>

                  <p>{service.description}</p>

                  <div className="service-info">
                    <span>📋 Application Guidance</span>
                    <span>📅 Verified Information</span>
                  </div>
                </div>

                <div className="service-card-footer">
                  <Link to={`/services/${service.id}`}>
                    View Service
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="services-how-section">
          <div className="services-section-heading">
            <span className="section-label">HOW IT WORKS</span>
            <h2>Find the Information You Need</h2>
            <p>
              RenewHub helps you understand the service before you begin your
              application.
            </p>
          </div>

          <div className="how-it-works-grid">
            <div className="how-step">
              <span className="step-number">01</span>
              <div className="step-icon">🔎</div>
              <h3>Find a Service</h3>
              <p>
                Browse or search for the certificate, licence or document
                service you need.
              </p>
            </div>

            <div className="how-step">
              <span className="step-number">02</span>
              <div className="step-icon">📑</div>
              <h3>Check Requirements</h3>
              <p>
                Review the required documents and application information.
              </p>
            </div>

            <div className="how-step">
              <span className="step-number">03</span>
              <div className="step-icon">📝</div>
              <h3>Follow the Steps</h3>
              <p>
                Follow the application guidance provided for the selected
                service.
              </p>
            </div>

            <div className="how-step">
              <span className="step-number">04</span>
              <div className="step-icon">🔗</div>
              <h3>Visit Official Portal</h3>
              <p>
                Continue your application through the relevant official
                government portal.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="services-cta">
          <div>
            <span>RENEWHUB</span>
            <h2>Keep Every Important Document on Track.</h2>
            <p>
              Add your documents to RenewHub and never lose track of an expiry
              date.
            </p>
          </div>

          <div className="services-cta-actions">
            <Link to="/documents/add" className="cta-primary">
              Add a Document
            </Link>

            <Link to="/dashboard" className="cta-secondary">
              Go to Dashboard
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="services-footer">
        <div className="services-footer-inner">
          <div>
            <h3>RenewHub</h3>
            <p>Track. Remind. Renew.</p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/documents">Documents</Link>
            <Link to="/renewals">Renewals</Link>
            <Link to="/help">Help & Support</Link>
          </div>
        </div>

        <div className="services-footer-bottom">
          © 2026 RenewHub. Digital Document Renewal Platform.
        </div>
      </footer>
    </div>
  );
}

export default Services;