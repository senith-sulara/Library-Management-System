const path = require('path');
const express = require('express');
const multer = require('multer');
const Books = require('../models/books.model');
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
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

Router.post(
  '/insert',
  upload.single('file'),
  async (req, res) => {
    try {
      if(upload == null){
      const { title, auther, publisher, refCode, rackNo, noOfCopies} = req.body;
      const { path, mimetype } = req.file;
      const file = new Books({
        title,  
        auther, 
        publisher,
        refCode, 
        rackNo,
        noOfCopies,
        file_path: path,
        file_mimetype: mimetype
      });
    await file.save();
    res.send('Book details uploaded successfully.');
  }else{
    const {title, auther, publisher, refCode, rackNo, noOfCopies} = req.body;
    const file = new Books({
        title,  
        auther, 
        publisher,
        refCode, 
        rackNo,
        noOfCopies
    });
  await file.save();
  res.send('Book details uploaded successfully.');
  }
    } catch (error) {
      res.status(400).send('Error while uploading Book details. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);




//////////////////////////////////////////
// get subject details according to auther

Router.get('/getAllBooks', async (req, res) => {
  try {
    const files = await Books.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of Books. Try again later.');
  }
});



////////////////////////////////////

Router.get('/search/:search', async (req, res) =>{
  try{
    let search = req.params.search;
    let query = { name: new RegExp(search, "i") };
    console.log(query);
    Books.find(query, (err, result) => {
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
    // const files = await Books.find(req.params.title);
    // const sortedByCreationDate = files.sort(
    //   (a, b) => b.createdAt - a.createdAt
    // );
    // res.send(sortedByCreationDate);
    }catch (error) {
    res.status(400).send('Error while getting Book Details. Try again later.');
  }
});


  Router.delete('/:id', async (req, res) => {
    try {
      const file = await file.findById(req.params.id);
      if (!file) throw Error('No file found');
  
      const removed = await file.remove();
      if (!removed)
        throw Error('Something went wrong while trying to delete the file');
  
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

module.exports = Router;