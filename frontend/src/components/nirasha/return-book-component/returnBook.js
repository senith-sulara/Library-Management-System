import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import "../css/reservation.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import { useHistory } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "85%",
    margin: "auto",
    marginTop: "20px",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundImage:
      "url(http://scrippsvoice.com/wp-content/uploads/2018/11/Scripps-Denison-Library.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export default function AddReturnBook() {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [memberCode, setMemberCode] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [fine, setFine] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({ memberCode: "", bookCode:"" });

  const handleMemberCode = (e) => {
    setMemberCode(e.target.value);
  };

  const handleBorrowDate = (e) => {
    setBorrowDate(e.target.value);
  };

  const handleReturnDate = (e) => {
    setReturnDate(e.target.value);
  };

  const handleBookCode = (e) => {
    setBookCode(e.target.value);
  };

  const handleFine = (e) => {
    setFine(e.target.value);
  };

  const diffDays = (date, otherDate) =>
    Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

  const calFine = () => {
    var dif = diffDays(new Date(borrowDate), new Date(returnDate));
    console.log(dif);
    let tot;
    if (dif > 10) {
      tot = (dif-10) * 10;
    } else {
      tot = 0;
    }
    setFine(tot);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const clear = () => {
    setMemberCode("");
    setBookCode("");
    setBorrowDate("");
    setReturnDate("");
    setFine("");
  };

  const validate = () => {
    let errors = {};
    let isValid = true;
    console.log(memberCode);

    if (memberCode.length !== 6) {
      isValid = false;
      errors["memberCode"] = "Invalid Member Code or Invalid Book Code";
    }
    if (bookCode.length !== 6) {
      isValid = false;
      errors["bookCode"] = "Invalid Member Code or Invalid Book Code";
    }
    setErrors(errors);

    return isValid;
  };

  const onSubmit = () => {
    if (validate()) {
      setOpen(true);
      const returnB = {
        memberCode: memberCode,
        bookCode: bookCode,
        borrowDate: borrowDate,
        returnDate: returnDate,
        fine: fine,
      };
      axios
        .post("http://localhost:8070/api/return/add", returnB)
        .then((res) => {
          if (res.data.success) {
            setMemberCode("");
            setBookCode("");
            setBorrowDate("");
            setReturnDate("");
            setFine("");
            setSuccessMsg("Successfully inserted");
          } else {
            setErrorMsg("Please try again");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkDates = () => {
    if (validate()) {
      const object = {
        memberCode: memberCode,
        bookCode: bookCode,
      };

      axios
        .post("http://localhost:8070/api/return/getDate", object)
        .then((res) => {
          console.log(res.data);
          if (res.data === {}) {
            setOpen(true);
            setErrorMsg("Please check member code and book code again.");
          } else {
            setBorrowDate(res.data.borrowDate);
          }
        });
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Return Books Details
          </Typography>
          <div className={classes.alert}>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{
                  cursor: "move",
                  backgroundColor: "#02032b",
                  color: "#ffffff",
                }}
                id="draggable-dialog-title"
              >
                <LocalLibraryIcon /> LMS
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {successMsg != "" ? (
                    <>
                      <div style={{ color: "#008000" }}>
                        <CheckIcon />
                        {successMsg}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ color: "#aa202b" }}>
                        <ClearIcon />
                        {errorMsg}
                      </div>
                    </>
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className={classes.btnGroup}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="memberCode"
              label="Member Code"
              name="memberCode"
              autoComplete="memberCode"
              value={memberCode}
              onChange={(e) => handleMemberCode(e)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="bookCode"
              label="Book Code"
              name="bookCode"
              autoComplete="bookCode"
              value={bookCode}
              onChange={(e) => handleBookCode(e)}
              autoFocus
            />
            <Button
              variant="contained"
              color="primary"
              style={{ width: 50, height: 40 }}
              className={classes.button}
              title="Check"
              onClick={() => checkDates()}
            >
              <CheckCircleIcon />
            </Button>
          </div>
          {errors.memberCode ? (
              <span className="error">{errors.memberCode}</span>
            ):(<></>)}
            {/* {errors.bookCode.length > 0 && (
              <span className="error">{errors.bookCode}</span>
            )} */}
          <TextField
            variant="outlined"
            type="date"
            margin="normal"
            required
            fullWidth
            id="borrowDate"
            label="Borrow Date"
            name="borrowDate"
            autoComplete="borrowDate"
            InputLabelProps={{ shrink: true, required: true }}
            value={borrowDate}
            onChange={(e) => handleBorrowDate(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            type="date"
            margin="normal"
            required
            fullWidth
            id="returnDate"
            label="Return Date"
            name="returnDate"
            autoComplete="returnDate"
            InputLabelProps={{ shrink: true, required: true }}
            value={returnDate}
            onChange={(e) => handleReturnDate(e)}
            autoFocus
          />
          <Button
            id="btnBack"
            type="button"
            variant="contained"
            color="primary"
            onClick={() => calFine()}
          >
            Calculate Fine
          </Button>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fine"
            label="Fine"
            name="Fine"
            autoComplete="Fine"
            value={fine}
            onChange={(e) => handleFine(e)}
            autoFocus
          />

          <div className={classes.btnGroup}>
            <Button
              id="btnBack"
              type="button"
              onClick={history.goBack}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.back}
            >
              Back
            </Button>

            <Button
              id="btnSave"
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.sub}
              onClick={() => onSubmit()}
            >
              Save
            </Button>

            <Button
              type="reset"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.clear}
              onClick={clear}
            >
              Clear
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
