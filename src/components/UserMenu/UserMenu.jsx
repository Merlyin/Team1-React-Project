import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions';
import { useAuth } from '../../auth/useAuth';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const { isLoggedIn, user } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      window.location.href="/goit-react-hw-08-phonebook";
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div>
      <nav className={css.navigationMenu}>
      {isLoggedIn && <p>{user.user.email}</p>}
      {isLoggedIn && <button className={css.button2} onClick={handleLogout}>Logout</button>}
      </nav>
    </div>
  );
};