import { useRef, useState } from "react";
import "./ScanDocument.css";

function ScanDocument({ onClose, onDocumentReady }) {
  const cameraInputRef = useRef(null);
  const uploadInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setShowResult(false);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  const processDocument = () => {
    if (!selectedFile) return;

    setProcessing(true);

    /*
      Temporary frontend simulation.

      Later:
      selectedFile will be sent to the backend.
      The backend will process the document and return
      the extracted information.
    */

    setTimeout(() => {
      setProcessing(false);
      setShowResult(true);
    }, 2000);
  };

  const useExtractedDetails = () => {
    const extractedData = {
      documentName: "Driving Licence",
      documentType: "licence",
      documentNumber: "TN-38-2026-004821",
      holderName: "Sanjay Kumar",
      issuingAuthority: "Transport Department, Tamil Nadu",
      issueDate: "2022-05-12",
      expiryDate: "2032-05-11",
    };

    onDocumentReady(extractedData);
    onClose();
  };

  const resetScanner = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setProcessing(false);
    setShowResult(false);

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }

    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  };

  return (
    <div className="scan-overlay">

      <div className="scan-modal">

        {/* Header */}
        <div className="scan-modal-header">

          <div>
            <span className="scan-modal-eyebrow">
              SMART DOCUMENT SCANNER
            </span>

            <h2>
              Scan & Auto-Fill
            </h2>

            <p>
              Capture or upload your document and RenewHub
              will prepare the details for you.
            </p>
          </div>

          <button
            type="button"
            className="scan-close-button"
            onClick={onClose}
            aria-label="Close scanner"
          >
            ×
          </button>

        </div>

        {/* Main content */}
        <div className="scan-modal-body">

          {!selectedFile && !showResult && (
            <div className="scan-methods">

              {/* Camera */}
              <button
                type="button"
                className="scan-method camera-method"
                onClick={() =>
                  cameraInputRef.current?.click()
                }
              >

                <div className="scan-method-icon">
                  📷
                </div>

                <div>
                  <strong>
                    Scan with Camera
                  </strong>

                  <p>
                    Use your phone camera to capture
                    the document.
                  </p>
                </div>

                <span>
                  →
                </span>

              </button>

              {/* Upload */}
              <button
                type="button"
                className="scan-method upload-method"
                onClick={() =>
                  uploadInputRef.current?.click()
                }
              >

                <div className="scan-method-icon">
                  📁
                </div>

                <div>
                  <strong>
                    Upload Document
                  </strong>

                  <p>
                    Select an existing PDF, JPG or PNG file.
                  </p>
                </div>

                <span>
                  →
                </span>

              </button>

              {/* Hidden camera input */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden-file-input"
                onChange={handleFileSelect}
              />

              {/* Hidden upload input */}
              <input
                ref={uploadInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden-file-input"
                onChange={handleFileSelect}
              />

              <div className="scan-supported">

                <span>✓</span>

                <p>
                  Supported: PDF, JPG and PNG · Maximum 10 MB
                </p>

              </div>

            </div>
          )}

          {/* Selected file */}
          {selectedFile && !showResult && !processing && (
            <div className="scan-preview">

              <div className="preview-label">
                DOCUMENT READY
              </div>

              <div className="preview-box">

                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Selected document preview"
                  />
                ) : (
                  <div className="pdf-preview">
                    <span>PDF</span>
                  </div>
                )}

              </div>

              <div className="selected-file-info">

                <div className="selected-file-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    {selectedFile.name}
                  </strong>

                  <span>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

              </div>

              <div className="scan-preview-actions">

                <button
                  type="button"
                  className="scan-secondary-button"
                  onClick={resetScanner}
                >
                  Choose Another
                </button>

                <button
                  type="button"
                  className="scan-primary-button"
                  onClick={processDocument}
                >
                  Process Document →
                </button>

              </div>

            </div>
          )}

          {/* Processing */}
          {processing && (
            <div className="scan-processing">

              <div className="processing-animation">

                <div className="processing-document">
                  📄
                </div>

                <div className="processing-line"></div>

              </div>

              <span>
                READING DOCUMENT
              </span>

              <h3>
                Extracting information...
              </h3>

              <p>
                RenewHub is preparing the document details.
              </p>

              <div className="processing-steps">

                <div className="processing-step done">
                  <span>✓</span>
                  Document uploaded
                </div>

                <div className="processing-step active">
                  <span>●</span>
                  Reading document
                </div>

                <div className="processing-step">
                  <span>○</span>
                  Preparing details
                </div>

              </div>

            </div>
          )}

          {/* Extracted result */}
          {showResult && (
            <div className="scan-result">

              <div className="result-success">

                <div className="result-check">
                  ✓
                </div>

                <div>
                  <span>
                    SCAN COMPLETE
                  </span>

                  <h3>
                    Details detected
                  </h3>
                </div>

              </div>

              <p className="result-description">
                We found the following information.
                Please verify it after applying the details
                to your document form.
              </p>

              <div className="extracted-details">

                <div>
                  <span>Document Name</span>
                  <strong>Driving Licence</strong>
                </div>

                <div>
                  <span>Document Number</span>
                  <strong>TN-38-2026-004821</strong>
                </div>

                <div>
                  <span>Holder Name</span>
                  <strong>Sanjay Kumar</strong>
                </div>

                <div>
                  <span>Document Type</span>
                  <strong>Licence</strong>
                </div>

                <div>
                  <span>Issue Date</span>
                  <strong>12 May 2022</strong>
                </div>

                <div>
                  <span>Expiry Date</span>
                  <strong>11 May 2032</strong>
                </div>

                <div className="full-result-field">
                  <span>Issuing Authority</span>
                  <strong>
                    Transport Department, Tamil Nadu
                  </strong>
                </div>

              </div>

              <div className="result-warning">
                <span>!</span>

                <p>
                  Please verify these details against your
                  original document before saving.
                </p>
              </div>

              <div className="scan-preview-actions">

                <button
                  type="button"
                  className="scan-secondary-button"
                  onClick={resetScanner}
                >
                  Scan Again
                </button>

                <button
                  type="button"
                  className="scan-primary-button"
                  onClick={useExtractedDetails}
                >
                  Use These Details →
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default ScanDocument;