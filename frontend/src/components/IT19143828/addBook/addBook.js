import React, { useState, useRef, Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./addbook.css";
import { API_URL } from "../../utils/constants";
import dummy from "../images/dummy.png";
import { useHistory } from "react-router-dom";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Dropdown } from "semantic-ui-react";

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
  formControl: {
    marginTop: theme.spacing(1),
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = {
  title: "",
  author: "",
  publisher: "",
  refCode: "",
  rackNo: "",
  noOfCopies: "",
  avatar: "",
  errors: {
    title: "",
    author: "",
    publisher: "",
    refCode: "",
    rackNo: "",
    noOfCopies: "",
  },
};

const InsertBook = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [image, setImage] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [state, setState] = useState({
    title: "",
    author: "",
    publisher: "",
    refCode: "",
    rackNo: "",
    noOfCopies: "",
    errors: {
      title: "",
      author: "",
      publisher: "",
      refCode: "",
      rackNo: "",
      noOfCopies: "",
    },
  });
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

  //Insert data
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const { title, author, publisher, refCode, rackNo, noOfCopies } = state;
      if (validateForm(state.errors)) {
        console.info("Valid Form");
        if (
          title.trim() !== "" &&
          author.trim() !== "" &&
          publisher.trim() !== "" &&
          refCode.trim() !== "" &&
          rackNo.trim() !== "" &&
          noOfCopies.trim() !== ""
        ) {
          if (image) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("title", title);
            formData.append("author", author);
            formData.append("publisher", publisher);
            formData.append("refCode", refCode);
            formData.append("rackNo", rackNo);
            formData.append("noOfCopies", noOfCopies);

            setErrorMsg("");
            await axios.post(`${API_URL}/BookDetails/insert`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            setSuccessMsg("upload Success");
            // setOpenSucc(true);
            // props.history.push('/home');
          } else {
            setErrorMsg("Please select a image to add.");
            // setOpenErr(true);
          }
        } else {
          setErrorMsg("Please enter all the field values.");
          // setOpenErr(true);
        }
      } else {
        setErrorMsg("Please enter valid field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
      // setOpenErr(true);
    }
  };

  //clear records
  const reload = () => {
    setState(initialState);
  };

  //validations
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  // const handleInputChange = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const validRefCodeRegex = RegExp(/^[A-Za-z][A-Za-z0-9 -]*$/);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "title":
        errors.title =
          value.length < 4 ? "Title must be 4 characters long!" : "";
        break;
      case "author":
        errors.author =
          value.length < 4 ? "Author must be 4 characters long!" : "";
        break;
      case "publisher":
        errors.publisher =
          value.length < 4 ? "Publisher must be 4 characters long!" : "";
        break;
      // case 'refCode':
      //   errors.refCode =
      //   validRefCodeRegex.test(value)
      //       ? ''
      //       : 'Reference code must start with Letter';
      //   break;
      case "refCode":
        errors.refCode =
          value.length < 4 ? "Reference code must be 4 digits" : "";
        break;
      case "rackNo":
        errors.rackNo =
          value.length < 3 ? "Rack Number must be 3 characters long!" : "";
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

  //   const random = (length) =>{

  //     let result ='';
  //     let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //     let charactersLength = characters.length;
  //     for ( let i = 0; i < length; i++ ) {
  //       result += characters.charAt(Math.floor(Math.random() *
  //  charactersLength));
  //    }
  //    return result;
  //   }
  //   console.log(random(5));

  const { errors } = state;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <Typography component="h1" variant="h5">
            Insert New Book
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
              id="title"
              label="Book Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={state.title || ""}
              onChange={handleChange}
              // onChange={handleInputChange}
            />
            {errors.title.length > 0 && (
              <span className="error">{errors.title}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="author"
              label="Author"
              name="author"
              autoComplete="author"
              autoFocus
              value={state.author || ""}
              // onChange={handleInputChange}
              onChange={handleChange}
            />
            {errors.author.length > 0 && (
              <span className="error">{errors.author}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="publisher"
              label="Publisher"
              name="publisher"
              autoComplete="publisher"
              autoFocus
              value={state.publisher || ""}
              // onChange={handleInputChange}
              onChange={handleChange}
            />
            {errors.publisher.length > 0 && (
              <span className="error">{errors.publisher}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // disabled
              id="refCode"
              label="Book Reference Code"
              name="refCode"
              autoComplete="refCode"
              autoFocus
              value={state.refCode || ""}
              // onChange={handleInputChange}
              onChange={handleChange}
            />
            {errors.refCode.length > 0 && (
              <span className="error">{errors.refCode}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rackNo"
              label="Rack Number"
              name="rackNo"
              autoComplete="rackNo"
              autoFocus
              value={state.rackNo || ""}
              // onChange={handleInputChange}
              onChange={handleChange}
            />
            {errors.rackNo.length > 0 && (
              <span className="error">{errors.rackNo}</span>
            )}
            {/* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Rack</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          option={state.rackNo}
          onChange={OnRackSelect}
          label="Age"
        >
          <MenuItem options="">
            <em>None</em>
          </MenuItem>
          <MenuItem option="L01">L01</MenuItem>
          <MenuItem option="L02">L02</MenuItem>
          <MenuItem option="L03">L03</MenuItem>
        </Select>
      </FormControl> */}

            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
              required
              fullWidth
              id="noOfCopies"
              label="Number of copies"
              name="noOfCopies"
              autoComplete="noOfCopies"
              autoFocus
              value={state.noOfCopies || ""}
              // onChange={handleInputChange}
              onChange={handleChange}
            />
            {/* {errors.noOfCopies.length > 0 && 
                <span className='error'>{errors.noOfCopies}</span>} */}

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
                    {/* <p>Image preview will be shown here after selection</p> */}
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
                // href="/book"
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
                className={classes.clear}
                onClick={reload}
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

export default InsertBook;
