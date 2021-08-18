const path = require('path');
const express = require('express');
const multer = require('multer');
const Staff = require('../models/staff');
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './proPic');
    },
    filename(req, file, cb) {
      cb(null, new Date().getTime().toString() + "_" + file.originalname);
    }
  }),
  limits: {
    fileSize: 3000000 // max file size 3MB = 3000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});




Router.post(  '/addStaff', upload.single('file'), async (req, res) => {
    try {
      const { eid,name, email, address, contact, password} = req.body;
      const { path, mimetype} = req.file;
      const staff = new Staff({
        eid,
        name,  
        email, 
        address,
        contact, 
        password,   
        proPic: path,
        file_mimetype: mimetype
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