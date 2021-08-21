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
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dropzone from 'react-dropzone';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'; 
import axios from 'axios';
import './addbook.css';
import { API_URL } from '../../utils/constants';
import { useHistory } from "react-router-dom";
import dummy from '../../senith/images/dummy.png';

//dialog box import
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';

/**
 * draggable dialog component
 * @param {*} props 
 * @returns 
 */
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '85%',
    margin: 'auto',
    marginTop: '20px'
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundImage: 'url(https://2wanderlust.files.wordpress.com/2013/11/slide_321715_3023940_free.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGroup:{
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
  }
}));

const initialState={
  eid:'',
  name: '',
  address: '',
  email:'',
  contact:'',
  password: '',
  proPic:''
};
const InsertStaff= (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [images, setFile] = useState(null); // state for storing actual image
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
  const [open, setOpen] = useState(false);

  const onDrop = (images) => {
    const [uploadedFile] = images;
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
    setOpen(true);
    try {
      const { eid, name, email, address, contact, password } = state;
      if (eid.trim() !== '' && name.trim() !== '' && email.trim() !== ''  && address.trim() !== '' && contact.trim() !== '' && password.trim() !== '') {
        if (images) {
          const formData = new FormData();
          formData.append('images', images);
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
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
const reload = () =>{ 
   setState(initialState);
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

    setOpen(false);
  };


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Insert New Staff Member
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <div className={classes.alert}>

          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
        <DialogTitle style={{ cursor: 'move',backgroundColor:'#02032b',color:'#ffffff' }} id="draggable-dialog-title">
        <LocalLibraryIcon /> LMS
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {successMsg!=''?(
             <>
              <div style={{color:'#008000'}}>
                  <CheckIcon  />
                  {successMsg}
                </div>
             </>
            ):(
              <>
              <div style={{color:'#aa202b'}}>
                  <ClearIcon  />
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
              id="eid"
              label="Employee ID"
              name="eid"
              autoComplete="eid"
              autoFocus
              value={state.eid || ''} 
              onChange={handleInputChange}
            />

            <TextField
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

            <TextField
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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="address"
              name="address"
              autoComplete="address"
              multiline
              autoFocus
              value={state.address || ''} 
              onChange={handleInputChange}
            />      

            <TextField
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
                        {images && (
                     <div>
                       <strong>Selected file:</strong> {images.name}
                     </div>
                    )}
                </div>
              )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
               <img className="preview-image" src={previewSrc} alt="Preview" width="200px" style={{maxHeight: '200', maxWidth: '200'}} align-item="center"/>
              </div>
            ) : (
               <div className="preview-message">
                 <p>No preview available for this image</p>
                </div>
               )
            ) : (
                <div className="preview-message">
                  {/* <p>Image preview will be shown here after selection</p> */}
                  <img src={dummy} alt="John" style={{ width: '250px', height: '200px', margin: '5px'}}/>
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
  }

  export default InsertStaff;
  