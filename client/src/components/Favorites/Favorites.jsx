/* styles */
import './Favorites.css';

/* components */
import Pages from '../Pages/Pages.jsx';

/* hooks */
import { useSelector } from "react-redux";
import useBackground from '../../hooks/useBackground.jsx';

export default function Favorites() {
  const myFavorites = useSelector((state) => state.filteredFavorites);
  const selectedCardsPerPageF = useSelector((state) => state.selectedCardsPerPageFavorites);
  const favoritesBackground = useSelector((state) => state.favoritesBackground);

  return (
    <div className='favorites' >
      <div className='favorites-container'>
        {useBackground(favoritesBackground, 'favorites')}
      </div>
      <Pages cardsPerPage={Number(selectedCardsPerPageF)} cards={myFavorites} />
    </div>
  )
}