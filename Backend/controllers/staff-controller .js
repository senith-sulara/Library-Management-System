const path = require("path");
const express = require("express");
const multer = require("multer");
const Staff = require("../models/staff-model");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Router = express.Router();

/**
 * Add staff member controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post(
  "/addStaff",
  upload.single("images"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const { eid, name, email, address, contact, password } = req.body;
      const staff = new Staff({
        eid,
        name,
        email,
        address,
        contact,
        password,
        proPic: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await staff.save();
      res.send("successfully new staff member added to the system.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading staff member details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

/**
 * get all staff member controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getAllStaff", async (req, res) => {
  try {
    const files = await Staff.find({});
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
 *search staff member by name controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/searchStaff/:key", async (req, res) => {
  try {
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
  } catch (error) {
    res
      .status(400)
      .send("Error while getting staff member Details. Try again later.");
  }
});

/**
 *get staff member by id controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getstaffmember/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const member = await Staff.find({ eid: id });
    res.send(member);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of staff members. Try again later.");
  }
});

/**
 * update staff member controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let staff = await Staff.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(staff.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || staff.name,
      contact: req.body.contact || staff.contact,
      email: req.body.email || staff.email,
      address: req.body.address || staff.address,
      eid: req.body.eid || staff.eid,
      // avatar: result?.secure_url || member.avatar,
      // cloudinary_id: result?.public_id || member.cloudinary_id,
    };
    staff = await Staff.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(staff);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * delete staff member controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.delete("/deleteStaff/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const removed = await Staff.deleteOne({ _id: req.params.id });
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;
