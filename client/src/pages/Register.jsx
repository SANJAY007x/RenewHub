import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/renewhub-logo.png";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    country: "India",
    date: "",
    month: "",
    year: "",
    gender: "",
    password: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input/select changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle registration
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    // Check terms
    if (!agreeTerms) {
      setError("Please agree to the Terms of Use and Privacy Policy.");
      return;
    }

    // Basic password validation
    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Check date of birth
    if (!formData.date || !formData.month || !formData.year) {
      setError("Please select your complete date of birth.");
      return;
    }

    setLoading(true);

    // Convert DOB into MySQL DATE format: YYYY-MM-DD
    const dateOfBirth = `${formData.year}-${String(
      formData.month
    ).padStart(2, "0")}-${String(formData.date).padStart(2, "0")}`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          country: formData.country,
          dateOfBirth: dateOfBirth,
          gender: formData.gender,
          password: formData.password,
        }
      );

      // Show success message
      setMessage(
        response.data.message ||
          "Account created successfully. Redirecting to login..."
      );

      // Clear form after successful registration
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        country: "India",
        date: "",
        month: "",
        year: "",
        gender: "",
        password: "",
      });

      setAgreeTerms(false);

      // Redirect to Login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Registration Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="renewhub-register-page">

      {/* Top Bar */}
      <div className="register-top-bar">
        <div className="register-top-container">
          <span>RenewHub Digital Services</span>

          <div className="register-language">
            <span>English</span>
            <span>▾</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="register-header">
        <div className="register-header-container">

          <Link to="/" className="register-brand">
            <img
              src={logo}
              alt="RenewHub"
              className="register-logo"
            />
          </Link>

          <div className="register-header-right">
            <span>Digital Document Renewal Platform</span>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="register-main">

        <div className="register-container">

          {/* Page Heading */}
          <div className="register-heading">

            <span className="register-eyebrow">
              RENEWHUB ACCOUNT REGISTRATION
            </span>

            <h1>Create your RenewHub Account</h1>

            <p>
              Create an account to securely manage your documents,
              track expiry dates and receive renewal reminders.
            </p>

            <div className="already-account">
              <span>Already have an Account?</span>

              <Link to="/login">
                Log In
              </Link>
            </div>

          </div>


          {/* Registration Card */}
          <section className="register-card">

            {/* Government Authentication */}
            <div className="register-section-block">

              <div className="register-section-title">
                <span></span>
                <h2>Login with Government Authentication</h2>
                <span></span>
              </div>

              <p className="register-section-description">
                Government users can use supported government
                authentication services to access RenewHub.
              </p>

              <div className="government-register-options">

                <button
                  type="button"
                  className="government-option"
                >
                  <span className="government-option-icon">
                    P
                  </span>

                  <span>
                    <strong>Government Authentication</strong>
                    <small>Login with supported government account</small>
                  </span>

                  <span className="option-arrow">→</span>
                </button>

                <button
                  type="button"
                  className="government-option"
                >
                  <span className="government-option-icon digi">
                    D
                  </span>

                  <span>
                    <strong>Digital Identity</strong>
                    <small>Continue with supported digital identity</small>
                  </span>

                  <span className="option-arrow">→</span>
                </button>

              </div>

            </div>


            {/* Social Login */}
            <div className="register-section-block">

              <div className="register-section-title">
                <span></span>
                <h2>Login with Social Profile</h2>
                <span></span>
              </div>

              <div className="register-social-buttons">

                <button type="button" title="Google">
                  <span>G</span>
                  Google
                </button>

                <button type="button" title="Facebook">
                  <span>f</span>
                  Facebook
                </button>

                <button type="button" title="LinkedIn">
                  <span>in</span>
                  LinkedIn
                </button>

                <button type="button" title="GitHub">
                  <span>GH</span>
                  GitHub
                </button>

              </div>

            </div>


            {/* Registration Form */}
            <div className="register-section-block">

              <div className="register-section-title form-title">
                <span></span>
                <h2>Register with Email or Mobile Number</h2>
                <span></span>
              </div>


              {/* Success Message */}
              {message && (
                <div className="register-success-message">
                  {message}
                </div>
              )}


              {/* Error Message */}
              {error && (
                <div className="register-error-message">
                  {error}
                </div>
              )}


              <form
                className="registration-form"
                onSubmit={handleSubmit}
              >

                {/* Full Name */}
                <div className="registration-field full-width">

                  <label htmlFor="fullName">
                    Full Name
                    <span>*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Please enter your full name"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Email */}
                <div className="registration-field">

                  <label htmlFor="registerEmail">
                    Email
                    <span>*</span>
                  </label>

                  <input
                    id="registerEmail"
                    name="email"
                    type="email"
                    placeholder="Please enter your email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Mobile */}
                <div className="registration-field">

                  <label htmlFor="mobileNumber">
                    Mobile Number
                    <span>*</span>
                  </label>

                  <div className="mobile-input">

                    <select defaultValue="+91">
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                      <option value="+65">+65</option>
                    </select>

                    <input
                      id="mobileNumber"
                      name="mobile"
                      type="tel"
                      placeholder="Enter mobile number"
                      autoComplete="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                {/* Country */}
                <div className="registration-field">

                  <label htmlFor="country">
                    Country
                    <span>*</span>
                  </label>

                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="India">India</option>
                    <option value="United States">
                      United States
                    </option>
                    <option value="United Kingdom">
                      United Kingdom
                    </option>
                    <option value="Australia">
                      Australia
                    </option>
                    <option value="Canada">
                      Canada
                    </option>
                    <option value="Singapore">
                      Singapore
                    </option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                  </select>

                </div>


                {/* Date of Birth */}
                <div className="registration-field">

                  <label>
                    Date of Birth
                    <span>*</span>
                  </label>

                  <div className="dob-fields">

                    <select
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Date
                      </option>

                      {Array.from(
                        { length: 31 },
                        (_, index) => (
                          <option
                            key={index + 1}
                            value={index + 1}
                          >
                            {index + 1}
                          </option>
                        )
                      )}

                    </select>


                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Month
                      </option>

                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month, index) => (
                        <option
                          key={month}
                          value={index + 1}
                        >
                          {month}
                        </option>
                      ))}

                    </select>


                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Year
                      </option>

                      {Array.from(
                        { length: 107 },
                        (_, index) => {
                          const year = 2026 - index;

                          return (
                            <option
                              key={year}
                              value={year}
                            >
                              {year}
                            </option>
                          );
                        }
                      )}

                    </select>

                  </div>

                </div>


                {/* Gender */}
                <div className="registration-field">

                  <label htmlFor="gender">
                    Gender
                    <span>*</span>
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="others">
                      Others
                    </option>

                  </select>

                </div>


                {/* Password */}
                <div className="registration-field full-width">

                  <label htmlFor="password">
                    Password
                    <span>*</span>
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Referral */}
                <div className="registration-field full-width">

                  <label htmlFor="referral">
                    Referral Code
                    <span className="optional">
                      Optional
                    </span>
                  </label>

                  <input
                    id="referral"
                    type="text"
                    placeholder="Enter referral code if you have one"
                  />

                </div>


                {/* Terms */}
                <div className="registration-terms full-width">

                  <label>

                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(event) =>
                        setAgreeTerms(event.target.checked)
                      }
                    />

                    <span>
                      I agree to the
                      <Link to="/terms">
                        Terms of Use
                      </Link>
                      and
                      <Link to="/privacy">
                        Privacy Policy
                      </Link>
                      of RenewHub.
                    </span>

                  </label>

                </div>


                {/* Submit */}
                <div className="registration-submit full-width">

                  <button
                    type="submit"
                    className="create-account-button"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating Account..."
                      : "Create RenewHub Account"}

                    <span>→</span>
                  </button>

                </div>

              </form>

            </div>


            {/* Login Bottom */}
            <div className="register-login-bottom">

              <span>
                Already have a RenewHub account?
              </span>

              <Link to="/login">
                Log In
              </Link>

            </div>

          </section>

        </div>

      </main>


      {/* Footer */}
      <footer className="register-footer">

        <div className="register-footer-main">

          <div className="register-footer-brand">

            <img
              src={logo}
              alt="RenewHub"
            />

            <p>
              Digital Document & Renewal Management Platform
            </p>

          </div>

          <div className="register-footer-links">

            <Link to="/">Home</Link>
            <Link to="/about">About RenewHub</Link>
            <Link to="/help">Help & Support</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>

          </div>

        </div>

        <div className="register-footer-bottom">

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

export default Register;