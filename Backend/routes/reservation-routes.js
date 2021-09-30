const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation-controller");

router.post("/add", reservationController.addReservation);
router.get("/getReservations", reservationController.getReservations);
router.put("/update/:id", reservationController.updateReservation);
router.delete("/delete/:id", reservationController.deleteReservation);

module.exports = router;
