import React from 'react'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Helmet from "react-helmet";

// Components import
import Header from "../ui/Header/matnavbar";
import Footer from "../ui/Footer/Footer";

//images imports
import s18 from "../assets/images/homepage/s18.png";
import bgpayment from '../assets/images/paymentGateway/bgpayment.png'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '20px'
  },
  innerContainer: {
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 20px',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    }
  },
}));

const Aboutus = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <Helmet>
              <title>PetC: Online Veterinary Consultation | Vets Near Me | Veterinary Clinic Near Me | Vet Video Consultation | Talk to a Vet Online</title>
              <meta 
                name="description"
                content="PetC is dedicated pet care service provider brand that delivers services including vet on call at a nominal price and as per convinient time. We are backed by expert team of vetrinary doctors and trained staff to provide quality and convenient services for your pets depending on the requirements."
              />
              <link rel="canonical" href="/" />
            </Helmet>
    <Header />
    <div className={classes.container} style={{ backgroundImage: `url(${bgpayment})`}}>
    <h1>About Us</h1>
    <div className={classes.innerContainer}>
    
    <div style={{ width: isMobile?"100%":"50%", padding: '10px', margin: '10px'}}>
    <p style={{ color: theme.palette.primary.main, fontSize: '20px', fontWeight: 'bold' }}>We are a pet care service provider brand, planed and built based on the current requirement of pets and their hoomans.</p>
    <p>PetC is dedicated pet care service provider brand that delivers services including vet on call at a nominal price and as per convinient time. We are backed by expert team of vetrinary doctors and trained staff to provide quality and convenient services for your pets depending on the requirements.</p>
    </div>
    <div>
    <img src={s18} width={isMobile?"300px":"400px"} height="auto" style={{ borderRadius: '10px', shadowRadius: '10px'}} />
    </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Aboutus