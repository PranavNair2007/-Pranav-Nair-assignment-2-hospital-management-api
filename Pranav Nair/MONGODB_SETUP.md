# MongoDB Connectivity Setup

This project is already configured to connect to MongoDB through Mongoose.

## Option 1: MongoDB with Docker (easiest)

From the project folder:

```bash
docker compose up -d mongodb
```

The MongoDB server will be available at:

```text
mongodb://127.0.0.1:27017/hospital_management
```

Create `.env` from `.env.example` and keep:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hospital_management
```

Then install and start the API:

```bash
npm install
npm run dev
```

## Option 2: Local MongoDB installation

Start your local MongoDB service and use the same connection string:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hospital_management
```

## Option 3: MongoDB Atlas

Create a MongoDB Atlas cluster and database user, allow your development IP address, then put the Atlas connection string in `.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hospital_management?retryWrites=true&w=majority
```

Do not commit `.env` or real database credentials to Git.

## Verify the connection

Open:

```text
GET http://localhost:5000/api/health
```

A successful response contains:

```json
{
  "success": true,
  "message": "Hospital Management API is healthy",
  "database": {
    "type": "MongoDB",
    "state": "connected",
    "connected": true
  }
}
```

If the API cannot connect to MongoDB, it logs the connection error and does not start the HTTP server.
