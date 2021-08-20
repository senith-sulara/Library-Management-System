import React, { useState, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './addbook.css';
import { API_URL } from '../../utils/constants';
import {Row,Container, Col} from'react-bootstrap';
import {  } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
info:{
    display:'flex',
    alignContent:'center',   
    justifyContent:'center',
    marginBottom:'30px',
},
 dataContainer:{
     backgroundColor:'#ffffff', 
     margin:'60px 0px 20px 0px',
 },
  imageContainer:{
    height: '500px',
    width: '300px',
    margin: 'auto auto 0px auto ',
    margin:'0px',
    padding:'0px',
  },
  btnGroup:{
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
    },
    textField:{
        height:'40px',
        margin:'10px'
    },
    textarea:{
        height:'80px',
        margin:'10px', 
    },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height:'250px',
  },
  
}));

const Profile= (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [state, setState] = useState({
    eid:'',
    name: '',
    address: '',
    email:'',
    contact:'',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const[successMsg, setSuccessMsg] = useState('');
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
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };


  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { eid, name, email, address, contact, password } = state;
      if (eid.trim() !== '' && name.trim() !== '' && email.trim() !== ''  && address.trim() !== '' && contact.trim() !== '' && password.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('eid', eid);
          formData.append('name', name);
          formData.append('email', email);
          formData.append('address', address);
          formData.append('contact', contact);
          formData.append('password', password);


          setErrorMsg('');
          await axios.post(`${API_URL}/staff/addStaff`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setSuccessMsg('upload Success')
          // props.history.push('/home');
          
            setOpenSucc(true);
        } else {
          setErrorMsg('Please select a file to add.');
          setOpenErr(true);
        }
      } else {
        setErrorMsg('Please enter all the field values.');
        setOpenErr(true);
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
      setOpenErr(true);
    }
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErr(false);
    setOpenSucc(false);
  };


  return (
      <Container className={classes.image}> 
          <Container className={classes.image}>
            <Row >
                <Col md="4"></Col>
                <Col md="4" className="mt-5 ml-5 align-items-center text-white">
                    <Row className={classes.imageContainer}>
                        <img  className="rounded-circle border border-4" src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" width="250px" height="250px"></img>
                    </Row> 
                </Col>             
                <Col md="3"></Col>
            </Row>
         </Container>
        <Container >
        <div  className={classes.dataContainer}>
            <div className={classes.info}>
                <Typography component="h1" variant="h5">
                 Member ID : 1231
                </Typography> 
            </div>
         
          <form  Validate onSubmit={handleOnSubmit}>
          <div  >
          <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">{errorMsg}</Alert>
          </Snackbar>
          <Snackbar open={openSucc} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">{successMsg}</Alert>
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
              value={state.name || ''} 
              onChange={handleInputChange}
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
              value={state.email || ''} 
              onChange={handleInputChange}
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
              value={state.contact || ''} 
              onChange={handleInputChange}
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
              value={state.password || ''} 
              onChange={handleInputChange}
            />
         </div>
         <div className={classes.info}>
         <TextField
            className={classes.textarea}
              style={{margin:'10 20 10 20'}}
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
              value={state.address || ''} 
              onChange={handleInputChange}
            />      
         </div>
            

            
            

        <div className="upload-section">
          <Dropzone 
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
             {({ getRootProps, getInputProps }) => (
               <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
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
               <img className="preview-image" src={previewSrc} alt="Preview" width="300"/>
              </div>
            ) : (
               <div className="preview-message">
                 <p>No preview available for this file</p>
                </div>
               )
            ) : (
                <div className="preview-message">
                  <p>Image preview will be shown here after selection</p>
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
      
   
  );
  }

  export default Profile;
  