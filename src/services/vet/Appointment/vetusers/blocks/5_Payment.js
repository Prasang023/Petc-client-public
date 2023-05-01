import { useState , useRef } from 'react'
import '../../../../../globalcomps/PaymentGateway/Payments.css'
import {Button} from '@material-ui/core'
import razorpay from '../../../../../assets/images/paymentGateway/razorpay.png';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';
import firebase from 'firebase';
import uuid from "react-uuid" 
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';
function SaveData(acknowleged) {
  localStorage.setItem('paymentComplete' , acknowleged)
}

function SubmitForm(amount){
  const user = firebase.auth().currentUser
  const id = user?firebase.auth().currentUser.uid:'';
  if(localStorage.getItem('paymentComplete') && localStorage.getItem('paymentId')!==null){
    // var bookingDate =localStorage.getItem('selectedData')
    var selectedSlot = localStorage.getItem('selectedSlot')
    var petType =localStorage.getItem('petType')
    var petName =localStorage.getItem('petName')
    var vetType = localStorage.getItem('vetype')
    var selectedDate = localStorage.getItem('selectedData')
    var description = localStorage.getItem('desc')
    var preferredloc = localStorage.getItem('prefferedLoc')
    var petId = localStorage.getItem('petId')
    var appointmentId = uuid()
    var paymentId = localStorage.getItem('paymentId')
    var userEmail = localStorage.getItem('userEmail')
    var mobileNumber = localStorage.getItem('mobileNumber')
    var coupon = localStorage.getItem('coupon')

  if(user)
  {
    // Add data to user database
    firebase.firestore()
    .collection('users').doc(id).collection('appointments').doc('system').collection('pending').doc(appointmentId)
    .set({
      userId:id,
      appointmentId,
      selectedSlot,
      petType,
      petName,
      vetType,
      selectedDate,
      description,
      preferredloc,
      petId,
      status:'pending',
      userEmail,
      mobileNumber,
      coupon,
      amount,
    })

    // Add data to Pet Collection

    firebase.firestore()
    .collection('users').doc(id).collection('pets').doc(petId).collection('appointments').doc(appointmentId)
    .set({
      userId:id,
      appointmentId,
      selectedSlot,
      description,
      preferredloc,
      status:'pending',
      coupon,
      amount,
    })
    // Add data to admin section
    firebase.firestore()
    .collection('admin').doc('vets').collection('appointments').doc('system').collection('pending').doc(appointmentId)
    .set({
      appointmentId,
      selectedDate,
      selectedSlot,
      petType,
      petName,
      vetType,
      petId,
      selectedDate,
      description,
      preferredloc,
      status:'pending',
      userId:id,
      userEmail,
      mobileNumber,
      coupon,
      amount,
    })
    
    var curr_date = new Date()
    
    // Adding data to the collection of payment history
    firebase.firestore()
    .collection('users').doc(id).collection('payments').doc(appointmentId)
    .set({
      userId:id,
      appointmentId,
      paymentId,
      time: curr_date.toString(),
      price:parseInt(amount),
      coupon
    })
  } else {
    firebase.firestore()
    .collection('UnauthorisedAppointment').doc(appointmentId)
    .set({
      appointmentId,
      selectedSlot,
      petType,
      petName,
      vetType,
      selectedDate,
      description,
      preferredloc,
      petId,
      status:'pending',
      userEmail,
      mobileNumber,
      coupon,
      amount,
    })

    firebase.firestore()
    .collection('admin').doc('vets').collection('appointments').doc('system').collection('pending').doc(appointmentId)
    .set({
      appointmentId,
      selectedDate,
      selectedSlot,
      petType,
      petName,
      vetType,
      petId,
      selectedDate,
      description,
      preferredloc,
      status:'pending',
      userEmail,
      mobileNumber,
      coupon,
      amount,
    })
  }
    // localStorage.removeItem('paymentId')
  
  }
  else{
    window.alert('Complete the Payment First')
  }
  
}

