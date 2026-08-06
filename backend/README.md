# StudyFlow Backend

Express + Prisma + PostgreSQL API for the StudyFlow task management app. Serves the [StudyFlow frontend](../studyflow-frontend) (React + Vite).

## Tech stack

- **Runtime:** Node.js + Express
- **Database:** PostgreSQL (hosted on Supabase)
- **ORM:** Prisma 7 (with `@prisma/adapter-pg` driver adapter)
- **Auth:** bcrypt (password hashing) + JWT (sessions)
- **Dev tooling:** nodemon (auto-restart on file changes)

## Project structure

```
backend/
├── db/
│   └── prisma.js        # Prisma client instance (with pg adapter)
├── generated/
│   └── prisma/          # Auto-generated Prisma client (gitignored)
├── prisma/
│   ├── schema.prisma     # Data models: User, Subject, Task
│   └── migrations/       # Migration history
├── routes/
│   └── auth.js           # /api/auth/signup, /api/auth/login
├── .env                   # Local secrets (gitignored)
├── package.json
└── server.js              # Express app entry point
```

## Prerequisites

- Node.js (v18+ recommended)
- A PostgreSQL database (this project uses a free hosted instance on [Supabase](https://supabase.com), but any Postgres connection string works)

## Setup

1. **Clone the repo and install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Create your `.env` file** in the project root:

   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   PORT=3000
   JWT_SECRET="replace-with-a-long-random-string"
   ```

   > Get `DATABASE_URL` from your Supabase project → Settings → Database → Connection string. If your password contains special characters (`@`, `#`, `%`, etc.), they must be URL-encoded.

3. **Generate the Prisma client**

   ```bash
   npx prisma generate
   ```

   Prisma 7 writes the generated client to `generated/prisma` (configured via the `output` path in `schema.prisma`) rather than the old default `node_modules/.prisma/client` location.

4. **Run migrations** (creates the actual tables in your database)

   ```bash
   npx prisma migrate dev
   ```

5. **Start the server**

   ```bash
   npm run dev      # nodemon, auto-restarts on file changes — use this while developing
   npm start        # plain node, single run — use this for production
   ```

   Confirm it's running by visiting:

   ```
   http://localhost:3000/api/health
   ```

   You should see `{"status":"ok"}`.

## Data model

Three core entities, defined in `prisma/schema.prisma`:

- **User** — `id`, `fullName`, `email` (unique), `passwordHash`, `createdAt`
- **Subject** — `id`, `name`, `color`
- **Task** — `id`, `title`, `description`, `priority`, `dueDate`, `completed`, `createdAt`, `userId` (FK, required), `subjectId` (FK, optional)

Each `Task` belongs to exactly one `User`. A `Task` may optionally belong to a `Subject`; subjects don't own tasks directly, they're just an optional category.

## API endpoints

| Method | Route                | Description                          | Auth required |
|--------|-----------------------|---------------------------------------|----------------|
| GET    | `/api/health`          | Health check                          | No             |
| POST   | `/api/auth/signup`     | Create a new account                  | No             |
| POST   | `/api/auth/login`      | Log in, returns a JWT                 | No             |

More routes (tasks, subjects) are planned — this table will grow as they're added.

## Known Prisma 7 quirks worth knowing

This project uses Prisma 7:

- The generated client is **not** in `node_modules/.prisma/client` by default — it's written to a custom `output` path (`generated/prisma`), set in `schema.prisma`.
- `PrismaClient` now **requires an explicit driver adapter** — you can't just do `new PrismaClient()` anymore. See `db/prisma.js` for the pattern using `@prisma/adapter-pg`.

If you regenerate the client (`npx prisma generate`) after a fresh `npm install` or after editing `schema.prisma`, these behaviors still apply — nothing to change, just worth knowing if an older tutorial's instructions don't seem to work.

## Common commands

```bash
npx prisma studio          # visual database browser, opens in your browser
npx prisma migrate dev     # apply schema changes as a new migration
npx prisma generate        # regenerate the client after schema changes or a fresh install
```

## Notes

- Passwords are hashed with bcrypt before storage — never stored or logged in plaintext.
- `.env` and `generated/` are gitignored
- The frontend expects this server running on `http://localhost:3000`; if you change `PORT`, update the frontend's API base URL to match.
