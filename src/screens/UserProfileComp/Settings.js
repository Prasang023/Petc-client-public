import * as React from 'react';
import Box from '@mui/material/Box';
import {Tab, Tabs} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {  useState, useEffect } from "react";
import firebase from "firebase"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Link } from '@material-ui/core';

//Components import
import General from '../../ui/UserProfileCompo/Settings/General'
import Security from '../../ui/UserProfileCompo/Settings/Security'
import Pets from '../../ui/UserProfileCompo/Settings/Pets'
import Payments from '../../ui/UserProfileCompo/Settings/Payments'
  

function Settings(props) {
  const [value, setValue] = React.useState("1");
  // const { userData } = props
  const userData = {
    name: localStorage.getItem("name"),
    addressLine1:localStorage.getItem("addressLine1"),
    addressLine2:  localStorage.getItem("addressLine2"),
    city:  localStorage.getItem("city"),
    gender:  localStorage.getItem("gender"),
    id: localStorage.getItem("id"),
    imageUrl:  localStorage.getItem("imageUrl"),
    mobile:  localStorage.getItem("mobile"),
    pincode:  localStorage.getItem("pincode"),
    email:  localStorage.getItem("email")
  }
  
  // const userData = localStorage.getItem('userData')
  console.log(userData.name)
  // console.log("yes it is" + userData.name)
  const theme = useTheme();
// const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    console.log("logout")
    firebase.auth().signOut();
    localStorage.clear()
    // localStorage.removeItem("userId"); 
    window.location.reload(false)
  }

  return (
    <>
    <div style={{ backgroundColor: theme.palette.secondary.main, height: '70px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <a href='/'><Button color="primary" variant="outlined" >Go Back</Button></a>
        <h3 style={{ color: theme.palette.primary.main }}>Profile</h3>
        <Button color="primary" variant="outlined" onClick={()=>handleLogout()}>Logout</Button>
    </div>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/* <TabList onChange={handleChange} aria-label="lab API tabs example" scrollButtons allowScrollButtonsMobile> */}
          <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                allowScrollButtonsMobile
                aria-label="secondary tabs example"
            >
            <Tab label="General" value="1" />
            <Tab label="Security" value="2" />
            </Tabs>
          {/* </TabList> */}
        </Box>
        <TabPanel value="1"><General userData={userData} /></TabPanel>
        <TabPanel value="2"><Security userData={userData}/></TabPanel>
      </TabContext>
    </Box>
    </>
  );
}

export default Settings;