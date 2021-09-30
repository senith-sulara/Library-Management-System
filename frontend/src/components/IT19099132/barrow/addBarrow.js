import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import PluseIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import axios from "axios";
import "./addbook.css";
import { API_URL } from "../../utils/constants";
import { useHistory } from "react-router-dom";

//dialog box import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";

/**
 * draggable dialog component
 * @param {*} props
 * @returns
 */
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
  btn: {},
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundImage:
      "url(https://2wanderlust.files.wordpress.com/2013/11/slide_321715_3023940_free.jpg)",
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

const initialState = {
  eid: "",
  mid: "",
  books: [],
  borrowDate: " ",
  returnDate: " ",
  note: "",

  errors: {
    mid: "",
    borrowDate: " ",
    books: [],
    returnDate: " ",
    note: "",
  },
};
const InsertBaroow = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [inputList, setInputList] = useState([{ bookId: "" }]);
  const localUser = JSON.parse(localStorage.getItem("user")) || null;
  let [user, setUser] = useState(localUser);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("data " + user.formData.eid);
    state.eid = user.formData.eid;
  }, [user.formData.eid, state]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const { eid, mid, borrowDate, returnDate, note } = state;

      if (
        mid.trim() !== "" &&
        eid.trim() !== "" &&
        borrowDate.trim() !== " " &&
        returnDate.trim() !== " " &&
        note.trim() !== ""
      ) {
        const formData = new FormData();
        formData.append("eid", eid);
        formData.append("mid", mid);
        formData.append("books", inputList);
        formData.append("borrowDate", borrowDate);
        formData.append("returnDate", returnDate);
        formData.append("note", note);
        state.books = inputList;
        console.log(state);
        setErrorMsg("");
        await axios.post(`${API_URL}/barrow/addBarrow`, state, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSuccessMsg("upload Success");
        // props.history.push('/home');
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  const reload = () => {
    setState(initialState);
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "mid":
        errors.mid =
          value.length < 6
            ? "Member Id must be 6 characters long! ex :- LM0000"
            : "";
        break;
      case "borrowDate":
        errors.borrowDate =
          value.length <= 0
            ? "Borrow date can not be empty! ex :- 20202.20.20"
            : "";
        break;
      case "returnDate":
        errors.returnDate =
          value.length <= 0
            ? "Return date can not be empty! ex :- 20202.20.20"
            : "";
        break;
      case "note":
        errors.note = value.length <= 0 ? "Enter barrow note" : "";
        break;
      default:
        break;
    }

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const { errors } = state;
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // handle input change
  const handleInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { bookId: "" }]);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add borrow book details
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
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
            {inputList.map((x, i) => {
              return (
                <div className={classes.btnGroup}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="bookId"
                    label="Book ID"
                    name="bookId"
                    autoComplete="bookId"
                    autoFocus
                    value={x.bookId}
                    onChange={(e) => handleInput(e, i)}
                  />

                  <div className={classes.btnGroup}>
                    {inputList.length !== 1 && (
                      <Button
                        className={classes.btn}
                        color="secondary"
                        fullWidth
                        variant="contained"
                        onClick={() => handleRemoveClick(i)}
                      >
                        <ClearIcon />
                      </Button>
                    )}
                    {inputList.length - 1 === i && (
                      <Button
                        className={classes.btn}
                        color="primary"
                        fullWidth
                        variant="contained"
                        onClick={handleAddClick}
                      >
                        <PluseIcon />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            <TextField
              margin="normal"
              required
              fullWidth
              id="eid"
              name="eid"
              autoComplete="eid"
              hidden
              value={user.formData.eid || ""}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mid"
              label="Member ID"
              name="mid"
              autoComplete="mid"
              autoFocus
              value={state.mid || ""}
              onChange={handleInputChange}
            />

            {errors.mid.length > 0 && (
              <span className="error">{errors.mid}</span>
            )}

            <br />
            <br />
            <span>Borrow date</span>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="borrowDate"
              name="borrowDate"
              autoComplete="borrowDate"
              type="date"
              autoFocus
              value={state.borrowDate || " "}
              onChange={handleInputChange}
            />

            {errors.borrowDate.length > 0 && (
              <span className="error">{errors.borrowDate}</span>
            )}

            <br />
            <br />
            <span>Return date</span>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="returnDate"
              type="date"
              name="returnDate"
              autoComplete="returnDate"
              autoFocus
              value={state.returnDate || " "}
              onChange={handleInputChange}
            />
            {errors.returnDate.length > 0 && (
              <span className="error">{errors.returnDate}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="note"
              label="Note"
              name="note"
              autoComplete="note"
              multiline
              autoFocus
              value={state.note || ""}
              onChange={handleInputChange}
            />
            {errors.note.length > 0 && (
              <span className="error">{errors.note}</span>
            )}

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
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.sub}
              >
                Save
              </Button>

              <Button
                type="reset"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={reload}
                className={classes.clear}
              >
                Clear
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default InsertBaroow;
