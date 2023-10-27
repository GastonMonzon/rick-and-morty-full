/* styles */
import styles from './Favorites.module.css';

/* components */
import Card from "../Card/Card";
import FiltersBar from '../FiltersBar/FiltersBar';
import Cards from '../Cards/Cards';

/* hooks */
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Favorites() {
    const myFavorites = useSelector((state) => state.favorites.myFavorites);

    return (
        <div className={styles.favorites} >
            <FiltersBar />
            <Cards characters={myFavorites} />
        </div>
    )
}