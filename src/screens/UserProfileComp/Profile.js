import {  useState, useEffect } from "react";
import firebase from "firebase"
import Avatar from '@mui/material/Avatar';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Link } from '@material-ui/core';
import clsx from 'clsx';
import FileUploadIcon from '@mui/icons-material/FileUpload';

//Components import
import Address from '../../ui/UserProfileCompo/Profile/Address'
import Reminder from '../../ui/UserProfileCompo/Profile/Reminder'
import Transaction from '../../ui/UserProfileCompo/Profile/Transaction'
import Pets from '../../ui/UserProfileCompo/Profile/Pets'

const useStyles = makeStyles(theme => ({
  profileCard: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
  },
  commonBox: {
      padding: theme.spacing(2),
      margin: '5px 5px',
      // border: '1px solid #000',
      borderRadius: '2px',
      // boxShadow: '5px 5px 6px 2px #D3D3D3',
      backgroundColor: '#fff',
  },
  box: {
    marginLeft: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
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
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '5px',
    flexDirection: 'row',
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
    }
  },
  leftSection: {
    diplay: 'flex', 
    flexDirection: 'column',
    width: '70%',
  },
  transactionBox: {
    width: '25%'
  },
}));


function GetData(id){
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

const Profile = (props) => {
  // const [imageUrl, setimageUrl] = useState('')
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const { userData } = props
  // console.log(userData)
  // const data = GetData()
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
  
  // console.log(data)
  const imagePath = GetProfileImage(userData?.imageUrl)
  console.log(imagePath)
    return ( 
        <div className={classes.container}>
        
           <div className={classes.leftSection}>

              {/* <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 2 }}
                > */}
                
                <div className={ clsx(classes.profileCard, classes.commonBox) } >
                  <Avatar sx={{ height: '100px', width: '100px' }} 
                  src={imagePath?imagePath:null}
                   />
                  <label for="img" style={{ marginTop: '-30px', marginRight: '-70px', zIndex: 2, backgroundColor: theme.palette.primary.main, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3px 3px'}}><FileUploadIcon /></label>
                  <input type="file" id="img" name="img" accept="image/*" style={{ display: 'none' }} onChange={e => SendProfileImage(e)}></input>
                  {/* <Button onClick = {SendProfileImage}>Set Profile</Button> */}
                  <p className={ classes.textCenter }><b>{userData.name}</b><br/>{userData.email}</p>
                  {/* <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <p className={ classes.textCenter }><b>5</b><br/>Left</p>
                    <p className={ classes.textCenter }><b>15</b><br/>Past</p>
                  </Stack> */}
                  <Link href="/user/dashboard?tab=Settings&num=1">
                  <Button color="primary" variant='contained' size='small' style={{ marginTop: '15px' }}>Edit Profile</Button>
                  </Link>
                </div>

                <div className={clsx(classes.box, classes.commonBox)} justifyContent="space-around">
                  <div classname={classes.boxTextbox}>
                  <p className={classes.text}><b>Name</b><br/>{userData.name}</p>
                  <p className={classes.text}><b>Phone No.</b><br/>{userData.mobile}</p>
                  <p className={classes.text}><b>Email</b><br/>{userData.email}</p>
                  </div>
                  <div classname={classes.boxTextbox}>
                  <p className={classes.text}><b>Gender</b><br/>{userData.gender}</p>
                  <p className={classes.text}><b>Address</b><br/>{userData.addressLine1}<br/>{userData.addressLine2}</p>
                  <p className={classes.text}><b>City</b><br/>{userData.addressLine1}<br/>{userData.city}</p>
                  </div>
                  <div classname={classes.boxTextbox}>
                  <p className={classes.text}><b>Pincode</b><br/>{userData.pincode}</p>
                  </div>
                </div>

              {/* </Stack> */}

            <Pets userData = {userData} changePage = {props.changePage} />
              
           </div>



           {/* <div sm={4} xs={12} alignItems="center" justifyContent="center" style={isMobile?null:{padding:'0px 10px'}}> */}

              {/* <div className={classes.commonBox}>
                <Address userData = {userData} />
              </div>
              
              <Stack className={classes.commonBox} spacing={2}>
                <Reminder userData = {userData} />
              </Stack> */}
              <div className={clsx(classes.transactionBox, classes.commonBox)}>
                <Transaction userData = {userData} />
              </div>

           


        </div>
     );
}
 
export default Profile;