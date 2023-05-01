import {  useState } from "react";
import { Button } from '@material-ui/core'
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { LocalizationProvider, TimePicker, DateTimePicker, DesktopDatePicker, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const repeatTypes = ['never', 'hourly', 'daily', 'weekly', 'monthly', 'yearly'];

const Reminder = (props) => {
    const { userData } = props;
    const [open, setOpen] = useState(false);
    const [reminder, setReminder] = useState({
        title: '',
        time: '',
        date: new Date(),
        repeat: 'never',
        note: '',
    });

    function handleChange(e) {
        const {name, value} = e.target
        setReminder({
            ...reminder,
            [name]: value
        })
        console.log(reminder)
    }

  const handleChangeDateTime = (newValue) => {
      setReminder({
          ...reminder,
          date: newValue,
          time: newValue.getTime()
      })
      console.log(reminder)
  };

    const addReminder = () => {
        // Add reminder to database reminder array
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const deleteReminder = (item) =>{
        const reminder = (userData.reminder)?.filter(reminder =>(reminder!==item).map(filteredReminder => filteredReminder))
        // Update database with new list of Reminder
    }

  return <div>
      <h3>My Reminder</h3>
              <div>
                  <h5>2nd July 2:30 pm</h5>
                  <p>reminder title</p>
              </div>
                {(userData.reminder)?.map((item) =>{
                    return (
                    <div>
                  <h5>2nd July 2:30 pm</h5>
                  <p>reminder title</p>
                  <Button onClick={()=>{deleteReminder(item)}}>Delete</Button>
              </div>)})
                }
                <div>
      <Button variant="outlined" onClick={handleClickOpen} color="primary">
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Reminder</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            value={reminder.title}
            name="title"
            onChange={handleChange}
            fullWidth
            variant="standard"
            style={{ marginBottom: '15px' }}
          />
          <DateTimePicker
            label="Date & Time picker"
            value={reminder.date}
            onChange={handleChangeDateTime}
            renderInput={(params) => <TextField {...params} />}
        />
          <TextField
            autoFocus
            margin="dense"
            label="Add Note"
            type="text"
            value={reminder.note}
            name="note"
            onChange={handleChange}
            fullWidth
            multiline
            variant="standard"
          />
          <TextField
          id="standard-select-currency"
          select
          fullWidth
          label="Repeat"
          value={reminder.repeat}
          name='repeat'
          onChange={handleChange}
          variant="standard"
        >
          {repeatTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={addReminder} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>;
};

export default Reminder;
