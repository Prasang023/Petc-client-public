import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import firebase from 'firebase'
import {useEffect , useState} from 'react' 
import { Link } from 'react-router-dom'
import TransitionsModal from '../../ui/core/Modal'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from '@mui/material/Modal';



function SaveMeeting(val){
    sessionStorage.setItem('currentMeeting' ,val )
}


const useStyles = makeStyles(theme => ({
  profileCard: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      padding: theme.spacing(2),
      border: '1px solid #000',
  },
  box: {
    border: '1px solid #000'
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
  modstyle: {
    backgroundColor: '#ccc',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    fontSize: '15px',
    padding: '50px 50px',

  },
  item: {
    padding: '5px 5px',
    borderRadius: '7px',
},
paperSection: {
  width: '90%',
  padding: '10px 10px',
  margin: '10px 10px', 
  backgroundColor: '#cdcdcd',
  borderRadius: '10px',
  boxShadow: '5px 5px 6px 2px #D3D3D3',
},
appointmentContainer: {
  padding: theme.spacing(1),
  border: '1px solid #000',
  borderRadius: '5px',
}
}));


function GetPendingMeetings(){
  const [data,setdata] = useState([])
  const id = firebase.auth().currentUser.uid
  useEffect(()=>{
    firebase
    .firestore()
    .collection('users').doc(id).collection('appointments').doc('system').collection('pending')
    .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
   },[])
   return data
}

function GetUpcomingMeetings(){
  const [data,setdata] = useState([])
  const id = firebase.auth().currentUser.uid
  useEffect(()=>{
    firebase
    .firestore()
    .collection('users').doc(id).collection('appointments').doc('system').collection('upcoming')
    .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
   },[])
   return data
}
function GetCompletedMeetings(){
  const [data,setdata] = useState([])
  const id = firebase.auth().currentUser.uid
  useEffect(()=>{
    firebase
    .firestore()
    .collection('users').doc(id).collection('appointments').doc('system').collection('completed')
    .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
   },[])
   return data
}
 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

