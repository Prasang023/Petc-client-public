import React from 'react'
import Button from '@mui/material/Button';

const VerifyScreen = (props) => {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center'}}>
        <h3 style={{ marginBottom: '20px' }}>A verification link has been send to your registered email Id. Please click on it and verify your account.</h3>
        <Button variant="contained" onClick={props.toggleVerifyScreen}>Go Back</Button>
    </div>
  )
}

export default VerifyScreen