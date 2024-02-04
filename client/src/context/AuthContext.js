import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import auth from "./firebase.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState('');

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     setUser(user);
  //   })
  //   return unsubscribe;
  // },[])

  async function createUser(email, password) {
    try {
      return await axios.post('http://localhost:3001/user', { email, password });
    } catch (error) {
      console.error('Error creating new user', error);
    }
  }
  const logIn = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:3001/user/login', { email, password });
      setUser(data);
      console.log(data);
      return data;
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
  const authContextValue = { user, createUser, logIn, logOut };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}