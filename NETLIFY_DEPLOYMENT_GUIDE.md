# Arsha Freelancers – Netlify & Backend Deployment Guide

This guide explains how to deploy the Arsha Freelancers application. Since this is a full-stack application, the architecture is split:
1. **Frontend (React + Vite)**: Deployed to **Netlify**
2. **Backend (Node.js + Express + MongoDB)**: Deployed to a hosting provider like **Render** or **Railway**

---

## 💻 Part 1: Backend Deployment (Render / Railway)

Because Netlify only hosts static frontend files, your Node.js Express server must be deployed to a platform that runs active web services. **Render (render.com)** is highly recommended.

### Step 1: Push Backend to GitHub
Ensure your code is pushed to your GitHub repository. The backend code is inside the `server/` directory.

### Step 2: Create a Web Service on Render
1. Sign up on [Render.com](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following details:
   - **Name**: `arsha-backend`
   - **Root Directory**: `server` (Important: points to your backend sub-directory)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Select the **Free** tier.

### Step 3: Add Environment Variables in Render
In the **Environment** tab of your Render service, add the following variables:

| Key | Value | Description |
|-----|-------|-------------|
| `MONGODB_URI` | `mongodb://Arsha_db_web:Arsha%4006@ac-xsotxiw-shard-00-00.xy9wuyp.mongodb.net:27017,ac-xsotxiw-shard-00-01.xy9wuyp.mongodb.net:27017,ac-xsotxiw-shard-00-02.xy9wuyp.mongodb.net:27017/arsha_db?ssl=true&replicaSet=atlas-szkdkn-shard-0&authSource=admin&retryWrites=true&w=majority` | Your direct Atlas connection |
| `JWT_SECRET` | `arsha_super_secret_jwt_2024_xK9pMnQr` | Secret key for JWT generation |
| `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
| `CLOUDINARY_CLOUD_NAME` | `dpzw96yda` | Cloudinary name |
| `CLOUDINARY_API_KEY` | `858366922655542` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | `IW2oOJQwcmbPcC_0ht4inVkGIXM` | Cloudinary Secret Key |
| `LYZR_API_KEY` | `sk-default-hhDp9DG4ZUu1Hy8uHDIYLjse5a2uLuRa` | Lyzr API Key |
| `LYZR_AGENT_ID` | `6a3fb88c532e054e55d79ecf` | Lyzr Agent ID |
| `LYZR_SESSION_ID` | `6a3fb88c532e054e55d79ecf-nuvnwb4n` | Lyzr Session ID |
| `LYZR_USER_ID` | `arunsakthi2802@gmail.com` | Lyzr Email |
| `PORT` | `5000` | Render automatically manages ports, but keep fallback |
| `NODE_ENV` | `production` | Enables production mode optimizations |
| `CLIENT_URL` | `https://your-netlify-site.netlify.app` | URL of your deployed Netlify frontend |

---

## ⚡ Part 2: Frontend Deployment (Netlify)

Once your backend is running on Render and you have its live URL (e.g., `https://arsha-backend.onrender.com`), deploy the frontend to Netlify.

### Step 1: Configure Vite Redirects
React is a Single Page Application (SPA). To prevent `404 Not Found` errors when refreshing routes like `/admin` or `/portal`, we must instruct Netlify to redirect all routes to `index.html`.

We have created a `public/_redirects` file in your workspace containing:
```text
/*    /index.html   200
```
This is already compiled during Vite builds!

### Step 2: Configure Netlify Proxy to Avoid CORS
To proxy frontend `/api` requests to your Render backend:
1. Create or edit `netlify.toml` in your project root directory.
2. Add a proxy redirect rule to forward `/api/*` to your backend URL:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-service.onrender.com/api/:splat"
  status = 200
  force = true
```

*Note: Replace `https://your-backend-service.onrender.com` with your real Render backend URL.*

### Step 3: Deploy via Netlify Dashboard
1. Log in to [Netlify.com](https://netlify.com).
2. Click **Add new site** → **Import from Git**.
3. Choose your repository.
4. Set the following build settings:
   - **Base directory**: Leave blank (root directory)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist` (Vite's build output folder)
5. Click **Deploy Site**.

---

## 🔒 Security Best Practices
- **Never commit `.env` files**: Ensure `.env` is listed in your `.gitignore` to prevent credentials exposure.
- **Backend CORS configuration**: Make sure `CLIENT_URL` in backend env matches your Netlify live URL.
