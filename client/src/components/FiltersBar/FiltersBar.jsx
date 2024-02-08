/* styles */
import './FiltersBar.css';

/* components */
import { filterOptions, orderByOptions } from '../../config';
import { orderDirection, orderBy, filter, randomizeAll, query } from '../../redux/actions';

/* hooks */
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import useBackground from '../../hooks/useBackground';

export default function FiltersBar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isOrderFocused, setIsOrderFocused] = useState(false);
  const filtersBackground = useSelector((state) => state.homeBackground);
  const filtersBackgroundFavorites = useSelector((state) => state.favoritesBackground);
  const selectedOrder = useSelector(state =>
    pathname === '/home'
      ? state.selectedOrder
      : state.selectedOrderFavorites
  );
  const isAscending = useSelector(state =>
    pathname === '/home'
      ? state.isAscending
      : state.isAscendingFavorites
  );
  const selectedFilters = useSelector(state =>
    pathname === '/home'
      ? state.selectedFilters
      : state.selectedFiltersFavorites
  );
  const randomizedCards = useSelector(state =>
    pathname === '/home'
      ? state.randomizedCards
      : state.randomizedFavorites
  );
  const searchQuery = useSelector(state =>
    pathname === '/home'
      ? state.searchQuery
      : state.searchQueryFavorites
  );

  const handleOrderFocus = () => {
    setIsOrderFocused(true);
  }
  const handleOrderBlur = () => {
    setIsOrderFocused(false);
  }
  const handleOrderChange = (event) => {
    const { id } = event.target;
    const isHome = pathname === '/home';
    if (id === 'Random' && randomizedCards.length === 0) {
      dispatch(randomizeAll(isHome));
      dispatch(query({ query: searchQuery, isHome: isHome }));
      dispatch(filter({ name: '', value: '', isHome: isHome }))
    } else {
      dispatch(orderBy({ order: id, isAscending: isAscending, isHome: isHome }));
    }
    setIsOrderFocused(false);
  }
  const handleOrderDirectionChange = () => {
    const isHome = pathname === '/home';
    dispatch(orderDirection(isHome));
  }
  const handleFilterChange = (event) => {
    const { id, value } = event.target;
    const isHome = pathname === '/home';
    dispatch(filter({ name: id, value: value, isHome: isHome }));
    dispatch(orderBy({ order: selectedOrder, isAscending: isAscending, isHome: isHome }));
  }
  const homeBackground = useBackground(filtersBackground, 'filters');
  const favoritesBackground = useBackground(filtersBackgroundFavorites, 'filters');
  return (
    <div className='filters-bar-container' id='filters-bar-container'>
      <div className='filters-background-container' >
        {
          pathname === '/home'
            ? homeBackground
            : favoritesBackground
        }
      </div>
      <div className='first-set-buttons-container'>
        <div className='reset-button-container' >
          <button
            className='reset-button'
            id='resetFiltersButton'
            onClick={handleFilterChange} >
            Reset Filters
          </button>
        </div>
        <div className='order-by-container' >
          <div className='order-by-select-container' >
            <label
              htmlFor={orderByOptions.title}
              className='order-by-select-label' >
              Order By
            </label>
            <button
              className='order-by-button'
              id='selectedOrder'
              onBlur={() => setTimeout(handleOrderBlur, 100)}
              onClick={handleOrderFocus} >
              {selectedOrder}
            </button>
            <div className={`order-by-options-container ${isOrderFocused ? '' : 'invisible'}`}
              key='order-list-container' >
              {orderByOptions.options.map((order) => {
                const orderByClassname = `order-by-options-button ${order === selectedOrder ? 'selected-order' : ''}`;
                return (
                  <div className='order-by-options-button-div' key={order} >
                    <button
                      key={order}
                      id={order}
                      className={orderByClassname}
                      onClick={handleOrderChange} >
                      {order}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='order-button-container' >
            <button className='order-button'
              id='orderButton'
              onClick={handleOrderDirectionChange}>
              {isAscending ? '⬆️' : '⬇️'}
            </button>
          </div>
        </div>
      </div>
      {Object.entries(filterOptions).map(([category, items]) => (
        <div className={`${category}-container`} key={category}>
          <label htmlFor={`Any${category}Button`} className={`${category}-label`}>
            {category}
          </label>
          <div className={`${category}-buttons-container`}>
            <button
              className={`Any-${category}-button`}
              id={`Any${category}Button`}
              onClick={handleFilterChange}
              key={`Any${category}Button`} >
              Any
            </button>
            {items.map((item, index) => {
              const buttonClassName = `button-${category} ${selectedFilters && selectedFilters.includes(item) ? `${category}-active` : ''}`;
              return (
                <button
                  id='filterButton'
                  key={`${category}-${index}`}
                  className={buttonClassName}
                  value={item}
                  onClick={handleFilterChange} >
                  {item.includes('unknown') ? 'Unknown' : item}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
}