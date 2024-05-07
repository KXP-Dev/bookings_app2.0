import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SignUpComponent = ({ onSignUp }) => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Username" name="username" onChange={handleChange} fullWidth />
      <TextField label="Email" name="email" onChange={handleChange} fullWidth />
      <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth />
      <Button type="submit" variant="contained">Sign Up</Button>
    </form>
  );
};

export default SignUpComponent;