const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Members = new Schema(
  {
    Fname: { type: String },
    Lname: { type: String },
    nic: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: String },
    memberCode: { type: String },
    avatar: { type: String },
    cloudinary_id: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("member", Members);
