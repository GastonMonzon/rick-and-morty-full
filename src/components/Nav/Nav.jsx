import React, { useEffect, useRef, useState } from "react";
import styles from './Nav.module.css';
import SearchBar from "../SearchBar/SearchBar";
import Button from '../Button/Button';
import { searchByCheckbox } from "../../config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { randomizeAll, queryFunction, resetQuery, orderBy, filter } from "../../redux/actions";

export default function Nav() {

    const [randomId, setRandomId] = useState(null);
    const [query, setQuery] = useState('');
    const [shouldCheckLastUnchecked, setShouldCheckLastUnchecked] = useState(false);
    const [lastUncheckedCheckbox, setLastUncheckedCheckbox] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allCards = useSelector((state) => state.allCards.filteredCards);
    const selectedOrder = useSelector((state) => state.allCards.selectedOrder);
    const isAscending = useSelector((state) => state.allCards.isAscending);
    const checkboxRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];
    useEffect(() => {
        if (randomId) { // Cuando hay un cambio en el estado de randomId
            navigate(`/detail/${randomId}`); // Navega a la página
        }
        setRandomId(null); // Setea el estado a null para que no redirija a la página al volver atras
    }, [randomId, navigate]);

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
    
    const handleRandomizeAll = () => {
        const randomizedCards = [...allCards]; // Crea una copia de allCards
        for (let i = randomizedCards.length - 1; i > 0; i--) { // Algoritmo Fisher-Yates para mezclar aleatoriamente los valores en el arreglo
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedCards[i], randomizedCards[j]] = [randomizedCards[j], randomizedCards[i]];
        }
        console.log(randomizedCards);
        dispatch(randomizeAll(randomizedCards));
    };
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
    const handleRandomize = async () => {
        let isValidId = false;
        let newRandomId;
        while (!isValidId) {
            newRandomId = Math.floor(Math.random() * 826) + 1; // Genera un número aleatorio entre 1 y 826 (cantidad de ids)
            isValidId = await validateRandomId(newRandomId); // Devuelve verdadero o falso si la página existe o no
        }
        setRandomId(newRandomId); // Actualiza el estado de randomId
    };
    const validateRandomId = async (id) => { // Los await son para esperar a que fetchee o modifique toda la data 
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`); // Devuelve un objeto de respuesta en forma de promesa 
        const data = await response.json(); // Pasa la respuesta a JSON y devuelve otra promesa 
        return data !== null; // Si data existe devuelve verdadero o falso si no
    };
    const handleQueryReset = () => {
        dispatch(resetQuery);
        dispatch(filter(''));
    };

    return (
        <nav className={styles.navBar}>
            <Button text='Login' />
            <Button link='/home' text='Home' />
            <Button link='/favorites' text='Favorites' />
            <button className={styles.menuButton} onClick={handleRandomize} >Randomize</button>
            <button className={styles.menuButton} onClick={handleRandomizeAll} >Randomize All</button>
            <Button link='/about' text='About' />
            <label htmlFor={searchByCheckbox.name} >{searchByCheckbox.mainTitle}</label>
            {
                searchByCheckbox.ids.map((id, i) => (
                    <React.Fragment key={id}>
                        <input
                            type="checkbox"
                            key={id}
                            name={searchByCheckbox.name}
                            id={id}
                            ref={checkboxRefs[i]}
                            onChange={event => handleCheckboxChange(checkboxRefs[i], event)}
                        />
                        <label htmlFor={id} >{searchByCheckbox.titles[i]}</label>
                    </React.Fragment>
                ))
            }
            <SearchBar query={query} handleQuery={handleQuery} />
            <button className={styles.menuButton} onClick={handleQueryReset} >Reset</button>
        </nav>
    );
}