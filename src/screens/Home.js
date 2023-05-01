import Helmet from "react-helmet";

// component import
import React, { useState } from "react";
import Header from "../ui/Header/matnavbar";
import Topbar from "../ui/Header/Topbar";
import Footer from "../ui/Footer/Footer";
import ServiceCard from '../ui/Homepage/ServiceCard'
import FAQs from '../ui/Homepage/FAQs'


// mui imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Box, Button } from '@material-ui/core'
import Typography from '@mui/material/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import Modal from '@mui/material/Modal';



// images import
import daycare from '../assets/images/homepage/daycare.png'
import landingimg1 from '../assets/images/homepage/landingimg1.png'
import Group from '../assets/images/homepage/Group.png'
import s19 from '../assets/images/homepage/s19.png'
import vet from '../assets/images/homepage/vet.png'
import intersect from '../assets/images/homepage/Intersect.png'
import clock from '../assets/images/homepage/clock.png'
import prescription from '../assets/images/homepage/prescription.png'
import one from '../assets/images/homepage/1-1.png'

import firebase from 'firebase'



const useStyles = makeStyles(theme => ({
    feature: {
        boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        width: '300px',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        margin: '20px 7px'
    },
    iconColor:{
        color:theme.palette.secondary.main
    },
    headtext: {
      fontSize: '35px',
      fontweight: 'bold',
      color:'white',
    },
    herohighlight: {
        color: theme.palette.primary.main,
    },
    img: {
        display: 'flex',
        marginTop:'10px',
        width: '80%',
        height: 'auto',
        
        [theme.breakpoints.down("sm")]: {
            display: 'none',
          }
    },
    imgcont: {
        display: 'flex',
        justifyContent: 'center',
        alignitems: 'center',
    },
    upperBg:{
        backgroundColor: theme.palette.secondary.main,
        padding: '20px 0px'
    },
    serviceImg:{
        width:'100%'
    },
    serviceContent:{
        paddingTop:'1vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'',
    },
    serviceSection:{
        paddingTop:'10vh',
        paddingLeft:'13vw'
    },
    appointmentFeature:{
        padding:'20px'
    },
    faqsection: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center', 
        margin: '20px 0px'
    },
    modalDesign: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        padding: '30px',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    input: {
        height: '40px',
        
        backgroundColor: '#E5E7EB',
        borderRadius: '8px',
        padding: '5px 15px',
        [theme.breakpoints.down("xs")]: {
            // width: '300px'
        }
      },
      subscribe: {
        // width: '100%',
        display: 'flex',
        // justifyContent: 'space-around',
        alignItems: 'center',
        // padding: '10px 5px',
        // borderBottom: '2px solid white',
        // marginBottom: '10px'
      },
      rightPopup: {
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly', 
        alignItems: 'center',
      }
  }));

