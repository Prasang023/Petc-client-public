import React from 'react'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {  useState, useEffect } from "react";
import firebase from "firebase"
import { Stack, Button, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Components import
import Header from "../ui/Header/matnavbar";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
  },
  innerContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 20px',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    }
  },
}));

const Contactus = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
})
const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

// console.log("from general" + userData.name)
// console.log(editedData)
function handleChange(e){
    const {name, value} = e.target
    if(name==='phone'){
        const str = value.charAt(value.length - 1)
        console.log(str)
        if(str.charCodeAt(0)<48 || str.charCodeAt(0)>57){
            return;
        }
    }
    setEditedData({
        ...editedData,
        [name]: value
    })
}

const SendMessage = () => {
    if(!editedData.name || !editedData.email || !editedData.message){
        return
    }
    console.log("success")
    setOpen(true)
    setEditedData({
        name: '',
        email: '',
        phone: '',
        message: '',
    })
}

  return (
    <>
    <Header />
    <div className={classes.container}>
    <div>
    <h1>Contact Us</h1>
    <h3>We'd love to hear from you!</h3>
    <p style={{ margin: '5px 0px' }}>Give us a ring: <a href="tel:+919532056028">+91 95320 56028</a></p>
    <p style={{ margin: '5px 0px' }}>Write to us: <a href="mailto:support@petc.in">support@petc.in</a></p>
    <p style={{ margin: '5px 0px' }}>OR</p>
    <p style={{ margin: '5px 0px' }}>Leave us your message, we’ll get in touch with you!</p>
    <Stack spacing={2}>
    <TextField style={{ maxWidth: '400px' }} label="Name" variant="outlined" value={editedData.name} onChange={handleChange} name='name' />
      <TextField style={{ maxWidth: '400px' }} label="Email" variant="outlined" value={editedData.email} onChange={handleChange} name='email' />
      <TextField style={{ maxWidth: '400px' }} label="Phone Number" variant="outlined" value={editedData.phone} onChange={handleChange} name='phone'/>
      <TextField multiline style={{ maxWidth: '400px' }} label="Message" variant="outlined" value={editedData.message} onChange={handleChange} name='message' />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Message Sent!
        </Alert>
      </Snackbar>
      {/* <Alert severity="success">This is a success message!</Alert> */}
      <Button variant='contained' style={{ width: '200px', backgroundColor: theme.palette.primary.main }} onClick={()=>SendMessage()}>SEND</Button>
      </Stack>
      
    </div>
    </div>
    </>
  )
}

export default Contactus