import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth, logout } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.css';
import {
  addTransaction,
  fetchTransactions,
  editTransaction,
  deleteTransaction,
  fetchTransactionCategories,
  fetchTransactionsSummary
} from '../../redux/actions';


const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const transactions = useSelector(state => state.transactions);
  
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      
      <div className={styles.navBar}> 
        <p>{user.username}</p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Exit
        </button>
      </div>
        <div>

          <div className={styles.secondNavigation}>
            <p>Home</p>
            <p>Statistics</p>
          </div>

          <div className={styles.balance}>
            <h4>your balance</h4>
            <h3>0</h3>
          </div>

          <div className={styles.graph}>

          </div>


          <div className={styles.table}>

          </div>
        
      </div>
    </div>
  );
};

export default MainLayout;
