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
      "url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Biblioth%C3%A8que_de_l%27Assembl%C3%A9e_Nationale_%28Lunon%29.jpg/1024px-Biblioth%C3%A8que_de_l%27Assembl%C3%A9e_Nationale_%28Lunon%29.jpg)",
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

export default function AddReservation() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberCode, setMemberCode] = useState("");
  const [email, setEmail] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleMemberName = (e) => {
    setMemberName(e.target.value);
  };

  const handleMemberCode = (e) => {
    setMemberCode(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleBookName = (e) => {
    setBookName(e.target.value);
  };

  const handleBookCode = (e) => {
    setBookCode(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = () => {
    const reservation = {
      memberName: memberName,
      memberCode: memberCode,
      email: email,
      bookName: bookName,
      bookCode: bookCode,
    };
    axios
      .post("http://localhost:8070/api/reservation/add", reservation)
      .then((res) => {
        if (res.data.success) {
          setMemberName("");
          setMemberCode("");
          setBookName("");
          setBookCode("");
          setEmail("");
          alert("Successfully inserted");
        } else {
          alert("Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Insert New Reservation
          </Typography>
          <div className={classes.alert}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {errorMsg}
              </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {successMsg}
              </Alert>
            </Snackbar>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="memberName"
            label="Member Name"
            name="memberName"
            autoComplete="memberName"
            value={memberName}
            onChange={(e) => handleMemberName(e)}
            autoFocus
          />
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => handleEmail(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bookName"
            label="Book Name"
            name="bookName"
            autoComplete="bookName"
            value={bookName}
            onChange={(e) => handleBookName(e)}
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

          <div className={classes.btnGroup}>
            <Button
              id="btnBack"
              type="button"
              href="/book"
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
            >
              Clear
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
