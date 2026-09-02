const express = require('express');
const {
  getHospitals,
  getHospitalById,
  getAvailableHospitals,
  createHospital,
  updateHospital,
  deleteHospital
} = require('../controllers/hospitalController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

const router = express.Router();

// Public read endpoints
router.get('/available', getAvailableHospitals);
router.get('/', getHospitals);
router.get('/:id', getHospitalById);

// Protected write endpoints
router.post('/', ensureAuthenticated, createHospital);
router.put('/:id', ensureAuthenticated, updateHospital);
router.delete('/:id', ensureAuthenticated, ensureAdmin, deleteHospital);

module.exports = router;
