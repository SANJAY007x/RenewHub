import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Renewals.css";

const initialRenewals = [
  {
    id: 1,
    name: "Driving Licence",
    type: "Licence",
    icon: "DL",
    expiry: "02 Oct 2026",
    daysLeft: 8,
    status: "urgent",
    renewalStatus: "Not Started",
    authority: "Transport Department, Tamil Nadu",
  },
  {
    id: 2,
    name: "Health Insurance",
    type: "Insurance",
    icon: "HI",
    expiry: "15 Oct 2026",
    daysLeft: 21,
    status: "warning",
    renewalStatus: "Not Started",
    authority: "Insurance Provider",
  },
  {
    id: 3,
    name: "Passport",
    type: "Certificate",
    icon: "PP",
    expiry: "28 Oct 2026",
    daysLeft: 34,
    status: "upcoming",
    renewalStatus: "Not Started",
    authority: "Passport Seva",
  },
  {
    id: 4,
    name: "Vehicle Insurance",
    type: "Insurance",
    icon: "VI",
    expiry: "11 Nov 2026",
    daysLeft: 48,
    status: "upcoming",
    renewalStatus: "In Progress",
    authority: "Insurance Provider",
  },
  {
    id: 5,
    name: "Income Certificate",
    type: "Certificate",
    icon: "IC",
    expiry: "18 Dec 2026",
    daysLeft: 85,
    status: "active",
    renewalStatus: "Not Required",
    authority: "Revenue Administration",
  },
  {
    id: 6,
    name: "Community Certificate",
    type: "Certificate",
    icon: "CC",
    expiry: "22 Jan 2027",
    daysLeft: 120,
    status: "active",
    renewalStatus: "Not Required",
    authority: "Revenue Administration",
  },
];

const renewalHistory = [
  {
    id: 1,
    name: "Community Certificate",
    type: "Certificate",
    completedDate: "18 Sep 2026",
    status: "Completed",
    reference: "RH-2026-0918-001",
  },
  {
    id: 2,
    name: "Income Certificate",
    type: "Certificate",
    completedDate: "05 Aug 2026",
    status: "Completed",
    reference: "RH-2026-0805-014",
  },
  {
    id: 3,
    name: "Vehicle Registration",
    type: "Registration",
    completedDate: "12 Jun 2026",
    status: "Completed",
    reference: "RH-2026-0612-008",
  },
];

