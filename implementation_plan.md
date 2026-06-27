# Arsha Freelancers – Full-Stack + AI Integration Plan

## Overview

Your existing Vite + React + TailwindCSS frontend is already well-built with multiple views (Home, About, Services, Gallery, Reviews, Projects, Contact). The goal is to:

1. **Add a Node.js + Express backend** (in a `server/` folder) that connects to MongoDB Atlas and exposes REST APIs for all CRUD operations.
2. **Add JWT Authentication** with an Admin Dashboard and protected routes.
3. **Integrate Lyzr AI Agent** as a floating smart chat assistant on the frontend.
4. **Upgrade all frontend views** to pull live data from the backend APIs (replacing any hardcoded/static data).
5. **Add Cloudinary image upload** for Gallery, Reviews, Stories, and User Profiles.
6. **Add Stories module** (new frontend view + backend CRUD).
7. **Add Admin Dashboard** (protected frontend view with full CRUD management panels).

---

## User Review Required

> [!IMPORTANT]
> **MongoDB Password in Connection String**: The MongoDB SRV URL you provided contains the password. We will store it ONLY in `.env` (which is gitignored). Confirm: is the password `Arsha@06`? The connection string shows `Arsha_db_web:Arsha@06@arsha-06.xy9wuyp.mongodb.net`.

> [!WARNING]
> **Backend on same machine**: Since this is a local Vite project (not a cloud deployment), the Express server will run as a separate process on port 5000. Vite dev server (port 3000) will proxy `/api/*` calls to `localhost:5000`. This means you'll need to run TWO terminal processes during development.

> [!IMPORTANT]
> **Cloudinary**: You'll need a free Cloudinary account. Do you have one? We need `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

> [!NOTE]
> **No Git Push**: As requested, no git operations will be performed.

---

## Open Questions

1. Do you want the Admin Dashboard as a **separate route** (e.g. `/admin`) in the same React app, or as a completely **separate frontend app**?  
   *Plan: Add `/admin` protected route in the same React app with a full dashboard layout.*

2. For the **Stories module**, do you want a rich text editor (like Quill/TipTap) or plain textarea for story content?  
   *Plan: Use a styled textarea for now (can upgrade later).*

3. Should the **Lyzr AI Agent** appear on all pages, or only specific pages (like Contact, Home)?  
   *Plan: Float on all pages as a collapsible chat bubble.*

---

## Architecture

```
ARSHA Web Page/
├── server/                    ← NEW: Node.js + Express backend
│   ├── index.js               ← Entry point, mounts routes
│   ├── .env                   ← MongoDB URI, JWT Secret, Cloudinary, Lyzr keys
│   ├── config/
│   │   ├── db.js              ← MongoDB Atlas connection
│   │   └── cloudinary.js      ← Cloudinary config
│   ├── models/
│   │   ├── User.js
│   │   ├── Review.js
│   │   ├── Gallery.js
│   │   ├── Story.js
│   │   ├── Service.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── reviews.routes.js
│   │   ├── gallery.routes.js
│   │   ├── stories.routes.js
│   │   ├── services.routes.js
│   │   └── contact.routes.js
│   ├── middleware/
│   │   ├── auth.js            ← JWT verification
│   │   ├── adminOnly.js       ← Role check
│   │   └── upload.js          ← Multer + Cloudinary
│   └── package.json
│
├── src/
│   ├── api/                   ← NEW: API client layer
│   │   ├── axiosClient.js     ← Axios instance with JWT interceptor
│   │   ├── auth.api.js
│   │   ├── reviews.api.js
│   │   ├── gallery.api.js
│   │   ├── stories.api.js
│   │   ├── services.api.js
│   │   ├── contact.api.js
│   │   └── lyzr.api.js        ← Lyzr AI chat calls
│   │
│   ├── context/               ← NEW: React Context
│   │   └── AuthContext.jsx    ← Auth state, login/logout
│   │
│   ├── components/
│   │   ├── (existing)...
│   │   ├── StoriesView.jsx    ← NEW: Stories list + detail page
│   │   ├── LyzrChat.jsx       ← NEW: Floating AI chat bubble
│   │   └── admin/             ← NEW: Admin Dashboard components
│   │       ├── AdminLayout.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminReviews.jsx
│   │       ├── AdminGallery.jsx
│   │       ├── AdminStories.jsx
│   │       ├── AdminServices.jsx
│   │       ├── AdminUsers.jsx
│   │       └── AdminContacts.jsx
│   │
│   └── App.jsx                ← MODIFIED: Add admin route, auth context, stories
│
└── vite.config.js             ← MODIFIED: Add proxy for /api → port 5000
```

---

## Proposed Changes

### Component 1: Backend Server

#### [NEW] server/index.js
Express app entry point with CORS, rate limiting, helmet, all routes mounted.

