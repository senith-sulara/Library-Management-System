const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Barrow = new Schema(
  {
    eid: { type: String },
    mid: { type: String },
    books: [
      {
        bookId: String,
      },
    ],
    borrowDate: { type: String },
    returnDate: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("barrow", Barrow);
