import { Avatar } from '@mui/material';
import React from 'react';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Button,Grid, Paper, Divider } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import firebase from 'firebase'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// import components
import {useState , useEffect} from 'react'

const useStyles = makeStyles(theme => ({
    topContainer: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      padding: '20px 20px',
      display: 'flex',
      justifyContent: 'space-around', 
      flexWrap: 'wrap',  
      },
      leftProfile: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      rightProfile: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 2,
        justifyContent: 'center',
      },
      displayText: {
          margin: '10px 20px'
      },
      cardField: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0px 25px',
          flexWrap: 'wrap',
          [theme.breakpoints.down("sm")]: {
              
              padding: '0px 5px'
          }
      }
  }));

  function FetchPetDetail(petId){
    const [data,setdata] = useState([])
    const id = firebase.auth().currentUser.uid
    useEffect(()=>{
      firebase
      .firestore()
      .collection('users').doc(id).collection('pets')
      .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
     },[])
  
     for(var i=0 ; i<data.length ; i++){
       if(data[i]['petId']===petId){
          setdata(data[i])
       }
     }
     return data
  }
  
  function FetchPetAppointments(petId){
    const [data,setdata] = useState([])
    const id = firebase.auth().currentUser.uid
    useEffect(()=>{
      firebase
      .firestore()
      .collection('users').doc(id).collection('pets').doc(petId).collection('appointments')
      .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
     },[])
  
     return data
  }

  
  

const PetProfile = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const petId = props.petId
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null)
    // props se pet id nikalni hai
    // petData m saari pet data hai
    const petData = FetchPetDetail(petId)
    console.log(petData)
    const petAppointment = FetchPetAppointments(petId)
    // console.log(petAppointment)
    // const [imgupload, setImgupload] = useState('')
    const [editedPet, setEditedPet] = useState({
      ...petData
    })
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    console.log(editedPet)

    function handleChange(e) {
      const {name, value} = e.target
      setEditedPet({
          ...editedPet,
          [name]: value
      })
  }

  function updateInfo() {
    // if((!editedPet.petName || !editedPet.specie) || (!editedPet.breed || !editedPet.color) || !editedPet.age || !editedPet.gender || !editedPet.weight){
    //   setError('All fields required')
    // }
    // else{
      // console.log('yaha')
      updatePet()
    // }
  }
    
    
  const updatePet = () => {
    const user = firebase.auth().currentUser.uid
    firebase.firestore()
    .collection('users')
    .doc(user)
    .collection('pets')
    .doc(petId)
    .update({
      petId,
      petName:editedPet.name,
      specie:editedPet.species,
      breed:editedPet.breed,
      color:editedPet.color,
      age:editedPet.age,
      gender:editedPet.gender,
      weight:editedPet.weight
    })
    window.alert('Pet updated Successfully');
}

  
    // console.log(imgupload)
    function GetProfileImage(imageUrl) {
      const [profilePath, setprofilePath] = useState('')
      useEffect(() => {
          firebase
          .storage()
          .ref(`${imageUrl}`)
          .getDownloadURL()
          .then(fireBaseUrl => {
            setprofilePath(fireBaseUrl);
          });
      }, [])
      return profilePath
    }
    
    // console.log(data)
    function SendProfileImage(e){
      const id = firebase.auth().currentUser.uid
      let imgupload = e.target.files[0]
      firebase
      .firestore()
          .collection('users').doc(id).collection('pets').doc(petId)
          .update({
              imageUrl:`/images/users/${id}/pets/${petId}/profileImage`
          })
      console.log(imgupload) 
      firebase
      .storage()
      .ref(`/images/users/${id}/pets/${petId}/profileImage`)
      .put(imgupload)
      .on("state_changed" , alert("Profile Image Uploaded") , alert);

      window.location.reload(false);
    }
    // console.log(petData.imageUrl)
    const imagePath = GetProfileImage(petData.imageUrl)
    console.log(imagePath)
  return (
    <div>
        <div className={classes.topContainer}>
            <div className={classes.leftProfile}>
                <Avatar sx={{ height: '100px', width: '100px' }}
                src={imagePath}
                 />
                <label for="img" style={{ marginTop: '-30px', marginRight: '-70px', zIndex: 2, backgroundColor: theme.palette.primary.main, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3px 3px'}}><FileUploadIcon /></label>
                <input type="file" id="img" name="img" accept="image/*" style={{ display: 'none' }} onChange={e => SendProfileImage(e)}></input>
                {/* <Button onClick = {SendProfileImage}>Set Profile</Button> */}
                <p className={ classes.textCenter }><b>{petData.petName}</b></p>
                <Button onClick={handleClickOpen} style={{ color: theme.palette.primary.main }}>Edit Profile</Button>

                <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            value={editedPet.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Species"
            type="text"
            value={editedPet.species}
            name="species"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Breed"
            type="text"
            value={editedPet.breed}
            name="breed"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Color"
            type="text"
            value={editedPet.color}
            name="color"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Age"
            type="number"
            value={editedPet.age}
            name="age"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Gender"
            type="text"
            value={editedPet.gender}
            name="gender"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="weight"
            type="text"
            value={editedPet.weight}
            name="weight"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          {error?<p>{error}</p>:null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={updateInfo} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

            </div>
            <div className={classes.rightProfile}>
            <div className={classes.displayText}><h4>Species:</h4> <p id="petparent">&nbsp;{petData.specie}</p></div>
            <div className={classes.displayText}><h4>Breed:</h4> <p id="petparent">&nbsp;{petData.breed}</p></div>
            <div className={classes.displayText}><h4>Age:</h4> <p id="petparent">&nbsp;{petData.age}</p></div>
            <div className={classes.displayText}><h4>Gender:</h4> <p id="petparent">&nbsp;{petData.gender}</p></div>
            <div className={classes.displayText}><h4>Color:</h4> <p id="petparent">&nbsp;{petData.color}</p></div>
            <div className={classes.displayText}><h4>Weight:</h4> <p id="petparent">&nbsp;{petData.weight} kgs</p></div>
            <div className={classes.displayText}><h4>Pet Id:</h4> <p id="petparent">&nbsp;{petData.petId}</p></div>
            </div>
        </div>
        <div style={{ margin:'20px' }}>
        <h2>Medical History</h2>
      {petAppointment[0]?<div style={{ paddingLeft: 0 }}>
      <Timeline align='left' style={{ paddingLeft: '0px'}}>
      <TimelineItem>
      <TimelineOppositeContent style={isMobile?{ flex: 0 }:{ flex: 0.1 }}>
      </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            {
              petAppointment.map(res =>
                <Paper style={isMobile?{ width: '90%', padding: '10px 10px', margin: '20px 0px'}:{ width: '70%', padding: '10px 10px', margin: '20px 0px' }}>
            <Stack spacing={2}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div><h3>Date</h3><p>Time</p></div>
                    <Divider orientation='vertical' />
                    <div><h3>VET</h3><p>Name</p></div>
                </div>
                
                <div className={classes.cardField}><h4>Appointment Id:{res.appointmentId}</h4><p>{res.id}</p></div>
                <div className={classes.cardField}><h4>Prescription</h4><p>download</p></div>
                <div className={classes.cardField} ><h4>Recording</h4><p>download</p></div>
                <div className={classes.cardField} ><h4>Receipt</h4><p>download</p></div>
                </Stack>
            </Paper>)
            }
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    </div>: <div> No Appointments </div>}
    </div>
    </div>
  )
}

export default PetProfile