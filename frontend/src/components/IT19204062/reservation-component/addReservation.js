import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "../css/style.css";
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
import { API_URL } from '../../utils/constants';

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
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberCode, setMemberCode] = useState("");
  const [email, setEmail] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({email:'', memberCode:'', bookCode:''});

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
  const clear = () => {
    setMemberName("");
    setMemberCode("");
    setBookName("");
    setBookCode("");
    setEmail("");
  };
  const validate = () =>{
    let errors = {};
    let isValid = true;

    if (memberCode.length !== 6) {
      isValid = false;
       errors["memberCode"] = "Please enter valid member code";
    }

    if (bookCode.length !== 6) {
      isValid = false;
       errors["bookCode"] = "Please enter valid book code";
    }

    if (typeof email !== "undefined") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    setErrors(errors);

    return isValid;
}

  const onSubmit = () => {
    if(validate()){
    setOpen(true);
    const reservation = {
      memberName: memberName,
      memberCode: memberCode,
      email: email,
      bookName: bookName,
      bookCode: bookCode,
    };
    axios
      .post(`${API_URL}/api/reservation/add`, reservation)
      .then((res) => {
        if (res.data.success) {
          setMemberName("");
          setMemberCode("");
          setBookName("");
          setBookCode("");
          setEmail("");
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
                  {successMsg !== "" ? (
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
          {errors.memberCode ? (
                <span className='error'>{errors.memberCode}</span>):(<></>)}
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
          {errors.email ? (
                <span className='error'>{errors.email}</span>):(<></>)}
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
          {errors.bookCode? ( 
                <span className='error'>{errors.bookCode}</span>):(<></>)}

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
