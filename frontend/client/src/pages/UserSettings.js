// src/pages/UserSettings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSettings = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/auth/user', {
          headers: {
            'x-auth-token': token,
          },
        });
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUserData();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('/api/auth/user', formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Profile updated successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UserSettings;
