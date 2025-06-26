const express = require('express');
const router = express.Router();

const {
  getAllRevenue,
  getRevenueByMonth,
  getRevenueAnalytics,
  getRevenue,
  getAvailablePeriods
} = require('../controllers/revenueController');

router.get('/', getAllRevenue);


router.get('/monthly/:month/:year', getRevenueByMonth);

router.get('/analytics', getRevenueAnalytics);

router.get('/available-periods', getAvailablePeriods);

router.get('/:id', getRevenue);


module.exports = router;