const Home = ({handleLogout}) => {

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [open, setOpen] = React.useState(true);
    const [email , setemail] = useState('')
    const handleChange = (e) =>{
        setemail(e.currentTarget.value)
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function SubscribeToUs(){
        // SendEmail()
        // return
        firebase.firestore()
        .collection('subscribers')
        .add({
            email
        })
        window.alert('subscribed')
    }

    return ( 
        <>
            <Helmet>
              <title>PetC: Online Veterinary Consultation | Veterinary Clinic Near Me | Vet Video Consultation | Talk to a Vet Online</title>
              <meta 
                name="description"
                content="Book affordable online veterinary consultation appointments with Veterinary for your Pet. Call now and schedule an appointment with a veterinary doctor."
              />
              <link rel="canonical" href="/" />
            </Helmet>
            <Topbar />
            <h1 style={{ display: 'none' }}>Online Veterinary Consultation, Vets Near Me, Talk to a Vet Online</h1>
            <Header />
            {/* Head Section */}

            <Grid container className={classes.upperBg}>
            {/* <svg width="1000" height="1000" style={{ position: "absolute", top: "0", left: "0", zIndex:'-1' }}>
            <circle cx="50" cy="50" r="400" stroke="green" stroke-widt7h="4" fill="#1A576A" />
            </svg> */}
                <Grid container sm={6} xs={12} alignItems="center" justifyContent="center">
                    <Grid item sm={3} xs={0}></Grid>
                        <Grid container sm={9} xs={10} direction={[theme.breakpoints.down("sm")] ? 'row':'column'} spacing={3}>
                            <Grid item>
                                <h3 className={classes.headtext}>Give endless <span className= {classes.herohighlight}>love </span> <br />
                                to your Pet with<span className={classes.herohighlight}> Petc</span></h3>
                                <br/>
                                <h4 style={{color:'white'}}>Service Category</h4>
                            </Grid>
                            <Grid container item spacing={3}>
                                {/* <Grid item>
                                <Card sx={{ width: 'auto', height: 'auto' }}>
                                <Link to='/vetService/vetDetail' className='link' style={{ display: 'flex' }}>
                                
                                    <img src={vet}  alt='vet'  className={classes.serviceImg} />
                                    <div><h5>Vet Service</h5><br/>From best vets</div>
                                </Link>
                                </Card>
                                </Grid> */}
                                
                                <ServiceCard 
                                    headLine="Vet Service"
                                    desc="Vet-On-Call"
                                    icon={vet}
                                    link='/vetService/vetDetail'
                                    />
                                
                                {/* <Grid item>
                                
                                <Card sx={{ width: 100, height: 100 }}>
                                <Link to='/vetService/vetDetail' className='link'>
                                
                                    <img src={petfoodnew}  alt='vet'  className={classes.serviceImg} />
                                
                                </Link>
                                </Card>
                                
                                
                                </Grid> */}
                            {/* </Grid>

                            <Grid container item spacing={3}> */}
                                {/* <Grid item>
    
                                
                                <Card sx={{ width: 100, height: 100 }}>
                                <Link to='/vetService/vetDetail' className='link'>
                                
                                    <img src={communitynew}  alt='vet'  className={classes.serviceImg} />
                                
                                </Link>
                                </Card>
                                </Grid> */}
                                <ServiceCard 
                                    headLine="Join Community"
                                    desc="exclusive pet-parents community"
                                    icon={daycare}
                                    // link='https://t.me/+FxaoKSje3b42ZTE1'
                                    link='https://www.instagram.com/wearepetc/'
                                    />
                                {/* <Grid item>
                                <Card sx={{ width: 100, height: 100 }}>
                                <Link to='/vetService/vetDetail' className='link'>
                                
                                    <img src={communitynew}  alt='vet'  className={classes.serviceImg} />
                                
                                </Link>
                                </Card>
                                </Grid> */}
                                {/* <Grid item sm={2} xs={1}></Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className={classes.imgcont} sm={6} xs={0}>
                        {/* <img className={classes.img} src={landingimg1} alt="bg-image" width="116px" height="116px"/>
                        <img className={classes.img} src={s10} alt="bg-image" width="300px" height="300px" style={{ position: "absolute", bottom: '25px', right: '150px' }}/>
                        <img className={classes.img} src={s11} alt="bg-image" width="180px" height="180px" style={{ position: "absolute", top: '125px', right: '50px' }}/>
                        <img className={classes.img} src={s12} alt="bg-image" width="130px" height="130px" style={{ position: "relative", top: '125px', left: '50px' }}/>
                        <img className={classes.img} src={s14} alt="bg-image" width="60px" height="60px"/> */}
                        <img className={classes.img} src={Group} title="Pets" alt="pets" />
                    </Grid>
                </Grid>
                <Grid container className={classes.serviceSection}>
                    <Grid container sm={6} xs={12} >
                    <h2 style={{color:theme.palette.secondary.main, fontSize: isMobile?'3rem':'5rem'}}>
                        Our Services
                    </h2>
                    <Grid>
                        <p style={{fontWeight:300}}>As a team of experienced Pet owners and lovers,we really get to know you and your pet.</p>
                    <Grid container className={classes.serviceContent}>
                        <ul>
                        <li style={{paddingBottom:10, listStyle: 'none'}}><DoneAllRoundedIcon className={classes.iconColor}/>Avoid the Stress of Travel and Save Time.</li>
                        <li  style={{paddingBottom:10, listStyle: 'none'}}><DoneAllRoundedIcon className={classes.iconColor}/>Highly skilled VET</li>
                        <li  style={{paddingBottom:10, listStyle: 'none'}}><DoneAllRoundedIcon className={classes.iconColor}/>Available from any smartphone.</li>
                        </ul>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid>
                        <img src={s19} width={isMobile?'300px':'400px'} height='auto' title="Best online Veterinary service" alt="Best vet online service" loading="lazy" />
                    </Grid>

                </Grid>
               <Grid container alignItems="center" justifyContent="center" className={classes.appointmentFeature}>
                   <h3 style={{color:'#004372' , fontWeight:'500'}}>With Every Appointment you will Get</h3>
                <Grid container justifyContent="center" alignContent="center" alignItems="center" spacing={2}>
                        <Box className={classes.feature}>
                            <img src={clock} title="20 mins talk with vet" alt="20 mins talk with vet" loading="lazy" />
                            <h4>20 mins with vet</h4>
                        </Box>
                        <Box className={classes.feature}>
                            <img src={prescription} title="online prescription from vet" alt="online prescription" loading="lazy" />
                            <h4>Online Prescription</h4>
                        </Box>
                        <Box className={classes.feature}>
                            <img src={one} title="live one to one interaction with veterinary" alt="live one to one interaction" loading="lazy" />
                            <h4>One to One experience</h4>
                        </Box>
                        
                    </Grid>
               </Grid>
                {/* <Button onClick={handleLogout}>LogOut</Button> */}
                {/* Head Section ended */}

                {/* e-comm cards Section */}
                {/* <EcommSection /> */}
                
                {/* Newsletter subscription */}
                {/* <Newsletter /> */}
                <div className={classes.faqsection}>
                <h2 style={{ color:theme.palette.secondary.main }}>FAQs</h2>
                <FAQs />
                </div>
                <Footer />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={classes.modalDesign}>
                    <img src={s19} width='200px' height='300px' style={{ marginRight: '10px' }}/>
                    <div className={classes.rightPopup}>
                    <p>
                        Get PetC Dog Health Guide FREE of cost. Enter your Email to recieve your own copy on your mail ID
                    </p>
                    {/* <div className={classes.subscribe}> */}
                    <input
                    required
                    placeholder='Enter Email'
                    type="email"
                    value={email} onChange={(e)=>handleChange(e)}
                    className={classes.input}
                    />
                    <Button variant='contained' size='small' sx={{ backgroundColor: theme.palette.primary.main }} onClick={SubscribeToUs}>Subscribe</Button>
                    {/* <p style={{ color:theme.palette.text.main, fontSize: '12px'}}>Subscribe to stay tuned for new updates and discounts!</p> */}
                    {/* </div> */}
                    </div>
                    </Box>
                </Modal>
        </>
     );
}
 
export default Home;