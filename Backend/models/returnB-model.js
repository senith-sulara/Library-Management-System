const mongoose = require("mongoose");

const returnBSchema = mongoose.Schema(
  {
    memberCode: {
      type: String,
    },

    bookCode: {
      type: String,
    },

    borrowDate: {
      type: String,
    },

    returnDate: {
      type: String,
    },

    fine: {
      type: String,
    },
  },
  { timesamps: true }
);

const ReturnB = mongoose.model("Return", returnBSchema);

module.exports = { ReturnB };
