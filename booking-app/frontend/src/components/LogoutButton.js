import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage or context state
    localStorage.removeItem('token'); // If you're using localStorage for token management

    // Add any other cleanup logic here, if necessary

    // Redirect to the login or home page
    navigate('/login'); // Change to your login or home page route
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;