function Payment(props) {

  const { offer } = props

  const user = firebase.auth().currentUser
  const form = useRef()
  const formAppDetails = useRef()
  // const formAppDetails = useRef()
  let history = useHistory()
  const [error, setError] = useState(null)
  const theme = useTheme();
  const [paymentId , setpaymentId] = useState(null)
  const [acknowledged, setacknowledged] = useState(true)
  SaveData(acknowledged)
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const SendEmail = () => {
  
    // e.preventDefault();
  
    emailjs.sendForm('service_0zzlv4w', 'template_sf7kizl', form.current, '1PRmVvutBOmnuQRB5')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    
    emailjs.sendForm('service_0zzlv4w', 'template_0wbyixf', formAppDetails.current, '1PRmVvutBOmnuQRB5')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    emailjs.sendForm('service_j48dreo', 'template_xcnnshf', formAppDetails.current, 'WZPFSefC4zNrz5Z0a')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      
  };

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {

      var slot = localStorage.getItem('selectedSlot')
      // var petType =localStorage.getItem('petType')
      var petName =localStorage.getItem('petName')
      var selectedDate = localStorage.getItem('selectedData')
      var description = localStorage.getItem('desc')
      var petId = localStorage.getItem('petId')
      if(!slot || !petName || !selectedDate ){
        setError("Please fill all details to proceed")
        return
      }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      // key: "rzp_test_WJuJ5Rfdemh3Qn",
      key: "rzp_live_AJYey7SXkoOJfX",
      currency: "INR",
      amount: amount,
      name: "Customer",
      description: "Thanks for purchasing",
      image:
        "",

      handler: function (response) {
        setpaymentId(response.razorpay_payment_id)
        // alert(response.razorpay_payment_id);
        alert("Payment Successfully");
        SubmitForm(amount)
        SendEmail()
        history.push(`/paymentConfirmation/${response.razorpay_payment_id}`);
      },
      // prefill: {
      //   name: "Sparsh",
      // },
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  
  localStorage.setItem('paymentId' , paymentId)
  return (
    <div style={{ width: '100%', backgroundColor: 'white', marginLeft: '-30px'}}>
      {/* <div className="buttons"> */}
      
      <div style={{  width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              
                <img src={razorpay} width='100px'/>
                <Divider orientation="horizontal" color='primary' />
                <h6>Cards, UPI, Wallets,<br/>Paypal, Netbanking</h6>
              
              
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <p style={{ color: '#cccccc', textAlign: 'center', marginLeft: '15px 5px'}}>After clicking "Proceed To Pay", you will be redirected to Razorpay (Cards, UPI, NetBanking, Wallets, Paypal) to complete your purchase securely. Happy Ordering!</p>
              <Button onClick={() =>  displayRazorpay(offer.amount*100)} color="primary" variant="outlined">
                Proceed to Pay
              </Button>
              </div>
      {/* </div> */}
      <form ref={form} onSubmit={SendEmail}
        style={{display : 'none'}}
        >
        <label>Reciever</label>
        <input type="text" name="to_email" value={localStorage.getItem('userEmail')} />
        <label>Name</label>
        <input type = "text" name="to_name" value={user?user.name:''} />
        <label>Date</label>
        <input type = "text" name="date" value={localStorage.getItem('selectedData').substring(0,15)+" "+localStorage.getItem('selectedSlot')} />
        {/* <input type = "text" name="appointment-id" value="" /> */}
        <label>Link</label>
        <input name="link" value="https://www.petc.in/" />
      </form>
      <form ref={formAppDetails} onSubmit={SendEmail}
        style={{display : 'none'}}
        >
        <label>Reciever</label>
        <input type="text" name="to_email" value={localStorage.getItem('userEmail')} />
        <label>Name</label>
        <input type = "text" name="to_name" value={user?user.name:''} />
        <label>Appointment Id</label>
        <input type = "text" name="appointmentId" value={localStorage.getItem('appointmentId')} />
        <label>Pet Name</label>
        <input type = "text" name="petName" value={localStorage.getItem('petName')} />
        <label>Date</label>
        <input type = "text" name="selectedDate" value={localStorage.getItem('selectedData').substring(0,15)} />
        <label>Slot</label>
        <input type = "text" name="selectedSlot" value={localStorage.getItem('selectedSlot')} />
        <label>Description</label>
        <input type = "text" name="description" value={localStorage.getItem('desc')} />
        <label>Pet Type</label>
        <input type = "text" name="petType" value={localStorage.getItem('petType')} />
        <label>Email</label>
        <input type = "text" name="userEmail" value={localStorage.getItem('userEmail')} />
        <label>Phone No</label>
        <input type = "text" name="mobileNumber" value={localStorage.getItem('mobileNumber')} />
        <label>Coupon</label>
        <input type = "text" name="coupon" value={localStorage.getItem('coupon')} />
      </form>
      <div style={{ margin: '10px', color: 'red', fontSize: '15px', width: '100%', display: 'flex', justifyContent: 'center' }}>{error}</div>
    </div>
  );
}

export default Payment;
