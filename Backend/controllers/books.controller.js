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




Router.post(
  '/insert',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, auther, publisher, refCode, rackNo, noOfCopies} = req.body;
      const { path, mimetype} = req.file;
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



// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'files/')
//   },
//   filename: function(req, file, cb) {
//       let ext = path.extname(file.originalname)
//       cb(null, Date.now() + ext)
//   }
  
// })

// var upload = multer ({
//   storage: storage,
//   fileFilter: function(req, file, callback) {
//       const ext = path.extname(file.originalname)
//       if ( ext == '.jpg' || ext == '.png') {
//           callback(null, true)

//       }else{
//           console.log('Only jpg and png files are supported!')
//           callback(null, false)
//       }
//   }
// })

// Router.route('/insert').post(upload.single('image'), (req, res) => {
//   const title = req.body.title;
//   const auther = req.body.auther;
//   const publisher = req.body.publisher;
//   const refCode = req.body.refCode;
//   const rackNo = req.body.rackNo;
//   const noOfCopies = req.body.noOfCopies;
//   const image = req.body.image;

//   console.log(req.body);

//   let books = new Books({
//     title,
//     auther,
//     publisher,
//     refCode,
//     rackNo,
//     noOfCopies,
//     image,
//   });
//   if (req.file) {
//     books.image = req.file.path;
//   }
//   books
//     .save()
//     .then((books) => {
//       res.status(200).json({ message: 'Books added Succefully' });
//       console.log(books);
//     })
//     .catch((err) => {
//       res.status(200).send({ message: 'Please try again' });
//     });
// });


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

  // Router.get('/file/:id', async (req, res) => {
  //   try {
  //     const file = await Books.findById(req.params.id);
  //     res.set({
  //       'Content-Type': "application/png"
  //     });
  //     res.sendFile(path.join(__dirname, '..', '..', file.file_path));
  //   } catch (error) {
  //     res.status(400).send('Error while Opening file. Try again later.');
  //   }
  // });

module.exports = Router;