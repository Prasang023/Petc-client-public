import React from 'react'
import { useTheme } from "@material-ui/core/styles";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from "@material-ui/core/useMediaQuery";

import TextScroller from "./TextScroller";

const Topbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <>
    
    <div style={{ padding: '10px 0px', backgroundColor: theme.palette.primary.dark }}>
        <h4 style={{ color: theme.palette.text.main, textAlign: 'center' }}>Use Coupon Code: <span style={{ color: theme.palette.primary.light }}>FIRST100</span> to get FLAT 100 Rs. OFF on your first appointment!</h4>
    </div>
    <div style={{ width: '100%', padding: '10px 20px', backgroundColor: theme.palette.primary.light, display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ color: theme.palette.secondary.main, display:isMobile?'none':'block' }}>On Petc, book Veterinary appointment on Whatsapp conveniently.</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}><WhatsAppIcon style={{ color: 'green', margin: '0px 10px' }} /><h4 style={{ color: theme.palette.secondary.main}}>
        <a href='https://wa.me/+919532056028' style={{ textDecoration:'none', color: theme.palette.secondary.main }}>
        +91 95320 56028
        </a>
        </h4></div>
    </div>
    </>
  )
}

export default Topbar