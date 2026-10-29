
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Documents.css";

function Documents() {
  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("expiry");

  // =====================================================
  // GET DAYS LEFT
  // =====================================================

  const getDaysLeft = (expiryDate) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const expiry = new Date(expiryDate);

    expiry.setHours(0, 0, 0, 0);

    const difference =
      expiry.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // =====================================================
  // GET DOCUMENT STATUS
  // =====================================================

  const getDocumentStatus = (daysLeft) => {
    if (daysLeft < 0) {
      return "expired";
    }

    if (daysLeft <= 7) {
      return "urgent";
    }

    if (daysLeft <= 30) {
      return "warning";
    }

    if (daysLeft <= 90) {
      return "upcoming";
    }

    return "active";
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // GET DOCUMENT ICON
  // =====================================================

  const getDocumentIcon = (name) => {
    if (!name) {
      return "DO";
    }

    const words = name
      .trim()
      .split(/\s+/);

    if (words.length === 1) {
      return words[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return words
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // =====================================================
  // CONVERT API DATA TO EXISTING UI FORMAT
  // =====================================================

  const formatDocuments = (apiDocuments) => {
    return apiDocuments.map((document) => {
      const daysLeft = getDaysLeft(
        document.expiry_date
      );

      return {
        ...document,

        id: document.id,

        name: document.document_name,

        type: document.document_type,

        category: document.document_type,

        expiry: formatDate(
          document.expiry_date
        ),

        daysLeft,

        status:
          getDocumentStatus(daysLeft),

        icon:
          getDocumentIcon(
            document.document_name
          ),
      };
    });
  };

  // =====================================================
  // FETCH DOCUMENTS
  // =====================================================

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem(
            "renewhub-token"
          ) ||
          sessionStorage.getItem(
            "renewhub-token"
          );

        if (!token) {
          setError(
            "Your session has expired. Please login again."
          );

          setLoading(false);

          return;
        }

        const response =
          await axios.get(
            "http://localhost:5000/api/documents",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const apiDocuments =
          response.data.documents || [];

        const formattedDocuments =
          formatDocuments(
            apiDocuments
          );

        setDocuments(
          formattedDocuments
        );

      } catch (error) {
        console.error(
          "Fetch Documents Error:",
          error
        );

        if (
          error.response?.status === 401
        ) {
          localStorage.removeItem(
            "renewhub-token"
          );

          localStorage.removeItem(
            "renewhub-user"
          );

          sessionStorage.removeItem(
            "renewhub-token"
          );

          sessionStorage.removeItem(
            "renewhub-user"
          );

          window.location.href =
            "/login";

          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load your documents."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredDocuments =
    useMemo(() => {
      let result = [...documents];

      // SEARCH
      if (
        searchTerm.trim()
      ) {
        const search =
          searchTerm
            .trim()
            .toLowerCase();

        result =
          result.filter(
            (document) =>
              document.name
                ?.toLowerCase()
                .includes(search) ||

              document.type
                ?.toLowerCase()
                .includes(search) ||

              document.document_number
                ?.toLowerCase()
                .includes(search) ||

              document.holder_name
                ?.toLowerCase()
                .includes(search)
          );
      }

      // CATEGORY
      if (
        activeCategory !==
        "All"
      ) {
        result =
          result.filter(
            (document) =>
              document.category
                ?.toLowerCase() ===
              activeCategory.toLowerCase()
          );
      }

      // SORT
      if (
        sortBy === "expiry"
      ) {
        result.sort(
          (a, b) =>
            new Date(
              a.expiry_date
            ) -
            new Date(
              b.expiry_date
            )
        );
      }

      if (
        sortBy === "name"
      ) {
        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      if (
        sortBy === "newest"
      ) {
        result.sort(
          (a, b) =>
            new Date(
              b.created_at
            ) -
            new Date(
              a.created_at
            )
        );
      }

      return result;
    }, [
      documents,
      searchTerm,
      activeCategory,
      sortBy,
    ]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalDocuments =
    documents.length;

  const activeDocuments =
    documents.filter(
      (document) =>
        document.daysLeft > 30
    ).length;

  const expiringDocuments =
    documents.filter(
      (document) =>
        document.daysLeft >= 0 &&
        document.daysLeft <= 30
    ).length;

  const expiredDocuments =
    documents.filter(
      (document) =>
        document.daysLeft < 0
    ).length;

  // =====================================================
  // CATEGORY COUNTS
  // =====================================================

  const certificateCount =
    documents.filter(
      (document) =>
        document.type?.toLowerCase() ===
        "certificate"
    ).length;

  const licenceCount =
    documents.filter(
      (document) =>
        document.type?.toLowerCase() ===
        "licence"
    ).length;

  const insuranceCount =
    documents.filter(
      (document) =>
        document.type?.toLowerCase() ===
        "insurance"
    ).length;

  const registrationCount =
    documents.filter(
      (document) =>
        document.type?.toLowerCase() ===
        "registration"
    ).length;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="renewhub-documents-page">

      <Navbar />

      <main className="documents-main">

        {/* =====================================
            HERO
        ====================================== */}

        <section className="documents-hero">

          <div className="documents-hero-content">

            <span className="documents-eyebrow">
              DOCUMENT COLLECTION
            </span>

            <h1>
              Your Documents
            </h1>

            <p>
              Keep track of all your important
              certificates, licences, insurance
              and registrations in one secure
              place.
            </p>

          </div>


          {/* HERO DECORATION */}

          <div className="documents-hero-decoration">

            <div className="hero-document-card card-back">
              <span>
                DOC
              </span>

              <small>
                DOCUMENT
              </small>
            </div>


            <div className="hero-document-card card-middle">
              <span>
                ID
              </span>

              <small>
                RENEWHUB
              </small>
            </div>


            <div className="hero-document-card card-front">
              <span>
                ✓
              </span>

              <small>
                TRACKED
              </small>
            </div>

          </div>

        </section>


        {/* =====================================
            OVERVIEW
        ====================================== */}

        <section className="documents-overview">

          {/* TOTAL */}

          <div className="overview-item">

            <span className="overview-icon total">
              ◎
            </span>

            <div>

              <strong>
                {totalDocuments}
              </strong>

              <span>
                Total Documents
              </span>

            </div>

          </div>


          {/* ACTIVE */}

          <div className="overview-item">

            <span className="overview-icon active">
              ✓
            </span>

            <div>

              <strong>
                {activeDocuments}
              </strong>

              <span>
                Active
              </span>

            </div>

          </div>


          {/* EXPIRING */}

          <div className="overview-item">

            <span className="overview-icon warning">
              !
            </span>

            <div>

              <strong>
                {expiringDocuments}
              </strong>

              <span>
                Expiring Soon
              </span>

            </div>

          </div>


          {/* EXPIRED */}

          <div className="overview-item">

            <span className="overview-icon expired">
              ×
            </span>

            <div>

              <strong>
                {expiredDocuments}
              </strong>

              <span>
                Expired
              </span>

            </div>

          </div>

        </section>


        {/* =====================================
            TOOLBAR
        ====================================== */}

        <section className="documents-toolbar">

          {/* SEARCH */}

          <div className="documents-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>


          {/* ACTIONS */}

          <div className="documents-actions">

            <button
              type="button"
              className="filter-button"
            >
              ☰
              Filter
            </button>


            <select
              className="sort-button"
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value
                )
              }
            >

              <option value="expiry">
                Sort by Expiry
              </option>

              <option value="name">
                Sort by Name
              </option>

              <option value="newest">
                Recently Added
              </option>

            </select>


            <Link
              to="/documents/add"
              className="add-document-button"
            >

              <span>
                +
              </span>

              Add Document

            </Link>

          </div>

        </section>


        {/* =====================================
            CATEGORY TABS
        ====================================== */}

        <section className="document-category-section">

          <div className="category-tabs">

            <button
              type="button"
              className={`category-tab ${
                activeCategory === "All"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(
                  "All"
                )
              }
            >

              All

              <span>
                {totalDocuments}
              </span>

            </button>


            <button
              type="button"
              className={`category-tab ${
                activeCategory ===
                "Certificate"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(
                  "Certificate"
                )
              }
            >

              Certificates

              <span>
                {certificateCount}
              </span>

            </button>


            <button
              type="button"
              className={`category-tab ${
                activeCategory ===
                "Licence"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(
                  "Licence"
                )
              }
            >

              Licences

              <span>
                {licenceCount}
              </span>

            </button>


            <button
              type="button"
              className={`category-tab ${
                activeCategory ===
                "Insurance"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(
                  "Insurance"
                )
              }
            >

              Insurance

              <span>
                {insuranceCount}
              </span>

            </button>


            <button
              type="button"
              className={`category-tab ${
                activeCategory ===
                "Registration"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(
                  "Registration"
                )
              }
            >

              Registrations

              <span>
                {registrationCount}
              </span>

            </button>

          </div>

        </section>


        {/* =====================================
            DOCUMENT GRID SECTION
        ====================================== */}

        <section className="documents-grid-section">

          <div className="documents-section-heading">

            <div>

              <span>
                YOUR COLLECTION
              </span>

              <h2>
                All Documents
              </h2>

            </div>

            <p>
              {filteredDocuments.length}{" "}
              {filteredDocuments.length === 1
                ? "document"
                : "documents"}
            </p>

          </div>


          {/* LOADING */}

          {loading && (
            <div
              style={{
                padding: "50px 20px",
                textAlign: "center",
                color: "#587592",
              }}
            >
              Loading your documents...
            </div>
          )}


          {/* ERROR */}

          {!loading &&
            error && (
              <div
                style={{
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  background: "#ffe9eb",
                  color: "#c30112",
                  border: "1px solid #f3b7bd",
                }}
              >
                {error}
              </div>
            )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredDocuments.length === 0 && (

              <div
                style={{
                  padding: "60px 20px",
                  textAlign: "center",
                  color: "#587592",
                }}
              >

                <h3
                  style={{
                    marginBottom: "8px",
                    color: "#092039",
                  }}
                >
                  No documents found
                </h3>

                <p>
                  {searchTerm ||
                  activeCategory !== "All"
                    ? "Try changing your search or category filter."
                    : "Add your first document to start tracking renewals."}
                </p>

                {!searchTerm &&
                  activeCategory ===
                    "All" && (
                    <Link
                      to="/documents/add"
                      className="add-document-button"
                      style={{
                        display:
                          "inline-flex",
                        marginTop:
                          "20px",
                      }}
                    >
                      <span>
                        +
                      </span>

                      Add Document
                    </Link>
                  )}

              </div>

            )}


          {/* DOCUMENT CARDS */}

          {!loading &&
            !error &&
            filteredDocuments.length >
              0 && (

              <div className="documents-grid">

                {filteredDocuments.map(
                  (document) => (

                    <article
                      className={`document-management-card ${document.status}`}
                      key={document.id}
                    >

                      {/* CARD TOP */}

                      <div className="management-card-top">

                        <div className="management-icon">
                          {document.icon}
                        </div>


                        <span
                          className={`management-status ${document.status}`}
                        >

                          {document.status ===
                            "urgent" &&
                            "URGENT"}

                          {document.status ===
                            "warning" &&
                            "EXPIRING"}

                          {document.status ===
                            "active" &&
                            "ACTIVE"}

                          {document.status ===
                            "upcoming" &&
                            "UPCOMING"}

                          {document.status ===
                            "expired" &&
                            "EXPIRED"}

                        </span>


                        <button
                          type="button"
                          className="more-button"
                          aria-label="More options"
                        >
                          ⋮
                        </button>

                      </div>


                      {/* CARD CONTENT */}

                      <div className="management-card-content">

                        <span className="management-type">
                          {document.type}
                        </span>


                        <h3>
                          {document.name}
                        </h3>


                        {document.document_number && (
                          <div
                            style={{
                              marginTop:
                                "8px",
                              color:
                                "#8293a5",
                              fontSize:
                                "10px",
                            }}
                          >
                            {document.document_number}
                          </div>
                        )}


                        <div className="expiry-information">

                          <span>
                            EXPIRY DATE
                          </span>

                          <strong>
                            {document.expiry}
                          </strong>

                        </div>


                        {/* REMAINING DAYS */}

                        <div className="remaining-days">

                          <div className="remaining-label">

                            <span>
                              Remaining
                            </span>

                            <strong>
                              {document.daysLeft < 0
                                ? "Expired"
                                : `${document.daysLeft} days`}
                            </strong>

                          </div>


                          <div className="remaining-bar">

                            <div
                              className="remaining-fill"
                              style={{
                                width:
                                  document.daysLeft <
                                  0
                                    ? "0%"
                                    : `${Math.min(
                                        100,
                                        Math.max(
                                          0,
                                          (document.daysLeft /
                                            365) *
                                            100
                                        )
                                      )}%`,
                              }}
                            ></div>

                          </div>

                        </div>

                      </div>


                      {/* CARD FOOTER */}

                      <div className="management-card-footer">

                        <Link
                          to={`/documents/${document.id}`}
                        >
                          View
                        </Link>


                        <Link
                          to={`/documents/${document.id}/edit`}
                        >
                          Edit
                        </Link>


                        {(document.status ===
                          "urgent" ||
                          document.status ===
                            "warning" ||
                          document.status ===
                            "expired") && (

                          <Link
                            to="/renewals"
                            className="renew-card-button"
                          >
                            Renew
                          </Link>

                        )}

                      </div>

                    </article>

                  )
                )}

              </div>

            )}

        </section>


        {/* =====================================
            BOTTOM CTA
        ====================================== */}

        <section className="documents-bottom-cta">

          <div className="cta-symbol">
            +
          </div>


          <div>

            <span>
              STAY ORGANIZED
            </span>

            <h2>
              Keep every important document
              in one place.
            </h2>

            <p>
              Add certificates, licences,
              insurance and registrations to
              keep track of their expiry dates.
            </p>

          </div>


          <Link
            to="/documents/add"
          >
            Add Document
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Documents;

