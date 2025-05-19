# 🏠 Property Finder

A modern, seamless real estate web platform that connects **guests** with their dream properties and **agents** with potential clients. This platform simplifies property discovery, listing, appointment scheduling, and user promotion – all under an intuitive interface.

Built using **React**, **React Router**, **TailwindCSS**, **Material UI**, **React Query**, and **Firebase Auth**.

---

## ⚙️ Tech Stack

| Technology        | Description                             |
| ----------------- | --------------------------------------- |
| React             | Frontend library for building UI        |
| React Router      | Client-side routing                     |
| Tailwind CSS      | Utility-first CSS framework             |
| Material UI (MUI) | Pre-built UI components                 |
| React Query       | Data fetching and state management      |
| Firebase Auth     | User authentication and role management |

---

## 🧑‍🤝‍🧑 Roles & Permissions

| Role      | Description                                               |
| --------- | --------------------------------------------------------- |
| **Admin** | Manages users, promotes users to agents                   |
| **User**  | Searches properties, bookmarks favorites, contacts agents |
| **Agent** | Lists properties, manages appointments                    |

---

## 🧭 Navigation Structure

### 🧑 Admin

- `/admin/users` — Manage users, view counts, promote users to agents

### 👤 User

- `/` — Homepage with featured listings, advanced search, locations
- `/properties` — Browse/filter all properties
- `/properties/:id` — View property details, write reviews, contact agent
- `/properties/:propertyId/request-appointment` — Schedule appointment
- `/bookmarks` — View & manage bookmarked properties
- `/locations` — Browse by city/district/neighborhood
- `/profile` — Manage personal info

### 🧑‍💼 Agent

- `/properties/create` — Create new property
- `/properties/:id/edit` — Edit owned property
- `/properties/:id/images` — Manage property images
- `/my-properties` — View, filter, and manage own properties
- `/agent/viewing-requests` — View and respond to appointment requests
- `/profile` — Manage personal info

### 🔒 Unauthorized

- `/unauthorized` — Access denied page for restricted routes

---

## 🏗️ Features

### 🔍 Users

- Filter properties by **location**, **price**, **type**, **bedrooms**
- **Bookmark** properties for later viewing
- View **property details** and write **reviews**
- Schedule **viewing appointments** with agents

### 🧑‍💼 Agents

- Create and manage **property listings**
- Accept or decline **viewing requests** from users
- Full control over property images and details

### 🛠️ Admins

- Promote users to **agents**
- Monitor total users, agents, and regular users
- Filter and search users by **name** or **email**

---

## 🔐 Authentication

- 🔥 Firebase Authentication
  - Email/password login
  - Role-based access control (`user`, `agent`, `admin`)
  - Protected routes for each role

---

## 📁 Project Structure

```bash
src/
├── components/      # Shared reusable components
├── pages/           # Page-level components for routing
├── routes/          # Route protection and layout
├── services/        # API services (React Query hooks)
├── utils/           # Helper functions and constants
├── context/         # Auth & role-based state
└── assets/          # Static files (images, icons)
```

---

## 📦 Installation

```bash
git clone https://github.com/your-repo/property-finder.git
cd property-finder
npm install
```

---

## 🚀 Running the App

```bash
npm run dev
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

[MIT](./LICENSE)

---

## 🙌 Acknowledgements

- [React](https://reactjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Material UI](https://mui.com)
- [React Query](https://tanstack.com/query)
- [Firebase](https://firebase.google.com)
