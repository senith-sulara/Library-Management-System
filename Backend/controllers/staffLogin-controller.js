const path = require("path");
const express = require("express");
const multer = require("multer");
const Staff = require("../models/staff-model");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Router = express.Router();

/**
 * sign in controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post("/signin", async (req, res) => {
  const { eid, password } = req.body;

  try {
    //find user by email
    const getUser = await Staff.findOne({ eid });
    if (!getUser) return res.status(404).json({ message: "Account not found" });
    if (password != getUser.password)
      return res.status(404).json({ message: "Invalid password" });

    if (getUser) {
      const token = jwt.sign(
        {
          email: getUser.eid,
          userId: getUser._id,
        },
        "" + process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        user: getUser,
        token: token,
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" + e });
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
module.exports = Router;
