import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import auth from "./firebase.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState('');
  const [userOptions, setUserOptions] = useState('');

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(userInfo => {
    //   setUserInfo(userInfo);
    // })
    // return unsubscribe;
    (async function onAuthStateChanged() {
      try {
        const { data } = await axios.get('http://localhost:3001/change');
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
      console.error('Error creating new userInfo', error);
    }
  }
  const logIn = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:3001/user/login', { email, password });
      setUserInfo(data.user);
      setUserOptions(data.userOptions);
      return data.userOptions;
    } catch (error) {
      console.error('Error loging in:', error);
    }
  }
  const logOut = async (email, password) => {
    try {
      await axios.get('http://localhost:3001/user/logout');
    } catch (error) {
      console.error('Error loging out:', error);
    }
  }
  const authContextValue = { userInfo, userOptions, createUser, logIn, logOut };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}