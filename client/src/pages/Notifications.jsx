import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    type: "urgent",
    category: "Expiry Alert",
    title: "Driving Licence expires soon",
    message:
      "Your Driving Licence will expire in 8 days. Start the renewal process to avoid interruption.",
    document: "Driving Licence",
    date: "Today",
    time: "10:32 AM",
    unread: true,
  },
  {
    id: 2,
    type: "warning",
    category: "Renewal Reminder",
    title: "Health Insurance renewal coming up",
    message:
      "Your Health Insurance expires in 21 days. We recommend starting your renewal soon.",
    document: "Health Insurance",
    date: "Today",
    time: "09:15 AM",
    unread: true,
  },
  {
    id: 3,
    type: "warning",
    category: "Renewal Reminder",
    title: "Passport renewal reminder",
    message:
      "Your Passport will expire in 34 days. Check the renewal requirements before applying.",
    document: "Passport",
    date: "Yesterday",
    time: "04:45 PM",
    unread: true,
  },
  {
    id: 4,
    type: "success",
    category: "Renewal Update",
    title: "Document added successfully",
    message:
      "Your Community Certificate has been added to your RenewHub document collection.",
    document: "Community Certificate",
    date: "23 Sep 2026",
    time: "02:20 PM",
    unread: false,
  },
  {
    id: 5,
    type: "info",
    category: "System",
    title: "Your document collection is ready",
    message:
      "You now have 24 documents tracked in RenewHub. We'll help you keep them up to date.",
    document: "Document Collection",
    date: "22 Sep 2026",
    time: "11:05 AM",
    unread: false,
  },
  {
    id: 6,
    type: "danger",
    category: "Expired",
    title: "Vehicle Insurance has expired",
    message:
      "Your Vehicle Insurance expired recently. Please check the renewal requirements and update your document.",
    document: "Vehicle Insurance",
    date: "20 Sep 2026",
    time: "08:30 AM",
    unread: false,
  },
];

function Notifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = notifications.filter(
    (notification) => {
      if (activeFilter === "unread") {
        return notification.unread;
      }

      if (activeFilter === "expiry") {
        return (
          notification.type === "urgent" ||
          notification.type === "warning" ||
          notification.type === "danger"
        );
      }

      if (activeFilter === "renewal") {
        return notification.category === "Renewal Reminder" ||
          notification.category === "Renewal Update";
      }

      return true;
    }
  );

  const markAsRead = (id) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previousNotifications) =>
      previousNotifications.filter(
        (notification) => notification.id !== id
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "urgent":
        return "!";

      case "warning":
        return "◷";

      case "success":
        return "✓";

      case "danger":
        return "×";

      default:
        return "i";
    }
  };

  return (
    <div className="renewhub-notifications-page">

      <Navbar />

      <main className="notifications-main">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <section className="notifications-header">

          <div className="notifications-header-content">

            <span className="notifications-eyebrow">
              RENEWHUB ALERT CENTER
            </span>

            <h1>
              Your Notifications
            </h1>

            <p>
              Stay informed about document expiry dates,
              renewal reminders and important updates.
            </p>

          </div>

          <div className="notification-header-icon">
            🔔
          </div>

        </section>


        {/* =====================================
            NOTIFICATION SUMMARY
        ====================================== */}

        <section className="notification-summary">

          <div className="notification-summary-card unread-card">

            <div className="summary-icon">
              !
            </div>

            <div>
              <strong>
                {unreadCount}
              </strong>

              <span>
                Unread Notifications
              </span>
            </div>

          </div>


          <div className="notification-summary-card alert-card">

            <div className="summary-icon">
              ⚠
            </div>

            <div>
              <strong>
                {
                  notifications.filter(
                    (notification) =>
                      notification.type === "urgent" ||
                      notification.type === "danger"
                  ).length
                }
              </strong>

              <span>
                Important Alerts
              </span>
            </div>

          </div>


          <div className="notification-summary-card reminder-card">

            <div className="summary-icon">
              ◷
            </div>

            <div>
              <strong>
                {
                  notifications.filter(
                    (notification) =>
                      notification.category ===
                      "Renewal Reminder"
                  ).length
                }
              </strong>

              <span>
                Renewal Reminders
              </span>
            </div>

          </div>


          <div className="notification-summary-card total-card">

            <div className="summary-icon">
              ◎
            </div>

            <div>
              <strong>
                {notifications.length}
              </strong>

              <span>
                Total Notifications
              </span>
            </div>

          </div>

        </section>


        {/* =====================================
            NOTIFICATION TOOLBAR
        ====================================== */}

        <section className="notification-toolbar">

          <div className="notification-filters">

            <button
              type="button"
              className={
                activeFilter === "all"
                  ? "active"
                  : ""
              }
              onClick={() => setActiveFilter("all")}
            >
              All
              <span>
                {notifications.length}
              </span>
            </button>


            <button
              type="button"
              className={
                activeFilter === "unread"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("unread")
              }
            >
              Unread
              <span>
                {unreadCount}
              </span>
            </button>


            <button
              type="button"
              className={
                activeFilter === "expiry"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("expiry")
              }
            >
              Expiry Alerts
            </button>


            <button
              type="button"
              className={
                activeFilter === "renewal"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("renewal")
              }
            >
              Renewals
            </button>

          </div>


          {unreadCount > 0 && (
            <button
              type="button"
              className="mark-all-button"
              onClick={markAllAsRead}
            >
              ✓ Mark all as read
            </button>
          )}

        </section>


        {/* =====================================
            NOTIFICATION LIST
        ====================================== */}

        <section className="notifications-section">

          <div className="notifications-section-heading">

            <div>

              <span>
                ALERTS & UPDATES
              </span>

              <h2>
                Recent Notifications
              </h2>

            </div>

            <span className="notification-count">
              {filteredNotifications.length} notifications
            </span>

          </div>


          <div className="notification-list">

            {filteredNotifications.length > 0 ? (

              filteredNotifications.map(
                (notification) => (

                  <article
                    className={`notification-item ${
                      notification.unread
                        ? "unread"
                        : ""
                    }`}
                    key={notification.id}
                  >

                    {/* Notification Icon */}

                    <div
                      className={`notification-icon ${notification.type}`}
                    >
                      {getNotificationIcon(
                        notification.type
                      )}
                    </div>


                    {/* Notification Content */}

                    <div className="notification-content">

                      <div className="notification-top">

                        <div>

                          <span className="notification-category">
                            {notification.category}
                          </span>

                          <h3>
                            {notification.title}
                          </h3>

                        </div>

                        {notification.unread && (
                          <span className="unread-dot"></span>
                        )}

                      </div>


                      <p>
                        {notification.message}
                      </p>


                      <div className="notification-meta">

                        <span>
                          📄 {notification.document}
                        </span>

                        <span>
                          {notification.date}
                        </span>

                        <span>
                          {notification.time}
                        </span>

                      </div>

                    </div>


                    {/* Notification Actions */}

                    <div className="notification-actions">

                      {notification.category ===
                        "Expiry Alert" ||
                      notification.category ===
                        "Renewal Reminder" ? (
                        <Link
                          to="/renewals"
                          className="notification-action primary"
                        >
                          View Renewal →
                        </Link>
                      ) : (
                        <Link
                          to="/documents"
                          className="notification-action"
                        >
                          View Document →
                        </Link>
                      )}


                      {notification.unread && (
                        <button
                          type="button"
                          className="notification-action"
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                        >
                          Mark as read
                        </button>
                      )}


                      <button
                        type="button"
                        className="delete-notification"
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }
                        aria-label="Delete notification"
                      >
                        ×
                      </button>

                    </div>

                  </article>

                )
              )

            ) : (

              <div className="empty-notifications">

                <div className="empty-notification-icon">
                  ✓
                </div>

                <h3>
                  You're all caught up
                </h3>

                <p>
                  There are no notifications matching
                  your current filter.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setActiveFilter("all")
                  }
                >
                  View All Notifications
                </button>

              </div>

            )}

          </div>

        </section>


        {/* =====================================
            RENEWAL TIP
        ====================================== */}

        <section className="notification-tip">

          <div className="tip-icon">
            ✦
          </div>

          <div>

            <span>
              RENEWHUB TIP
            </span>

            <h3>
              Don't wait until the last day.
            </h3>

            <p>
              Starting your renewal early gives you
              enough time to gather documents and
              complete the process without last-minute
              pressure.
            </p>

          </div>

          <Link
            to="/documents"
            className="tip-button"
          >
            Manage Documents →
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Notifications;