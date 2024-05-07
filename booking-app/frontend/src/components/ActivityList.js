import React from 'react';

const ActivityList = ({ activities }) => {
  return (
    <div>
      {activities.map(activity => (
        <div key={activity._id}>
          <h3>{activity.name}</h3>
          {/* Add other activity details here */}
        </div>
      ))}
    </div>
  );
};

export default ActivityList;