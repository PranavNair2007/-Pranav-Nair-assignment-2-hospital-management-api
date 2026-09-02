require('dotenv').config({ override: true });

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const { connectDB } = require('./config/db');
const mongoose = require('mongoose');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'development-only-secret',
    resave: false,
    saveUninitialized: false,
    store: process.env.MONGO_URI
      ? MongoStore.create({ mongoUrl: process.env.MONGO_URI })
      : undefined,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hospital Management API is running',
    endpoints: {
      auth: '/api/auth',
      hospitals: '/api/hospitals',
      availableHospitals: '/api/hospitals/available'
    }
  });
});

app.get('/api/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const databaseState = states[mongoose.connection.readyState] || 'unknown';

  res.status(200).json({
    success: true,
    message: 'Hospital Management API is healthy',
    database: {
      type: 'MongoDB',
      state: databaseState,
      connected: mongoose.connection.readyState === 1
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
