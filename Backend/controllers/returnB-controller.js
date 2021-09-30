const { ReturnB } = require("../models/returnB-model");
const Borrow = require("../models/borrow-model");

//add return book details
const addReturnB = async (req, res) => {
  const returnB = new ReturnB(req.body);

  await returnB.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

//get borrowed date of the relevant book according to the member id
const getDate = async (req, res) => {
  const { memberCode, bookCode } = req.body;

  var members = [];
  var borrowDate;

  members = await Borrow.find({ mid: memberCode });

  members.forEach((item) => {
    let books = item.books;
    books.forEach((book) => {
      if (bookCode === book.bookId) {
        borrowDate = item.borrowDate;
      }
    });
  });

  res.json({ borrowDate: borrowDate });
};

//retrieve return book details 
const getReturns = async (req, res) => {
  await ReturnB.find().exec(function (err, returns) {
    if (err) {
      console.log("Error retrieving");
    } else {
      res.json(returns);
    }
  });
};

// update return book details
const updateReturns = async (req, res) => {
  const { memberCode, bookCode } = req.body;

  const id = req.params.id;
  let returnB;
  try {
    returnB = await ReturnB.findById(id);
  } catch (err) {
    console.log("Error updating");
  }

  returnB.memberCode = memberCode;
  returnB.bookCode = bookCode;

  await returnB.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

//delete return book details
const deleteReturns = async (req, res) => {
  const id = req.params.id;

  const returnB = await ReturnB.findById(id);
  if (!returnB) {
    console.log("Error deleting");
  }
  await returnB.remove((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

exports.addReturnB = addReturnB;
exports.getDate = getDate;
exports.getReturns = getReturns;
exports.updateReturns = updateReturns;
exports.deleteReturns = deleteReturns;
