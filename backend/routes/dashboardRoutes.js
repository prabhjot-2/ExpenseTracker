const express = require('express');
const {protect} = require("../middleware/authMiddleware")
const { getDashboardData } = require('../controllers/dashboardController');
const router = express.Router();

// Dashboard route to get dashboard data
router.get('/', protect, getDashboardData);

module.exports = router;
// Compare this snippet from backend/controllers/dashboardController.js: