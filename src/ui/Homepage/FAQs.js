import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const content = [
    {
        ques:"How to consult a vet online?",
        ans:"For online vet consultation, you must first book an appointment by providing your information, then choose a visit date, time. Our agent will call you for confirmation once you’ve completed the booking procedure. We’ll send you the link for your online visit once we’ve received your confirmation."
    },
    {
        ques:"How long does a pet consultation last?",
        ans:"Upto 20 minutes"
    },
    {
        ques:"Can I get an online Vet prescription?",
        ans:"Yes, you can get an online Vet prescription at your email  and whatsapp after completion of your consultation. The prescription depends on the decision of the doctor. The Vet Doctor can prescribe for simple illness or can advise for tests if required. One should not consult in an emergency."
    },
    {
        ques:"What happens if I cancel my appointment?",
        ans:"If you cancel your appointment, we will provide you with a full refund."
    },
]

const useStyles = makeStyles(theme => ({
    
}));

const FAQs = () => {
const classes = useStyles();
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down(
));

return (
<div style={{ padding: '10px', width:isMobile?'90%':'75%' }}>
{content.map((item)=><Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ fontWeight: 'bold' }}>{item.ques}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {item.ans}
          </Typography>
        </AccordionDetails>
      </Accordion>)}
</div>
)
}

export default FAQs