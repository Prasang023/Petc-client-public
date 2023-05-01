import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    
  }));

const ServiceCard = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    function handleClick(link) {
        if(link !== '/vetService/vetDetail'){
            var win = window.open(link, '_blank');
            win.focus();
        }
        history.push(link);
      }

    return (
        
        <a href={props.link} style={{ textDecoration:'none', maxWidth: '450px', width: '100%' }}>
        <Card elevation='5' 
        
        // onClick={()=>handleClick(props.link)}
        className={classes.card}
         sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center', width:'100%' , height:'100px' , maxWidth: "450px", margin: '10px 10px', cursor: 'pointer'}}>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '10px' , marginLeft:'10px'}}>
                    <img src={props.icon} alt="Veterinary services" title="Veterinary services" height='70px' width='auto' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                    {/* <CardContent > */}
                    <h3 component="div" variant="h6" style={{fontFamily: 'Poppins', color: theme.palette.primary.main}}>
                        {props.headLine}
                    </h3>
                    <Typography variant="subtitle1" color="text.secondary" component="div" style={{fontFamily: 'Poppins',}} color='secondary'>
                        {props.desc}
                    </Typography>
                    {/* </CardContent> */}
                </Box>
                
        </Card>
        </a>
        
    )
}

export default ServiceCard
