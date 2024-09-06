import axios from 'axios';

const API_URL = 'https://wallet.b.goit.study/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const signInUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/sign-in', { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server error' };
  }
};

export const signUpUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post('/auth/sign-up', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server error' };
  }
};
