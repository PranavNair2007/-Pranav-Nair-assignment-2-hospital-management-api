# Quick start

1. Install Node.js (LTS) and MongoDB.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and update `MONGO_URI` and `SESSION_SECRET`.
5. Run `npm run dev`.
6. Import `postman_collection.json` into Postman.
7. Register/login first, then test the protected hospital POST/PUT/DELETE endpoints.

The first image's assignment says the API should use Node.js, Express, Passport, bcrypt/bcryptjs, MongoDB and Mongoose; the second image additionally requires `/hospitals/available`, request logging, async/await CRUD, correct status codes/messages, and separate routes/models/controllers. This project implements those requirements.
