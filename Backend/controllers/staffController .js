const path = require('path');
const express = require('express');
const multer = require('multer');
const Staff = require('../models/staff');
// const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary"); 
const upload = require("../utils/multer");
const Router = express.Router();
 
/**
 * sign in controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

 Router.post('/signin', async (req, res)=>{
    const{eid,password} = req.body;

    try{

        //find user by email
        const getUser =await  Staff.findOne({eid});
        if (!getUser) return res.status(404).json({message:"Account not found"});
        if(password != getUser.password) return res.status(404).json({message:"Invalid password"});

        // //get user
        // const token = jwt.sign({email: getUser.email,id:getUser.id},process.env.USERSTRING,{expiresIn:'1h'});

        res.status(200).json({result:getUser});

    }catch (e) {

        res.status(500).json({message: "Server error" + e});

    }
});

Router.post(  '/addStaff', upload.single('images'), async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const { eid,name, email, address, contact, password} = req.body;
      const staff = new Staff({
        eid,
        name,  
        email, 
        address,
        contact, 
        password,   
        proPic:result.secure_url, 
        cloudinary_id: result.public_id
      });
    await staff.save();
    res.send('successfully new staff member added to the system.');
    } catch (error) {
      res.status(400).send('Error while uploading staff member details. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

 
 

Router.get('/getAllStaff', async (req, res) => {
  try {
    const files = await Staff.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of staff members. Try again later.');
  }
});

Router.put('/updateStaff/:id', async (req, res) =>{
  const id = req.params.id;
  const {status} = req.body;
  const updateStaff = {
      status
  }
  console.log("updateStaff: ", updateStaff);
  const update = await Staff.findByIdAndUpdate(id, updateStaff)
      .then(() => {
          res.status(200).send({status: "Staff member details Updated"})
      }).catch((err) => {
          console.log(err);
          res.status(500).send({status: " Error", error:err.message});
      })
});

Router.get('/searchStaff/:key', async (req, res) =>{
  try{
    let key = req.params.key;
    let query = { name: new RegExp(key, "i") };
    console.log(query);
    Staff.find(query, (err, result) => {
      if (err) {
        return next(err);
      }
  
      data = {
        status: "success",
        code: 200,
        data: result,
      };
      res.json(data);
    });
    }catch (error) {
    res.status(400).send('Error while getting staff member Details. Try again later.');
  }
});


  Router.delete('/deleteStaff/:id', async (req, res) => {
    try {
      console.log(req.params.id);
      const removed = await Staff.deleteOne({ _id: req.params.id});
      if (!removed)
        throw Error('Something went wrong while trying to delete the file');
  
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

module.exports = Router;