export default function(props){
    const { history } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const upcomingMeeting = GetUpcomingMeetings()
    const pendingMeeting = GetPendingMeetings()
    const completedMeeting = GetCompletedMeetings()
    const [PAopen, setPAOpen] = useState(false)
    const [UAopen, setUAOpen] = useState(false)
    const [CAopen, setCAOpen] = useState(false)
    const [appId, setAppId] = useState(false)
    const handlePAOpen = (id) => {
      setAppId(id)
      setPAOpen(true)
    };
    const handlePAClose = () => setPAOpen(false);

    const handleUAOpen = (id) => {
      setAppId(id)
      setUAOpen(true)
    };
    const handleUAClose = () => setUAOpen(false);

    const handleCAOpen = (id) => {
      setAppId(id)
      setCAOpen(true)
    };
    const handleCAClose = () => setCAOpen(false);

    function followup(option){
      localStorage.setItem('previousAppointment', JSON.stringify(option))
      history.push('/vetService/followup/vetuser')
    }

    async function CancelPendingAppointment(option){
      // console.log(option)
    
      firebase.firestore()
      .collection('users')
      .doc(option.userId)
      .collection('appointments')
      .doc('system')
      .collection('cancelled')
      .doc(option.appointmentId)
      .set({
          status:'cancelled',
          appointmentId: option.appointmentId,
          description: option.description,
          petName:option.petName ,
          petType: option.petType,
          preferredloc:option.preferredloc ,
          selectedDate: option.selectedDate,
          selectedSlot:option.selectedSlot ,
          userId:option.userId ,
          vetType:option.vetType
      })
    
    

    firebase.firestore()
    .collection('admin')
    .doc('vets')
    .collection('appointments')
    .doc('system')
    .collection('cancelled')
    .doc(option.appointmentId)
    .set({
        appointmentId: option.appointmentId,
        description: option.description,
        petName:option.petName ,
        petType: option.petType,
        preferredloc:option.preferredloc ,
        selectedDate: option.selectedDate,
        selectedSlot:option.selectedSlot ,
        userId:option.userId ,
        vetType:option.vetType
    })

    const snapshot1 = await firebase.firestore()
                          .collection('users')
                          .doc(option.userId)
                          .collection('appointments')
                          .doc('system')
                          .collection('pending')
                          .limit(1)
                          .where('appointmentId','==',option.appointmentId)
                          .get()
    const doc1 = snapshot1.docs[0]
    doc1.ref.delete()



    const snapshot2 = await firebase.firestore()
                          .collection('admin')
                          .doc('vets')
                          .collection('appointments')
                          .doc('system')
                          .collection('pending')
                          .limit(1)
                          .where('appointmentId','==',option.appointmentId)
                          .get()
    
    const doc2 = snapshot2.docs[0]
    // console.log('admin: ',doc2.id)
    doc2.ref.delete()

    const snapshot3 = await firebase.firestore()
                          .collection('users')
                          .doc(option.userId)
                          .collection('pets')
                          .doc(option.petId)
                          .collection('appointments')
                          .limit(1)
                          .where('appointmentId','==',option.appointmentId)
                          .get()
    const doc3 = snapshot3.docs[0]
    doc3.ref.delete()

    }


    async function CancelUpcomingAppointment(option){
      // console.log(option)
      firebase.firestore()
      .collection('users')
      .doc(option.userId)
      .collection('appointments')
      .doc('system')
      .collection('cancelled')
      .doc(option.appointmentId)
      .set({
          status:'cancelled',
          appointmentId: option.appointmentId,
          description: option.description,
          petName:option.petName ,
          petType: option.petType,
          preferredloc:option.preferredloc ,
          selectedDate: option.selectedDate,
          selectedSlot:option.selectedSlot ,
          userId:option.userId ,
          vetType:option.vetType,
          vetneryAssigned:option.vetneryAssigned
      })
    
    

    firebase.firestore()
    .collection('admin')
    .doc('vets')
    .collection('appointments')
    .doc('system')
    .collection('cancelled')
    .doc(option.appointmentId)
    .set({
        appointmentId: option.appointmentId,
        description: option.description,
        petName:option.petName ,
        petType: option.petType,
        preferredloc:option.preferredloc ,
        selectedDate: option.selectedDate,
        selectedSlot:option.selectedSlot ,
        userId:option.userId ,
        vetType:option.vetType,
        vetneryAssigned:option.vetneryAssigned
    })

    firebase.firestore()
      .collection('products')
      .doc('vets')
      .collection('profile')
      .doc(option.vetneryAssigned)
      .collection('appointments')
      .doc('system')
      .collection('cancelled')
      .doc(option.appointmentId)
      .set({
          status:'cancelled',
          appointmentId: option.appointmentId,
          description: option.description,
          petName:option.petName ,
          petType: option.petType,
          preferredloc:option.preferredloc ,
          selectedDate: option.selectedDate,
          selectedSlot:option.selectedSlot ,
          userId:option.userId ,
          vetType:option.vetType,
          vetneryAssigned:option.vetneryAssigned
      })

    const snapshot1 = await firebase.firestore()
                          .collection('users')
                          .doc(option.userId)
                          .collection('appointments')
                          .doc('system')
                          .collection('upcoming')
                          .limit(1)
                          .where('appointmentId','==',option.appointmentId)
                          .get()
    const doc1 = snapshot1.docs[0]
    // console.log('user: ',doc1.id)
    doc1.ref.delete()

    const snapshot2 = await firebase.firestore()
                          .collection('admin')
                          .doc('vets')
                          .collection('appointments')
                          .doc('system')
                          .collection('assigned')
                          .limit(1)
                          .where('appointmentId','==',option.appointmentId)
                          .get()
    
    const doc2 = snapshot2.docs[0]
    // console.log('admin: ',doc2.id)
    doc2.ref.delete()

    const snapshot3 = await firebase.firestore()
                          .collection('products')
                          .doc('vets')
                          .collection('profile')
                          .doc(option.vetneryAssigned)
                          .collection('appointments')
                          .doc('system')
                          .collection('pending')
                          .limit(1)
                          .where('appointmentId','==',option.appointmentId)
                          .get()
    
    const doc3 = snapshot3.docs[0]
    // console.log('vet: ',doc3.id)
    doc3.ref.delete()

    const snapshot4 = await firebase.firestore()
                          .collection('users')
                          .doc(option.userId)
                          .collection('pets')
                          .doc(option.petId)
                          .collection('appointments')
                          .limit(1)
                          .where('appointmentId','==',option.appointmentId)
                          .get()
    const doc4 = snapshot3.docs[0]
    doc3.ref.delete()

    }

    return (
    <div style={{ margin: '20px 10px' }}>
    <Paper className={classes.paperSection}>
    <Stack spacing={{ xs: 2 }}>
              <h4>Upcoming Meetings</h4>
              {pendingMeeting?.map((res) => 
                <Grid container direction={isMobile?"column":"row"} className={classes.box} justifyContent="space-around" className={classes.appointmentContainer}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar sx={{ height: '50px', width: '50px', mr: 2 }} />
                <h5>{res.petName}</h5>
                </Box>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="text"><b>Date:</b><br/>{res.selectedDate.toString().substring(0,16)}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="text"><b>Vet Type</b><br/>{res.vetType}</p>
                  </div>
                  
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button color="primary" variant='contained' size='small' style={{ margin: 4, marginLeft: '15px' }} onClick={() => handlePAOpen(res.appointmentId)}>More Info</Button>
              </div>
              </Grid>
              )}
      </Stack>
      </Paper>
    {/* <Paper className={classes.paperSection}>
    <Stack spacing={{ xs: 2 }}>
              <h4>Upcoming Meetings</h4>
              {upcomingMeeting?.map((res) => 
                <Grid container direction={isMobile?"column":"row"} className={classes.box} justifyContent="space-around">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar sx={{ height: '50px', width: '50px', mr: 2 }} />
                <h5>{res.petName}</h5>
                </Box>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="text"><b>Date:</b><br/>{res.selectedDate.toString().substring(0,16)}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="text"><b>Vet Type</b><br/>{res.vetType}</p>
                  </div>
                  
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button color="primary" variant='contained' size='small' style={{ margin: 4, marginLeft: '15px' }} onClick={() => handleUAOpen(res.appointmentId)}>More Info</Button>
              </div>
              </Grid>
              )}

      </Stack>
      </Paper> */}
    
      <Paper className={classes.paperSection}>
    <Stack spacing={{ xs: 2 }}>
              <h4>Completed Meetings</h4>
              {completedMeeting?.map((res) => 
                <Grid container direction={isMobile?"column":"row"} className={classes.box} justifyContent="space-around" className={classes.appointmentContainer}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar sx={{ height: '50px', width: '50px', mr: 2 }} />
                <h5>{res.petName}</h5>
                </Box>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="text"><b>Date:</b><br/>{res.selectedDate.toString().substring(0,16)}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="text"><b>Vet Type</b><br/>{res.vetType}</p>
                  </div>
                  
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button color="primary" variant='contained' size='small' style={{ margin: 4, marginLeft: '15px' }} onClick={(e) => handleCAOpen(res.appointmentId)}>More Info</Button>
              </div>
              </Grid>
              )}

      </Stack>
      </Paper>
      
      <Modal
        open={PAopen}
        onClose={handlePAClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  
        
      >
      <Paper className={classes.modstyle}>
        {pendingMeeting.map((option) => (
          option.appointmentId===appId?

          <Stack spacing={2}>
          <Box component='div' className={classes.item}><b>Appointment Id :</b> {option.appointmentId}</Box>
            <Box component='div' className={classes.item}><b>Pet Name:</b> {option.petName}</Box>
            <Box component='div' className={classes.item}><b>Pet Type:</b> {option.petType}</Box>
            <Box component='div' className={classes.item}><b>Location:</b> {option.preferredloc}</Box>
            <Box component='div' className={classes.item}><b>Date:</b> {option.selectedDate}</Box>
            <Box component='div' className={classes.item}><h4>Slot: {option.selectedSlot}</h4></Box>
            <Box component='div' className={classes.item}><b>Vetrinary Type:</b> {option.vetType}</Box>
            <Box component='div' className={classes.item}><b>Description:</b> {option.description}</Box>
            <Box component='div' className={classes.item} sx={{ backgroundColor:'red', color:'blue' }}><b>Status:</b> {option.status}</Box>
            <Button onClick={(e) => CancelPendingAppointment(option)} color="primary">Cancel Appointment</Button>
            <Button onClick={handlePAClose} color="primary">Close</Button>
        </Stack> 

        : null
        ))}
      </Paper>
      </Modal>

      <Modal
        open={UAopen}
        onClose={handleUAClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  
        
      >
      <paper className={classes.modstyle}>
        {upcomingMeeting.map((option) => (
          option.appointmentId===appId?

          <Stack spacing={2}>
          <Box component='div' className={classes.item}><b>Appointment Id :</b> {option.appointmentId}</Box>
            <Box component='div' className={classes.item}><b>Pet Name:</b> {option.petName}</Box>
            <Box component='div' className={classes.item}><b>Pet Type:</b> {option.petType}</Box>
            <Box component='div' className={classes.item}><b>Location:</b> {option.preferredloc}</Box>
            <Box component='div' className={classes.item}><b>Date:</b> {option.selectedDate}</Box>
            <Box component='div' className={classes.item}><h4>Slot: {option.selectedSlot}</h4></Box>
            <Box component='div' className={classes.item}><b>Vetrinary Type:</b> {option.vetType}</Box>
            <Box component='div' className={classes.item}><b>Description:</b> {option.description}</Box>
            <Box component='div' className={classes.item} sx={{ backgroundColor:'red', color:'blue' }}><b>Status:</b> {option.status}</Box>
            <Button onClick={(e) => CancelUpcomingAppointment(option)} color='primary'>Cancel Appointment</Button>
            <Button onClick={handleUAClose} color="primary">Close</Button>

        </Stack> 

        : null
        ))}
      </paper>
      </Modal>
      

      <Modal
        open={CAopen}
        onClose={handleCAClose}
        // className={classes.modstyle}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  
      >
      <Paper className={classes.modstyle}>
        {completedMeeting.map((option) => (
          option.appointmentId===appId?

          <Stack spacing={2}>
          <Box component='div' className={classes.item}><b>Appointment Id :</b> {option.appointmentId}</Box>
            <Box component='div' className={classes.item}><b>Pet Name:</b> {option.petName}</Box>
            <Box component='div' className={classes.item}><b>Pet Type:</b> {option.petType}</Box>
            <Box component='div' className={classes.item}><b>Location:</b> {option.preferredloc}</Box>
            <Box component='div' className={classes.item}><b>Date:</b> {option.selectedDate}</Box>
            <Box component='div' className={classes.item}><h4>Slot: {option.selectedSlot}</h4></Box>
            <Box component='div' className={classes.item}><b>Vetrinary Type:</b> {option.vetType}</Box>
            <Box component='div' className={classes.item}><b>Description:</b> {option.description}</Box>
            <Box component='div' className={classes.item}><b>Vet Id:</b> {option.vetneryAssigned}</Box>
            <Box component='div' className={classes.item} sx={{ backgroundColor:'red', color:'blue' }}><b>Status:</b> {option.status}</Box>
            <Button onClick={()=>followup(option)} color="primary">Book Follow Up Appointment</Button>
            <Button onClick={handleCAClose} color="primary">Close</Button>
        </Stack> 

        : null
        ))}
      </Paper>
      </Modal>
    </div>
    )
}