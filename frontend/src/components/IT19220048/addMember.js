import React, { useState, useRef, Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./Member.css";
import { useHistory } from "react-router-dom";
import dummy from "./images/dummy.png";
import { API_URL } from "../utils/constants";

//dialog box import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";

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
      "url(https://2wanderlust.files.wordpress.com/2013/11/slide_321715_3023935_free.jpg)",
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
  Fname: "",
  email: "",
  Lname: "",
  nic: "",
  phone: "",
  address: "",
  avatar: "",
  errors: {
    Fname: "",
    email: "",
    Lname: "",
    nic: "",
    phone: "",
    address: "",
  },
};

const InsertMember = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [image, setImage] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [state, setState] = useState({
    Fname: "",
    email: "",
    Lname: "",
    nic: "",
    phone: "",
    address: "",
    errors: {
      Fname: "",
      email: "",
      Lname: "",
      nic: "",
      phone: "",
      address: "",
    },
  });
  const [memberCode, setMemberCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);

  const onDrop = (images) => {
    const [uploadedFile] = images;
    setImage(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const generateCode = () => {
    return Math.floor((1 + Math.random()) * 1000);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const { Fname, email, Lname, nic, phone, address } = state;
      if (
        Fname.trim() !== "" &&
        email.trim() !== "" &&
        Lname.trim() !== "" &&
        nic.trim() !== "" &&
        phone.trim() !== "" &&
        address.trim() !== ""
      ) {
        if (image) {
          let mCode = generateCode();
          setMemberCode("LM" + mCode);
          const formData = new FormData();
          formData.append("image", image);
          formData.append("Fname", Fname);
          formData.append("email", email);
          formData.append("Lname", Lname);
          formData.append("nic", nic);
          formData.append("phone", phone);
          formData.append("address", address);
          formData.append("memberCode", memberCode);

          setErrorMsg("");
          await axios.post(`${API_URL}/member/insert`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setSuccessMsg("User added Successfully. Member Code is LM" + mCode);
        } else {
          setErrorMsg("Please select a image to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
      // setOpenErr(true);
    }
  };

  const reload = () => {
    setState(initialState);
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const validRefCodeRegex = RegExp(/^[A-Za-z][A-Za-z0-9 -]*$/);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "Fname":
        errors.Fname =
          value.length < 4 ? "First Name must be 4 characters long!" : "";
        break;
      case "Lname":
        errors.Lname =
          value.length < 4 ? "Last Name must be 4 characters long!" : "";
        break;
      case "phone":
        errors.phone =
          value.length < 10 ? "Phone No must be 10 numbers long!" : "";
        break;
      case "email":
        errors.email =
          value.length < 4 ? "Email must be 4 characters long" : "";
        break;
      case "address":
        errors.address =
          value.length < 4 ? "Address must be 4 characters long!" : "";
        break;
      case "nic":
        errors.nic = value.length < 10 ? " NIC must be 9 numbers long!" : "";
        break;
      default:
        break;
    }
    setState({
      ...state,
      [event.target.name]: event.target.value,
      errors,
      [name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { errors } = state;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Insert New Member
          </Typography>
          <form className={classes.form} Validate onSubmit={handleOnSubmit}>
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Fname"
              label="First Name"
              name="Fname"
              autoComplete="Fname"
              autoFocus
              value={state.Fname || ""}
              onChange={handleChange}
            />
            {errors.Fname.length > 0 && (
              <span className="error">{errors.Fname}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Lname"
              label="Last Name"
              name="Lname"
              autoComplete="Lname"
              autoFocus
              value={state.Lname || ""}
              onChange={handleChange}
            />
            {errors.Lname.length > 0 && (
              <span className="error">{errors.Lname}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={state.email || ""}
              onChange={handleChange}
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nic"
              label="NIC"
              name="nic"
              autoComplete="nic"
              autoFocus
              value={state.nic || ""}
              onChange={handleChange}
            />
            {errors.nic.length > 0 && (
              <span className="error">{errors.nic}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Mobile No "
              name="phone"
              autoComplete="phone"
              autoFocus
              value={state.phone || ""}
              onChange={handleChange}
            />
            {errors.phone.length > 0 && (
              <span className="error">{errors.phone}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              autoFocus
              value={state.address || ""}
              onChange={handleChange}
            />
            {errors.address.length > 0 && (
              <span className="error">{errors.address}</span>
            )}

            <div className="upload-section">
              <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder("over")}
                onDragLeave={() => updateBorder("leave")}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({ className: "drop-zone" })}
                    ref={dropRef}
                  >
                    <input {...getInputProps()} />
                    <p>Drag and drop a image OR click here to select a image</p>
                    {image && (
                      <div>
                        <strong>Selected image:</strong> {image.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              <div className="prew">
                {previewSrc ? (
                  isPreviewAvailable ? (
                    <div className="image-preview">
                      <img
                        className="preview-image"
                        src={previewSrc}
                        alt="Preview"
                        width="200px"
                        style={{ maxHeight: "200", maxWidth: "200" }}
                        align-item="center"
                      />
                    </div>
                  ) : (
                    <div className="preview-message">
                      <p>No preview available for this image</p>
                    </div>
                  )
                ) : (
                  <div className="preview-message">
                    <img
                      src={dummy}
                      alt="John"
                      style={{ width: "250px", height: "200px", margin: "5px" }}
                    />
                  </div>
                )}
              </div>
            </div>

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
export default InsertMember;
