/* styles */
import './FiltersBar.css';

/* components */
import { filterOptions, getOrderOptions } from '../../config';
import { orderDirection, orderBy, filter, randomizeAll, query } from '../../redux/actions';

/* hooks */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useBackground from '../../hooks/useBackground';
import { useAuth } from '../../context/AuthContext.js';

export default function FiltersBar({ isHome }) {
  const dispatch = useDispatch();
  const { userOptions } = useAuth();
  const [renderKey, setRenderKey] = useState(0);
  const [isOrderFocused, setIsOrderFocused] = useState(false);
  const filtersBackground = useSelector((state) => state.homeBackground);
  const filtersBackgroundFavorites = useSelector((state) => state.favoritesBackground);
  const areFilterSettingsChanged = useSelector(state => state.areFilterSettingsChanged);
  const selectedOrder = useSelector(state =>
    isHome
      ? state.selectedOrder
      : state.selectedOrderFavorites
  );
  const isAscending = useSelector(state =>
    isHome
      ? state.isAscending
      : state.isAscendingFavorites
  );
  const selectedFilters = useSelector(state =>
    isHome
      ? state.selectedFilters
      : state.selectedFiltersFavorites
  );
  const randomizedCards = useSelector(state =>
    isHome
      ? state.randomizedCards
      : state.randomizedFavorites
  );
  const searchQuery = useSelector(state =>
    isHome
      ? state.searchQuery
      : state.searchQueryFavorites
  );

  useEffect(() => {
    if (!areFilterSettingsChanged) {
      setRenderKey(prevKey => prevKey + 1);
    }
  }, [areFilterSettingsChanged]);

  const handleOrderFocus = () => {
    setIsOrderFocused(true);
  }
  const handleOrderBlur = () => {
    setIsOrderFocused(false);
  }
  const handleOrderChange = (event) => {
    const { id } = event.target;
    if ((id === 'Random'  || id === 'RandomF') && randomizedCards.length === 0) {
      dispatch(randomizeAll(isHome));
      dispatch(query({ query: searchQuery, isHome: isHome }));
      dispatch(filter({ name: '', value: '', isHome: isHome }))
    } else {
      dispatch(orderBy({ order: id, isAscending: isAscending, isHome: isHome }));
    }
    setIsOrderFocused(false);
  }
  const handleOrderDirectionChange = () => {
    dispatch(orderDirection(isHome));
  }
  const handleFilterChange = (event) => {
    const { id, value } = event.target;
    dispatch(filter({ name: id, value: value, isHome: isHome }));
    dispatch(orderBy({ order: '', isAscending: isAscending, isHome: isHome }));
  }
  const homeBackground = useBackground(filtersBackground, 'filters');
  const favoritesBackground = useBackground(filtersBackgroundFavorites, 'filters');

  return (
    <div className='filters-bar-container' id='filters-bar-container' key={renderKey}>
      <div className='filters-background-container' >
        {
          isHome
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
              className='order-by-select-label' >
              {getOrderOptions(userOptions)?.title}
            </label>
            <button
              className='order-by-button'
              id='selectedOrder'
              onBlur={() => setTimeout(handleOrderBlur, 100)}
              onClick={handleOrderFocus} >
              {selectedOrder.slice(0, -1)}
            </button>
            <div className={`order-by-options-container ${isOrderFocused ? '' : 'invisible'}`}
              key='order-list-container' >
              {isHome 
              ? getOrderOptions(userOptions)?.options.map((order) => {
                return (
                  <div className='order-by-options-button-div' key={order} >
                    <button
                      key={order}
                      id={order}
                      className={`order-by-options-button ${order === selectedOrder ? 'selected-order' : ''}`}
                      onClick={handleOrderChange} >
                      {order}
                    </button>
                  </div>
                );
              })
            : getOrderOptions(userOptions)?.options.map((order) => {
              return (
                <div className='order-by-options-button-div' key={order} >
                  <button
                    key={order + 'F'}
                    id={order + 'F'}
                    className={`order-by-options-button ${order + 'F' === selectedOrder + 'F' ? 'selected-order' : ''}`}
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