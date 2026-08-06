# StudyFlow Frontend

React + Vite + MUI frontend for StudyFlow, a task management app for students. Talks to the [StudyFlow backend](../studyflow-backend) (Express + Prisma + PostgreSQL).

## Tech stack

- **Framework:** React (via Vite)
- **UI library:** MUI (Material UI)
- **Routing:** React Router (`react-router-dom`)
- **Forms & validation:** Formik + Yup
- **Auth:** Custom `AuthContext` (see [Auth](#auth) below)

## Project structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AppLogo.jsx
│   │   ├── Card.jsx
│   │   ├── RequireAuth.jsx      # Redirects to /login if not authenticated
│   │   └── RedirectIfAuth.jsx   # Redirects to / if already authenticated
│   ├── contexts/
│   │   └── AuthContext.jsx      # signup / login / logout, session persistence
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MyTasks.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── router/
│   │   └── index.jsx             # Route definitions
│   ├── styles/
│   │   ├── Login.styles.js
│   │   └── Signup.styles.js
│   ├── constants/
│   │   └── AuthConstants.js
│   └── Layout.jsx                 # Shared shell for authenticated pages
├── .env                            # Local config (gitignored)
├── package.json
└── vite.config.js
```

## Prerequisites

- Node.js (v18+ recommended)
- The [backend](../studyflow-backend) running locally on `http://localhost:5173` (or whichever URL/port it's configured to use)

## Setup

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   ```

   Runs on `http://localhost:5173` by default (Vite's default port).

3. **Make sure the backend is running too** — this app expects to reach the API at `http://localhost:3000`. Without it running, signup/login and any data-fetching pages won't work.

## Routing

Defined in `src/router/index.jsx`:

| Path        | Page        | Protection                                  |
|-------------|-------------|-----------------------------------------------|
| `/login`    | Login       | `RedirectIfAuth` — bounces to `/` if already logged in |
| `/signup`   | Signup      | `RedirectIfAuth` — bounces to `/` if already logged in |
| `/`         | Dashboard   | `RequireAuth` — bounces to `/login` if logged out |
| `/tasks`    | MyTasks     | `RequireAuth`                                 |
| `/settings` | Settings    | `RequireAuth`                                 |
| `*`         | NotFound    | Public — matches any unrecognized path, regardless of auth state |

`RequireAuth` and `RedirectIfAuth` both read `currentUser` from `AuthContext`. Note that `RequireAuth` wraps the shared `Layout` route, so it protects Dashboard, MyTasks, and Settings all at once rather than being applied per-page.

## Auth

`src/contexts/AuthContext.jsx` currently handles authentication client-side:

- **Signup** creates an account but does not auto-log the user in — they're redirected to `/login` afterward.
- **Login** supports a "remember me" option:
  - Checked → session persists in `localStorage`, and currently expires 60 minutes after login.
  - Unchecked → session lives in `sessionStorage`, cleared when the browser/tab closes (no time-based expiry).
- **Logout** clears both storage locations.

> This is a transitional, localStorage-only implementation. It's being migrated to call the real backend auth endpoints (`/api/auth/signup`, `/api/auth/login`) instead of storing user data client-side — check the backend README for endpoint details. Once migrated, `AuthContext` will store a JWT rather than user data directly, using the same remember-me storage split described above.

## Forms

Signup and Login both use Formik for form state + Yup for validation schemas (defined at the top of each page file). Field-level errors show once a field has been touched and blurred.

## Notes
- If you see CORS errors in the console, confirm the backend has `cors()` enabled and is actually running before debugging the frontend further.
