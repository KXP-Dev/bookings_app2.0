import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActivityManager = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: '', description: '', duration: 0, price: 0 });
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/activities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivities(response.data);
    } catch (error) {
      console.error('Failed to fetch activities', error);
    }
  };

  const handleAddActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/activities', 
        newActivity,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setActivities([...activities, response.data]);
      setNewActivity({ name: '', description: '', duration: 0, price: 0 });
    } catch (error) {
      console.error('Failed to add activity', error);
    }
  };

  const handleUpdateActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/activities/${editingActivity._id}`, 
        editingActivity,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchActivities();
      setEditingActivity(null);
    } catch (error) {
      console.error('Failed to update activity', error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/activities/${activityId}`, 
          { headers: { Authorization: `Bearer ${token}` }}
        );
        fetchActivities();
      } catch (error) {
        console.error('Failed to delete activity', error);
      }
    }
  };

  return (
    <div>
      <TextField label="Name" value={newActivity.name} onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })} />
      <TextField label="Description" value={newActivity.description} onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })} />
      <TextField label="Duration" type="number" value={newActivity.duration} onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })} />
      <TextField label="Price" type="number" value={newActivity.price} onChange={(e) => setNewActivity({ ...newActivity, price: e.target.value })} />
      <Button onClick={handleAddActivity}>Add Activity</Button>

      {editingActivity && (
        <div>
          <TextField label="Name" value={editingActivity.name} onChange={(e) => setEditingActivity({ ...editingActivity, name: e.target.value })} />
          <TextField label="Description" value={editingActivity.description} onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })} />
          <TextField label="Duration" type="number" value={editingActivity.duration} onChange={(e) => setEditingActivity({ ...editingActivity, duration: e.target.value })} />
          <TextField label="Price" type="number" value={editingActivity.price} onChange={(e) => setEditingActivity({ ...editingActivity, price: e.target.value })} />
          <Button onClick={handleUpdateActivity}>Update Activity</Button>
        </div>
      )}

      <List>
        {activities.map(activity => (
          <ListItem key={activity._id}>
            {activity.name}
            <IconButton onClick={() => setEditingActivity(activity)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDeleteActivity(activity._id)}><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ActivityManager;