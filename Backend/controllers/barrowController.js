const path = require('path');
const express = require('express'); 
const Barrow = require('../models/Barrow'); 
const Router = express.Router();
  
Router.post(  '/addBarrow' , async (req, res) => {
    try { 
      const { eid,mid, books, barrowDate, returnDate,note} = req.body;
      const Barrow = new Barrow({
        eid,
        mid,  
        books, 
        barrowDate,
        returnDate,
        note
      });
    await Barrow.save();
    res.send('successfully borrow book details added to the system.');
    } catch (error) {
      res.status(400).send('Error while uploading borrow book details. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
 
module.exports = Router;