// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/auth/user', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