function Renewals() {
  const [renewals, setRenewals] = useState(initialRenewals);
  const [activeFilter, setActiveFilter] = useState("all");

  const urgentCount = renewals.filter(
    (renewal) => renewal.daysLeft <= 30
  ).length;

  const inProgressCount = renewals.filter(
    (renewal) => renewal.renewalStatus === "In Progress"
  ).length;

  const completedCount = renewalHistory.filter(
    (item) => item.status === "Completed"
  ).length;

  const expiredCount = renewals.filter(
    (renewal) => renewal.daysLeft < 0
  ).length;

  const filteredRenewals = renewals.filter((renewal) => {
    if (activeFilter === "urgent") {
      return renewal.daysLeft <= 30;
    }

    if (activeFilter === "progress") {
      return renewal.renewalStatus === "In Progress";
    }

    if (activeFilter === "upcoming") {
      return renewal.daysLeft > 30;
    }

    return true;
  });

  const startRenewal = (id) => {
    setRenewals((previousRenewals) =>
      previousRenewals.map((renewal) =>
        renewal.id === id
          ? {
              ...renewal,
              renewalStatus: "In Progress",
            }
          : renewal
      )
    );
  };

  const getStatusLabel = (renewal) => {
    if (renewal.daysLeft < 0) {
      return "EXPIRED";
    }

    if (renewal.daysLeft <= 7) {
      return "URGENT";
    }

    if (renewal.daysLeft <= 30) {
      return "EXPIRING SOON";
    }

    if (renewal.daysLeft <= 60) {
      return "UPCOMING";
    }

    return "ACTIVE";
  };

  const getStatusClass = (renewal) => {
    if (renewal.daysLeft < 0) {
      return "expired";
    }

    if (renewal.daysLeft <= 7) {
      return "urgent";
    }

    if (renewal.daysLeft <= 30) {
      return "warning";
    }

    if (renewal.daysLeft <= 60) {
      return "upcoming";
    }

    return "active";
  };

  return (
    <div className="renewhub-renewals-page">

      <Navbar />

      <main className="renewals-main">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <section className="renewals-header">

          <div className="renewals-header-content">

            <span className="renewals-eyebrow">
              RENEWAL MANAGEMENT CENTER
            </span>

            <h1>
              Stay Ahead of Every Renewal.
            </h1>

            <p>
              Track upcoming renewals, monitor your
              progress and keep every important document
              active.
            </p>

          </div>

          <div className="renewal-header-mark">

            <span className="header-ring"></span>

            <strong>
              ↻
            </strong>

          </div>

        </section>


        {/* =====================================
            RENEWAL OVERVIEW
        ====================================== */}

        <section className="renewal-overview">

          <div className="overview-heading">

            <div>

              <span>
                RENEWAL OVERVIEW
              </span>

              <h2>
                Your renewal status
              </h2>

            </div>

            <Link to="/documents">
              Manage Documents →
            </Link>

          </div>


          <div className="renewal-stat-grid">

            <div className="renewal-stat urgent-stat">

              <div className="renewal-stat-icon">
                !
              </div>

              <div>

                <strong>
                  {urgentCount}
                </strong>

                <span>
                  Needs Attention
                </span>

              </div>

            </div>


            <div className="renewal-stat progress-stat">

              <div className="renewal-stat-icon">
                ↻
              </div>

              <div>

                <strong>
                  {inProgressCount}
                </strong>

                <span>
                  In Progress
                </span>

              </div>

            </div>


            <div className="renewal-stat completed-stat">

              <div className="renewal-stat-icon">
                ✓
              </div>

              <div>

                <strong>
                  {completedCount}
                </strong>

                <span>
                  Completed
                </span>

              </div>

            </div>


            <div className="renewal-stat expired-stat">

              <div className="renewal-stat-icon">
                ×
              </div>

              <div>

                <strong>
                  {expiredCount}
                </strong>

                <span>
                  Expired
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            RENEWAL TIMELINE
        ====================================== */}

        <section className="renewal-timeline-section">

          <div className="timeline-heading">

            <div>

              <span>
                EXPIRY TIMELINE
              </span>

              <h2>
                Plan your renewals
              </h2>

            </div>

            <p>
              Earlier action gives you more time to
              complete the renewal process.
            </p>

          </div>


          <div className="renewal-timeline">

            <div className="timeline-point danger">

              <div className="timeline-circle">
                7
              </div>

              <strong>
                DAYS
              </strong>

              <span>
                Immediate attention
              </span>

            </div>


            <div className="timeline-connector"></div>


            <div className="timeline-point warning">

              <div className="timeline-circle">
                30
              </div>

              <strong>
                DAYS
              </strong>

              <span>
                Start renewal
              </span>

            </div>


            <div className="timeline-connector"></div>


            <div className="timeline-point safe">

              <div className="timeline-circle">
                60
              </div>

              <strong>
                DAYS
              </strong>

              <span>
                Plan ahead
              </span>

            </div>


            <div className="timeline-connector"></div>


            <div className="timeline-point future">

              <div className="timeline-circle">
                90+
              </div>

              <strong>
                DAYS
              </strong>

              <span>
                No action yet
              </span>

            </div>

          </div>

        </section>


        {/* =====================================
            PRIORITY RENEWALS
        ====================================== */}

        <section className="priority-renewals">

          <div className="renewals-section-heading">

            <div>

              <span>
                RENEWAL QUEUE
              </span>

              <h2>
                Documents to Renew
              </h2>

            </div>

            <span className="renewal-result-count">
              {filteredRenewals.length} documents
            </span>

          </div>


          {/* Filters */}

          <div className="renewal-filters">

            <button
              type="button"
              className={
                activeFilter === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("all")
              }
            >
              All
            </button>

            <button
              type="button"
              className={
                activeFilter === "urgent"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("urgent")
              }
            >
              Needs Attention
            </button>

            <button
              type="button"
              className={
                activeFilter === "progress"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("progress")
              }
            >
              In Progress
            </button>

            <button
              type="button"
              className={
                activeFilter === "upcoming"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("upcoming")
              }
            >
              Upcoming
            </button>

          </div>


          {/* Renewal Cards */}

          <div className="renewal-card-list">

            {filteredRenewals.length > 0 ? (

              filteredRenewals.map((renewal) => (

                <article
                  className={`renewal-card ${getStatusClass(
                    renewal
                  )}`}
                  key={renewal.id}
                >

                  <div className="renewal-card-icon">
                    {renewal.icon}
                  </div>


                  <div className="renewal-card-main">

                    <div className="renewal-card-title">

                      <div>

                        <span>
                          {renewal.type}
                        </span>

                        <h3>
                          {renewal.name}
                        </h3>

                      </div>

                      <span
                        className={`renewal-status-badge ${getStatusClass(
                          renewal
                        )}`}
                      >
                        {getStatusLabel(renewal)}
                      </span>

                    </div>


                    <div className="renewal-card-details">

                      <div>

                        <span>
                          EXPIRY DATE
                        </span>

                        <strong>
                          {renewal.expiry}
                        </strong>

                      </div>


                      <div>

                        <span>
                          TIME LEFT
                        </span>

                        <strong
                          className={
                            renewal.daysLeft <= 30
                              ? "danger-text"
                              : ""
                          }
                        >
                          {renewal.daysLeft > 0
                            ? `${renewal.daysLeft} days`
                            : "Expired"}
                        </strong>

                      </div>


                      <div>

                        <span>
                          AUTHORITY
                        </span>

                        <strong>
                          {renewal.authority}
                        </strong>

                      </div>

                    </div>


                    <div className="renewal-progress">

                      <div className="progress-track">

                        <div
                          className={`progress-fill ${getStatusClass(
                            renewal
                          )}`}
                          style={{
                            width: `${Math.max(
                              8,
                              Math.min(
                                100,
                                100 -
                                  renewal.daysLeft
                              )
                            )}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                  </div>


                  <div className="renewal-card-action">

                    {renewal.renewalStatus ===
                    "In Progress" ? (

                      <Link
                        to="/renewals"
                        className="renewal-action progress-action"
                      >
                        Continue
                        <span>
                          →
                        </span>
                      </Link>

                    ) : renewal.daysLeft <= 30 ? (

                      <button
                        type="button"
                        className="renewal-action"
                        onClick={() =>
                          startRenewal(
                            renewal.id
                          )
                        }
                      >
                        Start Renewal
                        <span>
                          →
                        </span>
                      </button>

                    ) : (

                      <button
                        type="button"
                        className="renewal-action secondary-action"
                        onClick={() =>
                          startRenewal(
                            renewal.id
                          )
                        }
                      >
                        Plan Renewal
                        <span>
                          →
                        </span>
                      </button>

                    )}

                    <Link
                      to="/documents"
                      className="view-document-link"
                    >
                      View Document
                    </Link>

                  </div>

                </article>

              ))

            ) : (

              <div className="renewal-empty">

                <div>
                  ✓
                </div>

                <h3>
                  No renewals found
                </h3>

                <p>
                  There are no documents matching
                  this filter.
                </p>

              </div>

            )}

          </div>

        </section>


        {/* =====================================
            RENEWAL PROCESS
        ====================================== */}

        <section className="renewal-process">

          <div className="process-heading">

            <span>
              HOW RENEWAL WORKS
            </span>

            <h2>
              From reminder to renewal
            </h2>

          </div>


          <div className="process-grid">

            <div className="process-step">

              <div className="process-number">
                01
              </div>

              <div className="process-icon">
                !
              </div>

              <h3>
                Get Alerted
              </h3>

              <p>
                RenewHub monitors your expiry dates
                and reminds you before they arrive.
              </p>

            </div>


            <div className="process-line"></div>


            <div className="process-step">

              <div className="process-number">
                02
              </div>

              <div className="process-icon">
                ↻
              </div>

              <h3>
                Start Renewal
              </h3>

              <p>
                Check the official renewal process
                and prepare the required documents.
              </p>

            </div>


            <div className="process-line"></div>


            <div className="process-step">

              <div className="process-number">
                03
              </div>

              <div className="process-icon">
                ✓
              </div>

              <h3>
                Complete & Track
              </h3>

              <p>
                Complete the renewal and keep your
                updated document information in RenewHub.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            RENEWAL HISTORY
        ====================================== */}

        <section className="renewal-history">

          <div className="history-heading">

            <div>

              <span>
                RENEWAL HISTORY
              </span>

              <h2>
                Recently Completed
              </h2>

            </div>

            <button
              type="button"
              className="history-link"
            >
              View Full History →
            </button>

          </div>


          <div className="history-table">

            <div className="history-table-header">

              <span>
                DOCUMENT
              </span>

              <span>
                TYPE
              </span>

              <span>
                COMPLETED
              </span>

              <span>
                REFERENCE
              </span>

              <span>
                STATUS
              </span>

            </div>


            {renewalHistory.map((item) => (

              <div
                className="history-row"
                key={item.id}
              >

                <strong>
                  {item.name}
                </strong>

                <span>
                  {item.type}
                </span>

                <span>
                  {item.completedDate}
                </span>

                <span className="history-reference">
                  {item.reference}
                </span>

                <span className="history-status">
                  ✓ {item.status}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================
            BOTTOM CTA
        ====================================== */}

        <section className="renewal-bottom-cta">

          <div>

            <span>
              KEEP YOUR DOCUMENTS ACTIVE
            </span>

            <h2>
              Have another document to track?
            </h2>

            <p>
              Add it to RenewHub and we'll help you
              stay on top of its renewal date.
            </p>

          </div>

          <Link
            to="/documents/add"
            className="renewal-cta-button"
          >
            + Add Document
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Renewals;