const express = require('express');
const router = express.Router();
const { getStatisticsController } = require('../controller/statistics_controller'); 
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, getStatisticsController);
module.exports = router;
