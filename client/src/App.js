/* styles */
import './App.css';

/* components */
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import LoginRegister from './components/LoginRegister/LoginRegister';
import Favorites from './components/Favorites/Favorites';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import NotFound from './components/NotFound/NotFound';
import { setAllCards, setAllValues } from './redux/actions';
import { AuthProvider, useAuth } from './context/AuthContext';

/* hooks */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

/* dependecies */
import axios from 'axios';

export default function App() {
  const dispatch = useDispatch();
  const { userOptions, setCurrentUser } = useAuth();

  useEffect(() => {
    (async function fetchCharacters() {
      try {
        const { data } = await axios('http://localhost:3001/characters');
        dispatch(setAllCards(data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async function fetchCurrentUser() {
      try {
        const data = await setCurrentUser();
        dispatch(setAllValues(data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!userOptions) {
    return (
      <Routes>
        <Route path='/' element={<LoginRegister />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  } else {
    return (
      <div className='app'>
        <Nav />
        <AuthProvider>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    );
  }
}