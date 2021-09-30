const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Books = new Schema(
  {
    title: { type: String },
    author: { type: String },
    publisher: { type: String },
    refCode: { type: String },
    rackNo: { type: String },
    noOfCopies: { type: String },
    avatar: { type: String },
    cloudinary_id: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books", Books);
