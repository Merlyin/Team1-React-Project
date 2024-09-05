import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className={styles.loginContainer}>
      {' '}
      <div className={styles.loginBox}>
        <h2>Money Guard</h2>
        <form className={styles.loginForm}>
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
          <button
            className={styles.registerButton}
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
