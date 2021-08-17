const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation-controller');

router.post('/add', reservationController.addReservation);
router.get('/getReservations', reservationController.getReservations);

module.exports = router;