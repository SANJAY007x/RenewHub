
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ScanDocument from "../components/ScanDocument";
import "./AddDocument.css";

function AddDocument() {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [reminder90Days, setReminder90Days] = useState(true);
  const [reminder30Days, setReminder30Days] = useState(true);
  const [reminder7Days, setReminder7Days] = useState(false);

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

  /* =========================================
     HANDLE FORM INPUT
  ========================================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  /* =========================================
     HANDLE FILE UPLOAD
  ========================================= */

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  };

  /* =========================================
     HANDLE FORM SUBMIT
  ========================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const token =
      localStorage.getItem("renewhub-token") ||
      sessionStorage.getItem("renewhub-token");

    if (!token) {
      setError("Your session has expired. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/documents",
        {
          documentName: formData.documentName,
          documentType: formData.documentType,
          documentNumber: formData.documentNumber,
          holderName: formData.holderName,
          issuingAuthority: formData.issuingAuthority,
          issueDate: formData.issueDate,
          expiryDate: formData.expiryDate,
          notes: formData.notes,
          fileName: fileName || null,
          filePath: null,
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

      console.log("Document saved:", response.data);

      setSuccess(
        response.data.message || "Document saved successfully."
      );

      setTimeout(() => {
        navigate("/documents");
      }, 800);
    } catch (error) {
      console.error("Add Document Error:", error);

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
          "Unable to save document. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     HANDLE SCANNER RESULT
  ========================================= */

  const handleDocumentReady = (data) => {
    console.log("Extracted document details:", data);

    setFormData((previousData) => ({
      ...previousData,
      ...data,
    }));

    setScannerOpen(false);
  };

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
            Add Document
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
              Add a New Document
            </h1>

            <p>
              Scan your document to automatically fill its
              details, or enter the information manually.
            </p>

          </div>

          <div className="add-header-icon">
            +
          </div>

        </section>


        {/* =====================================
            SCAN / MANUAL CHOICE
        ====================================== */}

        <section className="document-entry-choice">

          <div className="entry-choice-heading">

            <span>
              HOW WOULD YOU LIKE TO ADD IT?
            </span>

            <h2>
              Choose your preferred method
            </h2>

          </div>


          <div className="entry-choice-grid">

            {/* SCAN */}

            <button
              type="button"
              className="entry-choice-card scan"
              onClick={() => setScannerOpen(true)}
            >

              <div className="entry-choice-icon">
                ⌕
              </div>

              <div className="entry-choice-content">

                <div className="entry-choice-title">

                  <strong>
                    Scan & Auto-Fill
                  </strong>

                  <span className="recommended-badge">
                    RECOMMENDED
                  </span>

                </div>

                <p>
                  Scan or upload a document and let
                  RenewHub fill the details automatically.
                </p>

              </div>

              <span className="entry-choice-arrow">
                →
              </span>

            </button>


            {/* MANUAL */}

            <button
              type="button"
              className="entry-choice-card manual"
              onClick={() =>
                document
                  .getElementById("manual-details")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >

              <div className="entry-choice-icon">
                ✎
              </div>

              <div className="entry-choice-content">

                <strong>
                  Enter Manually
                </strong>

                <p>
                  Enter your document information
                  yourself using the form below.
                </p>

              </div>

              <span className="entry-choice-arrow">
                ↓
              </span>

            </button>

          </div>

        </section>


        {/* =====================================
            MAIN FORM
        ====================================== */}

        {error && (
          <div className="add-document-error">
            {error}
          </div>
        )}

        {success && (
          <div className="add-document-success">
            {success}
          </div>
        )}

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
                    Review or enter the basic details
                    of your document.
                  </p>

                </div>

              </div>


              {/* AUTO-FILL MESSAGE */}

              <div className="auto-fill-note">

                <span>
                  ✦
                </span>

                <div>

                  <strong>
                    Auto-fill ready
                  </strong>

                  <p>
                    Scan a document to automatically
                    populate these fields. You can
                    edit anything before saving.
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
                    These dates determine your
                    renewal timeline.
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
                    Upload Your Document
                  </h2>

                  <p>
                    Keep a digital copy available
                    for quick reference.
                  </p>

                </div>

              </div>


              {/* UPLOAD AREA */}

              <label
                htmlFor="documentFile"
                className={`upload-area ${
                  fileName ? "has-file" : ""
                }`}
              >

                <input
                  id="documentFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />


                <div className="upload-icon">

                  {fileName
                    ? "✓"
                    : "↑"}

                </div>


                {fileName ? (

                  <>

                    <strong>
                      {fileName}
                    </strong>

                    <span>
                      File selected successfully
                    </span>

                  </>

                ) : (

                  <>

                    <strong>
                      Drop your document here
                    </strong>

                    <span>
                      or{" "}
                      <b>
                        browse from your device
                      </b>
                    </span>

                    <small>
                      PDF, JPG or PNG · Maximum 10 MB
                    </small>

                  </>

                )}

              </label>


              {/* SCAN BUTTON */}

              {!fileName && (

                <div className="scan-upload-option">

                  <span>
                    OR
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setScannerOpen(true)
                    }
                  >
                    ⌕ Scan & Auto-Fill
                  </button>

                </div>

              )}

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

                <label className="reminder-option selected">

                  <input
                    type="checkbox"
                    checked={reminder90Days}
                    onChange={(event) =>
                      setReminder90Days(event.target.checked)
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

                <label className="reminder-option selected">

                  <input
                    type="checkbox"
                    checked={reminder30Days}
                    onChange={(event) =>
                      setReminder30Days(event.target.checked)
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

                <label className="reminder-option">

                  <input
                    type="checkbox"
                    checked={reminder7Days}
                    onChange={(event) =>
                      setReminder7Days(event.target.checked)
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
                    Add anything useful about
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
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Document"}

                {!loading && (
                  <span>
                    →
                  </span>
                )}

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
                SMART DOCUMENT ENTRY
              </span>

              <h3>
                Scan once.
                <br />
                Track automatically.
              </h3>

              <p>
                Scan your document and RenewHub
                will prepare the available details
                for you.
              </p>

            </div>


            {/* CHECKLIST */}

            <div className="sidebar-card checklist-card">

              <span>
                BEFORE YOU SAVE
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
                  Your uploaded files will be securely
                  stored when backend storage is connected.
                </p>

              </div>

            </div>

          </aside>

        </form>

      </main>


      {/* =====================================
          SCAN DOCUMENT MODAL
      ====================================== */}

      {scannerOpen && (

        <ScanDocument
          onClose={() =>
            setScannerOpen(false)
          }

          onDocumentReady={
            handleDocumentReady
          }
        />

      )}

    </div>
  );
}

export default AddDocument;

