import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import Helmet from "react-helmet";

//Images import
import s18 from '../../assets/images/homepage/s18.png'
import vetD1 from '../../assets/images/others/vetD1.png'
import vetD2 from '../../assets/images/others/vetD2.png'
import veterinary from '../../assets/images/others/veterinary1.png'
import rupeesign from '../../assets/images/others/ruppesing.png'
import calendarblankline from '../../assets/images/others/calender.png'
import vetdetail3 from '../../assets/images/others/vetdetail3.png'
// import bg from '../../assets/images/others/bg.png'

//Components import
import Header from "../../ui/Header/matnavbar";
import Footer from "../../ui/Footer/Footer";
import VetGuideCard from '../../ui/VetService/Components/VetGuideCard'

const useStyles = makeStyles(theme => ({
    bgimg: {
      backgroundColor: "#000",
      backgroundImage: `url(${vetD1})`,
      padding: '20px 10px',
    }, 
    Typocolor: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    bookNow:{
        // backgroundColor:'#FF9E00',
        padding: '10px 30px',
    },
    lowerSection:{
        backgroundColor:theme.palette.text.main,
        padding: '30px 15px',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        [theme.breakpoints.down("sm")]: {
            flexDirection: 'column',
            alignItems:'center',
            justifyContent:'center',
          }
    }
  }));

const VetDetail = () => {

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <>
        <Helmet>
              <title>PetC: Online Veterinary Consultation | Vets Near Me | Veterinary Clinic Near Me | Vet Video Consultation | Talk to a Vet Online</title>
              <meta 
                name="description"
                content="Online veterinary consultation appointment services. Talk to an Experienced Veterinary Practitioner from the comfort of your home on Chat, Voice or Video Call and discuss anything related you your Pet's Health, Behavior, Diet."
              />
              <link rel="canonical" href="/" />
            </Helmet>
            <Header/>
        <div>
        <Grid container spacing={2} direction="column">
            <Grid container item className={classes.bgimg} >
              <Grid xs={1}></Grid>
                <Grid xs={10} sm={10}>
                <h1 className={classes.Typocolor}>Book a <span style={{color:theme.palette.primary.main}}>Vet</span></h1><br/>
                <p style={{color: '#ffffff', fontSize:'18px'}}>Ask our vet any animal-related questions you have. No question is a bad question for our vetrinary doctors.</p>
                <br/>
                <br/>
                <ul style={{color: '#ffffff', fontSize:'18px'}} className="bookList">
                    <li>Book appointment</li>
                    <li>Video call with vetrinary</li>
                    <li>Get e-prescription to your mobile</li>
                </ul>
                <Link to="/vetService/vetuser" style={{textDecorationLine:'none'}}>
                <Button 
                className={classes.bookNow}
                style={{backgroundColor:theme.palette.primary.main , float:isMobile?'left':'right', margin: '10px 0px', padding: '10px 40px'}}
                variant='contained' 
                color="primary">
                Book Now
                </Button>
                </Link>
                </Grid>
                
                {/* <Grid xs={1}></Grid> */}
            </Grid>
            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <Typography component="div" variant="h4" style={{ margin:'15px', color: '#000', fontWeight: 800, alignItems: 'center',fontSize:isMobile?'2rem':'3rem' }}>How Online Vetrinary Service <span style={{color:theme.palette.primary.main}}>Works?</span></Typography>
            </Grid>
            <Grid container item spacing={2}>
                
                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={vetD2} style={{ height:isMobile? '65%':'80%', width: 'auto', borderRadius: '15px'}} />
                </Grid>
                <Grid item xs={12} md={6}>

                <Stack spacing={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px', marginBottom: '20px' }}>
                <VetGuideCard 
                    headLine="Login and add details about your pet"
                    desc="Make a Pet Profile for your loved one"
                    icon={veterinary}
                />
                <VetGuideCard 
                    headLine="Select appointment Date and Time"
                    desc="Select the suitable date and time at your convenience"
                    icon={calendarblankline}
                />
                <VetGuideCard 
                    headLine="Book at most affordable Price"
                    desc="Price as low as 249rs/-"
                    icon={rupeesign}
                />
                </Stack>

                </Grid>
                
            </Grid>

            <Grid container item style={{backgroundColor: theme.palette.primary.light}}>
                <Grid xs={1}></Grid>
                <Grid xs={10} sm={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                    <h1>Only vet service that you need</h1>
                    <ul style={{lineHeight:2, listStyle: 'none'}}>
                        <li><DoneSharpIcon style={{ color: theme.palette.primary.main }}/>Avoid the stress of Travel and Save Time</li>
                        <li><DoneSharpIcon style={{ color: theme.palette.primary.main }}/>Video call with Veterinarian</li>
                        <li><DoneSharpIcon style={{ color: theme.palette.primary.main }}/>Get e-prescription to yuor mobile</li>
                        <li><DoneSharpIcon style={{ color: theme.palette.primary.main }}/>Available from any smartphone, or desktop devices</li>
                        {/* <li><DoneSharpIcon style={{ color: theme.palette.primary.main }}/>Trusted by Government of Gujarat</li> */}
                    </ul>
                </div>
                </Grid>
                <Grid xs={10} sm={5} style={{ display:isMobile?'none':'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={s18} width={isMobile?'300px':'400px'} height='auto' style={{ borderRadius: '15px' }} />
                </Grid>
                <Grid xs={1}></Grid>
            </Grid>
            <Grid className={classes.lowerSection}>
                <div>
                    <h1 style={{fontSize:'3rem'}}>Starts At</h1>
                    <h1 >Rs.<span style={{fontSize:'5rem', color:theme.palette.primary.main}}> 249 </span>per appointment</h1>
                </div>
                <Link to="/vetService/vetuser" style={{textDecorationLine:'none'}}>
                <Button 
                variant='contained' 
                style={{ padding:isMobile? '10px 30px':'15px 60px', margin: '10px 0px', backgroundColor: theme.palette.primary.main}}>
                Book Now
                </Button>
                </Link>
            </Grid>
        </Grid>
        </div>
        <Footer />
        </>

    )
}

export default VetDetail
