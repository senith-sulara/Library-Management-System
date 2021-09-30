const path = require("path");
const express = require("express");
const Barrow = require("../models/borrow-model");
const Router = express.Router();

/**
 * add borrow book controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post(
  "/addBarrow",
  async (req, res) => {
    try {
      const { eid, mid, books, borrowDate, returnDate, note } = req.body;
      const barrow = new Barrow({
        eid,
        mid,
        borrowDate,
        returnDate,
        note,
        books,
      });
      console.log(req.body);
      console.log(req.body.books);
      await barrow.save().then;
      res.send("successfully borrow book details added to the system.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading borrow book details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

/**
 * get all borrow book controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getAllBarrow", async (req, res) => {
  try {
    const files = await Barrow.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of staff members. Try again later.");
  }
});

/**
 * get borrow book by id controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/searchBorrow/:key", async (req, res) => {
  try {
    let key = req.params.key;
    let query = { name: new RegExp(key, "i") };
    console.log(query);
    Barrow.find(query, (err, result) => {
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
  } catch (error) {
    res
      .status(400)
      .send("Error while getting staff member Details. Try again later.");
  }
});

/**
 * update borrow book controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.put("/:id", async (req, res) => {
  try {
    let barrow = await Barrow.findById(req.params.id);

    const data = {
      eid: req.body.eid || barrow.eid,
      mid: req.body.mid || barrow.mid,
      borrowDate: req.body.borrowDate || barrow.borrowDate,
      returnDate: req.body.returnDate || barrow.returnDate,
      note: req.body.note || barrow.note,
      books: req.body.books || barrow.books,
    };
    barrow = await Barrow.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(barrow);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * delete borrow book controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.delete("/deleteBarrow/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const removed = await Barrow.deleteOne({ _id: req.params.id });
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;
