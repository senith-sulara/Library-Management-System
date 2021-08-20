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


function AddStaff() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
     
    </Typography>
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
}));

const InsertStaff= (props) => {
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
  const [open, setOpen] = useState(false);

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
    setOpen(true);
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
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">{errorMsg}</Alert>
          </Snackbar>
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">{successMsg}</Alert>
            </Snackbar> */}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit} 
            >
              Save
            </Button>

             
          </form>
          <div className={classes.form}>
          <Grid container>
              <Grid item xs>
              <Button
              type="back"
              href="/staff"
              variant="contained"
              color="primary"
              className={classes.back}
            >
              Back
            </Button>
              </Grid>
            
            <Grid item>
              <Button
              type="reset"
              
              variant="contained"
              color="primary"
              className={classes.clear}
            >
              Clear
            </Button>
              </Grid>
            </Grid>
            </div>
        </div>
      </Grid>
    </Grid>
  );
  }

  export default InsertStaff;
  