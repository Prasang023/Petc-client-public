import React from 'react'
import firebase from 'firebase';
import { Button } from '@material-ui/core';

// console.log(firebase.auth().currentUser.email)
// const email = firebase.auth().currentUser.email
// console.log(email)
var actionCodeSettings = {
    
    url: 'http://localhost:3000/',
    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
    // handleCodeInApp: true,
    // When multiple custom dynamic link domains are defined, specify which
    // one to use.
    // dynamicLinkDomain: "example.page.link"
  };


//   const temp = firebase.auth().currentUser.emailVerified
// console.log(temp)  
async function  Check(){
    const temp = await firebase.auth().currentUser.emailVerified
    console.log(temp)  
}

function Verify(){
    firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
    // firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
        // console.log(firebase.auth().currentUser.uid)
        // console.log(firebase.auth().currentUser.email)
        console.log('email verification send')
    })
    .catch(function(error) {
        // Error occurred. Inspect error.code.
        console.log(error)
    });
}

function EmailVerification() {
  return (
    <div>
        <h1>EmailVerification</h1>
        <Button onClick = {Verify}>Send</Button>
        <Button onClick = {Check}>Check</Button>
    </div>
  )
}

export default EmailVerification