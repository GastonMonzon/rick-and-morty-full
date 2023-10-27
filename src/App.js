/* styles */
import './App.css';

/* components */
import Nav from './components/Nav/Nav';
import UserSideBarLeft from './components/UserSideBarLeft/UserSideBarLeft';
import OptionsSideBarRight from './components/OptionsSideBarRight/OptionsSideBarRight';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import NotFound from './components/NotFound/NotFound';
import { setAllCards } from './redux/actions';

/* hooks */
import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

/* dependecies */
import axios from 'axios';
import Home from './components/Home/Home';

export default function App() {
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   // const [access, setAccess] = useState(false);
   const allCards = useSelector((state) => state.allCards.filteredCards);

   // const EMAIL = 'gastonmonzon3@gmail.com';
   // const PASSWORD = '123456';

   // function login(userData) {
   //    if (userData.email === EMAIL && userData.password === PASSWORD) {
   //       setAccess(true);
   //       navigate('/home');
   //    }
   // }

   // useEffect(() => { // Corre siempre que se cambie página
   //    !access && navigate('/'); // Sí el acceso es falso te redirije a /
   // }, [access, navigate]);

   useEffect(() => {
      const fetchAllCharacters = async () => {
         let allCharacters = [];
         let nextPage = 'https://rickandmortyapi.com/api/character';
         while (nextPage) {
            try {
               const response = await axios(nextPage);
               const { results, info } = response.data;
               allCharacters = [...allCharacters, ...results];
               nextPage = info.next;
            } catch (error) {
               console.log('Error fetching characters:', error);
               break;
            }
         }
         console.log(allCharacters);
         dispatch(setAllCards(allCharacters))
      };
      fetchAllCharacters();
   }, [dispatch]);

   return (
      <div className='app'>
         <div>
            { location.pathname !== '/' && <Nav /> } {/*Si está en / no renderiza Nav*/}
            { location.pathname !== '/' && <UserSideBarLeft /> } {/*Idem*/}
            { location.pathname !== '/' && <OptionsSideBarRight />}
         </div>
         <div>
            {/* { location.pathname === '/home' && <FiltersBar/> } */}
         </div>
         <Routes>
            {/* <Route exact path='/' element={<Form login={login} />} /> */}
            {/* <Route path='/home' element={<Cards characters={allCards} className={cardsPerRow} idView={idView} nameView={nameView}
               statusView={statusView} typeView={typeView} speciesView={speciesView} genderView={genderView} originView={originView}
               locationView={locationView} infoPosition={infoPosition} favoritesIcon={favoritesIcon}
            />} /> */}
            <Route path='/home' element={<Home characters={allCards} />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
      </div>
   );
}