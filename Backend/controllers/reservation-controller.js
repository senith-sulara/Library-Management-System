const { Reservation } = require("../models/reservation-model");

const addReservation = async (req, res) => {
  const reservation = new Reservation(req.body);

  await reservation.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

const getReservations = async (req, res) => {
  await Reservation.find().exec(function (err, reservations) {
    if (err) {
      console.log("Error retrieving");
    } else {
      res.json(reservations);
    }
  });
};

exports.addReservation = addReservation;
exports.getReservations = getReservations;
