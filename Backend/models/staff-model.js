const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Staff = new Schema(
  {
    eid: { type: String },
    name: { type: String },
    email: { type: String },
    address: { type: String },
    contact: { type: Number },
    password: { type: String },
    proPic: { type: String },
    cloudinary_id: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("staff", Staff);
