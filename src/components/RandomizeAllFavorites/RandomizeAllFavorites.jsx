import './RandomizeAllFavorites.css'

import { useDispatch, useSelector } from "react-redux";
import { randomizeAllFavorites } from "../../redux/actions";

export default function RandomizeAllFavorites() {
    const myFavorites = useSelector((state) => state.favorites.myFavorites);
    const dispatch = useDispatch();


    const handleRandomizeAll = () => {
        const randomizedCards = [...myFavorites]; // Crea una copia de myFavorites
        for (let i = randomizedCards.length - 1; i > 0; i--) { // Algoritmo Fisher-Yates para mezclar aleatoriamente los valores en el arreglo
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedCards[i], randomizedCards[j]] = [randomizedCards[j], randomizedCards[i]];
        }
        console.log(randomizedCards);
        dispatch(randomizeAllFavorites(randomizedCards));
    };

    return (
        <div>
            <button className='menu-button' onClick={handleRandomizeAll} >Randomize All</button>
        </div>
    )
}