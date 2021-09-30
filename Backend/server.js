const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const checkAuth = require("./middleware/auth");
const BookRoute = require("./controllers/books-controller");
const StaffRoute = require("./controllers/staff-controller ");
const staffLoginRoute = require("./controllers/staffLogin-controller");
const reservationRoute = require("./routes/reservation-routes");
const returnBRoute = require("./routes/returnB-routes");
const fineRoute = require("./routes/fine-routes");
const barrowRoute = require("./controllers/borrow-controller");
const MembRoute = require("./controllers/member-controller");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8070;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
  MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log("DataBase ERROR: ", error.message);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database Synced");
});

app.use("/staffLogin", staffLoginRoute);
app.use(checkAuth);
app.use("/BookDetails", BookRoute);
app.use("/staff", StaffRoute);
app.use("/api/reservation", reservationRoute);
app.use("/api/return", returnBRoute);
app.use("/api/fine", fineRoute);
app.use("/barrow", barrowRoute);
app.use("/member", MembRoute);

app.use(express.static("files"));
app.use(express.static("proPic"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
