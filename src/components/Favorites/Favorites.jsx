/* styles */
import './Favorites.css';

/* components */
import FavoritesFiltersBar from '../FavoritesFiltersBar/FavoritesFiltersBar';
import backgroundVideo from '../../images/backgroundVideo.mp4';

/* hooks */
import { useSelector } from "react-redux";
import FavoritesCards from '../FavoritesCards/FavoritesCards';
import { useEffect, useState } from 'react';

export default function Favorites() {
    const myFavorites = useSelector((state) => state.favorites.myFavorites)
    const [isFiltersBarFavoritesExtended, setIsFiltersBarFavoritesExtended] = useState(false);
    const [videoheight, setVideoHeight] = useState('video-retracted');

    const extendFiltersBarFavorites = () => {
        setIsFiltersBarFavoritesExtended(!isFiltersBarFavoritesExtended);
    }

    useEffect(() => {
        if (isFiltersBarFavoritesExtended) {
            setVideoHeight('video-extended');
        } else {
            setVideoHeight('video-retracted');
        }
        console.log(videoheight);
    }, [isFiltersBarFavoritesExtended]);
    return (
        <div className='favorites' >
            <div className="favorites-video-container">
                <video src={backgroundVideo} className="favorites-background-video" autoPlay muted loop>
                </video>
            </div>
            <div className={`favorites-filters-video-container ${videoheight}`}>
                <video src={backgroundVideo} className='favorites-filters-background-video' autoPlay muted loop>
                </video>
            </div>
            <details className='favorites-filters-details' onClick={extendFiltersBarFavorites}>
                <summary>Filters</summary>
                <FavoritesFiltersBar />
            </details>
            <FavoritesCards characters={myFavorites} />
        </div>
    )
}