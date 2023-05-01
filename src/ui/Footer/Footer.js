import React,{useState , useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import firebase from 'firebase'
import logo from '../../assets/images/logos/logo.png'
// import emailjs from 'emailjs-com';

const companySec = [
    {
        title: 'About Us',
        link: '/aboutus'
    },
    // {
    //     title: 'FAQs',
    //     link: '/faq'
    // },
    {
        title: 'Contact Us',
        link: '/contactus'
    },
    {
        title: 'Privacy Policy',
        link: '/privacypolicy'
    },
    {
        title: 'Terms of Use',
        link: '/termsconditions'
    },
    {
        title: 'Payments and Refunds',
        link: '/paymentsrefunds'
    },
]

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      },
      subscribe: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 5px',
        borderBottom: '2px solid white',
        marginBottom: '10px'
      },
      heading: {
        color: theme.palette.primary.main,
        
      },
      input: {
        height: '40px',
        width: '400px',
        backgroundColor: '#E5E7EB',
        borderRadius: '8px',
        padding: '5px 15px',
        [theme.breakpoints.down("xs")]: {
            width: '300px'
        }
      },
      submit: {
        zIndex: 2,
        marginLeft: '-100px',
      },
      side: {
          display: 'flex',
          
          marginTop: '15px',
          paddingLeft: '0px',
      },
      cont: {
          color:'white',
          padding: '10px 30px',
        //   backgroundColor: '#124C5F',
      },
      foot: {
        position: 'relative',
        bottom: '0px',
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
      },
      list: {
          listStyle: 'none',
          paddingLeft: '0px'
      },
      icon: {
        marginRight:'10px', 
        // marginTop:'20px'
      },
      firstblock: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
      },
      end: {
        width: '100%',
        backgroundColor: '#124C5F',
        borderTop: '1px solid #fff',
        display: 'flex',
        justifyContent: 'center',
        color:'white',
      }
  }));

const Footer = () => {

    // const form = useRef()
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const history = useHistory();
    const [email , setemail] = useState('')
    const handleChange = (e) =>{
        setemail(e.currentTarget.value)
    }

    // const SendEmail = () => {
   
    //     // e.preventDefault();
      
    //     emailjs.sendForm('service_0zzlv4w', 'template_sf7kizl', form.current, '1PRmVvutBOmnuQRB5')
    //       .then((result) => {
    //           console.log(result.text);
    //       }, (error) => {
    //           console.log(error.text);
    //       });
    //   };

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
        <div className={classes.foot}>
            <div className={classes.subscribe}>
                <h2 className={classes.heading} style={{ display: isMobile?'none':'block' }}>SUBSCRIBE</h2>
                <div>
                <input
                required
                placeholder='Enter Email'
                type="email"
                value={email} onChange={(e)=>handleChange(e)}
                className={classes.input}
                />
                <Button variant='contained' size='small' sx={{ marginLeft:'-95px', backgroundColor: theme.palette.primary.main }} onClick={SubscribeToUs}>Subscribe</Button>
                <p style={{ color:theme.palette.text.main, fontSize: '12px'}}>Subscribe to stay tuned for new updates and discounts!</p>
                </div>
                
            </div>
            <Grid container className={classes.cont}>
                <Grid xs={12} sm={6} lg={3} className={classes.firstblock}>
                    <div className={classes.side}>
                    <img src={logo} alt='PetC logo' title='PetC logo' style={{width:'80px' , marginRight:'10px', marginTop:'15px'}}/>
                    </div>
                    <div>
                        <Typography >Follow us</Typography>
                        <div>
                            <a href="https://www.instagram.com/wearepetc/" target="_blank" style={{ color:'white' }} ><InstagramIcon color="white" /></a>
                            {/* <a href="https://www.instagram.com/wearepetc/" target="_blank" style={{ color:'white' }}><FacebookIcon color="white"/></a> */}
                            {/* <a href="https://www.instagram.com/wearepetc/" target="_blank" style={{ color:'white' }}><LinkedInIcon color="white" /></a> */}
                            <a href="https://twitter.com/WeArePetC" target="_blank" style={{ color:'white' }}><TwitterIcon color="white"/></a>
                            {/* <GitHubIcon color="white"/> */}
                            <a href="https://t.me/+FxaoKSje3b42ZTE1" target="_blank" style={{ color:'white' }}><TelegramIcon color="white"/></a>
                            <a href="https://wa.me/+919532056028" target="_blank" style={{ color:'white' }}><WhatsAppIcon color="white"/></a>
                        </div>
                    </div>
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                    {/* <h4>More</h4>
                    <ul className={classes.list}>
                        <li>Our Services</li>
                        <li>Blogs</li>
                        <li>Reviews</li>
                        <li>Partnerships</li>
                        <li>Achievements</li>
                    </ul> */}
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                    <h4>Company</h4>
                    <ul className={classes.list}>
                        {companySec.map((item)=>(<li key={item.name} style={{ cursor: 'pointer' }} onMouseOver={(e)=>e.target.style.color=theme.palette.primary.main} onMouseLeave={(e)=>e.target.style.color='white'} onClick={()=>history.push(item.link)} >{item.title}</li>)
                        )}
                        {/* <li>Careeres</li>
                        <li>FAQs</li>
                        <li>Team</li>
                        <li>Contact Us</li> */}
                    </ul>
                </Grid>
                <Grid xs={12} sm={6} lg={3} style={{ alignItems: 'left' }}>
                    <h4>Contact Us</h4>
                    <div className={classes.side}>
                        <LocationOnIcon color="white" className={classes.icon}/>
                        <p>IIIT Surat, SVNIT Campus, Ichchanath, Surat - 395007</p>
                    </div>
                    <div className={classes.side}>
                        <EmailIcon color="white" className={classes.icon}/>
                        <p>support@petc.in</p>
                    </div>
                    <div className={classes.side}>
                        <CallIcon color="white" className={classes.icon}/>
                        <p>+91 95320 56028</p>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.end}>
                <Typography variant="caption">Copyright (c) 2022</Typography> 
            </div>
            {/* <form ref={form} onSubmit={SendEmail}
                style={{display : 'none'}}
                >
                <label>Reciever</label>
                <input type="text" name="to_email" value="somu23401@gmail.com"  />
                <label>Name</label>
                <input type = "text" name="to_name" value="Somu" />
                <label>Link</label>
                <input name="link" value="https://www.petc.in/" />
                
                <input type="submit" defaultValue="Send" />
            </form> */}
        </div>
    )
}

export default Footer
