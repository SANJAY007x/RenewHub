import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Settings.css";

function Settings() {
  const [profile, setProfile] = useState({
    fullName: "Sanjay Kumar",
    email: "sanjay@example.com",
    mobile: "+91 98765 43210",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    renewal: true,
    expiry: true,
    ninetyDays: true,
    thirtyDays: true,
    sevenDays: false,
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    dateFormat: "DD MMM YYYY",
  });

  const [twoStep, setTwoStep] = useState(false);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNotificationChange = (name) => {
    setNotifications((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const handlePreferenceChange = (event) => {
    const { name, value } = event.target;

    setPreferences((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="renewhub-settings-page">

      <Navbar />

      <main className="settings-main">

        {/* =====================================
            HEADER
        ====================================== */}

        <section className="settings-header">

          <div>
            <span className="settings-eyebrow">
              ACCOUNT SETTINGS
            </span>

            <h1>
              Manage Your RenewHub Account
            </h1>

            <p>
              Update your profile, notification preferences
              and account security settings.
            </p>
          </div>

          <div className="settings-header-icon">
            ⚙
          </div>

        </section>


        {/* =====================================
            SETTINGS LAYOUT
        ====================================== */}

        <div className="settings-layout">

          {/* =====================================
              SETTINGS NAVIGATION
          ====================================== */}

          <aside className="settings-navigation">

            <div className="settings-user-card">

              <div className="settings-avatar">
                SK
              </div>

              <div>
                <strong>
                  Sanjay Kumar
                </strong>

                <span>
                  RenewHub Member
                </span>
              </div>

            </div>


            <nav className="settings-menu">

              <a
                href="#profile"
                className="active"
              >
                <span>👤</span>
                Profile
              </a>

              <a href="#notifications">
                <span>🔔</span>
                Notifications
              </a>

              <a href="#security">
                <span>🔒</span>
                Security
              </a>

              <a href="#preferences">
                <span>🌐</span>
                Preferences
              </a>

              <a href="#account">
                <span>⚠</span>
                Account
              </a>

            </nav>

          </aside>


          {/* =====================================
              SETTINGS CONTENT
          ====================================== */}

          <div className="settings-content">

            {/* =====================================
                PROFILE
            ====================================== */}

            <section
              className="settings-section"
              id="profile"
            >

              <div className="settings-section-heading">

                <div className="settings-section-icon">
                  👤
                </div>

                <div>
                  <span>
                    PERSONAL INFORMATION
                  </span>

                  <h2>
                    Profile
                  </h2>

                  <p>
                    Keep your account information
                    up to date.
                  </p>
                </div>

              </div>


              <div className="settings-form-grid">

                <div className="settings-field">

                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                  />

                </div>


                <div className="settings-field">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />

                </div>


                <div className="settings-field">

                  <label htmlFor="mobile">
                    Mobile Number
                  </label>

                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={profile.mobile}
                    onChange={handleProfileChange}
                  />

                </div>

              </div>

            </section>


            {/* =====================================
                NOTIFICATIONS
            ====================================== */}

            <section
              className="settings-section"
              id="notifications"
            >

              <div className="settings-section-heading">

                <div className="settings-section-icon">
                  🔔
                </div>

                <div>
                  <span>
                    ALERT PREFERENCES
                  </span>

                  <h2>
                    Notifications
                  </h2>

                  <p>
                    Choose which reminders you want
                    to receive.
                  </p>
                </div>

              </div>


              <div className="settings-options">

                <div className="settings-option">

                  <div>
                    <strong>
                      Email Notifications
                    </strong>

                    <span>
                      Receive important RenewHub
                      updates by email.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`toggle ${
                      notifications.email
                        ? "on"
                        : ""
                    }`}
                    onClick={() =>
                      handleNotificationChange(
                        "email"
                      )
                    }
                    aria-label="Toggle email notifications"
                  >
                    <span></span>
                  </button>

                </div>


                <div className="settings-option">

                  <div>
                    <strong>
                      Renewal Reminders
                    </strong>

                    <span>
                      Get notified when a document
                      approaches renewal.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`toggle ${
                      notifications.renewal
                        ? "on"
                        : ""
                    }`}
                    onClick={() =>
                      handleNotificationChange(
                        "renewal"
                      )
                    }
                    aria-label="Toggle renewal reminders"
                  >
                    <span></span>
                  </button>

                </div>


                <div className="settings-option">

                  <div>
                    <strong>
                      Expiry Alerts
                    </strong>

                    <span>
                      Receive alerts for documents
                      that are close to expiry.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`toggle ${
                      notifications.expiry
                        ? "on"
                        : ""
                    }`}
                    onClick={() =>
                      handleNotificationChange(
                        "expiry"
                      )
                    }
                    aria-label="Toggle expiry alerts"
                  >
                    <span></span>
                  </button>

                </div>

              </div>


              <div className="reminder-heading">
                <span>
                  REMINDER SCHEDULE
                </span>

                <p>
                  Select when RenewHub should remind you.
                </p>
              </div>


              <div className="reminder-settings">

                <label
                  className={`reminder-setting ${
                    notifications.ninetyDays
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={
                      notifications.ninetyDays
                    }
                    onChange={() =>
                      handleNotificationChange(
                        "ninetyDays"
                      )
                    }
                  />

                  <div>
                    <strong>
                      90 Days
                    </strong>

                    <span>
                      Early planning
                    </span>
                  </div>

                  <span className="setting-check">
                    ✓
                  </span>

                </label>


                <label
                  className={`reminder-setting ${
                    notifications.thirtyDays
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={
                      notifications.thirtyDays
                    }
                    onChange={() =>
                      handleNotificationChange(
                        "thirtyDays"
                      )
                    }
                  />

                  <div>
                    <strong>
                      30 Days
                    </strong>

                    <span>
                      Start renewal
                    </span>
                  </div>

                  <span className="setting-check">
                    ✓
                  </span>

                </label>


                <label
                  className={`reminder-setting ${
                    notifications.sevenDays
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={
                      notifications.sevenDays
                    }
                    onChange={() =>
                      handleNotificationChange(
                        "sevenDays"
                      )
                    }
                  />

                  <div>
                    <strong>
                      7 Days
                    </strong>

                    <span>
                      Final reminder
                    </span>
                  </div>

                  <span className="setting-check">
                    ✓
                  </span>

                </label>

              </div>

            </section>


            {/* =====================================
                SECURITY
            ====================================== */}

            <section
              className="settings-section"
              id="security"
            >

              <div className="settings-section-heading">

                <div className="settings-section-icon">
                  🔒
                </div>

                <div>
                  <span>
                    ACCOUNT PROTECTION
                  </span>

                  <h2>
                    Security
                  </h2>

                  <p>
                    Protect your RenewHub account.
                  </p>
                </div>

              </div>


              <div className="security-items">

                <div className="security-item">

                  <div className="security-item-icon">
                    🔑
                  </div>

                  <div>
                    <strong>
                      Password
                    </strong>

                    <span>
                      Last changed more than
                      30 days ago.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Password change will be connected to the backend later."
                      )
                    }
                  >
                    Change Password
                  </button>

                </div>


                <div className="security-item">

                  <div className="security-item-icon">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Two-Step Verification
                    </strong>

                    <span>
                      Add an extra layer of protection
                      to your account.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`toggle ${
                      twoStep ? "on" : ""
                    }`}
                    onClick={() =>
                      setTwoStep(!twoStep)
                    }
                    aria-label="Toggle two-step verification"
                  >
                    <span></span>
                  </button>

                </div>


                <div className="security-item">

                  <div className="security-item-icon">
                    💻
                  </div>

                  <div>
                    <strong>
                      Active Sessions
                    </strong>

                    <span>
                      You are currently signed in
                      on this device.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Session management will be connected to the backend later."
                      )
                    }
                  >
                    Manage
                  </button>

                </div>

              </div>

            </section>


            {/* =====================================
                PREFERENCES
            ====================================== */}

            <section
              className="settings-section"
              id="preferences"
            >

              <div className="settings-section-heading">

                <div className="settings-section-icon">
                  🌐
                </div>

                <div>
                  <span>
                    DISPLAY PREFERENCES
                  </span>

                  <h2>
                    Preferences
                  </h2>

                  <p>
                    Customize how RenewHub displays
                    information.
                  </p>
                </div>

              </div>


              <div className="settings-form-grid">

                <div className="settings-field">

                  <label htmlFor="language">
                    Language
                  </label>

                  <select
                    id="language"
                    name="language"
                    value={
                      preferences.language
                    }
                    onChange={
                      handlePreferenceChange
                    }
                  >
                    <option value="English">
                      English
                    </option>

                    <option value="Tamil">
                      Tamil
                    </option>

                    <option value="Hindi">
                      Hindi
                    </option>
                  </select>

                </div>


                <div className="settings-field">

                  <label htmlFor="dateFormat">
                    Date Format
                  </label>

                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={
                      preferences.dateFormat
                    }
                    onChange={
                      handlePreferenceChange
                    }
                  >
                    <option value="DD MMM YYYY">
                      02 Oct 2026
                    </option>

                    <option value="DD/MM/YYYY">
                      02/10/2026
                    </option>

                    <option value="MM/DD/YYYY">
                      10/02/2026
                    </option>
                  </select>

                </div>

              </div>

            </section>


            {/* =====================================
                ACCOUNT
            ====================================== */}

            <section
              className="settings-section danger-section"
              id="account"
            >

              <div className="settings-section-heading">

                <div className="settings-section-icon">
                  ⚠
                </div>

                <div>
                  <span>
                    ACCOUNT MANAGEMENT
                  </span>

                  <h2>
                    Account
                  </h2>

                  <p>
                    Manage your account actions.
                  </p>
                </div>

              </div>


              <div className="account-actions">

                <div>

                  <strong>
                    Sign out
                  </strong>

                  <span>
                    Sign out of your RenewHub account
                    on this device.
                  </span>

                </div>

                <Link
                  to="/login"
                  className="logout-button"
                >
                  Log Out
                </Link>

              </div>


              <div className="account-warning">

                <div>
                  <strong>
                    Delete Account
                  </strong>

                  <p>
                    Permanently remove your RenewHub
                    account and associated data.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Account deletion will be connected to the backend later."
                    )
                  }
                >
                  Delete Account
                </button>

              </div>

            </section>


            {/* =====================================
                SAVE
            ====================================== */}

            <div className="settings-actions">

              <Link
                to="/dashboard"
                className="settings-cancel"
              >
                Cancel
              </Link>

              <button
                type="button"
                className="settings-save"
                onClick={saveSettings}
              >
                Save Changes
                <span>→</span>
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;