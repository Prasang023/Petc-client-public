// import { Calendar } from "@progress/kendo-react-dateinputs";
import Calendar from 'react-calendar';
import { useEffect, useRef, useState } from "react";
import 'react-calendar/dist/Calendar.css';

const times = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
];

const week = [ 0,1,1,1,0,1,1 ]

const getRandomNumInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const pickSlotTimes = times => {
  // Get a random number that will indicate how many time slots we pick
  const timesToPick = getRandomNumInRange(0, times.length);

  // If the random picked is the maximum possible then return all times
  if (timesToPick === times.length - 1) {
    return times;
  }

  let timesPicked = [];

  // Loop until we have picked specified number of times
  while (timesToPick !== timesPicked.length - 1) {
    // Get a new index and time
    const index = getRandomNumInRange(0, times.length);
    const selectedTime = times[index];
    // If we already picked that time we continue
    // as we don't want duplicated
    if (timesPicked.includes(selectedTime)) continue;
    // Keep the time
    timesPicked.push(selectedTime);
  }

  // We need to sort the times, as they may not be in correct order
  return timesPicked.sort();
};

const BookDrivingSlot = props => {
  console.log(new Date())
  const [bookingDate, setBookingDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);
  const timeSlotCacheRef = useRef(new Map());

  useEffect(() => {
    // Bail out if there is no date selected
    if (!bookingDate) return;
    console.log(bookingDate.toDateString())
    if(!week[bookingDate.getDay()]){
      setBookingTimes([]);
      return;
    }

    // Get time slots from cache
    let newBookingTimes = timeSlotCacheRef.current.get(
      bookingDate.toDateString()
    );
    console.log(newBookingTimes)

    // If we have no cached time slots then pick new ones
    if (!newBookingTimes) {
      newBookingTimes = pickSlotTimes(times);
      // Update cache with new time slots for the selected date
      timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
    }

    setBookingTimes(newBookingTimes);
  }, [bookingDate]);

  const onDateChange = e => {
    setSelectedTimeSlot(null);
    setBookingDate(e);
  };

  return (
    <div>
      <div>Book Vetrinary Appointment</div>

      <div>
        <Calendar value={bookingDate} onChange={onDateChange} minDate={new Date()} />
        <div>
          {bookingTimes.length? bookingTimes.map(time => {
            return (
              <button
                key={time}
                className="k-button k-mb-4"
                onClick={e => setSelectedTimeSlot(time)}
              >
                {time}
              </button>
            )
          }) :
           (
            <p>No slots available</p>
          )}
        </div>
      </div>

      {bookingDate && selectedTimeSlot ? (
        <div>
          Selected slot: {bookingDate.toDateString()} at {selectedTimeSlot}
        </div>
      ) : null}
    </div>
  );
};

export default BookDrivingSlot;
