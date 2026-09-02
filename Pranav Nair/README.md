# Hospital Management API

RESTful API for the Assignment 2 Hospital Management API using:

- Node.js + Express.js
- MongoDB + Mongoose
- bcryptjs for password hashing
- Passport + passport-local for authentication
- express-session + connect-mongo for login sessions
- Postman for API testing

## Project structure

```text
hospital-management-api/
├── config/
│   ├── db.js
│   └── passport.js
├── controllers/
│   ├── authController.js
│   └── hospitalController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   ├── Hospital.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── hospitalRoutes.js
├── utils/
│   └── asyncHandler.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── postman_collection.json
└── server.js
```

## 1. Install

```bash
npm install
```

## 2. Configure MongoDB

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set `MONGO_URI` to your local MongoDB or MongoDB Atlas connection string and set a strong `SESSION_SECRET`.

Example local value:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hospital_management
```

## 3. Start the API

Development:

```bash
npm run dev
```

Production-style:

```bash
npm start
```

The API runs at `http://localhost:5000` by default.

## Authentication

Passwords are hashed with bcryptjs before being saved. Passport Local authenticates users using `username` and `password`. Successful login creates an HTTP session stored in MongoDB.

> For a classroom/demo project, the registration endpoint accepts `role: "admin"`. In a production system, users should not be allowed to self-assign an admin role.

## API endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a user |
| POST | `/api/auth/login` | No | Login with Passport Local |
| POST | `/api/auth/logout` | Yes | Logout and destroy session |
| GET | `/api/auth/me` | Yes | Get current logged-in user |

### Hospitals

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/hospitals` | No | Get all hospitals |
| GET | `/api/hospitals/available` | No | Get hospitals with available beds |
| GET | `/api/hospitals/:id` | No | Get one hospital |
| POST | `/api/hospitals` | Yes | Create hospital |
| PUT | `/api/hospitals/:id` | Yes | Update hospital |
| DELETE | `/api/hospitals/:id` | Admin | Delete hospital |

## Example request bodies

### Register

```json
{
  "username": "admin1",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Login

```json
{
  "username": "admin1",
  "password": "password123"
}
```

### Create hospital

```json
{
  "name": "City General Hospital",
  "address": "12 Main Road",
  "city": "Bengaluru",
  "phone": "+91-9876543210",
  "totalBeds": 250,
  "availableBeds": 35,
  "specialties": ["Cardiology", "Neurology", "Emergency"]
}
```

## Required status codes covered

- `201` successful creation/registration
- `200` successful read/update/login/logout
- `400` validation, duplicate data, or invalid ID
- `401` unauthenticated/invalid login
- `403` authenticated but not authorized
- `404` resource/route not found
- `500` unexpected server error

## Assignment requirements covered

- Separate routes, models and controllers
- MongoDB + Mongoose
- bcryptjs password hashing
- Passport Local authentication
- Session-based authenticated routes
- Async/await for MongoDB CRUD
- Request logging middleware
- `/api/hospitals/available` route
- Proper HTTP status codes and JSON messages
- Postman collection included

## MongoDB connectivity

The API uses Mongoose for MongoDB connectivity. See `MONGODB_SETUP.md` for local MongoDB, Docker, and MongoDB Atlas setup instructions.

For the quickest setup with Docker:

```bash
docker compose up -d mongodb
npm install
npm run dev
```

Then verify the database connection with `GET /api/health`.
