import './RandomizeAll.css'

import { useDispatch, useSelector } from "react-redux";
import { randomizeAll } from "../../redux/actions";

export default function RandomizeAll() {
    const allCards = useSelector((state) => state.allCards.filteredCards);
    const dispatch = useDispatch();


    const handleRandomizeAll = () => {
        const randomizedCards = [...allCards]; // Crea una copia de allCards
        for (let i = randomizedCards.length - 1; i > 0; i--) { // Algoritmo Fisher-Yates para mezclar aleatoriamente los valores en el arreglo
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedCards[i], randomizedCards[j]] = [randomizedCards[j], randomizedCards[i]];
        }
        console.log(randomizedCards);
        dispatch(randomizeAll(randomizedCards));
    };

    return (
        <div>
            <button className='menu-button' onClick={handleRandomizeAll} >Randomize All</button>
        </div>
    )
}