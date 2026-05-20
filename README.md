# Smart Leads Dashboard

Full-stack lead management dashboard built with the MERN stack, TypeScript, JWT auth, RBAC, filtering, pagination, and CSV export.

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB, Mongoose
- Auth: JWT, bcrypt
- Tooling: Docker, Vite, TanStack Query, React Hook Form, Zod

## Project Structure

```text
client/   React dashboard UI
server/   Express API
docs/     API documentation
```

## Features

- User registration and login
- JWT protected routes
- Role-based access control: Admin and Sales User
- Leads CRUD
- Combined status/source/search filters
- Debounced frontend search
- Backend pagination with 10 records per page
- CSV export
- Loading, error, and empty states
- Responsive dashboard UI

## Local Setup

### 1. Install Dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure Environment

Create `server/.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-leads-dashboard
JWT_SECRET=replace_with_a_strong_secret_at_least_32_chars
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
docker compose up mongo
```

### 4. Run Backend

```bash
cd server
npm run dev
```

Backend runs on `http://localhost:5000`.

### 5. Run Frontend

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Docker Setup

Run the full app:

```bash
docker compose up --build
```

Services:

- Client: `http://localhost:5173`
- API: `http://localhost:5000/api`
- MongoDB: `mongodb://localhost:27017`

Update secrets in `docker-compose.yml` before production use.

## Useful Commands

```bash
cd server && npm run typecheck
cd client && npm run build
```

## API Documentation

See [docs/API.md](docs/API.md).
