
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core";
import {useState , useEffect}  from 'react'
import useMediaQuery from "@material-ui/core/useMediaQuery";


// components import
import Profile from './UserProfileComp/Profile'
import Appointments from './UserProfileComp/Appointments';
import Settings from './UserProfileComp/Settings';
import Leftbar from './UserProfileComp/Leftbar';
import Header from "../ui/Header/matnavbar";
import Footer from "../ui/Footer/Footer";
import firebase from 'firebase'
import Loader from '../ui/core/Loader'
import PetProfile from "./UserProfileComp/PetProfile"



function GetUser(){
  const id = localStorage.getItem('userId')
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


const useStyles = makeStyles((theme) => ({
    right: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    container: {
      width: "100vw",
      display:'flex',
      flexDirection: 'row',
    },
    sideBar: {
      width:'15vw',
    },
    mainScreen: {
      width:'80vw',
    },

  }));

export default function UserProfile(props) {
    
  // console.log(props)
    const tab = new URLSearchParams(props.location.search).get("tab")
    const num = new URLSearchParams(props.location.search).get("num")
    const petid = new URLSearchParams(props.location.search).get("petid")
    const userData = GetUser()
    // console.log(userData)
    const { history } = props
    const theme = useTheme();
    const [page,setpage] = React.useState(tab)
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    var load
    
    if(userData!==undefined){
      if(page=="Profile"){
        load = <Profile userData = {userData} 
                        changePage = {TogglePage} />
        }
        else if(page=="Appointments"){
        load = <Appointments userData = {userData} />

        }
        else if(page=="Settings"){
        load = <Settings userData = {userData}
        tab = {num?num:1} />
      }
      else if(page=="Pets"){
        load = <PetProfile petId={petid} />
      }
    }

    function TogglePage(x){
        setpage(x)
    }

 
   return (
      <>
      <Header />

        <div className={classes.container}>
        <div className={classes.sideBar} >
          <Leftbar
          change = {TogglePage}
          page = {page}
          />
        </div>
        <div className={classes.mainScreen}>
          {/* {page===''?<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#808080' }}>Dashboard</div> : page} */}
          {load?load:<Loader />}
        </div>
        </div>

      {/* <Grid container > 
        <Grid item sm={2} xs={2}>
          <Leftbar
          change = {TogglePage}
          page = {page}
          />
        </Grid>
        <Grid item sm={10} xs={10} style={{ backgroundColor:theme.palette.background.main, padding: '10px 10px' }}>
          {load?load:<Loader />}
        </Grid>
      </Grid> */}
   </>
   )
  
}
