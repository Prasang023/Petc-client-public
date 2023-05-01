import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Helmet from "react-helmet";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Header from "../../ui/Header/matnavbar";
import Footer from "../../ui/Footer/Footer";

const blogList = [
    {
        "title": "HELLO",
        "content": "yes hello world",
    },
    {
        "title": "HELLO",
        "content": "yes hello world",
    }
]

const useStyles = makeStyles(theme => ({
    topBanner:{
        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    blogSection:{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px',
    }

}));

const Bloglist = () => {
const classes = useStyles();
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down(
));

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
<Header />
<section className={classes.topBanner}>
    <h1>Blogs</h1>
    <h3>Best useful tips for Pet Parents.</h3>
</section>
<section className={classes.blogSection}>
{blogList.map((item)=>{
    return (<Card sx={{ maxWidth: 345, margin:'15px' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <h2>
          Lizard
        </h2>
        <p style={{ color: theme.palette.text.secondary }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </p>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">More</Button>
      </CardActions>
    </Card>)
})}
</section>
<Footer />
</>
)
}

export default Bloglist