# Vinayak Academy

Full-stack marketing site and enquiry API for **Vinayak Academy** — online tuition for Class 1–10.

## Tech stack

- **Frontend:** Vue 3 (Composition API, `<script setup>`), Vite, Tailwind CSS, Axios, Vue Router, **Pinia** (official Vue 3 store — not Vuex)  
- **Backend:** Node.js, Express, Mongoose  
- **Database:** MongoDB  

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)  
- A MongoDB database and connection string (`MONGODB_URI`)

## Project structure

```
Vinayak_Academy/
├── client/          # Vue 3 + Vite (http://localhost:5173 in dev)
│   └── src/stores/  # Pinia stores (UI + enquiry form)
├── server/          # Express API (port 5001 by default — avoids macOS / other apps on 5000)
└── README.md
```

## Backend setup

1. Open a terminal:

   ```bash
   cd server
   npm install
   ```

2. Configure environment variables. Copy the example and edit:

   ```bash
   cp .env.example .env
   ```

   Set `MONGODB_URI` in `.env` to your real MongoDB connection string. Default `PORT=5001` (change if needed; if you change it, update `client/vite.config.js` proxy target to match).

   For deployed frontends on a different domain, also set `ALLOWED_ORIGINS` as a comma-separated list, for example:

   ```bash
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   ```

3. Start the API:

   ```bash
   npm run dev
   ```

   You should see `Connected to MongoDB` and `Server listening on http://localhost:5001`.

### API routes

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/enquiry` | Submit contact form (JSON body) |
| `GET` | `/api/enquiries` | List all enquiries (for admin use later) |

## Frontend setup

1. In another terminal:

   ```bash
   cd client
   npm install
   npm run dev
   ```

2. Open **http://localhost:5173** in your browser.

The Vite dev server proxies `/api` to `http://localhost:5001` (same port as `PORT` in `server/.env`), so the contact form works without extra CORS configuration during local development.

3. For production builds where the frontend and backend are on different origins, create `client/.env` from `client/.env.example` and set:

   ```bash
   VITE_API_URL=https://your-api-domain.com
   ```

## Production notes

- Build the client: `cd client && npm run build`. Static files are output to `client/dist/`.
- Serve `dist/` with any static host, or serve it from Express.
- If the frontend and API are on **different origins** (e.g. `https://app.example.com` and `https://api.example.com`), set `ALLOWED_ORIGINS` on the server and `VITE_API_URL` on the client to your real deployed domains.

## Environment files

- `server/.env` is listed in `.gitignore` — do not commit real credentials.
- Use `server/.env.example` as a template for required keys.

## License

Private project — © 2025 Vinayak Academy.
