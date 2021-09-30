import React, { useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./addbook.css";
import { API_URL } from "../../utils/constants";
import { Row, Container, Col } from "react-bootstrap";
import {} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  leftMinus: {
    marginLeft: "-20",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  info: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  dataContainer: {
    backgroundColor: "#ffffff",
    margin: "60px 0px 20px 0px",
    width: "100%",
  },
  imageContainer: {
    height: "500px",
    width: "300px",
    margin: "auto auto auto auto ",
    padding: "0px",
  },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
    marginBottom: "100px",
    paddingBottom: "100px",
  },
  textField: {
    height: "40px",
    margin: "10px",
  },
  textarea: {
    height: "80px",
    margin: "10px",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "250px",
    width: "100%",
  },
  formContainer: {
    width: "100%",
  },
}));

const Profile = (props) => {
  let history = useHistory();
  const location = useLocation();
  const { useState } = React;
  const [data, setData] = useState([]);
  const classes = useStyles();
  const localUser = JSON.parse(localStorage.getItem("user")) || null;
  let [user, setUser] = useState(localUser);
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("data " + user.formData.eid);
  }, [location]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const eid = user.formData.eid;
        const { data } = await axios.get(
          `${API_URL}/staff/getstaffmember/${eid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setErrorMsg("");
        setData(data);
        setUserData(data[0]);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
        console.log(error);
      }
    };
    getUser();
  }, [location]);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openErr, setOpenErr] = useState(false);
  const [openSucc, setOpenSucc] = useState(false);

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

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

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
    setOpenSucc(false);
  };

  return (
    <div style={{ height: "100%" }}>
      <Container className={classes.image}>
        <Container className={classes.image}>
          <Row>
            <Col md="4"></Col>
            <Col md="4" className="mt-5 ml-5 align-items-center text-white">
              <Row className={classes.imageContainer}>
                <img
                  className="rounded-circle  "
                  src={userData ? userData.proPic : " "}
                  width="250px"
                  height="250px"
                ></img>
              </Row>
            </Col>
            <Col md="3"></Col>
          </Row>
        </Container>
        <Container className={classes.formContainer}>
          <div className={classes.dataContainer}>
            <div className={classes.leftMinus}>
              <Typography component="h1" variant="h5">
                Member ID : {user.formData.eid}
              </Typography>
            </div>

            <form validate>
              <div>
                <Snackbar
                  open={openErr}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    {errorMsg}
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openSucc}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    {successMsg}
                  </Alert>
                </Snackbar>
              </div>
              <div className={classes.info}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Employee Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={userData ? userData.name : "" || ""}
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E- mail address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={userData ? userData.email : "" || ""}
                />
              </div>
              <div className={classes.info}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="contact"
                  label="Contact Number"
                  name="contact"
                  autoComplete="contact"
                  autoFocus
                  value={userData ? userData.contact : "" || ""}
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  value={userData ? userData.password : "" || ""}
                />
              </div>
              <div className={classes.info}>
                <TextField
                  className={classes.textarea}
                  style={{ margin: "10 20 10 20" }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  id="address"
                  label="address"
                  name="address"
                  autoComplete="address"
                  autoFocus
                  value={userData ? userData.address : "" || ""}
                />
              </div>

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
                      <p>Drag and drop a file OR click here to select a file</p>
                      {file && (
                        <div>
                          <strong>Selected file:</strong> {file.name}
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
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
                      src={userData ? userData.proPic : ""}
                      alt="John"
                      style={{ width: "250px", height: "200px", margin: "5px" }}
                    />
                  </div>
                )}
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
                  className={classes.clear}
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Profile;
