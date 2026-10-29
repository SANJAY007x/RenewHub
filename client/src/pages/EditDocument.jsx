import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AddDocument.css";

function EditDocument() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    documentName: "",
    documentType: "",
    documentNumber: "",
    holderName: "",
    issuingAuthority: "",
    issueDate: "",
    expiryDate: "",
    notes: "",
  });

  const [reminder90Days, setReminder90Days] = useState(false);
  const [reminder30Days, setReminder30Days] = useState(false);
  const [reminder7Days, setReminder7Days] = useState(false);

  // ============================================================
  // GET AUTH TOKEN
  // ============================================================

  const getToken = () => {
    return (
      localStorage.getItem("renewhub-token") ||
      sessionStorage.getItem("renewhub-token")
    );
  };


  // ============================================================
  // CONVERT DATABASE DATE TO YYYY-MM-DD
  // ============================================================

  const formatDateForInput = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  // ============================================================
  // FETCH DOCUMENT
  // ============================================================

  useEffect(() => {
    const fetchDocument = async () => {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/documents/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const document = response.data.document;

        setFormData({
          documentName: document.document_name || "",
          documentType: document.document_type || "",
          documentNumber: document.document_number || "",
          holderName: document.holder_name || "",
          issuingAuthority: document.issuing_authority || "",
          issueDate: formatDateForInput(document.issue_date),
          expiryDate: formatDateForInput(document.expiry_date),
          notes: document.notes || "",
        });

        setReminder90Days(
          Boolean(document.reminder_90_days)
        );

        setReminder30Days(
          Boolean(document.reminder_30_days)
        );

        setReminder7Days(
          Boolean(document.reminder_7_days)
        );

      } catch (error) {
        console.error("Fetch Document Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("renewhub-token");
          localStorage.removeItem("renewhub-user");

          sessionStorage.removeItem("renewhub-token");
          sessionStorage.removeItem("renewhub-user");

          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load document."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id, navigate]);


  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  // ============================================================
  // HANDLE UPDATE
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);

      await axios.put(
        `http://localhost:5000/api/documents/${id}`,
        {
          documentName: formData.documentName,
          documentType: formData.documentType,
          documentNumber: formData.documentNumber,
          holderName: formData.holderName,
          issuingAuthority: formData.issuingAuthority,
          issueDate: formData.issueDate,
          expiryDate: formData.expiryDate,
          notes: formData.notes,

          reminder90Days,
          reminder30Days,
          reminder7Days,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Document updated successfully.");

      setTimeout(() => {
        navigate("/documents");
      }, 1000);

    } catch (error) {
      console.error("Update Document Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("renewhub-token");
        localStorage.removeItem("renewhub-user");

        sessionStorage.removeItem("renewhub-token");
        sessionStorage.removeItem("renewhub-user");

        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to update document."
      );

    } finally {
      setSaving(false);
    }
  };


  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div className="renewhub-add-page">

        <Navbar />

        <main className="add-document-main">

          <div className="add-breadcrumb">
            <Link to="/dashboard">
              Dashboard
            </Link>

            <span>›</span>

            <Link to="/documents">
              Documents
            </Link>

            <span>›</span>

            <strong>
              Edit Document
            </strong>
          </div>

          <section className="add-page-header">

            <div>

              <span className="add-eyebrow">
                DOCUMENT COLLECTION
              </span>

              <h1>
                Edit Document
              </h1>

              <p>
                Loading your document details...
              </p>

            </div>

            <div className="add-header-icon">
              ✎
            </div>

          </section>

        </main>

      </div>
    );
  }


  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="renewhub-add-page">

      <Navbar />

      <main className="add-document-main">

        {/* =====================================
            BREADCRUMB
        ====================================== */}

        <div className="add-breadcrumb">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <span>›</span>

          <Link to="/documents">
            Documents
          </Link>

          <span>›</span>

          <strong>
            Edit Document
          </strong>

        </div>


        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <section className="add-page-header">

          <div>

            <span className="add-eyebrow">
              DOCUMENT COLLECTION
            </span>

            <h1>
              Edit Document
            </h1>

            <p>
              Update your document details,
              expiry information and reminders.
            </p>

          </div>

          <div className="add-header-icon">
            ✎
          </div>

        </section>


        {/* =====================================
            SUCCESS / ERROR MESSAGE
        ====================================== */}

        {success && (
          <div
            style={{
              marginBottom: "20px",
              padding: "14px 18px",
              borderRadius: "8px",
              background: "#e8f7ee",
              color: "#187a3d",
              border: "1px solid #b8e5c8",
              fontWeight: "500",
            }}
          >
            {success}
          </div>
        )}

        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "14px 18px",
              borderRadius: "8px",
              background: "#fff0f0",
              color: "#c30112",
              border: "1px solid #f3b7bd",
              fontWeight: "500",
            }}
          >
            {error}
          </div>
        )}


        {/* =====================================
            MAIN FORM
        ====================================== */}

        <form
          className="add-document-layout"
          onSubmit={handleSubmit}
          id="manual-details"
        >

          <div className="add-form-content">


            {/* =================================
                SECTION 01
            ================================== */}

            <section className="form-section">

              <div className="form-section-heading">

                <div className="form-number">
                  01
                </div>

                <div>

                  <span>
                    DOCUMENT DETAILS
                  </span>

                  <h2>
                    Basic Information
                  </h2>

                  <p>
                    Update the basic details
                    of your document.
                  </p>

                </div>

              </div>


              <div className="form-grid">


                {/* DOCUMENT NAME */}

                <div className="form-field full">

                  <label htmlFor="documentName">
                    Document Name
                    <span>*</span>
                  </label>

                  <input
                    id="documentName"
                    name="documentName"
                    type="text"
                    placeholder="e.g. Driving Licence"
                    value={formData.documentName}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                {/* DOCUMENT TYPE */}

                <div className="form-field">

                  <label htmlFor="documentType">
                    Document Type
                    <span>*</span>
                  </label>

                  <select
                    id="documentType"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    required
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select document type
                    </option>

                    <option value="certificate">
                      Certificate
                    </option>

                    <option value="licence">
                      Licence
                    </option>

                    <option value="insurance">
                      Insurance
                    </option>

                    <option value="registration">
                      Registration
                    </option>

                    <option value="permit">
                      Permit
                    </option>

                    <option value="membership">
                      Membership
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>


                {/* DOCUMENT NUMBER */}

                <div className="form-field">

                  <label htmlFor="documentNumber">
                    Document Number
                    <span>*</span>
                  </label>

                  <input
                    id="documentNumber"
                    name="documentNumber"
                    type="text"
                    placeholder="Enter document number"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                {/* HOLDER NAME */}

                <div className="form-field full">

                  <label htmlFor="holderName">
                    Holder Name
                  </label>

                  <input
                    id="holderName"
                    name="holderName"
                    type="text"
                    placeholder="Name shown on the document"
                    value={formData.holderName}
                    onChange={handleInputChange}
                  />

                </div>


                {/* ISSUING AUTHORITY */}

                <div className="form-field full">

                  <label htmlFor="issuingAuthority">
                    Issuing Authority
                  </label>

                  <input
                    id="issuingAuthority"
                    name="issuingAuthority"
                    type="text"
                    placeholder="e.g. Transport Department"
                    value={formData.issuingAuthority}
                    onChange={handleInputChange}
                  />

                </div>

              </div>

            </section>


            {/* =================================
                SECTION 02
            ================================== */}

            <section className="form-section">

              <div className="form-section-heading">

                <div className="form-number">
                  02
                </div>

                <div>

                  <span>
                    VALIDITY PERIOD
                  </span>

                  <h2>
                    Issue & Expiry Details
                  </h2>

                  <p>
                    Update the dates that determine
                    your renewal timeline.
                  </p>

                </div>

              </div>


              <div className="form-grid">


                {/* ISSUE DATE */}

                <div className="form-field">

                  <label htmlFor="issueDate">
                    Issue Date
                    <span>*</span>
                  </label>

                  <input
                    id="issueDate"
                    name="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                {/* EXPIRY DATE */}

                <div className="form-field">

                  <label htmlFor="expiryDate">
                    Expiry Date
                    <span>*</span>
                  </label>

                  <input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />

                </div>

              </div>


              <div className="date-note">

                <span>
                  i
                </span>

                <p>
                  Always verify the expiry date against
                  the original document before saving.
                </p>

              </div>

            </section>


            {/* =================================
                SECTION 03
            ================================== */}

            <section className="form-section">

              <div className="form-section-heading">

                <div className="form-number">
                  03
                </div>

                <div>

                  <span>
                    DOCUMENT FILE
                  </span>

                  <h2>
                    Existing Document
                  </h2>

                  <p>
                    Your existing digital copy remains
                    attached to this document.
                  </p>

                </div>

              </div>


              <div className="upload-area has-file">

                <div className="upload-icon">
                  ✓
                </div>

                <strong>
                  Existing document
                </strong>

                <span>
                  The current file is preserved.
                </span>

              </div>

            </section>


            {/* =================================
                SECTION 04
            ================================== */}

            <section className="form-section">

              <div className="form-section-heading">

                <div className="form-number">
                  04
                </div>

                <div>

                  <span>
                    RENEWAL REMINDERS
                  </span>

                  <h2>
                    When should we remind you?
                  </h2>

                  <p>
                    Choose how early you want
                    to receive renewal reminders.
                  </p>

                </div>

              </div>


              <div className="reminder-options">


                {/* 90 DAYS */}

                <label
                  className={`reminder-option ${
                    reminder90Days
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={reminder90Days}
                    onChange={(event) =>
                      setReminder90Days(
                        event.target.checked
                      )
                    }
                  />

                  <div>

                    <strong>
                      90 days before
                    </strong>

                    <span>
                      Early planning reminder
                    </span>

                  </div>

                  <span className="check-mark">
                    ✓
                  </span>

                </label>


                {/* 30 DAYS */}

                <label
                  className={`reminder-option ${
                    reminder30Days
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={reminder30Days}
                    onChange={(event) =>
                      setReminder30Days(
                        event.target.checked
                      )
                    }
                  />

                  <div>

                    <strong>
                      30 days before
                    </strong>

                    <span>
                      Start your renewal
                    </span>

                  </div>

                  <span className="check-mark">
                    ✓
                  </span>

                </label>


                {/* 7 DAYS */}

                <label
                  className={`reminder-option ${
                    reminder7Days
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={reminder7Days}
                    onChange={(event) =>
                      setReminder7Days(
                        event.target.checked
                      )
                    }
                  />

                  <div>

                    <strong>
                      7 days before
                    </strong>

                    <span>
                      Final reminder
                    </span>

                  </div>

                  <span className="check-mark">
                    ✓
                  </span>

                </label>

              </div>

            </section>


            {/* =================================
                SECTION 05
            ================================== */}

            <section className="form-section">

              <div className="form-section-heading">

                <div className="form-number">
                  05
                </div>

                <div>

                  <span>
                    ADDITIONAL INFORMATION
                  </span>

                  <h2>
                    Notes
                  </h2>

                  <p>
                    Update anything useful about
                    this document.
                  </p>

                </div>

              </div>


              <div className="form-field">

                <label htmlFor="notes">
                  Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows="5"
                  placeholder="Add notes, renewal instructions, reference information..."
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>

              </div>

            </section>


            {/* =================================
                FORM ACTIONS
            ================================== */}

            <div className="form-actions">

              <Link
                to="/documents"
                className="cancel-button"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="save-document-button"
                disabled={saving}
              >

                {saving
                  ? "Saving..."
                  : "Update Document"}

                <span>
                  →
                </span>

              </button>

            </div>

          </div>


          {/* =====================================
              SIDEBAR
          ====================================== */}

          <aside className="add-document-sidebar">


            {/* SMART DOCUMENT ENTRY */}

            <div className="sidebar-card reminder-card">

              <div className="sidebar-card-icon">
                ✦
              </div>

              <span>
                DOCUMENT MANAGEMENT
              </span>

              <h3>
                Keep your details
                <br />
                up to date.
              </h3>

              <p>
                Update your document information
                whenever your details or renewal
                dates change.
              </p>

            </div>


            {/* CHECKLIST */}

            <div className="sidebar-card checklist-card">

              <span>
                BEFORE YOU UPDATE
              </span>

              <h3>
                Verify your details
              </h3>

              <ul>

                <li>
                  <span>
                    ✓
                  </span>

                  Document number
                </li>

                <li>
                  <span>
                    ✓
                  </span>

                  Holder name
                </li>

                <li>
                  <span>
                    ✓
                  </span>

                  Issue date
                </li>

                <li>
                  <span>
                    ✓
                  </span>

                  Expiry date
                </li>

              </ul>

            </div>


            {/* SECURITY */}

            <div className="secure-note">

              <span>
                🔒
              </span>

              <div>

                <strong>
                  Your documents stay private
                </strong>

                <p>
                  Only your authenticated account
                  can update this document.
                </p>

              </div>

            </div>

          </aside>

        </form>

      </main>

    </div>
  );
}

export default EditDocument;