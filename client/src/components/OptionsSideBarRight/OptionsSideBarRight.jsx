/* styles */
import './OptionsSideBarRight.css'

/* components */
import Checkbox from '../Checkbox/Checkbox';
import RadioButtons from '../RadioButtons/RadioButtons';
import { getCardOptions, getDetailOptions, getFavoritesIconOptions } from '../../config';
import { optionsRadios, optionsCheckboxes, optionsCardsPerPage, setIsFavoritesTogether, favoritesIcon } from '../../redux/actions';
import optionsBackgroundVideo from '../../assets/videos/optionsBackgroundVideo2.mp4';
import { useAuth } from '../../context/AuthContext.js';

/* hooks */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function OptionsSideBarRight() {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const { userOptions } = useAuth();
  const favoritesIconRadio = getFavoritesIconOptions(userOptions);
  const selectedCardsPerPage = useSelector(state => state.selectedCardsPerPage);
  const selectedCardsPerPageFavorites = useSelector(state => state.selectedCardsPerPageFavorites);
  const isFavoritesTogether = useSelector(state => state.isFavoritesTogether);
  const areOptionsSettingsChanged = useSelector(state => state.areOptionsSettingsChanged);
  const [isHomeOptions, setIsHomeOptions] = useState(true);
  const [cardsPerPageFavorites, setCardPerPageFavorites] = useState(selectedCardsPerPageFavorites);
  const [cardsPerPage, setCardPerPage] = useState(selectedCardsPerPage);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (!areOptionsSettingsChanged) {
      setRenderKey(prevKey => prevKey + 1);
    }
  }, [areOptionsSettingsChanged]);

  const handleCardsPerPageChange = () => {
    if (Number.isInteger(Number(cardsPerPage)) && cardsPerPage > 0 && cardsPerPage < 1000) {
      dispatch(optionsCardsPerPage({ value: cardsPerPage, isHome: isHomeOptions }))
    }
  }
  const handleOptionsTogether = () => {
    dispatch(setIsFavoritesTogether());
    setIsHomeOptions(!isFavoritesTogether);
  }
  const handleOptionsRadioChange = (id, name) => {
    dispatch(optionsRadios({ value: id, name: name, isHome: isHomeOptions }));
  }
  const handleOptionsCheckboxChange = (id, checked) => {
    dispatch(optionsCheckboxes({ name: id, isChecked: checked, isHome: isHomeOptions }));
  }
  const handleFavoritesIconChange = (id) => {
    dispatch(favoritesIcon(id));
  }
  const renderCardOptions = (isForHome) => {
    if (isForHome) {
      return (
        <div className={`card-options-container ${isHomeOptions || isFavoritesTogether ? '' : 'move-away'}`} >
          <h4>Card Options</h4>
          <div className='cardsPerPage-input-container'>
            <label htmlFor='cardsPerPage' className='cards-per-page-label'>
              Cards Per Page:
            </label>
            <input
              type='number'
              id='cardsPerPage'
              name='cardsPerPage'
              className='cards-per-page-input'
              value={cardsPerPage}
              onChange={(event) => setCardPerPage(Number(event.target.value))}
            />
            <button className='sidebar-button'
              onClick={handleCardsPerPageChange} >
              Confirm
            </button>
            <p className='cards-per-page-warning' >must be integer between 0 and 999</p>
          </div>
          {renderOptions(getCardOptions(userOptions), isForHome)}
        </div>
      );
    } else {
      return (
        <div className={`card-options-container ${!isHomeOptions && !isFavoritesTogether ? '' : 'move-away'}`} >
          <h4>Card Options</h4>
          <div className='cardsPerPage-input-container'>
            <label htmlFor='cardsPerPage' className='cards-per-page-label'>
              Cards Per Page:
            </label>
            <input
              type='number'
              id='cardsPerPage'
              name='cardsPerPage'
              className='cards-per-page-input'
              value={cardsPerPageFavorites}
              onChange={(event) => setCardPerPageFavorites(Number(event.target.value))} />
            <button className='sidebar-button'
              onClick={handleCardsPerPageChange} >
              Confirm
            </button>
            <p className='cards-per-page-warning' >must be integer between 0 and 999</p>
          </div>
          {renderOptions(getCardOptions(userOptions), isForHome)}
        </div>
      );
    }
  }
  const renderOptions = (options, isForHome) => {
    if (options) {
      return options.map((option) => {
        if (!Array.isArray(option.checked)) {
          return (
            <div key={option.name}>
              <RadioButtons
                name={isForHome ? option.name : option.nameF}
                mainTitle={option.mainTitle}
                titles={option.titles}
                ids={isForHome ? option.ids : option.idsF}
                checkedId={isForHome ? option.checked : option.checkedFavorites}
                handleChange={handleOptionsRadioChange}
              />
            </div>
          );
        } else {
          return (
            <div key={option.name}>
              <Checkbox
                name={isForHome ? option.name : option.nameF}
                mainTitle={option.mainTitle}
                titles={option.titles}
                ids={isForHome ? option.ids : option.idsF}
                checkedIds={isForHome ? option.checked : option.checkedFavorites}
                handleChange={handleOptionsCheckboxChange}
              />
            </div>
          );
        }
      });
    }
  }

  return (
    <div className='options-sidebar' id='optionsSidebar' >
      <div className='video-container'>
        <video ref={videoRef} src={optionsBackgroundVideo} className='background-video' autoPlay muted loop>
        </video>
      </div>
      <div className='video-container2'>
        <video ref={videoRef} src={optionsBackgroundVideo} className='background-video2' autoPlay muted loop>
        </video>
      </div>
      <div key={renderKey} >
        <h3>⚙️ Options Sidebar</h3>
        <div>
          <div className='home-favorites-option-container' >
            <label>Home / Favorites</label>
            <button
              className={`sidebar-button ${isFavoritesTogether ? 'sidebar-button-active' : ''}`}
              onClick={handleOptionsTogether} >
              {isFavoritesTogether ? 'Together' : 'Separate'}
            </button>
          </div>
          {!isFavoritesTogether ? (
            <div className='home-favorites-buttons-container' >
              <button
                className={isHomeOptions ? 'home-options-button home-options-button-active' : 'home-options-button'}
                onClick={() => setIsHomeOptions(true)} >
                Home
              </button>
              <button
                className={!isHomeOptions ? 'favorites-options-button favorites-options-button-active' : 'favorites-options-button'}
                onClick={() => setIsHomeOptions(false)} >
                Favorites
              </button>
            </div>
          ) : null}
          {renderCardOptions(true)}
          {renderCardOptions(false)}
        </div>
        <div className='favorites-options-container' >
          <RadioButtons
            name={favoritesIconRadio.name}
            mainTitle={favoritesIconRadio.mainTitle}
            titles={favoritesIconRadio.titles}
            ids={favoritesIconRadio.ids}
            checkedId={favoritesIconRadio.checked}
            handleChange={handleFavoritesIconChange}
          />
        </div>
        <div>
          <h4>Detail Options</h4>
          {renderOptions(getDetailOptions(userOptions), true)}
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
}