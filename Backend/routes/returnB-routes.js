const express = require('express');
const router = express.Router();
const returnBController = require('../controllers/returnB-controller');

router.post('/add', returnBController.addReturnB);
router.post('/getDate', returnBController.getDate);

module.exports = router;