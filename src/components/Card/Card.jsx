import './Card.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function Card(props) {
   const { id, name, status, species, type, gender, origin, image, location } = props;
   const [isFav, setIsFav] = useState(false);
   const myFavorites = useSelector((state) => state.favorites.myFavorites);
   const idView = useSelector((state) => state.allCards.idView);
   const nameView = useSelector((state) => state.allCards.nameView);
   const statusView = useSelector((state) => state.allCards.statusView);
   const typeView = useSelector((state) => state.allCards.typeView);
   const speciesView = useSelector((state) => state.allCards.speciesView);
   const genderView = useSelector((state) => state.allCards.genderView);
   const originView = useSelector((state) => state.allCards.originView);
   const locationView = useSelector((state) => state.allCards.locationView);
   const verticalCardsPerRow = useSelector(state => state.allCards.verticalCardsPerRow);
   const horizontalCardsPerRow = useSelector(state => state.allCards.horizontalCardsPerRow);
   const infoLabelsPosition = useSelector((state) => state.allCards.infoLabelsPosition);
   const textPositionX = useSelector((state) => state.allCards.textPositionX);
   const textPositionY = useSelector((state) => state.allCards.textPositionY);
   const favoritesIcon = useSelector((state) => state.allCards.favoritesIcon);
   const dispatch = useDispatch();
   let cardsPerRow;
   if (infoLabelsPosition === 'left' || infoLabelsPosition === 'right') {
      cardsPerRow = horizontalCardsPerRow;
   } else {
      cardsPerRow = verticalCardsPerRow;
   }
   useEffect(() => {
      myFavorites?.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false);
         dispatch(removeFav(id));
         console.log(myFavorites);
      } else {
         setIsFav(true);
         dispatch(addFav(props));
         console.log(myFavorites);
      }
   }


   return (
      <div className={`container-div container-${infoLabelsPosition} container-${cardsPerRow}-${infoLabelsPosition}`} id={`card-${id}`}>
         {
            !isFav ? (
               <button className='favoriteButton' onClick={handleFavorite} >{favoritesIcon[0]}</button>
            ) : (
               <button className='favoriteButton' onClick={handleFavorite} >{favoritesIcon[1]}</button>
            )
         }
         {
            (infoLabelsPosition === 'above' || infoLabelsPosition === 'over' || infoLabelsPosition === 'left') ? (
               <>
                  <NavLink to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
                     <div className={`card-div card-${infoLabelsPosition} card-${cardsPerRow}-${infoLabelsPosition}
                           card-${textPositionX} card-${textPositionY}`}>
                        {idView && <h2>Id: {id}</h2>}
                        {nameView && <h2>Name: {name}</h2>}
                        {statusView && <h2>Status: {status}</h2>}
                        {speciesView && <h2>Species: {species}</h2>}
                        {typeView && <h2>Type: {type}</h2>}
                        {genderView && <h2>Gender: {gender}</h2>}
                        {originView && <h2>Origin: {origin.name}</h2>}
                        {locationView && <h2>Location: {location.name}</h2>}
                     </div>
                     <div className={`image-div image-${infoLabelsPosition} image-${cardsPerRow}-${infoLabelsPosition}`}>
                        <img src={image} alt={name} />
                     </div>
                  </NavLink>
               </>
            ) : (
               <>
                  <NavLink to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
                     <div className={`image-div image-${infoLabelsPosition} image-${cardsPerRow}-${infoLabelsPosition}`}>
                        <img src={image} alt={name} />
                     </div>
                     <div className={`card-div card-${infoLabelsPosition} card-${cardsPerRow}-${infoLabelsPosition} 
                           card-${textPositionX} card-${textPositionY}`} >
                        {idView && <h2>Id: {id}</h2>}
                        {nameView && <h2>Name: {name}</h2>}
                        {statusView && <h2>Status: {status}</h2>}
                        {speciesView && <h2>Species: {species}</h2>}
                        {typeView && <h2>Type: {type}</h2>}
                        {genderView && <h2>Gender: {gender}</h2>}
                        {originView && <h2>Origin: {origin.name}</h2>}
                        {locationView && <h2>Location: {location.name}</h2>}
                     </div>
                  </NavLink>
               </>
            )
         }
      </div>
   )
}
