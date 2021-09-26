const express = require('express');
const router = express.Router();
const returnBController = require('../controllers/returnB-controller');

router.post('/add', returnBController.addReturnB);
router.post('/getDate', returnBController.getDate);
router.get('/getReturns', returnBController.getReturns);

module.exports = router;