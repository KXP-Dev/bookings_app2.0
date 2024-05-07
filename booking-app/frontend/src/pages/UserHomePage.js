import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, List, ListItem, Box } from '@mui/material';
import BookingForm from '../components/BookingForm';
import BookingsList from '../components/BookingsList';
import LogoutButton from '../components/LogoutButton';

const UserHomePage = () => {
  const [activities, setActivities] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Failed to fetch activities', error);
      }
    };

    fetchActivities();
    fetchBookings();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={6} sx={{ p: 3, mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Your Dashboard</Typography>
          <LogoutButton />
        </Box>
        <div>
          <Typography variant="h6">Book an Activity</Typography>
          <BookingForm activities={activities} />
        </div>
        <div>
          <Typography variant="h6">Available Activities</Typography>
          <List>
            {activities.map(activity => (
              <ListItem key={activity._id}>{activity.name}</ListItem>
            ))}
          </List>
        </div>
        <div>
          <Typography variant="h6">Your Bookings</Typography>
          <BookingsList bookings={bookings} fetchBookings={fetchBookings} />
        </div>
      </Paper>
    </Container>
  );
};

export default UserHomePage;