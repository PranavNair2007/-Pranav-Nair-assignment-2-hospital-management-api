const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      'MONGO_URI is not configured. Add it to your .env file, for example: mongodb://127.0.0.1:27017/hospital_management'
    );
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB: connected');
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB: disconnected');
  });

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });

  return mongoose.connection;
};

const disconnectDB = async () => {
  await mongoose.connection.close();
};

module.exports = { connectDB, disconnectDB };
