import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { filter, orderBy, query, queryCheckboxes } from '../../redux/actions';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getSearchOptions } from '../../config';
import { useEffect, useState } from 'react';

export default function SearchBar({ isHome }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { userOptions } = useAuth();
  const [renderKey, setRenderKey] = useState(0);
  const [renderKeyF, setRenderKeyF] = useState(0);
  const searchByCheckbox = getSearchOptions(userOptions);
  const areSearchSettingsChanged = useSelector(state => state.areSearchSettingsChanged);
  const searchQuery = useSelector(state =>
    isHome
      ? state.searchQuery
      : state.searchQueryFavorites
  );
  const isAscending = useSelector(state =>
    isHome
      ? state.isAscending
      : state.isAscendingFavorites
  );
  const selectedOrder = useSelector(state =>
    isHome
      ? state.selectedOrder
      : state.selectedOrderFavorites
  );

  useEffect(() => {
    if (!areSearchSettingsChanged) {
      if (isHome) {
        setRenderKey(prevKey => prevKey + 1);
      } else {
        setRenderKeyF(prevKey => prevKey + 1);
      }
    }
  }, [areSearchSettingsChanged]);

  const handleCheckboxChange = (id, checked) => {
    let idCheckbox;
    let nameCheckbox;
    let originCheckbox;
    let locationCheckbox;
    if (isHome) {
      idCheckbox = document.getElementById('idCheckbox');
      nameCheckbox = document.getElementById('nameCheckbox');
      originCheckbox = document.getElementById('originCheckbox');
      locationCheckbox = document.getElementById('locationCheckbox');
    } else {
      idCheckbox = document.getElementById('idCheckboxF');
      nameCheckbox = document.getElementById('nameCheckboxF');
      originCheckbox = document.getElementById('originCheckboxF');
      locationCheckbox = document.getElementById('locationCheckboxF');
    }
    if (!idCheckbox.checked && !nameCheckbox.checked && !originCheckbox.checked && !locationCheckbox.checked) {
      const lastUnchecked = document.getElementById(id);
      lastUnchecked.checked = true;
      return;
    }
    dispatch(queryCheckboxes({ name: id, isChecked: checked, isHome: isHome }));
    dispatch(query({ query: searchQuery, isHome: isHome }));
    dispatch(filter({ name: '', value: '', isHome: isHome }));
    dispatch(orderBy({ order: selectedOrder, isHome: isHome, isAscending: isAscending }));
  }
  const handleQuery = (value) => {
    dispatch(query({ query: value, isHome: isHome }));
    dispatch(filter({ name: '', value: '', isHome: isHome }));
    dispatch(orderBy({ order: selectedOrder, isHome: isHome, isAscending: isAscending }));
  }
  const handleQueryReset = (event) => {
    const { id, value } = event.target;
    dispatch(filter({ name: id, value: value, isHome: isHome }));
    dispatch(orderBy({ order: selectedOrder, isHome: isHome, isAscending: isAscending }));
  }
  const renderSearchBar = (isHome) => {
    if (isHome) {
      return (
        <>
          <div className={`${searchByCheckbox.name}-container ${pathname !== '/home' ? 'no-display' : ''}`} 
          key={renderKey} >
            <Checkbox
              name={searchByCheckbox.name}
              mainTitle={searchByCheckbox.mainTitle}
              titles={searchByCheckbox.titles}
              ids={searchByCheckbox.ids}
              checkedIds={searchByCheckbox.checked}
              handleChange={handleCheckboxChange}
            />
          </div>
          <div className={`searchBar-container ${pathname !== '/home' ? 'no-display' : ''}`}>
            <input
              type='search'
              id='searchBarQuery'
              placeholder='Search'
              value={searchQuery}
              onChange={(event) => handleQuery(event.target.value)}
            />
          </div>
          <button
            className={`menu-button reset-query ${pathname !== '/home' ? 'no-display' : ''}`}
            id='resetQueryButton'
            onClick={handleQueryReset} >
            Reset Search
          </button>
        </>
      )
    } else {
      return (
        <>
          <div className={`${searchByCheckbox.name}-container ${pathname !== '/favorites' ? 'no-display' : ''}`} 
          key={renderKeyF} >
            <Checkbox
              name={searchByCheckbox.name}
              mainTitle={searchByCheckbox.mainTitle}
              titles={searchByCheckbox.titles}
              ids={searchByCheckbox.idsF}
              checkedIds={searchByCheckbox.checkedFavorites}
              handleChange={handleCheckboxChange}
            />
          </div>
          <div className={`searchBar-container ${pathname !== '/favorites' ? 'no-display' : ''}`}>
            <input
              type='search'
              id='searchBarQuery'
              placeholder='Search'
              value={searchQuery}
              onChange={(event) => handleQuery(event.target.value)}
            />
          </div>
          <button
            className={`menu-button reset-query ${pathname !== '/favorites' ? 'no-display' : ''}`}
            id='resetQueryButton'
            onClick={handleQueryReset} >
            Reset Search
          </button>
        </>
      )
    }
  }

  return (
    <>
      {renderSearchBar(isHome)}
    </>
  );
}
