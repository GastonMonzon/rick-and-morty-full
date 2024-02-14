/* styles */
import './OptionsSideBarRight.css'

/* components */
import Checkbox from '../Checkbox/Checkbox';
import RadioButtons from '../RadioButtons/RadioButtons';
import { cardOptions, favoritesIconRadio, detailOptions } from '../../config';
import { optionsRadios, optionsCheckboxes, optionsCardsPerPage, saveUserOptions } from '../../redux/actions';
import optionsBackgroundVideo from '../../assets/videos/optionsBackgroundVideo2.mp4';

/* hooks */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function OptionsSideBarRight() {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const selectedCardsPerPage = useSelector(state => state.selectedCardsPerPage);
  const selectedCardsPerPageFavorites = useSelector(state => state.selectedCardsPerPageFavorites);
  const isAutoSaveOn = useSelector(state => state.autoSave);
  const [isHomeOptions, setIsHomeOptions] = useState(true);
  const [areOptionsTogether, setAreOptionsTogether] = useState('Together');
  const [cardsPerPageFavorites, setCardPerPageFavorites] = useState(selectedCardsPerPageFavorites);
  const [cardsPerPage, setCardPerPage] = useState(selectedCardsPerPage);

  useEffect(() => {
    if (isAutoSaveOn) {
      setInterval(saveOptions(), 5 * 60 * 1000);
    }
  }, [isAutoSaveOn])

  const saveOptions = () => {
    dispatch(saveUserOptions());
  }

  const handleCardsPerPageChange = () => {
    if (Number.isInteger(Number(cardsPerPage)) && cardsPerPage > 0 && cardsPerPage < 1000) {
      dispatch(optionsCardsPerPage({ value: cardsPerPage, isHome: isHomeOptions }))
    }
  }
  const handleOptionsTogether = () => {
    if (areOptionsTogether === 'Together') {
      setAreOptionsTogether('Separate');
    } else {
      setAreOptionsTogether('Together');
    }
  }
  const handleOptionsRadioChange = (id, name) => {
    dispatch(optionsRadios({ value: id, name: name, isHome: isHomeOptions }));
  }
  const handleOptionsCheckboxChange = (id, checked) => {
    dispatch(optionsCheckboxes({ name: id, isChecked: checked, isHome: isHomeOptions }));
  }
  const renderCardOptions = (isForHome) => {
    if (isForHome) {
      return (
        <div className={`card-options-container ${isHomeOptions || areOptionsTogether === 'Together' ? '' : 'move-away'}`} >
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
          {renderOptions(cardOptions, isForHome)}
        </div>
      );
    } else {
      return (
        <div className={`card-options-container ${!isHomeOptions && areOptionsTogether === 'Separate' ? '' : 'move-away'}`} >
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
          {renderOptions(cardOptions, isForHome)}
        </div>
      );
    }
  }
  const renderOptions = (options, isForHome) => {
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
              name={option.name}
              mainTitle={option.mainTitle}
              titles={option.titles}
              ids={option.ids}
              checkedIds={isForHome ? option.checked : option.checkedFavorites}
              handleChange={handleOptionsCheckboxChange}
            />
          </div>
        );
      }
    });
  }

  return (
    <div className='options-sidebar' id='options-sidebar' >
      <div className='video-container'>
        <video ref={videoRef} src={optionsBackgroundVideo} id='background-video' autoPlay muted loop>
        </video>
      </div>
      <div className='video-container2'>
        <video ref={videoRef} src={optionsBackgroundVideo} id='background-video2' autoPlay muted loop>
        </video>
      </div>
      <h3>⚙️ Options Sidebar</h3>
      <div>
        <div className='autosave-option-container' >
          <label>Autosave</label>
          <button className='sidebar-button'>On</button>
        </div>
        <div className='load-save-option-container' >
          <button className='sidebar-button' >Load</button>
          <button className='sidebar-button' >Save</button>
        </div>
      </div>
      <div>
        <div className='home-favorites-option-container' >
          <label>Home / Favorites</label>
          <button
            className='sidebar-button'
            onClick={handleOptionsTogether} >
            {areOptionsTogether}
          </button>
        </div>
        {areOptionsTogether === 'Separate' ? (
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
        ) : null
        }
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
          handleOptionsSideBarChange={handleOptionsRadioChange}
        />
      </div>
      <div>
        <h4>Detail Options</h4>
        {renderOptions(detailOptions, true)}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
}