import {  useState, useEffect } from "react";
import firebase from "firebase"
import Avatar from '@mui/material/Avatar';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Link } from '@material-ui/core';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

//Components import
import Pets from '../ui/UserProfileCompo/Profile/Pets'
import Header from '../ui/Header/matnavbar'
import Transaction from '../ui/UserProfileCompo/Profile/Transaction'
import Security from '../ui/UserProfileCompo/Settings/Security'
import Appointments from "./UserProfileComp/Appointments";

// const useStyles = makeStyles(theme => ({
//   profileCard: {
//       display: "flex",
//       flexDirection: 'column',
//       justifyContent: 'center', 
//       alignItems: 'center',
//   },
//   commonBox: {
//       padding: theme.spacing(2),
//       margin: '5px 5px',
//       // border: '1px solid #000',
//       borderRadius: '2px',
//       // boxShadow: '5px 5px 6px 2px #D3D3D3',
//       backgroundColor: '#fff',
//   },
//   box: {
//     marginLeft: 0,
//     display: 'flex',
//     justifyContent: 'space-evenly',
//     flexWrap: 'wrap',
//   },
//   petStack: {
//     margin: '5px 0px',
//   },
//   textCenter: {
//       display: "flex",
//       flexDirection: 'column',
//       justifyContent: 'center', 
//       alignItems: 'center',
//       fontSize: '15px',
//   },
//   text: {
//     margin: '30px 0px'
//   },
//   btn: {
//     fontSize: '15px'
//   },
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     marginLeft: '5px',
//     flexDirection: 'row',
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: 'column',
//     }
//   },
//   leftSection: {
//     diplay: 'flex', 
//     flexDirection: 'column',
//     width: '70%',
//   },
//   transactionBox: {
//     width: '25%'
//   },
// }));

function GetData(id){
  // const id =  firebase.auth().currentUser.uid
  const [data, setdata] = useState()

  useEffect(() => {
      firebase
      .firestore()
      .collection('users').doc(id)
      .get((snap) =>{
        setdata(snap)
      })
  }, [])
  return data
}

function GetUser(){
    const id = firebase.auth().currentUser.uid
    const [data,setdata] = useState([])
    var temp
    useEffect(() => {
        firebase.firestore()
        .collection('users')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
        })
    }, [])
  
    for(var i=0 ; i<data.length ; i++){
      if(data[i]['id']===id){
          temp = data[i]
      }
  }
  return temp;
  }

