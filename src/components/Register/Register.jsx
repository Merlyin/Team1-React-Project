import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.registerContainer}>
      {' '}
      <div className={styles.registerBox}>
        <h2>Money Guard</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm password" required />
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
        <button className={styles.loginButton} onClick={handleLoginClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Register;
