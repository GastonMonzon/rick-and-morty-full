import './Card.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function Card(props) {
  const { id, name, status, species, type, gender, origin_name, location_name, image } = props;
  const [isFav, setIsFav] = useState(false);
  const myFavorites = useSelector((state) => state.allFavorites);
  const idView = useSelector((state) => state.homeCardCheckboxOptions[0].value);
  const nameView = useSelector((state) => state.homeCardCheckboxOptions[1].value);
  const statusView = useSelector((state) => state.homeCardCheckboxOptions[2].value);
  const speciesView = useSelector((state) => state.homeCardCheckboxOptions[3].value);
  const typeView = useSelector((state) => state.homeCardCheckboxOptions[4].value);
  const genderView = useSelector((state) => state.homeCardCheckboxOptions[5].value);
  const originView = useSelector((state) => state.homeCardCheckboxOptions[6].value);
  const locationView = useSelector((state) => state.homeCardCheckboxOptions[7].value);
  const verticalCardsPerRow = useSelector(state => state.homeCardRadioOptions[0].value);
  const horizontalCardsPerRow = useSelector(state => state.homeCardRadioOptions[1].value);
  const infoLabelsPosition = useSelector((state) => state.homeCardRadioOptions[2].value);
  const textPositionX = useSelector((state) => state.homeCardRadioOptions[3].value);
  const textPositionY = useSelector((state) => state.homeCardRadioOptions[4].value);
  const favoritesIcon = useSelector((state) => state.favoritesIcon);
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
  }, [myFavorites, id]);

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
    <div className={`card-container container-${infoLabelsPosition} container-${cardsPerRow}-${infoLabelsPosition}`} id={`card-${id}`}>
      <button
        className='favorite-button'
        onClick={handleFavorite} >
        {!isFav ? favoritesIcon[0] : favoritesIcon[1]}
      </button>
      {
        (infoLabelsPosition === 'above' || infoLabelsPosition === 'over' || infoLabelsPosition === 'left') ? (
          <>
            <NavLink to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
              <div className={`card-div card-${infoLabelsPosition} card-${cardsPerRow}-${infoLabelsPosition}
                           card-${textPositionX} card-${textPositionY} card-${infoLabelsPosition}-${textPositionY} `}>
                {idView && <h2 className='card-id-h2' >Id: {id}</h2>}
                {nameView && <h2 className='card-name-h2' >Name: {name}</h2>}
                {statusView && <h2 className='card-status-h2' >Status: {status}</h2>}
                {speciesView && <h2 className='card-species-h2' >Species: {species}</h2>}
                {typeView && <h2 className='card-type-h2' >Type: {type}</h2>}
                {genderView && <h2 className='card-gender-h2' >Gender: {gender}</h2>}
                {originView && <h2 className='card-origin-h2' >Origin: {origin_name}</h2>}
                {locationView && <h2 className='card-location-h2' >Location: {location_name}</h2>}
              </div>
              <div className={`card-image-container image-${infoLabelsPosition} image-${cardsPerRow}-${infoLabelsPosition}`}>
                <img src={image} alt={name} />
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
              <div className={`card-image-container image-${infoLabelsPosition} image-${cardsPerRow}-${infoLabelsPosition}`}>
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
                {originView && <h2>Origin: {origin_name}</h2>}
                {locationView && <h2>Location: {location_name}</h2>}
              </div>
            </NavLink>
          </>
        )
      }
    </div>
  )
}