const ProfilePage = (props) => {
  const { history } = props
// const [imageUrl, setimageUrl] = useState('')
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
//   const { userData } = props

// const id = firebase.auth().currentUser.uid
const Data = GetUser()
let userData
if(Data){
userData = {
  name: Data.name,
  addressLine1:Data.addressLine1,
  addressLine2:Data.addressLine2,
  city:Data.city,
  gender:Data.gender,
  id:Data.id,
  imageUrl:Data.imageUrl,
  mobile:Data.mobile,
  pincode:Data.pincode,
  email:Data.email
}
localStorage.setItem("name", Data.name)
localStorage.setItem("addressLine1",Data.addressLine1)
localStorage.setItem("addressLine2",Data.addressLine2)
localStorage.setItem("city",Data.city)
localStorage.setItem("gender",Data.gender)
localStorage.setItem("id",Data.id)
localStorage.setItem("imageUrl",Data.imageUrl)
localStorage.setItem("mobile",Data.mobile)
localStorage.setItem("pincode",Data.pincode)
localStorage.setItem("email",Data.email)
}
// console.log(id)
// const userData = GetData(id)
// const userData = GetUser()
console.log("user: "+userData)
// const userData = {
// addressLine1:
// "a",
// addressLine2:
// "fadfaad",
// city:
// "127021",
// email:
// "pulket94@gmail.com",
// gender:
// "",
// id:
// "1xs4i6EuOpefh9f5nOHcl6eOZCW2",
// mobile:
// "8222832494",
// name:
// "Pulkit",
// pincode:
// "127021"
// }





// const [open, setOpen] = useState(false);
// const [pet, setPet] = useState({
//   name: '',
//   age: 0,
//   breed:'',
//   color:'',
//   gender:'',
//   imageURL:'',
//   medicalAlert:'',
//   species: '',
//   weight: 0,
//   medicalHistory: [],
//   insurance: [{
//       type: '',
//       date: '',
//   }],
//   vaccination: [{
//       type: '',
//       date: '',
//   }],
// });

// const handleClickOpen = () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };

// function handleChange(e) {
//   const {name, value} = e.target
//   setPet({
//       ...pet,
//       [name]: value
//   })
// }






  function SendProfileImage(e){
    const id = firebase.auth().currentUser.uid

    let imageUrl = e.target.files[0]
    
    firebase
    .firestore()
        .collection('users').doc(id)
        .update({
            imageUrl:`/images/users/${id}/profileImage`
        })
  
    firebase
    .storage()
    .ref(`/images/users/${id}/profileImage`)
    .put(imageUrl)
    .on("state_changed" , alert("Profile Image Uploaded") , alert);

    window.location.reload(false);
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

  const handleLogout = () => {
    console.log("logout")
    firebase.auth().signOut();
    localStorage.clear()
    // localStorage.removeItem("userId"); 
    window.location.reload(false)
  }
  
  // console.log(data)
  // const imagePath = GetProfileImage(userData?.imageUrl)
  // console.log(imagePath)
  localStorage.setItem("userData", userData);
    return ( 
      <>
      <div style={{ backgroundColor: theme.palette.secondary.main, height: '70px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <a href='/'><Button color="primary" variant="outlined" >Go Back</Button></a>
        <h3 style={{ color: theme.palette.primary.main }}>Profile</h3>
        <Button color="primary" variant="outlined" onClick={()=>handleLogout()}>Logout</Button>
      </div>
      {/* <Header /> */}
        <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginLeft: '5px',
              flexDirection: 'row',
              width: '100%',
              [theme.breakpoints.down("sm")]: {
                flexDirection: 'column',
              }
            }} >
        
          <div style={{ diplay: 'flex', 
                        flexDirection: 'column',
                        width: isMobile?'100%':'70%', 
                      }}>
                
                <div style={{
                                display: "flex",
                                flexDirection: 'column',
                                justifyContent: 'center', 
                                alignItems: 'center',
                                      padding: theme.spacing(2),
                                      margin: '5px 5px',
                                      // border: '1px solid #000',
                                      borderRadius: '2px',
                                      // boxShadow: '5px 5px 6px 2px #D3D3D3',
                                      backgroundColor: '#fff',
                            }}>
                  {/* <Avatar sx={{ height: '100px', width: '100px' }} 
                  src={imagePath?imagePath:null}
                   /> */}
                  {/* <label for="img" style={{ marginTop: '-30px', marginRight: '-70px', zIndex: 2, backgroundColor: theme.palette.primary.main, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3px 3px'}}><FileUploadIcon /></label> */}
                  {/* <input type="file" id="img" name="img" accept="image/*" style={{ display: 'none' }} onChange={e => SendProfileImage(e)}></input> */}
                  <p style={{ textAlign: 'center' }}><b>{userData?.name}</b><br/>{userData?.email}</p>
                  <Link href="/user/settings">
                  <Button color="primary" variant='contained' size='small' style={{ marginTop: '15px' }} onClick={()=>{history.push('/user/settings')}}>Edit Profile</Button>
                  </Link>
                </div>

                <div style={{
                            marginLeft: 0,
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            flexWrap: 'wrap',
                            padding: theme.spacing(2),
                            margin: '5px 5px',
                            // border: '1px solid #000',
                            borderRadius: '2px',
                            // boxShadow: '5px 5px 6px 2px #D3D3D3',
                            backgroundColor: '#fff',
                          }}>
                  <div >
                  <p style={{ margin: '30px 0px' }}><b>Name</b><br/>{userData?.name}</p>
                  <p style={{ margin: '30px 0px' }}><b>Phone No.</b><br/>{userData?.mobile}</p>
                  <p style={{ margin: '30px 0px' }}><b>Email</b><br/>{userData?.email}</p>
                  </div>
                  <div >
                  <p style={{ margin: '30px 0px' }}><b>Gender</b><br/>{userData?.gender}</p>
                  <p style={{ margin: '30px 0px' }}><b>Address</b><br/>{userData?.addressLine1}<br/>{userData?.addressLine2}</p>
                  <p style={{ margin: '30px 0px' }}><b>City</b><br/>{userData?.addressLine1}<br/>{userData?.city}</p>
                  </div>
                  <div >
                  <p style={{ margin: '30px 0px' }}><b>Pincode</b><br/>{userData?.pincode}</p>
                </div>
                </div>
            <div style={{ width: isMobile?'100%':'70%', margin: '30px auto' }}>
                <Pets userData = {userData} changePage = {props.changePage} />
            </div>
            <div style={{ width: isMobile?'100%':'70%', margin: '30px auto' }}>
                <h3>My Appointments</h3>
                <Appointments />
            </div>
            <div style={{ width: isMobile?'100%':'70%', margin: '30px auto' }}>
              <h3 style={{ marginBottom: '10px' }}>Settings</h3>
              <Security userData = {userData} />
            </div>
          </div>

              <div >
                <Transaction userData = {userData} />
              </div>
        </div>
        {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            value={userData.name}
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
          <Button color="primary">Confirm</Button>
        </DialogActions>
      </Dialog> */}
        </>
);
}

export default ProfilePage;