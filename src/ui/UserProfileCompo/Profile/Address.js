import {  useState } from "react";
import { Button } from '@material-ui/core'
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const Address = (props) => {
    const { userData } = props;
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState({
        name: '',
        houseno: '',
        area:'',
        city:'',
        landmark:'',
        state:'',
        pincode:'',
    });

    function handleChange(e) {
        const {name, value} = e.target
        if(name === 'pincode'){
            let x=String(value)
            if(isNaN(x.charAt((x.length) - 1)) )
            return;
        }
        setAddress({
            ...address,
            [name]: value
        })
    }

    const addAddress = () => {
        // Add address to database address array
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const deleteAddress = (item) =>{
        const address = (userData.address)?.filter(address =>(address!==item).map(filteredAddress => filteredAddress))
        // Update database with new list of addresses
    }

  return <div>
      <h3>My Addresses</h3>
              <p>222/13<br/>area<br/>city<br/>pincode</p>
                {(userData.address)?.map((item) =><div>
                <p>{item.name}</p>
                  <p>{item.houseno}<br/>{item.area}<br/>{item.city}<br/>{item.pincode}</p>
                  <Button onClick={()=>{deleteAddress(item)}}>Delete</Button>
                </div>)}
                <div>
      <Button variant="outlined" onClick={handleClickOpen} color="primary">
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Address Line 1(House no.)"
            type="text"
            value={address.houseno}
            name="houseno"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Address Line 2(Area)"
            type="text"
            value={address.area}
            name="area"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Landmark"
            type="text"
            value={address.landmark}
            name="landmark"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="City"
            type="text"
            value={address.city}
            name="city"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="State"
            type="text"
            value={address.state}
            name="state"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Pincode"
            type="text"
            value={address.pincode}
            name="pincode"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={addAddress} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>;
};

export default Address;
