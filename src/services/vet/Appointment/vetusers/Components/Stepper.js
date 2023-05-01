import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import LoginSignup from "../blocks/1_LoginSignUp";
import PetDetails from "../blocks/2_PetDetails";
import PetDetailsNotAuthorised from "../blocks/2_PetDetailsNotAuthorised";
import VetDetails from "../blocks/3_VetDetails";
import OrderSummary from "../blocks/4_OrderSummary";
import Payment from "../blocks/5_Payment";
import firebase from 'firebase';
import uuid from "react-uuid" 
import emailjs from 'emailjs-com';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// import { jsPDF } from "jspdf";
import { useHistory } from 'react-router-dom';

// function CreateInvoice(){
//   // Default export is a4 paper, portrait, using millimeters for units
//   const doc = new jsPDF();

//   doc.text("Your Appointment has been Booked , Check your mail for further details", 10, 10);
//   doc.save("invoice.pdf");
// }


const useStyles = makeStyles(theme => ({
  btn: {
    backgroundColor: theme.palette.primary.main,

    },
    // root: {
    //   // "& .MuiStepIcon-active": { color: theme.palette.primary.main },
    //   // "& .MuiStepIcon-completed": { color: theme.palette.primary.main },
    //   "& .Mui-disabled .MuiStepIcon-root": { color: theme.palette.primary.main },
    // }
    
    stepButton: {
      '& .MuiStepIcon-active': {
        opacity: 1,
        // color: setToMeterColor(theme),
      },
    },
    stepIcon: {
      color: '#fff',
      opacity: 0.8,
    },
    stepIconText: {
      // display: 'none'
      backgroundColor: '#fff'
    },
  }));






export default function VerticalLinearStepper(props) {
  const { followup, offer } = props
  // console.log(props)
  const user = firebase.auth().currentUser
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles(theme);
  
  // let steps = initializePage(offer)

  const steps = [
    {
      label: 'Login Or Signup',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
      element : <LoginSignup /> ,
    },
    {
      label: 'PetDetails',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
      element : user?<PetDetails />:<PetDetailsNotAuthorised />,
    },
    // {
    //   label: 'VetDetails',
    //   description: `Try out different ad text to see what brings in the most customers,
    //             and learn how to enhance your ads using features like ad extensions.
    //             If you run into any problems with your ads, find out how to tell if
    //             they're running and how to resolve approval issues.`,
    //   element : <VetDetails /> ,
    // },
    {
      label: 'Booking Details',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
      element : <OrderSummary /> ,
    },
    {
      label: 'Payment Options',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
      element : <Payment offer={offer} /> ,
    },
  ];

  const [loading, setloading] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(followup?2:0);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
 
  return (
    <Box sx={{ width: '80%' }}>
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.root}>
        {steps.map((step, index) => (
          <Step key={step.label} >
          
            <StepLabel sx={{ backgroundColor: theme.palette.primary.main, padding: '10px 10px', margin: '10px 10px',borderRadius: '7px', color: theme.palette.text.main }}
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
              StepIconProps={{
                        classes: {
                          root: classes.stepIcon,
                          text: classes.stepIconText,
                        },
                      }}
            >
              <h4 style={{ color: index===activeStep?theme.palette.text.main:null }}>{step.label}</h4>
               
            </StepLabel>
            <StepContent>
                {step.element}
              <Box sx={{ mb: 2 }}>
                <div>
                  {index === steps.length - 1 ?
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.light} }} variant="contained">
                      Reset
                    </Button>
                  :
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.light} }}
                  >
                    Continue
                  </Button>}
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1, color: theme.palette.primary.main, '&:hover': { color: theme.palette.primary.light} }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
          <Button onClick = {(e)=>{
            // SubmitForm()
            window.alert('Appointment Booked')
            CreateInvoice()
            SendEmail(e)
            }}>Submit Form</Button>
        </Paper>
      )} */}
    </Box>
  );
}
