import {  useState, useEffect } from "react";
import firebase from "firebase"
import Avatar from '@mui/material/Avatar';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Grid, Link } from '@material-ui/core'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid'

function FetchPetList(){
  const [data,setdata] = useState([])
  const id = firebase.auth().currentUser.uid
  useEffect(()=>{
    firebase
    .firestore()
    .collection('users').doc(id).collection('pets')
    .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
   },[])
   return data
}

const useStyles = makeStyles(theme => ({
    commonBox: {
        padding: theme.spacing(2),
        margin: '5px 5px',
        // border: '1px solid #000',
        borderRadius: '2px',
        // boxShadow: '2px 2px 3px 2px #D3D3D3',
        backgroundColor: '#fff'
    },
    petStack: {
      margin: '5px 0px',
    },
    textCenter: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        fontSize: '15px',
    },
    text: {
      margin: '30px 0px'
    },
    btn: {
      fontSize: '15px'
    }
  }));

const Pets = (props) => {
  const user = firebase.auth().currentUser.uid
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const { userData } = props
  const petList = FetchPetList();
  const [open, setOpen] = useState(false);
    const [pet, setPet] = useState({
        name: '',
        age: 0,
        breed:'',
        color:'',
        gender:'',
        imageURL:'',
        medicalAlert:'',
        species: '',
        weight: 0,
        medicalHistory: [],
        insurance: [{
            type: '',
            date: '',
        }],
        vaccination: [{
            type: '',
            date: '',
        }],
    });

  function handleChange(e) {
    const {name, value} = e.target
    setPet({
        ...pet,
        [name]: value
    })
}

const addPet = () => {
    const petId = uuid();
    firebase.firestore()
    .collection('users')
    .doc(user)
    .collection('pets')
    .doc(petId)
    .set({
      petId,
      petName:pet.name,
      specie:pet.species,
      breed:pet.breed,
      color:pet.color,
      age:pet.age,
      gender:pet.gender,
      weight:pet.weight
    })
    window.alert('Pet Added Successfully');
}



const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const deletePet = (item) =>{
    const petarray = (userData.pet)?.filter(pet =>(pet!==item).map(filteredPet => filteredPet))
    // Update database with new list of petes
}

const pushfrwd = (id) => {
  history.push(`/user/dashboard?tab=Pets&petid=${id}`)
  props.changePage('Pets')
}

  return (
    <Stack spacing={{ xs: 2 }} className={classes.petStack}>
              <h3>My Pets</h3>
                {
                  petList?.map( res =>
                    <Grid container direction={isMobile?"column":"row"} className={clsx(classes.commonBox, classes.box)} justifyContent="space-around">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar sx={{ height: '50px', width: '50px', mr: 2 }} src={res.imageUrl} />
                <h5>{res.petName}</h5>
                </Box>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px'}}>
                  <p className="text"><b>Specie</b><br/>{res.specie}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px'}}>
                  <p className="text"><b>Gender</b><br/>{res.gender}</p>
                  </div>
                  
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {/* <Link href={"/user/dashboard?tab=Pets&petid=" + res.petId}> */}
                {/* <Button 
                onClick={()=> pushfrwd(res.petId)} 
                color="primary" variant='contained' size='small' style={{ margin: 4, marginLeft: '15px' }} >View Profile</Button> */}
                {/* </Link> */}
              </div>
              </Grid>
                  )
                }
              
              <Button variant="contained" onClick={handleClickOpen} color="primary">
        Add a Pet
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Pet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            value={pet.name}
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
            value={pet.species}
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
            value={pet.breed}
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
            value={pet.color}
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
            value={pet.age}
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
            value={pet.gender}
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
            value={pet.weight}
            name="weight"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={addPet} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

              </Stack>
              )
};

export default Pets;
