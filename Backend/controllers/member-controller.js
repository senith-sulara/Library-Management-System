const path = require('path');
const express = require('express');
const multer = require('multer');
const Members = require('../models/member-model');
const Router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//Insert

Router.post(
  '/insert',
    upload.single('image'),
    async (req, res) => {
      try {
          // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        let member = new Members({
            Fname: req.body.Fname,  
            Lname: req.body.Lname, 
            nic: req.body.nic,
            email: req.body.email, 
            address: req.body.address,
            phone: req.body.phone,
            memberCode: req.body.memberCode,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        });
      await member.save();
      res.send('Member details uploaded successfully.');
      } catch (error) {
        res.status(400).send('Error while uploading Member details. Try again later.');
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
);

Router.get('/getAllMembers', async (req, res) => {
  try {
    const files = await Members.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of Members. Try again later.');
  }
});

// //Update
Router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let member = await Members.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(member.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      Fname: req.body.Fname || member.Fname,
      Lname: req.body.Lname || member.Lname,
      nic: req.body.nic || member.nic,
      email: req.body.email || member.email,
      address: req.body.address || member.address,
      phone: req.body.phone || member.phone,
      memberCode: req.body.memberCode || member.memberCode,
      // avatar: result?.secure_url || member.avatar,
      // cloudinary_id: result?.public_id || member.cloudinary_id,
    };
    member = await Members.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(member);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//////////////////////////////////////

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find member by id
    const member = await Members.findById(req.params.id);
    if (!member) throw Error('No file found');
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(member.cloudinary_id);
    // Delete member from db
    const removed = await member.remove();
    if (!removed)
         throw Error('Something went wrong while trying to delete the file');
    res.json(member);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;