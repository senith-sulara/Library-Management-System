const { Reservation } = require("../models/reservation-model");

//add reservation details
const addReservation = async (req, res) => {
  const reservation = new Reservation(req.body);

  await reservation.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

//retrieve reservation details
const getReservations = async (req, res) => {
  await Reservation.find().exec(function (err, reservations) {
    if (err) {
      console.log("Error retrieving");
    } else {
      res.json(reservations);
    }
  });
};

//update reservation details
const updateReservation = async (req, res) => {
  const { memberName, memberCode, email, bookName, bookCode } = req.body;

  const reservationId = req.params.id;
  let reservation;
  try {
    reservation = await Reservation.findById(reservationId);
  } catch (err) {
    console.log("Error updating");
  }

  reservation.memberName = memberName;
  reservation.memberCode = memberCode;
  reservation.email = email;
  reservation.bookName = bookName;
  reservation.bookCode = bookCode;

  await reservation.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

//delete reservation details
const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;

  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    console.log("Error deleting");
  }
  await reservation.remove((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

exports.addReservation = addReservation;
exports.getReservations = getReservations;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;
