# 🔴 RenewHub — Certificate Expiry & Renewal Management System

### 📄 Never Miss a Renewal. Stay Organized with RenewHub.

RenewHub is a full-stack web application designed to help users manage important certificates and documents, track expiry dates, receive renewal reminders, and find official government service information in one place.

The platform provides a centralized dashboard for document management and renewal tracking, helping users stay organized and avoid missing important deadlines.

---

## 🌟 Project Overview

Managing important documents and remembering their expiry dates can be difficult. Missing a renewal deadline may cause unnecessary delays, additional expenses, or interruptions to essential services.

**RenewHub addresses this problem** by providing a centralized platform where users can organize their documents, monitor expiry dates, track renewals, and explore government service information.

The application combines a modern React frontend with a Node.js and Express backend and a MySQL database.

---

## ✨ Key Features

### 📊 1. Interactive Dashboard

* View an overview of your documents and renewals.
* Access important information from a centralized dashboard.
* Navigate easily between application features.

### 📁 2. Document Management

* Add and organize important documents.
* View document details.
* Edit existing document information.
* Keep track of document expiry dates.

### 🔔 3. Renewal Tracking

* Monitor upcoming document expiry dates.
* Organize renewal information.
* Keep track of important renewal deadlines.

### 🔎 4. Government Services Directory

* Explore government service information.
* Search for relevant services and documents.
* View service-specific instructions and application information.
* Access official government service portals where available.

### 📷 5. Document Scanning

* Access the document scanning interface.
* Use the scanning workflow to help enter document information.
* Reduce repetitive manual data entry where supported.

### 🔐 6. User Authentication

* Registration and login interfaces.
* Protected routes for authenticated users.
* Backend authentication and authorization middleware.

### 🔔 7. Notifications

* Access the notifications section.
* Keep important document and renewal information organized.

### 🎨 8. Theme Customization

* Switch between supported light and dark themes.
* Enjoy a consistent interface across the application.

### ⚙️ 9. Settings

* Access application settings.
* Customize supported interface preferences.

### 📞 10. Help and About

* Access application information.
* Find guidance about using RenewHub.

---

## 🛠️ Technology Stack

### Frontend

* **React** — Component-based user interface.
* **Vite** — Frontend development server and build tool.
* **JavaScript (ES6+)** — Application logic.
* **HTML5** — Page structure.
* **CSS3** — Styling and responsive interface development.

### Backend

* **Node.js** — JavaScript runtime.
* **Express.js** — Backend web framework.
* **JWT** — Token-based authentication support.
* **bcryptjs** — Password hashing.
* **Multer** — File upload handling.
* **CORS** — Cross-origin request configuration.
* **dotenv** — Environment variable management.

### Database

* **MySQL** — Relational database management system.
* **mysql2** — Node.js MySQL database driver.

### Development Tools

* **Git** — Version control.
* **GitHub** — Source code hosting.
* **npm** — Package management.
* **ESLint** — JavaScript code quality and linting.

---

## 🏗️ Project Architecture

RenewHub follows a frontend–backend–database architecture.

```text
RenewHub/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
└── README.md
```

### How It Works

1. The user interacts with the React frontend.
2. The frontend communicates with the Express backend through API requests.
3. The backend processes requests and applies the required business logic.
4. The MySQL database stores and retrieves application data.
5. The backend returns responses to the frontend for display.

---

## 💻 Getting Started

Follow these instructions to run RenewHub on your local machine.

### Prerequisites

Install the following tools before starting:

* [Node.js](https://nodejs.org/) and npm
* [MySQL](https://www.mysql.com/)
* [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/SANJAY007x/RenewHub.git
```

Navigate into the project directory:

```bash
cd RenewHub
```

### 2. Set Up the Frontend

Navigate to the client folder:

```bash
cd client
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal. With the default Vite configuration, it is usually:

```text
http://localhost:5173
```

### 3. Set Up the MySQL Database

Open your MySQL client and create the database:

```sql
CREATE DATABASE renewhub;
```

Create or import the required tables according to your application's database schema.

The application database includes tables for:

* `users`
* `documents`
* `notifications`
* `renewals`
* `user_settings`

**Important:** Creating the database alone does not create these tables. Ensure the required table definitions are available and applied before running the application.

### 4. Configure the Backend

Open a new terminal at the project root and navigate to the server directory:

```bash
cd server
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

Add the environment variables required by your backend configuration. For example, if your code uses these variable names:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=renewhub
JWT_SECRET=replace_with_a_strong_random_secret
```

**Note:** Check `server/config/db.js` and `server/server.js` to confirm the exact environment variable names expected by your code. Replace the example values with your local configuration. Never commit your actual `.env` file or secrets to GitHub.

### 5. Start the Backend

From the `server` directory, run the command supported by your `package.json`, typically:

```bash
npm run dev
```

If your project does not define a `dev` script, check the available scripts in `server/package.json`.

The backend is configured to use port `5000` in the current development setup.

### 6. Run Both Applications

Keep both development servers running:

| Application | Local address           |
| ----------- | ----------------------- |
| Frontend    | `http://localhost:5173` |
| Backend     | `http://localhost:5000` |

These addresses apply to the local development setup. Ensure the frontend API configuration points to the correct backend address.

---

## 🗄️ Database Design

RenewHub uses MySQL to organize application data in relational tables.

| Table           | Purpose                                        |
| --------------- | ---------------------------------------------- |
| `users`         | User account information                       |
| `documents`     | Stored document records and associated details |
| `renewals`      | Renewal tracking information                   |
| `notifications` | Notification records                           |
| `user_settings` | User preference settings                       |

The exact columns, relationships, constraints, and indexes depend on the SQL schema implemented in the project.

---

## 🔒 Security Considerations

Security is an important part of a document management application.

RenewHub includes backend authentication-related components and password-hashing and token-handling dependencies.

Recommended security practices include:

* Never upload `.env` files or database credentials to GitHub.
* Use strong, unique secrets for JWT signing.
* Hash passwords rather than storing them in plain text.
* Validate and sanitize user input on the backend.
* Protect private document and account endpoints with appropriate authorization checks.
* Validate uploaded files and restrict their size and allowed types.
* Use HTTPS in production.
* Configure CORS for trusted frontend origins.
* Keep dependencies updated.

The presence of security libraries alone does not guarantee that every endpoint or deployment is secure; implementation and testing are also necessary.

---

## 🚀 Future Enhancements

Potential improvements for future versions include:

* 📧 Email reminders before document expiry.
* 📱 SMS or push notifications for upcoming renewals.
* 📅 Calendar integration for important deadlines.
* ☁️ Secure cloud document storage.
* 📄 Improved document scanning and automatic field extraction.
* 📈 Advanced analytics and renewal history.
* 🌐 Production deployment with a hosted MySQL database.
* 🔐 Additional account security features.
* 📱 Further improvements to the mobile-responsive interface.

These are potential enhancements and should not be considered implemented features unless they are added to the application.

---

## 🎯 Project Goals

RenewHub aims to:

* Simplify document organization.
* Help users monitor important expiry dates.
* Make renewal information easier to access.
* Provide a centralized renewal management experience.
* Improve usability through a modern, organized interface.

---

## 👨‍💻 Developer

**Sanjay**

IT Student | Aspiring Full-Stack Developer

GitHub: [@SANJAY007x](https://github.com/SANJAY007x)

---

## 📄 License

No license has been specified for this repository yet. If you intend to make the project open source, choose an appropriate license and add it to the repository.

---

⭐ **If you find RenewHub useful, consider starring the repository!**

*RenewHub — Organize Documents. Track Renewals. Stay Prepared.*
