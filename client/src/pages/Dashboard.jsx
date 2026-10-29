import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const documents = [
  {
    id: 1,
    name: "Driving Licence",
    type: "Licence",
    expiry: "02 Oct 2026",
    daysLeft: 8,
    status: "urgent",
    icon: "DL",
  },
  {
    id: 2,
    name: "Health Insurance",
    type: "Insurance",
    expiry: "15 Oct 2026",
    daysLeft: 21,
    status: "warning",
    icon: "HI",
  },
  {
    id: 3,
    name: "Passport",
    type: "Certificate",
    expiry: "28 Oct 2026",
    daysLeft: 34,
    status: "upcoming",
    icon: "PP",
  },
  {
    id: 4,
    name: "Vehicle Insurance",
    type: "Insurance",
    expiry: "11 Nov 2026",
    daysLeft: 48,
    status: "upcoming",
    icon: "VI",
  },
  {
    id: 5,
    name: "Income Certificate",
    type: "Certificate",
    expiry: "18 Dec 2026",
    daysLeft: 85,
    status: "active",
    icon: "IC",
  },
  {
    id: 6,
    name: "Community Certificate",
    type: "Certificate",
    expiry: "22 Jan 2027",
    daysLeft: 120,
    status: "active",
    icon: "CC",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  /*
   * Get logged-in user from storage
   *
   * Login.jsx stores the user in either:
   * localStorage OR sessionStorage
   */
  const storedUser =
    localStorage.getItem("renewhub-user") ||
    sessionStorage.getItem("renewhub-user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Unable to read stored user:", error);

    localStorage.removeItem("renewhub-user");
    sessionStorage.removeItem("renewhub-user");

    navigate("/login");
  }

  const userName = user?.fullName || "User";

  const urgentDocuments = documents.filter(
    (document) => document.daysLeft <= 30
  );

  const upcomingDocuments = documents.filter(
    (document) => document.daysLeft > 30
  );

  return (
    <div className="renewhub-dashboard-page">

      <Navbar />

      <main className="dashboard-main">

        {/* Dashboard Header */}
        <section className="dashboard-welcome">

          <div>
            <span className="dashboard-eyebrow">
              PERSONAL DOCUMENT CENTER
            </span>

            <h1>
              Good morning, <strong>{userName}</strong>
            </h1>

            <p>
              Keep your important documents active, organized and
              ready for renewal.
            </p>
          </div>

          <div className="dashboard-date">
            <span>THURSDAY</span>
            <strong>24</strong>
            <small>SEP 2026</small>
          </div>

        </section>


        {/* Renewal Control Center */}
        <section className="renewal-control">

          <div className="control-header">

            <div>
              <span className="control-label">
                RENEWAL CONTROL CENTER
              </span>

              <h2>
                Your document status at a glance
              </h2>
            </div>

            <Link to="/documents">
              View All Documents →
            </Link>

          </div>


          {/* Statistics */}
          <div className="dashboard-statistics">

            <div className="dashboard-stat total">
              <div className="stat-icon">◎</div>

              <div>
                <strong>24</strong>
                <span>Total Documents</span>
              </div>
            </div>


            <div className="dashboard-stat active">
              <div className="stat-icon">✓</div>

              <div>
                <strong>18</strong>
                <span>Active</span>
              </div>
            </div>


            <div className="dashboard-stat warning">
              <div className="stat-icon">!</div>

              <div>
                <strong>4</strong>
                <span>Expiring Soon</span>
              </div>
            </div>


            <div className="dashboard-stat expired">
              <div className="stat-icon">×</div>

              <div>
                <strong>2</strong>
                <span>Expired</span>
              </div>
            </div>

          </div>


          {/* Expiry Pulse */}
          <div className="expiry-pulse">

            <div className="pulse-heading">
              <span>EXPIRY PULSE</span>

              <small>
                Documents approaching their renewal date
              </small>
            </div>

            <div className="pulse-timeline">

              <div className="pulse-point danger">
                <span>7</span>
                <small>DAYS</small>
              </div>

              <div className="pulse-line"></div>

              <div className="pulse-point warning">
                <span>30</span>
                <small>DAYS</small>
              </div>

              <div className="pulse-line"></div>

              <div className="pulse-point safe">
                <span>60</span>
                <small>DAYS</small>
              </div>

              <div className="pulse-line"></div>

              <div className="pulse-point future">
                <span>90+</span>
                <small>DAYS</small>
              </div>

            </div>

          </div>

        </section>


        {/* Attention + Upcoming */}
        <section className="dashboard-two-column">

          {/* Needs Attention */}
          <div className="dashboard-panel attention-panel">

            <div className="panel-heading">

              <div>
                <span>PRIORITY</span>
                <h2>Needs Your Attention</h2>
              </div>

              <span className="panel-count">
                {urgentDocuments.length}
              </span>

            </div>


            <div className="attention-list">

              {urgentDocuments.map((document) => (

                <div
                  className={`attention-item ${document.status}`}
                  key={document.id}
                >

                  <div className="document-mini-icon">
                    {document.icon}
                  </div>

                  <div className="attention-content">

                    <strong>{document.name}</strong>

                    <span>
                      {document.type}
                    </span>

                    <small>
                      Expires {document.expiry}
                    </small>

                  </div>

                  <div className="attention-action">

                    <strong>
                      {document.daysLeft}
                    </strong>

                    <span>days</span>

                    <Link to="/renewals">
                      Renew →
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* Upcoming Renewals */}
          <div className="dashboard-panel upcoming-panel">

            <div className="panel-heading">

              <div>
                <span>COMING UP</span>
                <h2>Upcoming Renewals</h2>
              </div>

              <Link to="/renewals">
                View All
              </Link>

            </div>


            <div className="upcoming-list">

              {upcomingDocuments.slice(0, 3).map((document) => (

                <div
                  className="upcoming-item"
                  key={document.id}
                >

                  <div className="upcoming-icon">
                    {document.icon}
                  </div>

                  <div className="upcoming-content">

                    <strong>{document.name}</strong>

                    <span>
                      {document.type}
                    </span>

                    <div className="expiry-progress">

                      <div
                        className="expiry-progress-fill"
                        style={{
                          width: `${Math.max(
                            15,
                            100 - document.daysLeft
                          )}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                  <div className="upcoming-days">

                    <strong>
                      {document.daysLeft}
                    </strong>

                    <span>days</span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* Document Collection */}
        <section className="document-section">

          <div className="document-section-heading">

            <div>
              <span>DOCUMENT COLLECTION</span>

              <h2>
                Your Documents
              </h2>
            </div>

            <Link to="/documents">
              Manage Documents →
            </Link>

          </div>


          {/* Filters */}
          <div className="document-filters">

            <button className="active">
              All Documents
            </button>

            <button>
              Certificates
            </button>

            <button>
              Licences
            </button>

            <button>
              Insurance
            </button>

            <button>
              Registrations
            </button>

          </div>


          {/* Document Cards */}
          <div className="document-grid">

            {documents.map((document) => (

              <article
                className="document-card"
                key={document.id}
              >

                <div className="document-card-top">

                  <div className="document-card-icon">
                    {document.icon}
                  </div>

                  <span
                    className={`document-status ${document.status}`}
                  >
                    {document.status === "urgent"
                      ? "URGENT"
                      : document.status === "warning"
                      ? "EXPIRING"
                      : document.status === "active"
                      ? "ACTIVE"
                      : "UPCOMING"}
                  </span>

                </div>


                <div className="document-card-body">

                  <span>
                    {document.type}
                  </span>

                  <h3>
                    {document.name}
                  </h3>

                  <p>
                    Valid until
                  </p>

                  <strong>
                    {document.expiry}
                  </strong>

                </div>


                <div className="document-card-footer">

                  <span>
                    {document.daysLeft} days remaining
                  </span>

                  <Link to="/documents">
                    →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* Quick Actions */}
        <section className="quick-actions">

          <div className="quick-action-heading">

            <span>QUICK ACTIONS</span>

            <h2>
              What would you like to do?
            </h2>

          </div>


          <div className="quick-action-grid">

            <Link
              to="/documents/add"
              className="quick-action add"
            >

              <span className="quick-action-icon">+</span>

              <div>
                <strong>Add Document</strong>
                <small>
                  Add a new certificate or document
                </small>
              </div>

              <span className="quick-arrow">→</span>

            </Link>


            <Link
              to="/renewals"
              className="quick-action renew"
            >

              <span className="quick-action-icon">↻</span>

              <div>
                <strong>Start Renewal</strong>
                <small>
                  Renew an expiring document
                </small>
              </div>

              <span className="quick-arrow">→</span>

            </Link>


            <Link
              to="/notifications"
              className="quick-action alert"
            >

              <span className="quick-action-icon">!</span>

              <div>
                <strong>View Alerts</strong>
                <small>
                  Check your latest reminders
                </small>
              </div>

              <span className="quick-arrow">→</span>

            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;