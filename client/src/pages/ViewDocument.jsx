import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ViewDocument() {
const { id } = useParams();
const navigate = useNavigate();

const [document, setDocument] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const token =
localStorage.getItem("renewhub-token") ||
sessionStorage.getItem("renewhub-token");


if (!token) {
  navigate("/login");
  return;
}

const fetchDocument = async () => {
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

    if (response.data.success && response.data.document) {
      setDocument(response.data.document);
    } else {
      setError("Document details could not be found.");
    }
  } catch (err) {
    console.error("View Document Error:", err);

    setError(
      err.response?.data?.message ||
        "Unable to load document details. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

fetchDocument();


}, [id, navigate]);

if (loading) {
return (
<> <Navbar /> <main style={styles.container}> <p>Loading document details...</p> </main>
</>
);
}

if (error) {
return (
<> <Navbar /> <main style={styles.container}> <h2>Unable to View Document</h2> <p>{error}</p> <Link to="/documents" style={styles.backButton}>
Back to Documents </Link> </main>
</>
);
}

const fields = [
["Document Name", document.document_name],
["Document Type", document.document_type],
["Document Number", document.document_number],
["Holder Name", document.holder_name],
["Issuing Authority", document.issuing_authority],
["Issue Date", formatDate(document.issue_date)],
["Expiry Date", formatDate(document.expiry_date)],
["Notes", document.notes],
];

return (
<> <Navbar />


  <main style={styles.container}>
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>Document Details</h1>
        <p style={styles.subtitle}>
          View the complete information for this document.
        </p>
      </div>

      <Link to="/documents" style={styles.backButton}>
        ← Back to Documents
      </Link>
    </div>

    <section style={styles.card}>
      {fields.map(([label, value]) => (
        <div key={label} style={styles.field}>
          <span style={styles.label}>{label}</span>
          <span style={styles.value}>
            {value || "Not provided"}
          </span>
        </div>
      ))}

      <div style={styles.actions}>
        <Link
          to={`/documents/${document.id}/edit`}
          style={styles.editButton}
        >
          Edit Document
        </Link>

        <Link to="/documents" style={styles.backButton}>
          Close
        </Link>
      </div>
    </section>
  </main>
</>


);
}

function formatDate(value) {
if (!value) return "Not provided";

const date = new Date(value);

if (Number.isNaN(date.getTime())) return value;

return date.toLocaleDateString("en-IN", {
day: "2-digit",
month: "short",
year: "numeric",
timeZone: "UTC",
});
}

const styles = {
container: {
maxWidth: "1100px",
margin: "40px auto",
padding: "24px",
color: "var(--text-color, #273C51)",
},
header: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "16px",
flexWrap: "wrap",
marginBottom: "24px",
},
title: {
margin: "0 0 8px",
fontSize: "28px",
},
subtitle: {
margin: 0,
color: "var(--secondary-text, #587592)",
},
card: {
padding: "28px",
border: "1px solid var(--border-color, #D6DEF5)",
borderRadius: "12px",
background: "var(--card-background, #FFFFFF)",
boxShadow: "0 4px 16px rgba(12, 5, 102, 0.06)",
},
field: {
display: "grid",
gridTemplateColumns: "minmax(150px, 240px) 1fr",
gap: "16px",
padding: "16px 0",
borderBottom: "1px solid var(--border-color, #E5EAF2)",
overflowWrap: "anywhere",
},
label: {
fontWeight: 600,
},
value: {
lineHeight: 1.6,
},
actions: {
display: "flex",
flexWrap: "wrap",
gap: "12px",
marginTop: "28px",
},
editButton: {
display: "inline-block",
padding: "11px 18px",
borderRadius: "6px",
background: "#E31E2E",
color: "#FFFFFF",
textDecoration: "none",
fontWeight: 600,
},
backButton: {
display: "inline-block",
padding: "11px 18px",
borderRadius: "6px",
border: "1px solid #D6DEF5",
color: "var(--text-color, #273C51)",
textDecoration: "none",
fontWeight: 600,
},
};

export default ViewDocument;
