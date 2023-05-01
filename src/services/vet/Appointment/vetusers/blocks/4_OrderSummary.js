import Calendar from 'react-calendar';
import { useEffect, useRef, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import firebase from 'firebase';
import { useScrollTrigger } from '@mui/material';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function SaveData(value , age){
  sessionStorage.setItem('bookingDate' , value)
  sessionStorage.setItem('petAge' , age)
}



const useStyles = makeStyles(theme => ({
  small: {
      display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column'
    }
  }
}));





const OrderSummary = () => {
    const [bookingDate, setBookingDate] = useState(new Date((new Date()).valueOf() + 1000*3600*24));
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookingTimes, setBookingTimes] = useState([]);
    const timeSlotCacheRef = useRef(new Map());
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const [slot, setSlot] = useState(['1','0','AM']);

    localStorage.setItem('selectedData' , bookingDate)

    if(window.location.pathname==='/vetService/followup/vetuser')
    var followup = true
    else
    var followup = false

    var previousApp = JSON.parse(localStorage.getItem('previousAppointment'))

    const onDateChange = e => {
      setSelectedTimeSlot(null);
      setBookingDate(e);
      
    };

    const handleChange = (event) => {
      setSlot(event.target.value);
      
    };
    localStorage.setItem('selectedSlot' , slot[0] + ":" + slot[1] + " " + slot[2])

    console.log(bookingDate);
  return (
    <div>
    <div style={{ margin: '20px 0px' }}>
      <h4>Select Appointment Time and Date</h4>

      <div className={classes.small}>
        <Calendar value={bookingDate} 
        onChange ={onDateChange}
        minDate={new Date((new Date()).valueOf() + 1000*3600*24)} />
      </div> 
      <br />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: "5px" }}>
            <label for="HH">HH</label>
            <select name="slotHH" id="HH" onChange={(e) => setSlot([e.target.value, slot[1], slot[2]])} style={{ padding: "5px", borderRadius:'10px', border:'thin solid #ccc',  backgroundColor: 'transparent' }}>
            { Array.from(Array(12), (e, i) => {
                return <option key={i}>{i+1}</option>
              })
            }
            </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: "5px" }}>
            <label for="MM">MM</label>
            <select name="slotMM" id="MM" onChange={(e) => setSlot([slot[0], e.target.value, slot[2]])} style={{ padding: "5px", borderRadius:'10px', border:'thin solid #ccc',  backgroundColor: 'transparent' }}>
            { Array.from(Array(4), (e, i) => {
                return <option key={i}>{i*15}</option>
              })
            }
            </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: "5px" }}>
            <label for="">AM/PM</label>
            <select name="slot" id="AM/PM" onChange={(e) => setSlot([slot[0], slot[1], e.target.value])} style={{ padding: "5px", borderRadius:'10px', border:'thin solid #ccc',  backgroundColor: 'transparent' }}>
              <option>AM</option>
              <option>PM</option>
            </select>
            </div>
            {/* <TextField
              id="outlined-select-currency"
              select
              label="Select Slot"
              name='type'
              value={slot}
              onChange={handleChange}
              helperText="Please select time slot for appointment"
            >
            <MenuItem value={"Morning"}>Morning (9-12)</MenuItem>
            <MenuItem value={"AfterNoon"}>AfterNoon (12-15)</MenuItem>
            <MenuItem value={"Evening"}>Evening (15-18)</MenuItem>
            <MenuItem value={"Nights"}>Night (18-21)</MenuItem>
            </TextField> */}
            {/* <TimePicker /> */}
      </div>
      <h4>{bookingDate ? (bookingDate.toString()).substring(0,16) + " " + slot[0] + ":" + slot[1] + " " + slot[2] : null }</h4>
    </div>

    </div>
  );
}
 
export default OrderSummary;