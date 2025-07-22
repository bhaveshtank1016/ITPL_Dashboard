# ITPL_Dashboard
# Internal Employee & Operations Management System

<p align="center">
A streamlined system for managing daily employee operations like attendance, leave, and status reporting.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-in%20development-blue" alt="Status">
</p>

---

## 📖 About The Project

This project is a comprehensive internal tool designed to centralize and simplify core HR and operational tasks. It provides a clear and efficient interface for both employees and administrators to manage daily activities, reducing manual overhead and improving transparency within the organization.

<img src = "https://drive.google.com/file/d/1kKj50cJQSR1L-pwSv3vju4Jcq3SjCgBI/view?usp=drive_link">
)
## ✨ Core Features

A quick overview of the main modules available in the system:

* **🔐 User Authentication & Role-Based Access**
* **📊 Personalized Employee Dashboard**
* **🕒 Attendance Management**
* **🌴 Leave Management**
* **📝 Daily Status Reports (DSR)**
* **⚙️ Centralized Admin Panel**

---

## 🚀 Detailed Functionality

### 1. Core System & Authentication
* Secure JWT-based user login/logout.
* **Role-Based Access Control:**
    * **Admin:** Full system access.
    * **Employee:** Access to personal dashboard and functions.
* Automated password reset via email.
* Fully responsive design for desktop and mobile.

### 2. Employee Dashboard
* At-a-glance view of attendance status, leave balance, and pending tasks.
* Quick links for common actions (Check-In, Apply for Leave).
* Admin announcements and notification panel.

### 3. Attendance Management
* **Employee:**
    * One-click Check-in/Check-out with automatic timestamping.
    * View personal daily/monthly attendance logs and total work hours.
* **Admin:**
    * Live dashboard of all employees' attendance status.
    * Generate and export detailed attendance reports (filterable by date, employee).
    * Manually add or correct attendance records.

### 4. Leave Management
* **Employee:**
    * Intuitive form to apply for leave.
    * Track personal leave history and status (Pending, Approved, Rejected).
    * View remaining leave balances.
* **Admin:**
    * Central dashboard to approve or reject leave requests.
    * Generate and export leave reports.
    * Manage company-wide leave policies and types.

### 5. Daily Status Report (DSR) Management
* **Employee:**
    * Simple form to submit daily tasks, future plans, and blockers.
    * View personal DSR history.
* **Admin:**
    * Consolidated view of all submitted DSRs.
    * Filter reports by employee or date range.

### 6. Centralized Admin Panel
* **User Management:** Add, view, edit, or deactivate employee accounts.
* **Employee Records:** Manage employee reference details and resignation records.
* **Reporting Hub:** A single access point for all system-wide reports.

## 🛠️ Tech Stack

This project is built with the following technologies:

| Category      | Technology / Library                                       |
| :------------ | :--------------------------------------------------------- |
| **Frontend** | `[e.g., React, Tailwind CSS, Vite]`                        |
| **Backend** | `[e.g., Node.js, Express.js]`                              |
| **Database** | `[e.g., MongoDB with Mongoose]`                            |
| **Auth** | `[e.g., JSON Web Tokens (JWT)]`                            |

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18 or later)
* npm or yarn
* Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/bhaveshtank1016/ITPL_Dashboard.git
    cd ITPL_Dashboard
    ```

2.  **Install dependencies:**
    *(Install for both backend and frontend if they are in separate folders)*
    ```sh
    # Example for a root directory with a backend folder
    npm install
    cd backend
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root/backend directory and add the necessary configuration (database URI, JWT secret, etc.).
    ```sh
    cp .env.example .env
    ```

### Running the Application

1.  **Start the backend server:**
    ```sh
    npm run start  # Or your custom script
    ```
2.  **Start the frontend development server:**
    ```sh
    # In a new terminal, navigate to the frontend directory
    npm run dev
    ```
3.  Open [http://localhost:5173](http://localhost:5173) (or your configured frontend port) in your browser.


## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

