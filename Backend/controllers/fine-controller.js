const { Fine } = require("../models/fine-model");

const addFine = async (req, res) => {
  const fine = new Fine(req.body);

  await fine.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

exports.addFine = addFine;