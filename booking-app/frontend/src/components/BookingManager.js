import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Button } from '@mui/material';

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/bookings/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/bookings/admin/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Failed to delete booking', error);
    }
  };

  return (
    <List>
      {bookings.map(booking => (
        <ListItem key={booking._id}>
          <div>
            <strong>User:</strong> {booking.user ? booking.user.username : 'Unknown User'}
          </div>
          <div>
            <strong>Activity:</strong> {booking.activity ? booking.activity.name : 'Unknown Activity'}
          </div>
          <div>
            <strong>Time Slot:</strong> {new Date(booking.timeSlot).toLocaleString()}
          </div>
          <Button color="secondary" onClick={() => handleDeleteBooking(booking._id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default BookingManager;