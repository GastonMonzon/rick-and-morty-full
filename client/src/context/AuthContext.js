import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userOptions, setUserOptions] = useState('');

  useEffect(() => {
    (async function onAuthStateChanged() {
      try {
        await axios.get('http://localhost:3001/user/change');
      } catch (error) {
        console.error('Error fetching userInfo:', error);
      }
    })();
  }, []);

  async function createUser(registerData) {
    try {
      return await axios.post('http://localhost:3001/user', registerData );
    } catch (error) {
      throw error;
    }
  }
  const logIn = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:3001/user/login', { email, password });
      setUserOptions(data.userOptions);
      return data.userOptions;
    } catch (error) {
      throw error;
    }
  }
  const changeEmail = async (email, password) => {
    try {
      return await axios.post('http://localhost:3001/user/changeEmail', { email, password });
    } catch (error) {
      throw error;
    }
  }
  const changePassword = async (currentPassword, newPassword) => {
    try {
      return await axios.post('http://localhost:3001/user/changePassword', { currentPassword, newPassword });
    } catch (error) {
      throw error;
    }
  }
  const logOut = async () => {
    try {
      await axios.get('http://localhost:3001/user/logout');
      setUserOptions('');
    } catch (error) {
      throw error;
    }
  }
  const authContextValue = { userOptions, createUser, logIn, changeEmail, changePassword, logOut };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}