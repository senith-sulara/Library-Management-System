const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fine-controller");

router.post("/add", fineController.addFine);
router.get("/getFineDetails", fineController.getFineDetails);

module.exports = router;
