import React from 'react';
import {  useState, useEffect } from "react";
import firebase from "firebase"
import { Stack, Button, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import emailjs from 'emailjs-com';
import { useTheme } from "@material-ui/core/styles";

const Genders = [
    {
      value: 'Male',
    },
    {
      value: 'Female',
    },
    {
      value: 'Other',
    },
  ];

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const General = (props) => {
    const { userData } = props
    const theme = useTheme()
    const userId = firebase.auth().currentUser.uid 
    // console.log(userId)
    const [editedData, setEditedData] = useState({
        ...userData
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
        if(name==='pincode'){
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
    const userEmail = firebase.auth().currentUser.email
    function UpdateUserProfile(){
      firebase.firestore()
      .collection('users')
      .doc(userId)
      .set({
        name:editedData.name,
        id:userId,
        gender:editedData.gender,
        mobile:editedData.mobile,
        addressLine1:editedData.addressLine1,
        addressLine2:editedData.addressLine2,
        city:editedData.city,
        pincode:editedData.pincode,
        email:userEmail,
      })
      setOpen(true)
    }

  return <Stack spacing={2}>
      <TextField style={{ maxWidth: '400px' }} label="Name" variant="outlined" value={editedData.name} onChange={handleChange} name='name' />
      <TextField style={{ maxWidth: '400px' }} label="Email" variant="outlined" value={editedData.email} onChange={handleChange} name='email' disabled />
      <TextField style={{ maxWidth: '400px' }} label="Phone Number" variant="outlined" value={editedData.mobile} onChange={handleChange} name='mobile' disabled/>
      <TextField style={{ maxWidth: '400px' }} label="Gender" select variant="outlined" value={editedData.gender} onChange={handleChange} name='gender'>
      {Genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
      </TextField>
      <TextField style={{ maxWidth: '400px' }} label="Address Line 1" variant="outlined" value={editedData.addressLine1} onChange={handleChange} name='addressLine1' />
      <TextField style={{ maxWidth: '400px' }} label="Address Line 2" variant="outlined" value={editedData.addressLine2} onChange={handleChange} name='addressLine2' />
      <TextField style={{ maxWidth: '400px' }} label="City" variant="outlined" value={editedData.city} onChange={handleChange} name='city' />
      <TextField style={{ maxWidth: '400px' }} label="Pincode" variant="outlined" value={editedData.pincode} onChange={handleChange} name='pincode' type='number' />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Profile Successfully Updated!
        </Alert>
      </Snackbar>
      {/* <Alert severity="success">This is a success message!</Alert> */}
      <Button variant='contained' style={{ width: '200px', backgroundColor: theme.palette.primary.main }} onClick={()=>UpdateUserProfile()}>Update</Button>
  </Stack>;
};

export default General;
