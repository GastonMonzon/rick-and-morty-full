import './Card.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, filter, query, removeFav } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function Card(props) {
  const { id, name, status, species, type, gender, origin_name, location_name, image } = props;
  const [isFav, setIsFav] = useState(false);
  const { pathname } = useLocation();
  const isFavoritesTogether = useSelector((state) => state.isFavoritesTogether);
  const myFavorites = useSelector((state) => state.allFavorites);
  const searchQueryFavorites = useSelector((state) => state.searchQueryFavorites);
  const favoritesIcon = useSelector((state) => state.favoritesIcon);
  const idView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[0].value
      : state.cardCheckboxOptions[0].valueF
  );
  const nameView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[1].value
      : state.cardCheckboxOptions[1].valueF
  );
  const statusView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[2].value
      : state.cardCheckboxOptions[2].valueF
  );
  const speciesView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[3].value
      : state.cardCheckboxOptions[3].valueF
  );
  const typeView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[4].value
      : state.cardCheckboxOptions[4].valueF
  );
  const genderView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[5].value
      : state.cardCheckboxOptions[5].valueF
  );
  const originView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[6].value
      : state.cardCheckboxOptions[6].valueF
  );
  const locationView = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardCheckboxOptions[7].value
      : state.cardCheckboxOptions[7].valueF
  );
  const verticalCardsPerRow = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[0].value
      : state.cardRadioOptions[0].valueF
  );
  const horizontalCardsPerRow = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[1].value
      : state.cardRadioOptions[1].valueF
  );
  const infoLabelsPosition = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[2].value
      : state.cardRadioOptions[2].valueF
  );
  const textPositionX = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[3].value
      : state.cardRadioOptions[3].valueF
  );
  const textPositionY = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[4].value
      : state.cardRadioOptions[4].valueF
  );
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
      dispatch(query({ query: searchQueryFavorites, isHome: false }));
      dispatch(filter({ name: '', value: '', isHome: false }))
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
