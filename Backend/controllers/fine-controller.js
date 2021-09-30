const { Fine } = require("../models/fine-model");

const addFine = async (req, res) => {
  const fine = new Fine(req.body);

  await fine.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

const getFineDetails = async (req, res) => {
  await Fine.find().exec(function (err, fines) {
    if (err) {
      console.log("Error retrieving");
    } else {
      res.json(fines);
    }
  });
};
exports.addFine = addFine;
exports.getFineDetails = getFineDetails;
