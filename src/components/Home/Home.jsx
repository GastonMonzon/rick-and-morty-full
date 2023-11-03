import './Home.css';
import { searchByCheckbox } from "../../config";
import Cards from "../Cards/Cards";
import FiltersBar from "../FiltersBar/FiltersBar";
import backgroundVideo from '../../images/backgroundVideo.mp4';
import SearchBar from '../SearchBar/SearchBar';
import { queryFunction, resetQuery, orderBy, filter } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home({ characters, extendFiltersBar }) {
    const [query, setQuery] = useState('');
    const [shouldCheckLastUnchecked, setShouldCheckLastUnchecked] = useState(false);
    const [lastUncheckedCheckbox, setLastUncheckedCheckbox] = useState(null);
    const isAscending = useSelector((state) => state.allCards.isAscending);
    const selectedOrder = useSelector((state) => state.allCards.selectedOrder);
    const dispatch = useDispatch();
    const location = useLocation();

    const checkboxRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];
    useEffect(() => {
        checkboxRefs.forEach((checkboxRef) => {
            const checkboxId = checkboxRef.current.id;

            if (searchByCheckbox.checked.includes(checkboxId)) {
                checkboxRef.current.checked = true;
            }
        });
    }, [checkboxRefs]);

    useEffect(() => {
        if (shouldCheckLastUnchecked && lastUncheckedCheckbox) {
            lastUncheckedCheckbox.current.checked = true;
            setShouldCheckLastUnchecked(false);
        }
    }, [shouldCheckLastUnchecked, lastUncheckedCheckbox]);

    const handleCheckboxChange = (checkboxRef, event) => {
        if (!event.target.checked) {
            setLastUncheckedCheckbox(checkboxRef);
        }
        const allUnchecked = Object.values(checkboxRefs).every(
            (ref) => !ref.current.checked
        );
        if (allUnchecked) {
            setShouldCheckLastUnchecked(true);
        }
    };
    const handleQuery = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        const checkedKeys = Object.entries(checkboxRefs) // Convierte checkboxRefs en un arreglo de clave-valor
            .filter(([key, ref]) => ref.current.checked) // Por cada valor filtra si checked no es verdadero
            .map(([key, ref]) => ref.current.id); // Mapea cada clave-valor y devuelve su clave, en este caso cada nombre de los checkboxes
        dispatch(queryFunction({ query: newQuery, checkboxes: checkedKeys }));
        dispatch(filter(''));
        dispatch(orderBy({ order: selectedOrder, isAscending: isAscending }));
    };

    const handleQueryReset = () => {
        dispatch(resetQuery);
        dispatch(filter(''));
    };

    return (
        <div className='home'>
            <div className="home-video-container">
                <video src={backgroundVideo} className="home-background-video" autoPlay muted loop>
                </video>
            </div>
            <details onClick={(event) => extendFiltersBar(event)}>
                <summary>Filters</summary>
                <FiltersBar />
            </details>
            <div className='search-container' >
                <label htmlFor={searchByCheckbox.name} >{searchByCheckbox.mainTitle}</label>
                <div className={`container-${searchByCheckbox.name}`}>
                    {
                        searchByCheckbox.ids.map((id, i) => (
                            <React.Fragment key={id}>
                                <span className={`checkbox-input-label-container ${searchByCheckbox.name}`} >
                                    <input
                                        type="checkbox"
                                        key={id}
                                        name={searchByCheckbox.name}
                                        id={id}
                                        ref={checkboxRefs[i]}
                                        onChange={event => handleCheckboxChange(checkboxRefs[i], event)}
                                    />
                                    <label htmlFor={id} >{searchByCheckbox.titles[i]}</label>
                                </span>
                            </React.Fragment>
                        ))
                    }
                </div>
                <SearchBar query={query} handleQuery={handleQuery} />
                <button className='menu-button reset-query' onClick={handleQueryReset} >Reset Query</button>
            </div>
            {/* {location.pathname === '/favorites' && <SearchBar query={queryFavorites} handleQuery={handleQueryFavorites} />}
                {location.pathname === '/favorites' && <button className='menu-button reset-query-favorites' onClick={handleQueryResetFavorites} >Reset Query</button>} */}
            <Cards characters={characters} />
        </div>
    );
}