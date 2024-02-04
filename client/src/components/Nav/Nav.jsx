import React from "react";
import './Nav.css';
import backgroundVideo from '../../assets/videos/backgroundVideo.mp4';
import Button from '../Button/Button';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UserSideBarLeft from "../UserSideBarLeft/UserSideBarLeft";
import OptionsSideBarRight from "../OptionsSideBarRight/OptionsSideBarRight";
import SearchBar from "../SearchBar/SearchBar";
import FiltersBar from "../FiltersBar/FiltersBar";
import { useDispatch, useSelector } from "react-redux";
import { filter, query, randomizeAll } from "../../redux/actions";
export default function Nav() {
  const allCards = useSelector(state => state.allCards);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
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
  };
  const handleRandomizeAll = () => {
    const isHome = pathname === '/home';
    dispatch(randomizeAll(isHome));
    dispatch(query({ query: searchQuery, isHome: isHome }));
    dispatch(filter({ name: '', value: '', isHome: isHome }));
  };

  return (
    <nav className='navBar'>
      <div className='nav-background-video-container' >
        <video src={backgroundVideo} className="nav-background-video" autoPlay muted loop>
        </video>
      </div>
      <div className='options-filters-container' >
        <details>
          <summary>User Options</summary>
          <UserSideBarLeft />
        </details>
        <details className={pathname !== '/home' ? 'no-display' : ''} >
          <summary>Filters</summary>
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
      <details>
        <summary>Options</summary>
        <OptionsSideBarRight />
      </details>
    </nav>
  );
}