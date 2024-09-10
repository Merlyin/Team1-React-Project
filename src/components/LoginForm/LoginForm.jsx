import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations';
import { toast } from 'react-toastify';
import logo from '../../Images/logo.png';

const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters!')
    .max(12, 'Password must be at most 12 characters!')
    .required('Password is required!'),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(basicSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = data => {
    dispatch(loginThunk(data))
      .unwrap()
      .then(res => toast.success(`Welcome ${res.user.username}!`))
      .catch(() => toast.error('Something went wrong!'));
    reset();
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <img src={logo} alt="Money Guard Logo" className={styles.logo} />{' '}
        <form className={styles.loginForm} onSubmit={handleSubmit(submit)}>
          <input
            {...register('email')}
            type="email"
            placeholder="        E-mail"
            className={`${styles.input} ${styles.emailInput}`}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}

          <input
            {...register('password')}
            type="password"
            placeholder="        Password"
            className={`${styles.input} ${styles.passwordInput}`}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </form>
        <button
          type="button"
          className={styles.registerButton}
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
