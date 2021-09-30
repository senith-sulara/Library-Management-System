const mongoose = require("mongoose");

const fineSchema = mongoose.Schema(
  {
    memberCode: {
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

const Fine = mongoose.model("Fine", fineSchema);

module.exports = { Fine };
