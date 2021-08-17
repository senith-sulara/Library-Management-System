import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddMember() {
  const classes = useStyles();

  const [Fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [Lname, setLName] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    const Member = {
      Fname: Fname,
      email: email,
      Lname: Lname,
      nic: nic,
      phone: phone,
      address: address,
    };

    axios
      .post("http://localhost:8070/api/member/addMember", Member)
      .then((response) => {
        console.log(response.data);
        alert("Member Details Added Successfully!");
      });
  };

  const onChangeFName = (e) => {
    console.log(e.target.value);
    setFName(e.target.value); //target is textbox and value is textbox value
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeLName = (e) => {
    setLName(e.target.value);
  };

  const onChangeNic = (e) => {
    console.log(e.target.value);
    setNic(e.target.value); //target is textbox and value is textbox value
    if (e.target.value.length > 10) {
      setIsError(true);
    }
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            <b>Add New Member</b>
          </Typography>
          <form className={classes.form} noValidate>
            <Typography variant="h7" gutterBottom>
              <b>First Name *</b>
            </Typography>
            <TextField
              value={Fname}
              onChange={(e) => onChangeFName(e)}
              placeholder="Enter First name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <Typography variant="h7" gutterBottom>
              <b>Last Name *</b>
            </Typography>
            <TextField
              value={Lname}
              onChange={(e) => onChangeLName(e)}
              placeholder="Enter Last name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <Typography variant="h7" gutterBottom>
              <b>NIC *</b>
            </Typography>
            <TextField
              value={nic}
              error={isError}
              onChange={(e) => onChangeNic(e)}
              placeholder="Enter NIC"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <Typography variant="h7" gutterBottom>
              <b>Contact No *</b>
            </Typography>
            <TextField
              value={phone}
              onChange={(e) => onChangePhone(e)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+94</InputAdornment>
                ),
              }}
            />
            <Typography variant="h7" gutterBottom>
              <b> Email *</b>
            </Typography>
            <TextField
              value={email}
              onChange={(e) => onChangeEmail(e)}
              placeholder="Enter Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <Typography variant="h7" gutterBottom>
              <b> Address *</b>
            </Typography>
            <TextField
              value={address}
              onChange={(e) => onChangeAddress(e)}
              placeholder="Enter Address"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <br/><br/>

            <td>

            <button className="btn btn-secondary btn-lg"
               style={{ marginLeft: "130px" }}> BACK</button>

              <button className="btn btn-danger btn-lg"
               style={{ marginLeft: "20px" }}> CLEAR</button>

              <button
                className="btn btn-primary btn-lg"
                onClick={() => handleSubmit()}
                style={{ marginLeft: "20px" }}
              >
                SAVE
              </button>
            </td>

            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
