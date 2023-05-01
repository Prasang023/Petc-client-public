import {  useState, useEffect } from "react";
import firebase from "firebase"
import Avatar from '@mui/material/Avatar';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles(theme => ({
  small: {
      display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column'
    }
  }
}));

const types = [
  {
    value: 'Companion Animal Veterinarians',
    desc: 'This is the most common type of veterinarian. Companion animal veterinarians specialize in the care of small animals like cats, dogs, and some pocket pets. They are called General Practitioners and would be the equivalent of your family doctor. They’re qualified and trained to provide most types of care to pets including medical and surgical services, diagnostics, and treatments.',
  },
  {
    value: 'Veterinary Specialists',
    desc: 'If companion animal veterinarians are the General Practitioners of human medicine, then veterinary specialists are the Orthopedic Surgeons and Oncologists of veterinary medicine. Veterinarians can choose to specialize in any of over 20 recognized fields of study, including cardiology, dentistry, anesthesiology and more. In order to become certified or boarded in any specialty field, these veterinarians undergo advanced training in post-veterinary school programs.',
  },
  {
    value: 'Exotic Animal Veterinarians',
    desc: 'These veterinarians are specially trained or have a special interest in caring for exotic animals including pocket pets, reptiles, amphibians, and birds. Some exotic animal veterinarians treat pets while others treat animals at a zoo or other wildlife habitats. Some of them also obtain additional training to become an exotic animal specialist.',
  },
  {
    value: 'Livestock, Food, and Large Animal Veterinarians',
    desc: 'These veterinarians focus on the care of large animals and livestock such as horses, cattle, sheep, pigs, and goats. They’re trained specifically to meet the needs of these types of farm animals. Some large animal veterinarians work at a Large Animal Veterinary Hospital while most others travel around in a specially-equipped vehicle to see their patients where they live.',
  },
  {
    value: 'Laboratory Veterinarians',
    desc: 'There are many other veterinarians who work behind the scenes in fields such as infectious disease diagnosis, pathology, animal feed production, pharmacology research and many more. These veterinarians are not as visible to the public but are vital for the well-being of all animals.',
  },
];


const VetDetails = () => {
  if(window.location.pathname==='/vetService/followup/vetuser')
    var followup = true
    else
    var followup = false

    var previousApp = JSON.parse(localStorage.getItem('previousAppointment'))

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [data, setData] = useState({
    type: followup?previousApp.vetType:'',
    pincode: followup?previousApp.pincode:'',
    desc: ''
  })
  
  localStorage.setItem('desc', data.desc);
  localStorage.setItem('vetype', data.type);
  localStorage.setItem('prefferedLoc', data.pincode);

  // console.log(location)
  // console.log(desc)
  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target
    setData({
      ...data,
      [name] : value
    })
  };
    return ( 
        <div>
           <div className={classes.small}>
               <div>
                    <h4 style={{margin:'5px 10px'}}></h4>
                    <div>
                        <div style={{display:'flex' , flexDirection:'column'}}>
                        <TextField
                        id="outlined-select-currency"
                        select
                        fullWidth
                        disabled={followup}
                        label="Vet Category"
                        name='type'
                        value={data.type}
                        onChange={handleChange}
                        helperText="Please select a category"
                      >
                        {types.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                      <div style={{ margin: '3px', padding: '6px 6px', color: '#717171', borderRadius: '5px' }}>{
                        types.map((option) => (
                          option.value === data.type ? option.desc : null
                        ))
                      }</div>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Description (Pet problem)"
                        multiline
                        fullWidth
                        disabled={false}
                        maxRows={4}
                        value={data.desc}
                        name="desc"
                        onChange={handleChange}
                        style={{ margin: '10px 0px' }}
                      />
                      <TextField
                        required
                        disabled={followup}
                        id="outlined-required"
                        label="Pincode"
                        value={data.pincode}
                        onChange={handleChange}
                        name="pincode"
                      />

                        </div>
                    </div>
               </div>
           </div>
        </div>
     );
}
 
export default VetDetails;