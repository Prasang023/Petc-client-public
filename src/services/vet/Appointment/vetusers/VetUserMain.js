import { useState , useEffect } from "react";
import { Paper, Grid, makeStyles, useTheme, Box, Button } from '@material-ui/core'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Header from '../../../../ui/Header/matnavbar'
import bgpayment from '../../../../assets/images/paymentGateway/bgpayment.png'
import Stepper from './Components/Stepper'
import vet from '../../../../assets/images/homepage/vet.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import firebase from 'firebase'
const useStyles = makeStyles((theme) => ({
    right: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    summary: {
        width: "350px",
        padding: '20px 10px',
        margin: '10px 10px',
        marginLeft: '0px',
        borderRadius: '10px',
        backgroundColor: theme.palette.text.main
    },
    summaryPic: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 10px',
    },
    summaryDetails: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 10px',
    },
    summaryLine: {
        display: 'flex',
        justifyContent: 'space-between',
        
    },
    summaryTotal:{
        
    }
  }));


// const UpdateCoupon = (cp) =>{
//     firebase.firestore()
//     .collection('admin')
//     .doc('extras')
//     .collection('coupons')
//     .update({
//       code:cp.code,
//       type:cp.type,
//       description:cp.description,
//       x:cp.x,
//       counter:cp.counter
//     })
    
// }

// const FetchCoupon = () =>{
//     const [data, setdata] = useState([])
    
//         useEffect(() => {
//       firebase.firestore().collection('admin')
//       .doc('extras')
//       .collection('coupons')
//       .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
//     }, [])


//     return data
// }
// const FetchUserCoupon = () =>{
//     const [data, setdata] = useState([])
//     const user = firebase.auth().currentUser.uid
//     useEffect(() => {
//         firebase.firestore()
//         .collection('users')
//         .doc(user)
//         .collection('appliedCoupons')
//         .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))
//     }, [])
//     return data
// }
// const ApplyCoupon = (coupon) =>{
    
//     const user = firebase.auth().currentUser.uid
//     firebase.firestore()
//     .collection('users')
//     .doc(user)
//     .collection('appliedCoupons')
//     .add(coupon)
    
// }
const VetUser = (props) => {
    const [ coupon, setCoupon ] = useState('')
    const [ amount, setAmount ] = useState(249)
    const [ couponMessage, setCouponMessage ] = useState('')
    const [ couponSuccess, setCouponSuccess ] = useState(false)
    // const [ couponList, setCouponList ] = useState([])
    // const couponList = FetchCoupon()
    // console.log(x[0].code)
    // const [ allCoupons, setAllCoupons ] = useState(x)
    // console.log("aLLcOUPONS", allCoupons)
    // useEffect(() => {
    //     firebase.firestore().collection('admin')
    //     .doc('extras')
    //     .collection('coupons')
    //     .onSnapshot((snapshot) => setCouponList(snapshot.docs.map(doc => doc.data())))  
    //     // console.log(couponList) 
    // }, [])


    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const path = props.location.pathname
    if(path==='/vetService/followup/vetuser')
    var followup = true
    else
    var followup = false
    // let checkAllCoupons = false
    // let userCoupons = FetchUserCoupon()
    // console.log(userCoupons)
    // const  applied = false;
    const couponCheck = ()=> {
        
        // for(var i=0 ; i<x.length ; i++){
        //     if(x[i].code===coupon){
        //         console.log("yes")
        //         setAmount(149)
        //         setCouponMessage('Coupon Successfully Applied')
        //         setCouponSuccess(true)
        //         applied = true;
        //         break;
        //     }
            
        // }
        if(coupon==="FIRST100"){
            setAmount(149)
            setCouponMessage('Coupon Successfully Applied')
            setCouponSuccess(true)
        }
        else if (coupon==="FREE150421008"){
            setAmount(1)
            setCouponMessage('Coupon Successfully Applied')
            setCouponSuccess(true)
        }
        else if (coupon==="SPECIAL100"){
            setAmount(99)
            setCouponMessage('Coupon Successfully Applied')
            setCouponSuccess(true)
        }
        else if (coupon==="BELLA23"){
            setAmount(129)
            setCouponMessage('Coupon Successfully Applied')
            setCouponSuccess(true)
        }
        else if (coupon==="RMXYTW19"){
            setAmount(119)
            setCouponMessage('Coupon Successfully Applied')
            setCouponSuccess(true)
        }
        else if (coupon==="CWMZPT80"){
            setAmount(129)
            setCouponMessage('Coupon Successfully Applied')
            setCouponSuccess(true)
        }
        else{
            setCouponMessage('Invalid Coupon Code')
            setCouponSuccess(false)
        }

        localStorage.setItem('coupon', coupon)
    }

    return ( 
        <div style={{ backgroundImage: `url(${bgpayment})`}}>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ margin: '20px' }}>Confirm Booking</h2>
        </div>
        <Grid container >
        <Grid md={8} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
        {/* <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}> */}
        <Stepper 
        followup={followup} 
        offer={{
            code: coupon,
            amount: amount
        }} />
        </Grid>
        <Grid md={4} xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
        <div style={{ width:'100%', display:'flex', flexDirection:'column', alignItems: 'center' }}>
        <Paper elevation={5} className={classes.summary}>
            <h3><ShoppingCartIcon style={{ marginRight: '5px', color:theme.palette.primary.main }} />Order Summary</h3>
            <div className={classes.summaryPic}>
                <img src={vet} />
                <p>Consult a Vet - 20 min<br/>Quantity: 1<br/>Price: ₹ 249</p>
            </div>
            <div className={classes.summaryDetails}>
                <div className={classes.summaryLine}><p>Subtotal</p><p>₹249</p></div>
                <div className={classes.summaryLine}><p>Discount</p><p>-₹{249-amount}</p></div>
                <div className={classes.summaryLine}><p>Taxes</p><p>included</p></div>
                <div className={classes.summaryLine} style={{ marginTop: '20px' }}><p><b>To Pay</b></p><p><b>₹{amount}</b></p></div>
            </div>
        </Paper>
        <Paper elevation={5} className={classes.summary}>
            <h4>Coupon Code</h4>
            <div style={{ display: 'flex', margin:'3px 0px' }}>
            <TextField id="outlined-basic" variant="outlined" color="primary" fullWidth style={{ marginRight:'10px' }} onChange={(e)=>setCoupon(e.target.value)} value={coupon}  />
            <Button color="primary" variant="contained" onClick={()=>couponCheck()} style={{ color: theme.palette.text.main }}>Apply</Button>
            </div>
            <h5 style={{ color:couponSuccess?'green':'red' }}>{couponMessage}</h5>
        </Paper>
        </div>
        </Grid>
        {/* </div> */}
        </Grid>
        </div>
     );
}

{/* <LoginSignup />
            <PetDetails/>
            <VetDetails />
            <OrderSummary />
            <Payment /> */}
 
export default VetUser;