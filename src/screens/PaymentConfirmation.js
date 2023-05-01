import React  ,{useState , useEffect}from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Paper, Stack, Divider, Button } from '@mui/material'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import firebase from 'firebase'
import { useParams } from 'react-router-dom';
//Components imports
import Header from "../ui/Header/matnavbar";
import { jsPDF } from "jspdf";

const useStyles = makeStyles(theme => ({
    page: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.main
    },
    container: {
        width: '80%',
        margin: '80px 0px',
        marginBottom: '20px',
        borderRadius: '12px',
        padding: '15px',
    },
    topDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        marginTop: '-80px',
        margin: '10px 0px'
    },
    midDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        margin: '10px 0px'
    },
    detailField: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down("xs")]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        }
    }
  }));
function GetUser(){
    const [data, setdata] = useState([])
    const user = firebase.auth().currentUser
    const id = user?firebase.auth().currentUser.uid:''
    useEffect(() => {
      firebase.firestore()
      .collection('users')
      .onSnapshot((snapshot) =>{
        setdata(snapshot.docs.map((doc)=>doc.data()))
    })
    }, [])

    // console.log(data)

    for(var i=0 ; i<data.length; i++){
        if(data[i]['id']==id){
            setdata(data[i])
            break
        }
    }

    return data;

}
  function getDetails(userData, pid, user){
      const details = [
          {
              "title": "Pet Parent",
              "value": user?userData.name:''
          },
          {
            "title": "Pet Name",
            "value": localStorage.getItem('petName') 
        },
        {
            "title": "Email",
            "value": localStorage.getItem('userEmail')
        },
        {
            "title": "Contact No.",
            "value": localStorage.getItem('mobileNumber')
        },
        {
            "title": "Appointment Date",
            "value": localStorage.getItem('selectedData') 
        },
        {
            "title": "Patient Description",
            "value": localStorage.getItem('desc') 
        },
        {
            "title": "Payment Id",
            "value": pid
        },
        {
            "title": "Appointment Id",
            "value": localStorage.getItem('appointment Id') 
        },
      ]
      return details
  }

  function CreateInvoice(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
  
    doc.text("Your Appointment has been Booked , Check your mail for further details", 10, 10);
    doc.save("invoice.pdf");
  }

const PaymentConfirmation = (props) => {
    const user = firebase.auth().currentUser
    const userData = user?GetUser():''
    const { paymentId } = useParams()
    // console.log(userData)
    const details = getDetails(userData, paymentId, user)
    const classes = useStyles();
    const theme = useTheme();
    // const paymentId = localStorage.getItem('paymentId')
    localStorage.removeItem('paymentId')
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
      <>
      <Header />
    <div className={classes.page}>
        <Paper className={classes.container}>
            <div className={classes.topDiv}>
            <CheckCircleRoundedIcon sx={{ fontSize: '150px', color: 'green' }} />
            <h3>Order Successfull !</h3>
            <p><b>Order ID:</b> {paymentId}</p>
            </div>
            <div className={classes.midDiv}>
                <h2 style={{ color: theme.palette.primary.main, textAlign: 'center' }}>Thank You for Booking Veterinary Service.</h2>
                <h4 style={{ textAlign: 'center'}}>You will soon receive conirmation email. For any assistance, call us at: <a style={{ textDecoration: 'none'}} href='https://wa.me/+919532056028'>+91 85320 56028</a></h4>
            </div>
            <div style={isMobile?{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}: null}>
                <h3 style={{ color: theme.palette.secondary.main, marginBottom: '15px' }}>Booking Details</h3>
                <Stack
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}>
                    {details.map((item)=><div className={classes.detailField}><p><b>{item.title}</b></p><p>{item.value}</p></div>)}
                </Stack>
            </div>
        </Paper>
        {/* <div style={{ margin: '20px' }} ><Button onClick={CreateInvoice} variant='outlined' style={{ color: theme.palette.primary.main, border: '1px solid' }} color="primary">Download Invoice</Button></div> */}
    </div>
    </>
  )
}

export default PaymentConfirmation