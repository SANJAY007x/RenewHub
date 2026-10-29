import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Help.css";

function Help() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: "Getting Started",
      question: "What is RenewHub?",
      answer:
        "RenewHub is a digital document and renewal management platform that helps you organize documents, track expiry dates, receive reminders, and manage renewal activities."
    },
    {
      category: "Documents",
      question: "How do I add a document?",
      answer:
        "Open the Documents section and select Add Document. You can enter the document information manually or use the Scan & Auto-Fill option where available."
    },
    {
      category: "Documents",
      question: "What types of documents can I manage?",
      answer:
        "You can use RenewHub to organize certificates, licences, insurance documents, registrations, permits, memberships, and other documents that have validity or renewal dates."
    },
    {
      category: "Renewals",
      question: "How does RenewHub track expiry dates?",
      answer:
        "When you add a document, you provide its issue and expiry dates. RenewHub uses those dates to display the document status and identify documents that need attention."
    },
    {
      category: "Notifications",
      question: "When will I receive renewal reminders?",
      answer:
        "Reminder timing depends on your notification preferences. You can configure reminder periods such as 90 days, 30 days, and 7 days before expiry from Settings."
    },
    {
      category: "Account",
      question: "Can I change my account information?",
      answer:
        "Yes. Open Settings to update your profile information, notification preferences, security options, and other account preferences."
    },
    {
      category: "Security",
      question: "Can I enable two-step verification?",
      answer:
        "Yes. RenewHub provides a Two-Step Verification option under the Security section of Settings."
    },
    {
      category: "Renewals",
      question: "Does RenewHub automatically renew my documents?",
      answer:
        "No. RenewHub is designed to help you track and prepare for renewals. Actual renewal applications are completed through the relevant issuing authority or service provider."
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="help-page">
      <Navbar />

      {/* Hero */}
      <section className="help-hero">
        <div className="help-hero-content">
          <span className="help-eyebrow">RENEWHUB SUPPORT CENTER</span>

          <h1>
            How can we
            <span> help you?</span>
          </h1>

          <p>
            Find answers, learn how RenewHub works, and get help managing your
            documents and renewal schedule.
          </p>

          <div className="help-search">
            <span className="help-search-icon">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for help..."
              aria-label="Search help"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="help-search-clear"
                aria-label="Clear search"
              >
                ×
              </button>
            )}

            <button type="button" className="help-search-button">
              Search
            </button>
          </div>
        </div>

        <div className="help-hero-card">
          <div className="support-card-label">QUICK SUPPORT</div>

          <div className="support-status">
            <span className="support-status-dot"></span>
            Help Center Available
          </div>

          <p>
            Browse common questions or explore one of the support categories
            below.
          </p>

          <div className="support-card-stats">
            <div>
              <strong>{faqs.length}</strong>
              <span>Common Questions</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Self-Service Help</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick help */}
      <section className="help-quick-section">
        <div className="help-section-heading">
          <span>QUICK HELP</span>
          <h2>What do you need help with?</h2>
          <p>
            Choose a category to quickly find information related to your
            RenewHub account.
          </p>
        </div>

        <div className="help-category-grid">
          <Link to="/documents" className="help-category-card">
            <div className="help-category-icon documents">▣</div>
            <div>
              <h3>Documents</h3>
              <p>Add, organize, view, and manage your documents.</p>
            </div>
            <span className="help-category-arrow">→</span>
          </Link>

          <Link to="/renewals" className="help-category-card">
            <div className="help-category-icon renewals">↻</div>
            <div>
              <h3>Renewals</h3>
              <p>Understand expiry dates and plan renewal activities.</p>
            </div>
            <span className="help-category-arrow">→</span>
          </Link>

          <Link to="/notifications" className="help-category-card">
            <div className="help-category-icon notifications">♢</div>
            <div>
              <h3>Notifications</h3>
              <p>Manage reminders and stay informed about expiry dates.</p>
            </div>
            <span className="help-category-arrow">→</span>
          </Link>

          <Link to="/settings" className="help-category-card">
            <div className="help-category-icon account">⚙</div>
            <div>
              <h3>Account & Settings</h3>
              <p>Update your profile, preferences, and security options.</p>
            </div>
            <span className="help-category-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="help-faq-section">
        <div className="help-faq-header">
          <div>
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <h2>Find answers quickly.</h2>
          </div>

          {search && (
            <div className="help-results-count">
              {filteredFaqs.length} result
              {filteredFaqs.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <div className="help-faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                className={`help-faq-item ${
                  openFaq === index ? "open" : ""
                }`}
                key={`${faq.category}-${faq.question}`}
              >
                <button
                  type="button"
                  className="help-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <div>
                    <span className="help-faq-category">
                      {faq.category}
                    </span>
                    <strong>{faq.question}</strong>
                  </div>

                  <span className="help-faq-toggle">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="help-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="help-no-results">
              <div className="help-no-results-icon">⌕</div>
              <h3>No matching help articles</h3>
              <p>
                Try searching with a different word or browse the support
                categories above.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Getting Started */}
      <section className="help-start-section">
        <div className="help-start-content">
          <span>GETTING STARTED</span>
          <h2>Manage your first document in minutes.</h2>
          <p>
            Start by adding a document, entering its expiry information, and
            configuring the reminders that work for you.
          </p>

          <Link to="/documents/add" className="help-start-button">
            Add a Document →
          </Link>
        </div>

        <div className="help-start-steps">
          <div className="help-start-step">
            <span>01</span>
            <div>
              <strong>Add your document</strong>
              <p>Enter the important document details.</p>
            </div>
          </div>

          <div className="help-start-step">
            <span>02</span>
            <div>
              <strong>Set the expiry date</strong>
              <p>Tell RenewHub when your document expires.</p>
            </div>
          </div>

          <div className="help-start-step">
            <span>03</span>
            <div>
              <strong>Choose reminders</strong>
              <p>Configure when you want to be reminded.</p>
            </div>
          </div>

          <div className="help-start-step">
            <span>04</span>
            <div>
              <strong>Track your renewal</strong>
              <p>Use your dashboard to stay prepared.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="help-contact-section">
        <div className="help-contact-header">
          <span>STILL NEED HELP?</span>
          <h2>We're here to help.</h2>
          <p>
            If you cannot find what you are looking for, use one of the
            support options below.
          </p>
        </div>

        <div className="help-contact-grid">
          <div className="help-contact-card">
            <div className="contact-card-icon">?</div>
            <span className="contact-card-label">HELP CENTER</span>
            <h3>Browse FAQs</h3>
            <p>
              Find answers to common questions about documents, renewals,
              notifications, and accounts.
            </p>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector(".help-faq-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View FAQs →
            </button>
          </div>

          <div className="help-contact-card">
            <div className="contact-card-icon red">✉</div>
            <span className="contact-card-label">EMAIL SUPPORT</span>
            <h3>Contact Support</h3>
            <p>
              Have a question that is not covered in the Help Center? Contact
              the RenewHub support team.
            </p>
            <a href="mailto:support@renewhub.com">
              support@renewhub.com →
            </a>
          </div>

          <div className="help-contact-card">
            <div className="contact-card-icon blue">i</div>
            <span className="contact-card-label">SERVICE INFORMATION</span>
            <h3>Need Renewal Guidance?</h3>
            <p>
              Visit the relevant service guidance page to understand the
              information required for a renewal.
            </p>
            <Link to="/">Explore Services →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="help-cta">
        <div>
          <span>READY TO GET STARTED?</span>
          <h2>Keep every important document on track.</h2>
          <p>
            Start organizing your documents and stay ahead of upcoming
            renewals.
          </p>
        </div>

        <div className="help-cta-actions">
          <Link to="/register" className="help-cta-primary">
            Create Account
          </Link>

          <Link to="/documents" className="help-cta-secondary">
            View Documents
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="help-footer">
        <div className="help-footer-main">
          <div className="help-footer-brand">
            <div className="help-footer-logo">
              <span>R</span>
              RenewHub
            </div>

            <p>Track. Remind. Renew.</p>

            <small>
              A digital platform for organized document and renewal
              management.
            </small>
          </div>

          <div className="help-footer-column">
            <h4>Platform</h4>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/documents">Documents</Link>
            <Link to="/renewals">Renewals</Link>
            <Link to="/notifications">Notifications</Link>
          </div>

          <div className="help-footer-column">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/settings">Settings</Link>
          </div>

          <div className="help-footer-column">
            <h4>Support</h4>
            <Link to="/about">About RenewHub</Link>
            <Link to="/help">Help & Support</Link>
            <Link to="/">Home</Link>
          </div>
        </div>

        <div className="help-footer-bottom">
          <span>© 2026 RenewHub. All rights reserved.</span>
          <span>Track. Remind. Renew.</span>
        </div>
      </footer>
    </div>
  );
}

export default Help;