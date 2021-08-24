const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Barrow = new Schema({
    eid: {type: String},
    mid: {type: String},
    books: [{
        isbn:String,
    }],
    borrowDate: { type: String},
    returnDate: { type: Number}, 
    note: { type: Number},
  },
   { 
    timestamps: true 
   }
  );
  
  module.exports = mongoose.model("barrow", Barrow);