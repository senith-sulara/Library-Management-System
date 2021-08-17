const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
  {
    memberName: {
      type: String,
    },

    memberCode: {
      type: String,
    },

    email: {
      type: String,
    },

    bookName: {
      type: String,
    },

    bookCode: {
      type: String,
    },
  },
  { timesamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = { Reservation };
