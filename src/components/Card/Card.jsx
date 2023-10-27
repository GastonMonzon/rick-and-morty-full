import styles from './Card.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../redux/actions';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

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
   const infoPosition = useSelector((state) => state.allCards.infoPosition);
   const favoritesIcon = useSelector((state) => state.allCards.favoritesIcon);
   const dispatch = useDispatch();
   let cardDivClassName;

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

   useEffect(() => {
      myFavorites?.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   if (infoPosition === 'above' || infoPosition === 'over' || infoPosition === 'below') {
      cardDivClassName = classNames(styles.cardDiv);
   } else {
      cardDivClassName = classNames(styles.cardDiv, styles.cardDivSideways);
   }

   return (
      <>
         <div className={cardDivClassName}>
            <div> A VER </div>
            <img src={image} alt={name} />
         </div>
         <div className={cardDivClassName} id={`card-${id}`}>
            {
               !isFav ? (
                  <button className={styles.favoriteButton} onClick={handleFavorite} >{favoritesIcon[0]}</button>
               ) : (
                  <button className={styles.favoriteButton} onClick={handleFavorite} >{favoritesIcon[1]}</button>
               )
            }
            {/* <NavLink to={`/detail/${id}`} style={{ textDecoration: 'none' }}> */}
            {/* {
               (infoPosition === 'above' || infoPosition === 'over' || infoPosition === 'left') ? ( */}
            <div className={styles[infoPosition]}>
               {idView && <h2>Id: {id}</h2>}
               {nameView && <h2>Name: {name}</h2>}
               {statusView && <h2>Status: {status}</h2>}
               {speciesView && <h2>Species: {species}</h2>}
               {typeView && <h2>Type: {type}</h2>}
               {genderView && <h2>Gender: {gender}</h2>}
               {originView && <h2>Origin: {origin.name}</h2>}
               {locationView && <h2>Location: {location.name}</h2>}
            </div>
            <img src={image} alt={name} />
            {/* ) : (
                  <div>
                     <img src={image} alt={name} />
                     <div className={styles[infoPosition]}>
                        {idView && <h2>Id: {id}</h2>}
                        {nameView && <h2>Name: {name}</h2>}
                        {statusView && <h2>Status: {status}</h2>}
                        {speciesView && <h2>Species: {species}</h2>}
                        {typeView && <h2>Type: {type}</h2>}
                        {genderView && <h2>Gender: {gender}</h2>}
                        {originView && <h2>Origin: {origin.name}</h2>}
                        {locationView && <h2>Location: {location.name}</h2>}
                     </div>
                  </div>
               )
            } */}
            {/* </NavLink> */}
         </div>
      </>
   );
}
