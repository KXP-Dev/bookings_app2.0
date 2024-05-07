import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const LoginComponent = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Username" name="username" onChange={handleChange} fullWidth />
      <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth />
      <Button type="submit" variant="contained">Login</Button>
    </form>
  );
};

export default LoginComponent;