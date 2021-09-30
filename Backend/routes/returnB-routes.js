const express = require("express");
const router = express.Router();
const returnBController = require("../controllers/returnB-controller");

router.post("/add", returnBController.addReturnB);
router.post("/getDate", returnBController.getDate);
router.get("/getReturns", returnBController.getReturns);
router.put("/update/:id", returnBController.updateReturns);
router.delete("/delete/:id", returnBController.deleteReturns);

module.exports = router;
