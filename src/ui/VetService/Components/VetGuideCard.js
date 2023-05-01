import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@material-ui/core';

const VetGuideCard = (props) => {
    return (
        <Card elevation='5' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width:'100%' , minHeight:'140px' , maxWidth: "450px", marginLeft: '15px', marginRight: '15px', borderRadius: '15px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '10px' , marginLeft:'10px'}}>
                    <img src={props.icon} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column',}}>
                    <h3 style={{fontFamily: 'Poppins',}}>
                        {props.headLine}
                    </h3>
                    <p style={{fontFamily: 'Poppins',}}>
                        {props.desc}
                    </p>
                    </CardContent>
                </Box>
                
        </Card>
    )
}

export default VetGuideCard
