const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    totalBeds: {
      type: Number,
      required: true,
      min: 0
    },
    availableBeds: {
      type: Number,
      required: true,
      min: 0
    },
    specialties: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

hospitalSchema.pre('validate', function (next) {
  if (this.availableBeds > this.totalBeds) {
    return next(new Error('availableBeds cannot be greater than totalBeds'));
  }
  next();
});

module.exports = mongoose.model('Hospital', hospitalSchema);
