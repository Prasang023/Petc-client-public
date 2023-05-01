import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Stack from '@mui/material/Stack';
import {Link } from 'react-router-dom'
import firebase from 'firebase'
//Components import
import Header from "../../ui/Header/matnavbar";
import Footer from "../../ui/Footer/Footer";
import { useParams } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    boxdiv: {
        display: "flex",
        padding: "10px 10px",
        boxShadow: " 5px 10px #888888",
        justifyContent: "space-between",
      },
      but: {
          width: "200px",
      }
  }));



function GetVetData(id){
    const [data,setdata] = useState([])
    useEffect(() => {
        firebase.firestore()
        .collection('products').doc('vets').collection('profile')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
        })
    }, [])

    for(var i=0 ; i<data.length ; i++){
        if(data[i]['id']==id){
            setdata(data[i])
        }
    }
    return data;
}

function GetProfileImage(imageUrl) {
    const [profilePath, setprofilePath] = React.useState('')
    React.useEffect(() => {
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


const VetScreen = (props) => {
    const { id } = useParams();
    // console.log(id)
    const data = GetVetData(id)
    // console.log(data)
    console.log(data.imageUrl)
    const imagePath = GetProfileImage(data.imageUrl)
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    function saveData(){
        sessionStorage.setItem('vetId', data.id)
        sessionStorage.setItem('vetName', data.name)
        props.history.push('/vetService/vetuser')
    }

    return (
        <>
            <Header />
        
        <div>
            
            <Grid container>
                <Grid item xs={1}></Grid>
                
                <Grid item container md={3} xs={10} direction='column'>
                    <h2>Vet Profile</h2>
                    <img src={imagePath} alt={"profile pic"} height="200px" width="200px"/>
                    <h2>Trusted by 100+ Users</h2>
                </Grid>
                <Grid item container sm={10} md={7} >
                    <Stack  spacing={3} style={{display: 'flex', justifyContent: 'center', marginBottom: "100px",}}>
                    <Typography item variant="h3" color="secondary"><b>{data.name}</b></Typography>
                    <div><span><b>Description:</b> Passionate doctor with extensive experience in pet and farm animal medicine & management. Adept in properly diagnasing and strategizing for the best treatment plans for the voiceless. Bringing forth an empathetic and professional attitude, committed to providing patients with the best care possible.</span><br/><br/><b>Educational Qualification:</b> Bachelor of Veterinary Medicine and Animal Husbandry, Master of Veterinary Science (Veterinary Pathology).<br/><br/><b>Charges: </b>Rs. 149/- per appointment </div> 
                    <Typography item variant="h5" color="secondary"><b>More Information</b></Typography>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    
                    
                    <Button className={classes.but} variant="contained" color="primary" onClick={saveData}> Book Appointment </Button>
                    
                    </Stack>
                    
                </Grid>
                
            </Grid>
            
        </div>
        <Footer />
        </>
    )
}

export default VetScreen
