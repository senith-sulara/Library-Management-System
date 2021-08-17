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

function AddBook() {
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
      marginTop: theme.spacing(2)
    },
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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

const InsertBook= (props) => {
  const classes = useStyles();
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [state, setState] = useState({
    title: '',
    auther: '',
    publisher:'',
    refCode:'',
    rackNo: '',
    noOfCopies: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const[successMsg, setSuccessMsg] = useState('');

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
      const { title, auther, publisher, refCode, rackNo, noOfCopies } = state;
      if (title.trim() !== '' && auther.trim() !== '' && publisher.trim() !== ''  && refCode.trim() !== '' && rackNo.trim() !== '' && noOfCopies.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('auther', auther);
          formData.append('publisher', publisher);
          formData.append('refCode', refCode);
          formData.append('rackNo', rackNo);
          formData.append('noOfCopies', noOfCopies);


          setErrorMsg('');
          await axios.post(`${API_URL}/BookDetails/insert`, formData, {
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



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper} onSubmit={handleOnSubmit}>
          <Typography component="h1" variant="h5">
            Insert New Book
          </Typography>
          <form className={classes.form} noValidate>
          <div className={classes.alert}>
          {alert ?
            <Alert severity="error">{errorMsg}</Alert>: <></> }
          {alert ?
            <Alert severity="success">{successMsg}</Alert> : <></>}
          
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
              value={state.title || ''} 
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="auther"
              label="Author"
              name="auther"
              autoComplete="auther"
              autoFocus
              value={state.auther || ''} 
              onChange={handleInputChange}
            />
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
              value={state.publisher || ''} 
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="refCode"
              label="Book Reference Code"
              name="refCode"
              autoComplete="refCode"
              autoFocus
              value={state.refCode || ''} 
              onChange={handleInputChange}
            />
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
              value={state.rackNo || ''} 
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="noOfCopies"
              label="Number of copies"
              name="noOfCopies"
              autoComplete="noOfCopies"
              autoFocus
              value={state.noOfCopies || ''} 
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

            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button> */}
            {/* <Grid container spacing={8}>
              <Grid item xs={4}>
              <Button
              type="back"

              variant="contained"
              color="primary"
              className={classes.back}
            >
              Back
            </Button>

              </Grid>
              <Grid item xs={4}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.sub}
            >
              Save
            </Button>

              </Grid>
              <Grid item xs={4}>
              <Button
              type="clear"
              
              variant="contained"
              color="primary"
              className={classes.clear}
            >
              Clear
            </Button>
              </Grid>
            </Grid> */}

        <td>

          <button className="btn btn-secondary btn-lg"
            style={{ marginLeft: "130px" }}> BACK</button>

          <button className="btn btn-danger btn-lg"
            style={{ marginLeft: "20px" }}> CLEAR</button>

          <button
            className="btn btn-primary btn-lg"
            style={{ marginLeft: "20px" }}
          >
            SAVE
          </button>
        </td>
          </form>
        </div>
      </Grid>
    </Grid>
  );
  }

  export default InsertBook;
  