/* styles */
import './FavoritesFiltersBar.css';

/* components */
import Select from '../Select/Select';
import { filters, orderBySelect } from '../../config';
import { resetFiltersFavorites, orderCardsFavorites, orderByFavorites, filterFavorites, resetFilterFavorites } from '../../redux/actions';

/* hooks */
import { useDispatch, useSelector } from 'react-redux';

export default function FavoritesFiltersBar() {
    const dispatch = useDispatch();
    const selectedOrder = useSelector(state => state.favorites.selectedOrderFavorites);
    const activeFilterButtons = useSelector(state => state.favorites.selectedFiltersFavorites);
    const isAscending = useSelector(state => state.favorites.isAscendingFavorites);

    const handleOrderChange = (event) => {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
        dispatch(orderByFavorites({ order: value, isAscending: isAscending }));
    }
    const handleOrderDirectionChange = () => {
        console.log(isAscending);
        dispatch(orderCardsFavorites());
        console.log(isAscending);
    }
    const handleAnyButtonClick = (category) => {
        dispatch(resetFilterFavorites(category));
        dispatch(filterFavorites(''));
        dispatch(orderByFavorites({ order: selectedOrder, isAscending: isAscending }));
    }
    const handleFilterButtonClick = (item) => {
        dispatch(filterFavorites(item));
        dispatch(orderByFavorites({ order: selectedOrder, isAscending: isAscending }));
    }

    return (
        <>
            <div className='containerFiltersBar'>
                <div className='first-set-buttons-container'>
                    <div className='reset-button-container' >
                        {/* <label htmlFor='resetButton' className='reset-button-label' >Reset</label> */}
                        <button className='reset-button' onClick={() => { dispatch(resetFiltersFavorites()) }}>Reset Filters</button>
                    </div>
                    <div className='order-by-container' >
                        <div className='order-by-select-container' >
                            <label htmlFor={orderBySelect.title} className='order-by-select-label' >Order By</label>
                            <Select
                                value={selectedOrder}
                                title={orderBySelect.title}
                                options={orderBySelect.options}
                                handleChange={handleOrderChange}
                            />
                        </div>
                        <div className='order-button-container' >
                            {isAscending
                                ? (<button className='order-button' id='orderButtonFavorites' onClick={handleOrderDirectionChange}>⬆️</button>)
                                : (<button className='order-button' id='orderButtonFavorites' onClick={handleOrderDirectionChange}>⬇️</button>)
                            }
                        </div>
                    </div>
                </div>
                {Object.entries(filters).map(([category, items]) => (
                    <div className={`${category}-container`}>
                        <label htmlFor={`Any${category}Button`} className={`${category}-label`} >{category}</label>
                        <div className={`${category}-buttons-container`}>
                            <button className={`Any-${category}-button`} id={`Any${category}Button`} onClick={() => handleAnyButtonClick(category)} >Any</button>
                            {items.map((item, index) => {
                                const buttonClassName = `button-${category} ${activeFilterButtons.includes(item) ? `${category}-active` : ''}`;
                                return (
                                    <button
                                        id={item}
                                        key={`${category}-${index}`}
                                        className={buttonClassName}
                                        onClick={() => handleFilterButtonClick(item)}
                                    >
                                        {item.includes('unknown') ? 'Unknown' : item}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}