const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = mongoose.Schema(
  {
    Fname: {
      type: String,
    },

    Lname: {
      type: String,
    },

    nic: {
      type: String,
    },

    email: {
      type: String,
    },

    address: {
      type: String,
    },

    phone: {
      type: String,
    },
  },
  { timesamps: true }
);

const Member = mongoose.model('Member', memberSchema);

module.exports = { Member };
