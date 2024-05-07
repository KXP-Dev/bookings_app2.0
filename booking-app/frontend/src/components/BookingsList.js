import React from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
  return new Date(dateString).toLocaleString('en-US', options);
};

const BookingsList = ({ bookings, fetchBookings }) => {

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Booking cancelled');
      fetchBookings(); // Refresh the bookings list
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert('Cancellation failed');
    }
  };

  return (
    <List>
      {bookings.map(booking => (
        <ListItem key={booking._id}>
          <ListItemText primary={booking.activity.name} secondary={`Time: ${formatDate(booking.timeSlot)}`} />
          <Button variant="outlined" color="secondary" onClick={() => cancelBooking(booking._id)}>
            Cancel
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default BookingsList;