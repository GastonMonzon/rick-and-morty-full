import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { filter, orderBy, query } from '../../redux/actions';
import { searchByCheckbox } from '../../config';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const searchQuery = useSelector(state =>
    pathname === '/home'
      ? state.searchQuery
      : state.searchQueryFavorites
  );
  const isAscending = useSelector(state =>
    pathname === '/home'
      ? state.isAscending
      : state.isAscendingFavorites
  );
  const selectedOrder = useSelector(state =>
    pathname === '/home'
      ? state.selectedOrder
      : state.selectedOrderFavorites
  );

  const handleQuery = (value) => {
    const isHome = pathname === '/home';
    dispatch(query({ query: value, isHome: isHome }));
    dispatch(filter({ name: '', value: '', isHome: isHome }));
    dispatch(orderBy({ order: selectedOrder, isAscending: isAscending }));
  }

  const handleCheckboxChange = (event) => {
    const idCheckbox = document.getElementById('idCheckbox');
    const nameCheckbox = document.getElementById('nameCheckbox');
    const originCheckbox = document.getElementById('originCheckbox');
    const locationCheckbox = document.getElementById('locationCheckbox');

    if (!idCheckbox.checked && !nameCheckbox.checked && !originCheckbox.checked && !locationCheckbox.checked) {
      event.target.checked = true;
    }
  }
  const handleQueryReset = (event) => {
    const { id, value } = event.target;
    const isHome = pathname === '/home';
    dispatch(filter({ name: id, value: value, isHome: isHome }));
  }

  return (
    <>
      <div className={`${searchByCheckbox.name}-container`} >
        <Checkbox
          name={searchByCheckbox.name}
          mainTitle={searchByCheckbox.mainTitle}
          titles={searchByCheckbox.titles}
          ids={searchByCheckbox.ids}
          checkedIds={searchByCheckbox.checked}
          handleOptionsSideBarChange={handleCheckboxChange}
        />
      </div>
      <div className='searchBar-container'>
        <input
          type='search'
          id='searchBarQuery'
          placeholder='Search'
          onChange={(event) => handleQuery(event.target.value)}
        />
      </div>
      <button
        className='menu-button reset-query'
        id='resetQueryButton'
        onClick={handleQueryReset} >
        Reset Search
      </button>
    </>
  );
}
