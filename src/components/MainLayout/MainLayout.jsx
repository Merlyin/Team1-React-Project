import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default MainLayout;
