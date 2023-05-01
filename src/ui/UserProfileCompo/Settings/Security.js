import React from 'react';
import { Stack, Button, MenuItem, Modal, Typography, Box, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useTheme } from "@material-ui/core/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Security = (props) => {
  const { userData } = props
  const theme=useTheme()

  function Reset(){
    // console.log(email)
    firebase.auth().sendPasswordResetEmail(userData?.email)
    .then(() => {
      setOpen(true);
    })
    .catch((error) => {
    // const errorCode = error.code;
    // setEmailError(error.code + ':' + error.message);
    // ..
    });
    
}
const deleteUser = () =>{
  const user = firebase.auth().currentUser;
  user.delete().then(() => {
    window.alert('Your Account has been deleted!')
  }).catch((error) => {
    console.log(error)
  });
}

const [open, setOpen] = React.useState(false);
const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
  
  return <div>
  <Stack spacing={3}>
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}><TextField style={{ maxWidth: '400px', marginRight:'15px' }} label="Email" variant="outlined" value={userData?.email} name='email' disabled /> <Button onClick={Reset} style={{ color:theme.palette.primary.main }}>Change Password</Button></div>
  <TextField style={{ maxWidth: '400px' }} label="Phone Number" variant="outlined" value={userData?.mobile} name='mobile' disabled/>
  <div><Button onClick={handleModalOpen} style={{ color:theme.palette.primary.main }}>Deactivate Account</Button></div>
  </Stack>
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Check Your Mail Inbox for Password Reset Link.
        </Alert>
      </Snackbar>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px'}}
      >
        <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
          <Typography variant="h6" component="h2">
            Are you sure you want to delete your account?
          </Typography>
          <div style={{ display: 'flex', }}>
            <Button style={{ color:theme.palette.primary.main }} onClick={deleteUser}>Confirm Delete</Button>
            <Button onClick={handleModalClose} style={{ color:theme.palette.primary.main }}>Cancel</Button>
          </div>
        </Paper>
      </Modal>
  </div>;
};

export default Security;
