import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/renewhub-logo.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      // Get data from backend
      const { token, user } = response.data;

      // Store JWT token
      if (rememberMe) {
        localStorage.setItem("renewhub-token", token);
        localStorage.setItem(
          "renewhub-user",
          JSON.stringify(user)
        );
      } else {
        sessionStorage.setItem("renewhub-token", token);
        sessionStorage.setItem(
          "renewhub-user",
          JSON.stringify(user)
        );
      }

      setSuccess("Login successful. Redirecting...");

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="renewhub-login-page">

      {/* Top Government Style Bar */}
      <div className="login-top-bar">
        <div className="login-top-container">
          <span>RenewHub Digital Services</span>

          <div className="login-language">
            <span>English</span>
            <span>▾</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="login-header">
        <div className="login-header-container">

          <Link to="/" className="login-brand">
            <img
              src={logo}
              alt="RenewHub"
              className="login-logo"
            />
          </Link>

          <div className="login-header-right">
            <span>Digital Document Renewal Platform</span>
          </div>

        </div>
      </header>

      {/* Main Authentication Area */}
      <main className="login-main">

        <div className="login-container">

          {/* Left Information Panel */}
          <section className="login-info-panel">

            <div className="login-info-content">

              <span className="login-eyebrow">
                RENEWHUB AUTHENTICATION
              </span>

              <h1>
                Manage your documents.
                <br />
                Renew them on time.
              </h1>

              <p>
                Sign in to your RenewHub account to manage certificates,
                licenses, registrations and other important documents
                from one secure place.
              </p>

              <div className="login-benefits">

                <div className="login-benefit">
                  <span className="benefit-icon">✓</span>
                  <div>
                    <strong>Track Expiry Dates</strong>
                    <p>Keep track of important document deadlines.</p>
                  </div>
                </div>

                <div className="login-benefit">
                  <span className="benefit-icon">✓</span>
                  <div>
                    <strong>Renew On Time</strong>
                    <p>Get reminders before your documents expire.</p>
                  </div>
                </div>

                <div className="login-benefit">
                  <span className="benefit-icon">✓</span>
                  <div>
                    <strong>One Secure Dashboard</strong>
                    <p>Manage your documents from one place.</p>
                  </div>
                </div>

              </div>

            </div>

          </section>

          {/* Login Card */}
          <section className="login-card">

            <div className="login-card-header">

              <span className="login-card-label">
                ACCOUNT ACCESS
              </span>

              <h2>Log In to your RenewHub account</h2>

              <p>
                Sign in with your RenewHub credentials
              </p>

            </div>

            {/* Success Message */}
            {success && (
              <div className="login-success-message">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="login-error-message">
                {error}
              </div>
            )}

            {/* OTP Option */}
            <button
              type="button"
              className="otp-login-button"
            >
              <span className="otp-icon">✉</span>

              <span>
                <strong>Log In With OTP</strong>
                <small>
                  Use your registered mobile number or email
                </small>
              </span>

              <span className="otp-arrow">→</span>
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span>OR</span>
            </div>

            {/* Login Form */}
            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label htmlFor="email">
                  E-mail / Mobile
                  <span>*</span>
                </label>

                <input
                  id="email"
                  type="text"
                  placeholder="Enter E-mail / Mobile"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

              </div>

              <div className="form-group">

                <label htmlFor="password">
                  Password
                  <span>*</span>
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

              </div>

              <div className="login-options">

                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                  />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password">
                  Forgot your password?
                </Link>

              </div>

              <button
                type="submit"
                className="login-submit-button"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
                <span>→</span>
              </button>

            </form>

            {/* Government Login */}
            <div className="government-login">

              <div className="government-login-title">
                <span></span>
                <strong>Government Employee Login</strong>
                <span></span>
              </div>

              <p>
                Government users can access RenewHub through
                supported government authentication services.
              </p>

              <button
                type="button"
                className="parichay-button"
              >
                <span className="parichay-icon">P</span>

                <span>
                  Login with Government Authentication
                </span>

                <span>→</span>
              </button>

            </div>

            {/* Social Login */}
            <div className="social-login">

              <div className="social-title">
                <span>Login with Social Profile</span>
              </div>

              <div className="social-buttons">

                <button type="button" title="Login with Google">
                  G
                </button>

                <button type="button" title="Login with Facebook">
                  f
                </button>

                <button type="button" title="Login with LinkedIn">
                  in
                </button>

                <button type="button" title="Login with GitHub">
                  GH
                </button>

              </div>

            </div>

            {/* Register */}
            <div className="register-section">

              <span>
                Not registered with <strong>RenewHub</strong>?
              </span>

              <Link to="/register">
                Register Now
              </Link>

            </div>

          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="login-footer">

        <div className="login-footer-main">

          <div className="footer-brand">

            <img
              src={logo}
              alt="RenewHub"
            />

            <p>
              Digital Document & Renewal Management Platform
            </p>

          </div>

          <div className="footer-links">

            <Link to="/">Home</Link>
            <Link to="/about">About RenewHub</Link>
            <Link to="/help">Help & Support</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>

          </div>

        </div>

        <div className="login-footer-bottom">

          <span>
            © 2026 RenewHub. All rights reserved.
          </span>

          <span>
            Track. Remind. Renew.
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Login;