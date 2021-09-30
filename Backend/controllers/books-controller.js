const path = require("path");
const express = require("express");
const multer = require("multer");
const Books = require("../models/books-model");
const Router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//Insert

Router.post(
  "/insert",
  upload.single("image"),
  async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      let book = new Books({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        refCode: req.body.refCode,
        rackNo: req.body.rackNo,
        noOfCopies: req.body.noOfCopies,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await book.save();
      res.send("Book details uploaded successfully.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading Book details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

//////////////////////////////////////////
// get book details

Router.get("/getAllBooks", async (req, res) => {
  try {
    const files = await Books.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Books. Try again later.");
  }
});

Router.get("/getAllBooks/:title", async (req, res) => {
  try {
    var regex = new RegExp(req.params.title, "i"),
      query = { description: regex };
    const files = await Books.find(query, function (err, books) {
      if (err) {
        res.json(err);
      }

      res.json(books);
    });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Books. Try again later.");
  }
});

////////////////////////////////////

//Update
Router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let book = await Books.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(book.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      title: req.body.title || book.title,
      publisher: req.body.publisher || book.publisher,
      refCode: req.body.refCode || book.refCode,
      rackNo: req.body.rackNo || book.rackNo,
      noOfCopies: req.body.noOfCopies || book.noOfCopies,
      avatar: result?.secure_url || book.avatar,
      cloudinary_id: result?.public_id || book.cloudinary_id,
    };
    book = await Books.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(book);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//////////////////////////////////////

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find book by id
    const book = await Books.findById(req.params.id);
    if (!book) throw Error("No file found");
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(book.cloudinary_id);
    // Delete book from db
    const removed = await book.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(book);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;
