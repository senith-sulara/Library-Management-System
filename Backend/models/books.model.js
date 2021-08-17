const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Books = new Schema({
    title: {type: String},
    auther: { type: String},
    publisher: { type: String},
    refCode: { type: String},
    rackNo: { type: String},
    noOfCopies: { type: String},
    file_path: {type: String},
    file_mimetype: {type: String}
  },
   { 
    timestamps: true 
   }
  );
  
  module.exports = mongoose.model("books", Books);