import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const BookingForm = ({ activities }) => {
  const [bookingData, setBookingData] = useState({
    activityId: '',
    timeSlot: ''
  });

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Booking successful!');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl fullWidth>
          <InputLabel id="activity-label">Activity</InputLabel>
          <Select
            labelId="activity-label"
            value={bookingData.activityId}
            onChange={handleChange}
            name="activityId"
            label="Activity"
          >
            {activities.map(activity => (
              <MenuItem key={activity._id} value={activity._id}>{activity.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          label="Time Slot"
          type="datetime-local"
          name="timeSlot"
          value={bookingData.timeSlot}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Book Activity</Button>
      </Box>
    </form>
  );
};

export default BookingForm;