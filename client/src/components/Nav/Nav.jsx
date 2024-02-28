import React, { useRef } from "react";
import './Nav.css';
import Button from '../Button/Button';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UserSideBarLeft from "../UserSideBarLeft/UserSideBarLeft";
import OptionsSideBarRight from "../OptionsSideBarRight/OptionsSideBarRight";
import SearchBar from "../SearchBar/SearchBar";
import FiltersBar from "../FiltersBar/FiltersBar";
import { useDispatch, useSelector } from "react-redux";
import { filter, query, randomizeAll } from "../../redux/actions";
import useDetailsTagAnimations from "../../hooks/useDetailsTagAnimations";
import useBackground from "../../hooks/useBackground";

export default function Nav() {
  const handleDetailsClick = useDetailsTagAnimations();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSideBarRef = useRef(null);
  const optionsSideBarRef = useRef(null);
  const { pathname } = useLocation();
  const allCards = useSelector(state => state.allCards);
  const navBackgroundHome = useSelector((state) => state.homeBackground);
  const navBackgroundFavorites = useSelector((state) => state.favoritesBackground);
  const navBackgroundDetail = useSelector((state) => state.detailBackground);
  const searchQuery = useSelector(state =>
    pathname === '/home'
      ? state.searchQuery
      : state.searchQueryFavorites
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleRandomize = () => {
    const randomId = Math.floor(Math.random() * allCards.length);
    navigate(`/detail/${randomId}`);
  }
  const handleRandomizeAll = () => {
    const isHome = pathname === '/home';
    dispatch(randomizeAll(isHome));
    dispatch(query({ query: searchQuery, isHome: isHome }));
    dispatch(filter({ name: '', value: '', isHome: isHome }));
  }
  const homeBackground = useBackground(navBackgroundHome, 'nav');
  const favoritesBackground = useBackground(navBackgroundFavorites, 'nav');
  const detailBackground = useBackground(navBackgroundDetail, 'nav');
  return (
    <nav className='nav-bar'>
      <div className='nav-background-container' >
        {pathname === '/home'
          ? homeBackground
          : pathname === '/favorites'
            ? favoritesBackground
            : detailBackground}
      </div>
      <div className='options-filters-container' >
        <details id='userOptionsDetailsTag' ref={userSideBarRef} >
          <summary
            id='userOptions'
            onClick={(event) => handleDetailsClick(event, userSideBarRef, 'user-sidebar')} >
            User Options
          </summary>
          <UserSideBarLeft />
        </details>
        <details className={pathname !== '/home' ? 'no-display' : ''} >
          <summary >Filters</summary>
          <FiltersBar />
        </details>
        <details className={pathname !== '/favorites' ? 'no-display' : ''} >
          <summary>Filters</summary>
          <FiltersBar />
        </details>
      </div>
      <NavLink to="/home" >
        <button className="menu-button" onClick={scrollToTop}>
          Home
        </button>
      </NavLink>
      <Button link='/favorites' text='Favorites' />
      <Button link='/about' text='About' />
      <button className='menu-button'
        onClick={handleRandomize} >
        Randomize
      </button>
      <button className={pathname === '/home' || pathname === '/favorites' ? 'menu-button' : 'menu-button invisible'}
        onClick={handleRandomizeAll} >
        Randomize All
      </button>
      {pathname === '/home' && <SearchBar />}
      {pathname === '/favorites' && <SearchBar />}
      {pathname !== '/home' && pathname !== '/favorites' && <div className='searchBar-space-div' ></div>}
      <details id='optionsOptionsDetailsTag' ref={optionsSideBarRef} >
        <summary
          id='optionsOptions'
          onClick={(event) => handleDetailsClick(event, optionsSideBarRef, 'options-sidebar')} >
          Options
        </summary>
        <OptionsSideBarRight />
      </details>
    </nav>
  );
}