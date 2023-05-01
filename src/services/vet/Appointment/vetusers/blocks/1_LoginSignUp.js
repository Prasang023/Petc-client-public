import React, { useState } from 'react';
import { TextField } from "@mui/material";
import firebase from "firebase";
const GetEmail= () =>{
    const email =  firebase.auth().currentUser.email
    return email
}

function StoreData(email, phone){
    localStorage.setItem('userEmail' , email );
    localStorage.setItem('mobileNumber' , phone );
}

const LoginSignup = () => {
    const user = firebase.auth().currentUser
    const [email, setEmail] = useState(user?GetEmail():'');
    const [phone, setPhone] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    StoreData(email, phone)
    // console.log(email)
    return ( 
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: '5px' }}>
            <TextField 
            label='Email' 
            size="small" type="email" value={email} onChange={(e) => handleChange(e)}/>
        </div>
        <div style={{ margin: '5px' }}>
            <TextField 
            label='Mobile Number' 
            size="small" type="number" onChange={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
            <p>By continuing, you agree to PetC's Terms of Use and Privacy Policy</p>
        </div>
     );
}
 
export default LoginSignup;