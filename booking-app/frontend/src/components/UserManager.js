import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Button } from '@mui/material';

const UserManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <List>
      {users.map(user => (
        <ListItem key={user._id}>
          {user.username}
          <Button color="secondary" onClick={() => handleDeleteUser(user._id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default UserManager;