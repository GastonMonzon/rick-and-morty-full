import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState('');
  const [userOptions, setUserOptions] = useState('');

  useEffect(() => {
    (async function onAuthStateChanged() {
      try {
        const { data } = await axios.get('http://localhost:3001/user/change');
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching userInfo:', error);
      }
    })();
  }, []);

  async function createUser(email, password) {
    try {
      return await axios.post('http://localhost:3001/user', { email, password });
    } catch (error) {
      return error;
    }
  }
  const logIn = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:3001/user/login', { email, password });
      setUserInfo(data.user);
      setUserOptions(data.userOptions);
      return data.userOptions;
    } catch (error) {
      return error;
    }
  }
  const changeEmail = async (email, password) => {
    try {
      return await axios.post('http://localhost:3001/user/changeEmail', { previousEmail: userInfo.email, email, password });
    } catch (error) {
      return error;
    }
  }
  const changePassword = async (currentPassword, newPassword) => {
    try {
      return await axios.post('http://localhost:3001/user/changePassword', { email: userInfo.email, currentPassword, newPassword });
    } catch (error) {
      return error;
    }
  }
  const logOut = async () => {
    try {
      await axios.get('http://localhost:3001/user/logout');
      setUserInfo('');
      setUserOptions('');
    } catch (error) {
      return error;
    }
  }
  const authContextValue = { userInfo, userOptions, createUser, logIn, changeEmail, changePassword, logOut };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}