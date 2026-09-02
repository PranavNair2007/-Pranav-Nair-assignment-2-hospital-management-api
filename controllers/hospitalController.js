const Hospital = require('../models/Hospital');
const asyncHandler = require('../utils/asyncHandler');

const getHospitals = asyncHandler(async (req, res) => {
  const hospitals = await Hospital.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: hospitals.length,
    hospitals
  });
});

const getHospitalById = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return res.status(404).json({
      success: false,
      message: 'Hospital not found'
    });
  }

  return res.status(200).json({ success: true, hospital });
});

const getAvailableHospitals = asyncHandler(async (req, res) => {
  const hospitals = await Hospital.find({ availableBeds: { $gt: 0 } }).sort({ availableBeds: -1 });

  return res.status(200).json({
    success: true,
    count: hospitals.length,
    hospitals
  });
});

const createHospital = asyncHandler(async (req, res) => {
  const hospital = await Hospital.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Hospital created successfully',
    hospital
  });
});

const updateHospital = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!hospital) {
    return res.status(404).json({
      success: false,
      message: 'Hospital not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Hospital updated successfully',
    hospital
  });
});

const deleteHospital = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findByIdAndDelete(req.params.id);

  if (!hospital) {
    return res.status(404).json({
      success: false,
      message: 'Hospital not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Hospital deleted successfully'
  });
});

module.exports = {
  getHospitals,
  getHospitalById,
  getAvailableHospitals,
  createHospital,
  updateHospital,
  deleteHospital
};
