import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Tabs, Tab, Box, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '', firstName: '', lastName: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setError('');
    setCredentials({ username: '', password: '', email: '', firstName: '', lastName: '' });
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = tabIndex === 0 ? 'login' : 'register';
      const response = await axios.post(`http://localhost:5000/api/users/${endpoint}`, credentials);
      if (endpoint === 'login') {
        login(response.data.user, response.data.token);
        const redirectTo = response.data.user.isAdmin ? '/admin' : '/dashboard';
        navigate(redirectTo);
      } else {
        setTabIndex(0);
        setError('');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to authenticate.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 3, mt: 8, mb: 4 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          {tabIndex === 0 ? 'Login' : 'Register'}
        </Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            onChange={handleChange}
            fullWidth
            margin="normal"
            value={credentials.username}
            autoFocus
          />
          {tabIndex === 1 && (
            <>
              <TextField
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                fullWidth
                margin="normal"
                value={credentials.email}
              />
              <TextField
                label="First Name"
                name="firstName"
                onChange={handleChange}
                fullWidth
                margin="normal"
                value={credentials.firstName}
              />
              <TextField
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                fullWidth
                margin="normal"
                value={credentials.lastName}
              />
            </>
          )}
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            fullWidth
            margin="normal"
            value={credentials.password}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
            {tabIndex === 0 ? 'Login' : 'Register'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthPage;