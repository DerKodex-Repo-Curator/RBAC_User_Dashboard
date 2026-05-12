<!-- Template Ribbon -->
<div align="right">
  <a href="https://github.com/rajjitlai/RBAC_User_Dashboard">
    <img src="https://img.shields.io/badge/USE%20THIS%20TEMPLATE-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="Use this template" />
  </a>
</div>

<div align="center">

# 🛡️ RBAC User Dashboard

### A modern, user-facing Role-Based Access Control dashboard template

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/MUI-v5-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Template](https://img.shields.io/badge/template-ready-brightgreen?style=flat-square)](https://github.com/rajjitlai/RBAC_User_Dashboard)

</div>

---

## Overview

**RBAC User Dashboard** is a fully-featured, production-ready template for building **user-facing role-based access control** interfaces. Unlike traditional admin panels, this dashboard is designed from the **user's perspective** — showing individuals their assigned role, tasks, permissions, and activity log within an organization.

Built with a **glassmorphism UI** on a deep navy gradient background, with dark/light mode toggle support, Poppins + Open Sans typography, and dummy authentication — ready to wire up to any real backend.

---

## ✨ Features

- **🔐 Authentication Flow** — Login form with Formik + Yup validation. Any valid email + 6-char password accepted (dummy auth). Session persisted via `localStorage`.
- **🏠 Dashboard Home** — Greeting, role badge, stat cards (pending tasks, accessible areas, last login), and recent activity preview.
- **👤 My Profile** — View/edit user details (name, phone, location, bio) with inline Formik form. Changes reflect in real time.
- **📋 My Tasks** — MUI DataGrid listing role-assigned tasks with status filter chips (All / Pending / In Progress / Completed).
- **🔒 My Permissions** — Visual permission matrix showing Read / Write / Delete access across all resource areas for the user's role.
- **📡 Activity Feed** — Chronological activity log grouped by date with typed icons (task, login, profile update).
- **🌗 Dark / Light Mode** — System-aware toggle in both Login and Topbar, using MUI `ThemeProvider`.
- **📱 Collapsible Sidebar** — `react-pro-sidebar` based sidebar with user avatar card, role badge, and active route highlighting.
- **🛡️ Protected Routes** — All dashboard pages are guarded; unauthenticated users are redirected to `/login`.

---

## 🗂️ Project Structure

```
src/
├── auth/
│   └── AuthContext.jsx          # Login/logout/updateProfile context + localStorage persistence
├── components/
│   ├── DashboardLayout.jsx      # Shared layout wrapper (Sidebar + Topbar + content)
│   ├── ProtectedRoute.jsx       # Route guard — redirects to /login if unauthenticated
│   ├── RoleBadge.jsx            # Glassmorphic role chip (Developer / Designer / Analyst)
│   ├── Sidebar.jsx              # Collapsible pro-sidebar with user card
│   ├── StatCard.jsx             # Reusable glass stat card with hover lift
│   └── Topbar.jsx               # Sticky topbar with theme toggle, avatar, logout
├── data/
│   ├── dummyActivity.js         # 10 dummy activity entries (login, tasks, profile events)
│   ├── dummyPermissions.js      # Permission matrix for Developer / Designer / Analyst
│   ├── dummyTasks.js            # 10 dummy tasks across 3 roles
│   └── dummyUser.js             # Single dummy user object (default role: Developer)
├── pages/
│   ├── ActivityFeed.jsx         # Grouped chronological activity feed
│   ├── Dashboard.jsx            # Home page with stats + recent activity
│   ├── Login.jsx                # Auth page with glass card + gradient bg
│   ├── MyPermissions.jsx        # Permission matrix table + summary cards
│   ├── MyTasks.jsx              # DataGrid task list with status filters
│   ├── NotFound.jsx             # 404 fallback page
│   └── Profile.jsx              # View/edit profile page
├── theme/
│   ├── ColorModeContext.jsx     # Dark/light toggle context + useColorMode hook
│   └── theme.js                 # Full MUI theme — navy glassmorphism palette + typography
├── App.jsx                      # Root — providers (Theme, Auth) + all route definitions
├── global.css                   # CSS resets, Poppins + Open Sans import, layout helpers
└── main.jsx                     # React DOM entry point
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Style** | Glassmorphism (`backdrop-filter: blur(16-20px)`) |
| **Dark background** | `linear-gradient(135deg, #020617, #0F172A, #0A1525)` |
| **Light background** | `linear-gradient(135deg, #EFF6FF, #F8FAFC, #E0F2FE)` |
| **Primary accent** | `#3B82F6` (Blue 500) |
| **CTA / Success** | `#22C55E` (Green 500) |
| **Danger / Alert** | `#F43F5E` (Rose 500) |
| **Heading font** | Poppins (400–700) |
| **Body font** | Open Sans (300–700) |
| **Card style** | `rgba(30,41,59,0.6)` + `border: 1px solid rgba(148,163,184,0.15)` |

---

## 🧩 Tech Stack

| Category | Library / Version |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 7 |
| UI Library | MUI v5 + Emotion |
| Routing | react-router-dom v6 |
| Sidebar | react-pro-sidebar v1.1 |
| Forms | Formik + Yup |
| Data Grid | @mui/x-data-grid |
| Charts (ready) | @nivo/bar, @nivo/pie, @nivo/geo |
| Calendar (ready) | @fullcalendar/daygrid, timegrid, list |
| Icons | @mui/icons-material |

---

## 👥 Dummy Roles

The template ships with **3 built-in roles** in `src/data/`. The default user is assigned `Developer`. To simulate a different role, edit `src/data/dummyUser.js`:

```js
export const dummyUser = {
  // ...
  role: "Designer", // Change to "Developer" | "Designer" | "Analyst"
};
```

| Role | Tasks | Permissions |
|---|---|---|
| **Developer** | Auth, code review, bug fix, docs | Source code, CI/CD, Dev DB, Docs |
| **Designer** | Mockups, design tokens, accessibility audit | Design assets, Docs (read-only code) |
| **Analyst** | Revenue forecast, cohort reports, KPI review | Databases (read), Analytics, Billing (read) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rajjitlai/RBAC_User_Dashboard.git

# Navigate into the project
cd RBAC_User_Dashboard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Login
Enter **any valid email** and a **password of 6+ characters** — any credentials work in this template.

---

## 🔧 Customization Guide

| What to change | Where |
|---|---|
| Default user (name, role, department) | `src/data/dummyUser.js` |
| Task list | `src/data/dummyTasks.js` |
| Permission matrix | `src/data/dummyPermissions.js` |
| Activity entries | `src/data/dummyActivity.js` |
| Color palette | `src/theme/theme.js` → `tokens()` |
| Add a new role | Add to `dummyPermissions.js`, `dummyTasks.js`, and `RoleBadge.jsx` |
| Connect real auth | Replace `login()` in `src/auth/AuthContext.jsx` |
| Add new pages | Create in `src/pages/`, add route in `src/App.jsx`, add nav item in `Sidebar.jsx` |

---

## 📜 License

Copyright © 2026 **Rajjit Laishram**. Released under the [MIT License](./LICENSE).

---

<div align="center">

Made with ❤️ by [Rajjit Laishram](https://github.com/rajjitlai)

⭐ Star this repo if you find it useful!

</div>