#### [NEW] server/.env
```
MONGODB_URI=mongodb+srv://Arsha_db_web:Arsha@06@arsha-06.xy9wuyp.mongodb.net/arsha_db?appName=Arsha-06
JWT_SECRET=arsha_super_secret_jwt_key_2024
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
LYZR_API_KEY=sk-default-hhDp9DG4ZUu1Hy8uHDIYLjse5a2uLuRa
LYZR_AGENT_ID=6a3fb88c532e054e55d79ecf
LYZR_SESSION_ID=6a3fb88c532e054e55d79ecf-nuvnwb4n
PORT=5000
```

#### [NEW] server/config/db.js — MongoDB Atlas connection via Mongoose
#### [NEW] server/config/cloudinary.js — Cloudinary v2 config
#### [NEW] server/models/User.js, Review.js, Gallery.js, Story.js, Service.js, Contact.js
#### [NEW] server/routes/*.routes.js — All REST API routes
#### [NEW] server/middleware/auth.js, adminOnly.js, upload.js
#### [NEW] server/package.json — `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `multer`, `cloudinary`, `multer-storage-cloudinary`, `cors`, `dotenv`, `express-rate-limit`, `helmet`, `express-mongo-sanitize`, `xss-clean`

---

### Component 2: Frontend API Layer

#### [NEW] src/api/axiosClient.js
Axios instance pointing to `/api`, attaches JWT token from localStorage on every request.

#### [NEW] src/api/*.api.js
One file per resource — clean, typed API call functions.

#### [NEW] src/api/lyzr.api.js
Calls Lyzr Agent Studio chat endpoint with user_id, agent_id, session_id.

---

### Component 3: Auth Context

#### [NEW] src/context/AuthContext.jsx
React context providing `user`, `token`, `login()`, `logout()`, `isAdmin` to entire app.

---

### Component 4: New Frontend Views

#### [NEW] src/components/StoriesView.jsx
Story list with cover images, categories, "Read More" detail modal.

#### [NEW] src/components/LyzrChat.jsx
Floating chat bubble in bottom-left. Calls Lyzr AI agent. Shows conversation history. Typing indicator, glassmorphism UI.

#### [NEW] src/components/LoginView.jsx
JWT login form. On success stores token + user in AuthContext.

#### [NEW] src/components/admin/AdminLayout.jsx
Sidebar layout for admin. Protected — redirects to login if not admin.

#### [NEW] src/components/admin/AdminDashboard.jsx
Stats cards (Total Users, Reviews, Gallery, Stories, Services, Pending Reviews, Contact Requests).

#### [NEW] src/components/admin/AdminReviews.jsx
Full CRUD + approve/reject + search + filter.

#### [NEW] src/components/admin/AdminGallery.jsx
Multi-image upload (Cloudinary), categorize, delete.

#### [NEW] src/components/admin/AdminStories.jsx
Create/edit/delete stories, publish/draft toggle, cover image upload.

#### [NEW] src/components/admin/AdminServices.jsx
Add/edit/delete/enable-disable services.

#### [NEW] src/components/admin/AdminUsers.jsx
View/search/edit/delete/block/role-change users.

#### [NEW] src/components/admin/AdminContacts.jsx
View/mark-read/delete contact enquiries.

---

### Component 5: Modified Files

#### [MODIFY] vite.config.js
Add proxy: `/api` → `http://localhost:5000`

#### [MODIFY] src/App.jsx
- Wrap with `AuthContext.Provider`
- Add `login`, `admin`, `stories` to valid views
- Add `LyzrChat` floating component
- Pass `onNavigate` props to Stories, Login views

#### [MODIFY] src/components/ReviewView.jsx
Fetch approved reviews from `GET /api/reviews?approved=true` instead of static data.

#### [MODIFY] src/components/GalleryView.jsx
Fetch gallery images from `GET /api/gallery` API.

#### [MODIFY] src/components/ContactView.jsx
Submit to `POST /api/contact` API.

#### [MODIFY] src/components/HomeView.jsx
Fetch live stats (student counter), services, reviews, stories from API.

#### [MODIFY] src/components/ServicesView.jsx
Fetch services from `GET /api/services?status=active`.

---

## Verification Plan

### Automated Tests
```bash
# Test backend APIs with curl / Postman:
curl http://localhost:5000/api/reviews
curl http://localhost:5000/api/services
curl http://localhost:5000/api/gallery
```

### Manual Verification
1. Run `npm run dev` (frontend on :3000)
2. Run `node server/index.js` (backend on :5000)
3. Register admin via `POST /api/auth/register` with role=admin
4. Login at `/login` and navigate to `/admin`
5. Verify Dashboard loads stats from MongoDB
6. Upload gallery image, verify Cloudinary URL
7. Submit contact form, verify MongoDB record
8. Open Lyzr chat, send message, verify AI response
9. Submit a review as public user, verify admin can approve/reject it
10. Create a Story in admin, publish it, verify it appears on Stories page
