import React, { useState, useEffect } from 'react';
import { Container, Paper, Tabs, Tab, Typography, Box } from '@mui/material';
import ActivityManager from '../components/ActivityManager';
import UserManager from '../components/UserManager';
import BookingManager from '../components/BookingManager';
import LogoutButton from '../components/LogoutButton';

const AdminPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    // Fetching logic (if needed)
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={6} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>Admin Dashboard</Typography>
        
        <Box display="flex" justifyContent="flex-end">
          <LogoutButton />
        </Box>

        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
          <Tab label="Manage Activities" />
          <Tab label="Manage Users" />
          <Tab label="Manage Bookings" />
        </Tabs>

        {tabIndex === 0 && <ActivityManager />}
        {tabIndex === 1 && <UserManager />}
        {tabIndex === 2 && <BookingManager />}
      </Paper>
    </Container>
  );
};

export default AdminPage;