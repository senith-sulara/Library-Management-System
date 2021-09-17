const { ReturnB } = require("../models/returnB-model");
const Barrow = require("../models/Barrow");

const addReturnB = async (req, res) => {
  const returnB = new ReturnB(req.body);

  await returnB.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

const getDate = async (req, res) => {
  const { memberCode, bookCode } = req.body;

  var members = [];
  var borrowDate;

  members = await Barrow.find({ mid: memberCode });

  members.forEach((item) => {
    let books = item.books;
    books.forEach((book) => {
      if (bookCode === book.bookId) {
        borrowDate = item.borrowDate;
      }
    });
  });

  res.json({ borrowDate:borrowDate });
};

exports.addReturnB = addReturnB;
exports.getDate = getDate;
