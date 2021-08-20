import {useHistory} from "react-router-dom"; 
import InputField from "./password";
import {Avatar ,Button,Paper,Select,IconButton,Grid,Typography,InputAdornment,Container,TextField} from "@material-ui/core";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import React,{useState} from "react";   
import loginStyle from './loginStyle';
import './backStyle.css';
import axios from 'axios';
import { API_URL } from '../../utils/constants'; 

/**
 * inisial form input state
 * @type {{firstName: string, lastName: string, password: string, conPass: string, type: string, email: string}}
 */
const initialState ={eid:'',password:'' };


/**
 * sign in and sign up component
 * @returns {*}
 * @constructor
 */
const SignIn = () =>{

    /**
     * import variable
     * @type {*}
     */  
     const classes = loginStyle();
     let history = useHistory();

    /**
     * states
     */
    const [showPassword,setShowpassword]= useState(false);
    const [isSignUp,setSignUp] =useState(false)
    const [formData,setFormData]=useState(initialState);

    /**
     * password visibility togle
     */
    const handleShowPass =()=> setShowpassword((prevShowPass) =>!prevShowPass);

    /**
     * form submit
     * @param e
     */
    const onSubmit= async (e) =>{
        e.preventDefault();
        console.log(formData); 
        try{
            //setErrorMsg('');
            await axios.post(`${API_URL}/staff/signin`, formData);
           // setSuccessMsg('upload Success')
           localStorage.setItem('user',JSON.stringify({formData}));
           history.push('/');
           window.location.reload();
           
        } catch (error) {
           // error.response && setErrorMsg(error.response.data);
           console.log(error);
          }
    }

    /**
     * on text field value change
     * @param e
     */
    const onchange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
 
  
    return (
        <Container component="main" className="container"   maxWidth="md">

                <Paper className={classes.paper}  maxWidth="mdx" elevation={3}>

                    <div >
                        <Avatar  className={classes.avatar}>
                         <LocalLibraryIcon/>
                        </Avatar>
                        <Typography variant="h5">Sign In</Typography>
                     </div>
                    <form  className={classes.form} onSubmit={onSubmit}>

                         
                        <Grid container spacing={2}>
                             
                            <InputField  name="eid" label="Employee ID" handleOnchange={onchange} type="text"  />
                            <InputField  name="password" label="Password" handleOnchange={onchange} type={showPassword ? "text" : "password" } handleShowPass={handleShowPass}/>
                             
                        </Grid>

                        <Button className={classes.submit}  type="submit" fullWidth variant="contained" color="secondary">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                         <hr/>                         
                    </form>
                </Paper>
        </Container>
    )
};

export default SignIn