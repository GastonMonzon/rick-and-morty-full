import './UserSideBarLeft.css'
import { useEffect, useRef, useState } from 'react';
import userBackgroundVideo from '../../assets/videos/optionsBackgroundVideo2.mp4';
import { useAuth } from '../../context/AuthContext';
import background1 from '../../assets/thumbnails/background1_thumbnail_1280x720.jpg';
import background2 from '../../assets/thumbnails/background2_thumbnail_1280x720.jpg';
import background3 from '../../assets/thumbnails/background3_thumbnail_1280x720.jpg';
import background4 from '../../assets/thumbnails/background4_thumbnail_1280x720.jpg';
import background5 from '../../assets/thumbnails/background5_thumbnail_1280x720.jpg';
import background6 from '../../assets/thumbnails/background6_thumbnail_1280x720.jpg';
import background7 from '../../assets/thumbnails/background7_thumbnail_1280x720.jpg';
import backgroundVideo1 from '../../assets/thumbnails/backgroundVideo1thumbnail.gif';
import backgroundVideo2 from '../../assets/thumbnails/backgroundVideo2thumbnail.gif';
import loading1 from '../../assets/loadingGifs/loading1.gif'
import loading2 from '../../assets/loadingGifs/loading2.gif'
import loading3 from '../../assets/loadingGifs/loading3.gif'
import loading4 from '../../assets/loadingGifs/loading4.gif'
import loading5 from '../../assets/loadingGifs/loading5.gif'
import loading6 from '../../assets/loadingGifs/loading6.gif'
import loading7 from '../../assets/loadingGifs/loading7.gif'
import loading8 from '../../assets/loadingGifs/loading8.gif'
import loading9 from '../../assets/loadingGifs/loading9.gif'
import loading10 from '../../assets/loadingGifs/loading10.gif'
import loading11 from '../../assets/loadingGifs/loading11.gif'
import loading12 from '../../assets/loadingGifs/loading12.gif'
import loading13 from '../../assets/loadingGifs/loading13.gif'
import loading14 from '../../assets/loadingGifs/loading14.gif'
import loading15 from '../../assets/loadingGifs/loading15.gif'
import loading16 from '../../assets/loadingGifs/loading16.gif'
import loading17 from '../../assets/loadingGifs/loading17.gif'
import loading18 from '../../assets/loadingGifs/loading18.gif'
import loading19 from '../../assets/loadingGifs/loading19.gif'
import { useDispatch, useSelector } from 'react-redux';
import { autoSaveToggle, changeBackground, loadSettings, saveSettings } from '../../redux/actions';
import { useNavigate } from 'react-router';
import dataValidation from '../../dataValidation.js';
import useDetailsTagAnimations from '../../hooks/useDetailsTagAnimations.jsx';
import PromptPasswordModal from '../PromptPasswordModal/PromptPasswordModal.jsx';
import NotificationModal from '../NotificationModal/NotificationModal.jsx';

export default function UserSideBarLeft() {
  const backgroundVideoRef = useRef(null);
  const backgroundVideo2Ref = useRef(null);
  const backgroundVideo3Ref = useRef(null);
  const saveOptionsRef = useRef(null);
  const changeUserDataRef = useRef(null);
  const homeBackgroundRef = useRef(null);
  const favoritesBackgroundRef = useRef(null);
  const detailBackgroundRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const changeEmailRef = useRef(null);
  const changePasswordRef = useRef(null);
  const deleteAccountRef = useRef(null);
  const logOutRef = useRef(null);
  const { userOptions, getUserData, changeUserData, saveFilterSettings, saveOptionsSettings, saveSearchSettings, saveUserSettings, changeEmail, changePassword, reauthenticate, logOut, deleteAccount } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeData, setChangeData] = useState({ loadSearchSettings: '', loadFilterSettings: '', loadOptionsSettings: '', promptModalPassword: '', name: '', surName: '', userName: '', dateOfBirth: '', currentEmail: '', email: '', emailPassword: '', passwordPassword: '', password: '', repeatPassword: '' });
  const [changeDataErrors, setChangeDataErrors] = useState({ promptModalPassword: '', userData: '', name: '', surName: '', userName: '', dateOfBirth: '', changeEmail: '', currentEmail: '', email: '', emailPassword: '', passwordPassword: '', password: '', repeatPassword: '' });
  const addAnimations = useDetailsTagAnimations();
  const [isUserDataModalOpen, setIsUserDataModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isDeletePromptModalOpen, setIsDeletePromptModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', requiresInput: false, message: '', cancelButtonText: '', submitButtontext: '' });
  const [userDataEvent, setUserDataEvent] = useState({});
  const [isUserDataChanged, setIsUserDataChanged] = useState(false);
  const [isOpenThresholdReached, setIsOpenThresholdReached] = useState(0);
  const [isloadingScreenTested, setIsloadingScreenTested] = useState(false);
  const autoSaveSearch = useSelector((state) => state.autoSaveSearch);
  const autoSaveFilters = useSelector((state) => state.autoSaveFilters);
  const autoSaveOptions = useSelector((state) => state.autoSaveOptions);
  const selectedHomeBackground = useSelector((state) => state.homeBackground);
  const selectedFavoritesBackground = useSelector((state) => state.favoritesBackground);
  const selectedDetailBackground = useSelector((state) => state.detailBackground);
  const selectedLoadingScreen = useSelector((state) => state.loadingScreen);
  const filterSettings = useSelector((state) => state.filterSettings);
  const searchSettings = useSelector((state) => state.searchSettings);
  const optionsSettings = useSelector((state) => state.optionsSettings);
  const userSettings = useSelector((state) => state.userSettings);
  const areSearchSettingsChanged = useSelector((state) => state.areSearchSettingsChanged);
  const areFilterSettingsChanged = useSelector((state) => state.areFilterSettingsChanged);
  const areOptionsSettingsChanged = useSelector((state) => state.areOptionsSettingsChanged);
  const areUserSettingsChanged = useSelector((state) => state.areUserSettingsChanged);
  const loadingScreen = useSelector((state) => state.loadingScreen);
  const isLoading = useSelector((state) => state.isLoading);

  const backgroundImages = [
    { name: 'background1', src: background1 },
    { name: 'background2', src: background2 },
    { name: 'background3', src: background3 },
    { name: 'background4', src: background4 },
    { name: 'background5', src: background5 },
    { name: 'background6', src: background6 },
    { name: 'background7', src: background7 },
    { name: 'backgroundVideo1', src: backgroundVideo1 },
    { name: 'backgroundVideo2', src: backgroundVideo2 }
  ];

  const loadingGifs = [
    { name: 'loading1', src: loading1 },
    { name: 'loading2', src: loading2 },
    { name: 'loading3', src: loading3 },
    { name: 'loading4', src: loading4 },
    { name: 'loading5', src: loading5 },
    { name: 'loading6', src: loading6 },
    { name: 'loading7', src: loading7 },
    { name: 'loading8', src: loading8 },
    { name: 'loading9', src: loading9 },
    { name: 'loading10', src: loading10 },
    { name: 'loading11', src: loading11 },
    { name: 'loading12', src: loading12 },
    { name: 'loading17', src: loading17 },
    { name: 'loading15', src: loading15 },
    { name: 'loading19', src: loading19 },
    { name: 'loading14', src: loading14 },
    { name: 'loading16', src: loading16 },
    { name: 'loading18', src: loading18 },
    { name: 'loading13', src: loading13 }
  ];

  const loadingMap = {
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
    loading7,
    loading8,
    loading9,
    loading10,
    loading11,
    loading12,
    loading13,
    loading14,
    loading15,
    loading16,
    loading17,
    loading18,
    loading19,
  };
  const loadingGif = loadingMap[loadingScreen];

  useEffect(() => {
    setTimeout(() => {
      let event = {
        target: {
          name: 'currentEmail',
          value: ''
        }
      }
      handleUserDataChange(event);
      event = {
        target: {
          name: 'emailPassword',
          value: ''
        }
      }
      handleUserDataChange(event);
    }, 1000);
  }, []);

  useEffect(() => {
    if (areSearchSettingsChanged) {
      setChangeData({
        ...changeData,
        loadSearchSettings: '',
      });
    }
    if (areUserSettingsChanged) {
      const interval = setInterval(() => {
        handleSave('saveUserSettings');
      }, 3 * 60 * 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [areUserSettingsChanged]);

  useEffect(() => {
    if (areFilterSettingsChanged) {
      setChangeData({
        ...changeData,
        loadFilterSettings: '',
      });
    }
    if (autoSaveFilters && areFilterSettingsChanged) {
      const interval = setInterval(() => {
        handleSave('saveFiltersSettings');
      }, 3 * 60 * 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [autoSaveFilters, areFilterSettingsChanged]);

  useEffect(() => {
    if (areOptionsSettingsChanged) {
      setChangeData({
        ...changeData,
        loadOptionsSettings: '',
      });
    }
    if (autoSaveOptions && areOptionsSettingsChanged) {
      const interval = setInterval(() => {
        handleSave('saveOptionsSettings');
      }, 3 * 60 * 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [autoSaveOptions, areOptionsSettingsChanged]);

  useEffect(() => {
    if (autoSaveSearch && areSearchSettingsChanged) {
      const interval = setInterval(() => {
        handleSave('saveSearchSettings');
      }, 3 * 60 * 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [autoSaveSearch, areSearchSettingsChanged]);

  useEffect(() => {
    (async function saveData() {
      if (searchSettings) {
        try {
          console.log(searchSettings);
          await saveSearchSettings(searchSettings);
          setModalMessage({
            ...modalMessage,
            title: 'Success',
            message: 'Search Settings Saved Successfully'
          });
          setIsNotificationModalOpen(true);
        } catch (error) {
          setModalMessage({
            ...modalMessage,
            title: 'Error saving search settings',
            message: error?.response?.data?.error?.code
          });
          setIsNotificationModalOpen(true);
        }
      }
    }());
  }, [searchSettings]);

  useEffect(() => {
    (async function saveData() {
      if (filterSettings) {
        try {
          await saveFilterSettings(filterSettings);
          setModalMessage({
            ...modalMessage,
            title: 'Success',
            message: 'Filter Settings Saved Succesfully'
          });
          setIsNotificationModalOpen(true);
        } catch (error) {
          setModalMessage({
            ...modalMessage,
            title: 'Error saving filter settings',
            message: error?.response?.data?.error?.code
          });
          setIsNotificationModalOpen(true);
        }
      }
    }());
  }, [filterSettings]);

  useEffect(() => {
    (async function saveData() {
      if (optionsSettings) {
        try {
          await saveOptionsSettings(optionsSettings);
          console.log(optionsSettings);
          console.log(userOptions);
          setModalMessage({
            ...modalMessage,
            title: 'Success',
            message: 'Options Settings Saved Succesfully'
          });
          setIsNotificationModalOpen(true);
        } catch (error) {
          setModalMessage({
            ...modalMessage,
            title: 'Error saving options settings',
            message: error?.response?.data?.error?.code
          });
          setIsNotificationModalOpen(true);
        }
      }
    }());
  }, [optionsSettings]);

  useEffect(() => {
    (async function saveData() {
      if (userSettings) {
        try {
          await saveUserSettings(userSettings);
          console.log('User settings saved');
        } catch (error) {
          console.error(error);
        }
      }
    }());
  }, [userSettings]);

  useEffect(() => {
    const detailsElements = document.querySelectorAll('.user-options-details-tag');
    const handleToggle = () => {
      const openCount = Array.from(detailsElements).reduce(
        (count, element) => (element.open ? count + 1 : count), 0);
      setIsOpenThresholdReached(openCount);
    };
    detailsElements.forEach((element) =>
      element.addEventListener('toggle', handleToggle)
    );
    return () => {
      detailsElements.forEach((element) =>
        element.removeEventListener('toggle', handleToggle)
      );
    };
  }, []);

  const handleDetailsClick = (event, ref, contentId) => {
    addAnimations(event, ref, contentId);
  }
  const handleAutosaveToggle = (id) => {
    dispatch(autoSaveToggle(id));
  }
  const handleLoad = (id) => {
    dispatch(loadSettings({ id: id, userOptions: userOptions }));
    console.log(userOptions);
    switch (id) {
      case 'loadSearchSettings':
        setChangeData({
          ...changeData,
          loadSearchSettings: 'Search Settings Loaded'
        });
        break;
      case 'loadFilterSettings':
        setChangeData({
          ...changeData,
          loadFilterSettings: 'Filter Settings Loaded'
        });
        break;
      case 'loadOptionsSettings':
        setChangeData({
          ...changeData,
          loadOptionsSettings: 'View Options Loaded'
        });
        break;
      default:
        break;
    }
  }
  const handleSave = async (id) => {
    dispatch(saveSettings(id));
  }
  const handleBackgroundChange = (event) => {
    const { name, alt } = event.target;
    dispatch(changeBackground({ name: name, alt: alt }));
    if (name === 'loading') {
      setIsloadingScreenTested(true);
      setTimeout(() => {
        setIsloadingScreenTested(false);
      }, 2000);
    }
  }
  const handleUserDataChangeClick = (event) => {
    event.preventDefault();
    const detailsTag = document.getElementById(`changeUserDataDetailsTag`);
    if (detailsTag.open) {
      handleDetailsClick(event, changeUserDataRef, 'UserDataContainer');
      setChangeData({
        ...changeData,
        name: '',
        surName: '',
        userName: '',
        dateOfBirth: ''
      });
    } else {
      setUserDataEvent(event);
      setModalMessage({
        ...modalMessage,
        title: 'User Data View Requires Password',
        requiresInput: true,
        cancelButtonText: 'Cancel',
        submitButtontext: 'Submit'
      });
      setIsUserDataModalOpen(true);
    }
  }
  const handleUserDataPasswordSubmit = async () => {
    try {
      await reauthenticate(changeData.promptModalPassword);
      setIsUserDataModalOpen(false);
      setChangeData({
        ...changeData,
        promptModalPassword: ''
      });
      handleUserData();
      handleDetailsClick(userDataEvent, changeUserDataRef, 'UserDataContainer');
    } catch (error) {
      setModalMessage({
        ...modalMessage,
        message: `Error authenticating password ${error?.response?.data?.error?.code}`
      });
    }
  }
  const handleUserData = async () => {
    try {
      const { data } = await getUserData();
      setIsUserDataChanged(false);
      setChangeData({
        ...changeData,
        name: data.name,
        surName: data.surName,
        userName: data.userName,
        dateOfBirth: data.dateOfBirth
      });
    } catch (error) {
      setChangeDataErrors({
        ...changeDataErrors,
        userData: error?.response?.data?.error?.code || 'Error'
      });
    }
  }
  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    if (!isUserDataChanged && (event.target.type !== 'email' || event.target.type !== 'password')) {
      setIsUserDataChanged(true);
    }
    setChangeData({
      ...changeData,
      [name]: value
    });
    setChangeDataErrors(
      dataValidation({
        ...changeData,
        [name]: value
      }));
  }
  const handleUserDataChangeSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        name: changeData.name,
        surName: changeData.surName,
        userName: changeData.userName,
        dateOfBirth: changeData.dateOfBirth
      }
      await changeUserData(userData);
      setIsUserDataChanged(false);
      setModalMessage({
        ...modalMessage,
        title: 'Success',
        message: 'User Data Updated Succesfully'
      });
      setIsNotificationModalOpen(true);
    } catch (error) {
      setChangeDataErrors({
        ...changeDataErrors,
        userData: `Error updating user data ${error?.response?.data?.error?.code}`
      });
    }
  }
  const handleUserEmailChangeSubmit = async (event) => {
    event.preventDefault();
    try {
      await changeEmail(changeData.email, changeData.emailPassword);
      setChangeData({
        ...changeData,
        email: '',
        emailPassword: '',
        password: ''
      });
      setModalMessage({
        ...modalMessage,
        title: 'Success',
        message: 'Email Updated Succesfully'
      });
      setIsNotificationModalOpen(true);
    } catch (error) {
      setChangeDataErrors({
        ...changeDataErrors,
        changeEmail: `Error updating email ${error?.response?.data?.error?.code}`
      });
    }
  }
  const handleUserPasswordChangeSubmit = async (event) => {
    event.preventDefault();
    try {
      await changePassword(changeData.passwordPassword, changeData.password, changeData.repeatPassword);
      setChangeData({
        ...changeData,
        passwordPassword: '',
        password: '',
        repeatPassword: ''
      });
      setModalMessage({
        ...modalMessage,
        title: 'Success',
        message: 'Password Updated Succesfully'
      });
      setIsNotificationModalOpen(true);
    } catch (error) {
      setChangeDataErrors({
        ...changeDataErrors,
        changePassword: `Error updating password ${error?.response?.data?.error?.code}`
      });
    }
  }
  const handleLogOut = async () => {
    try {
      handleSave('saveUserSettings');
      handleSave('saveFiltersSettings');
      handleSave('saveOptionsSettings');
      handleSave('saveSearchSettings');
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteAccountButtonClick = () => {
    setModalMessage({
      ...modalMessage,
      title: 'Deleting Account Requires Password',
      requiresInput: true,
      cancelButtonText: 'Cancel',
      submitButtontext: 'Submit'
    });
    setIsDeletePromptModalOpen(true);
  }
  const handleDeleteAccountPasswordSubmit = async () => {
    try {
      await reauthenticate(changeData.promptModalPassword);
      setIsDeletePromptModalOpen(false);
      setChangeData({
        ...changeData,
        promptModalPassword: ''
      });
      setModalMessage({
        ...modalMessage,
        title: 'Are You Sure You Want To Delete Your Account?',
        message: 'All your user data and options will be erased and your user signed out. You d\' be required to reregister to enter again',
        requiresInput: false,
        cancelButtonText: 'No',
        submitButtontext: 'Yes, Delete'
      });
      setIsDeleteConfirmationModalOpen(true);
    } catch (error) {
      setModalMessage({
        ...modalMessage,
        message: `Error authenticating password' ${error?.response?.data?.error?.code}`
      });
    }
  }
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setIsDeleteConfirmationModalOpen(false);
    } catch (error) {
      setChangeDataErrors({
        ...changeDataErrors,
        changePassword: `Error deleting account ${error?.response?.data?.error?.code}`
      });
    }
  }
  const handleCloseModal = () => {
    setIsNotificationModalOpen(false);
    setIsUserDataModalOpen(false);
    setIsDeletePromptModalOpen(false);
    setIsDeleteConfirmationModalOpen(false);
    setModalMessage({
      ...modalMessage,
      title: '',
      requiresInput: false,
      message: '',
      cancelButtonText: '',
      submitButtontext: ''
    });
  }

  return (
    <div className='user-sidebar' id='userSidebar' >
      <div className='video-container-user-options'>
        <video ref={backgroundVideoRef} src={userBackgroundVideo} className='user-options-background-video' autoPlay muted loop>
        </video>
      </div>
      {(isOpenThresholdReached > 2) &&
        <div className='video-container2-user-options'>
          <video ref={backgroundVideo2Ref} src={userBackgroundVideo} className='user-options-background-video2' autoPlay muted loop>
          </video>
        </div>
      }
      {(isOpenThresholdReached > 5) &&
        <div className='video-container3-user-options'>
          <video ref={backgroundVideo3Ref} src={userBackgroundVideo} className='user-options-background-video3' autoPlay muted loop>
          </video>
        </div>
      }
      <div className='user-sidebar-title-container' >
        <h2>🪪 </h2>
        <h3>User Sidebar</h3>
      </div>
      <details id='saveOptionsDetailsTag' className='user-options-details-tag' ref={saveOptionsRef} >
        <summary
          id='saveOptions'
          onClick={(event) => handleDetailsClick(event, saveOptionsRef, 'saveOptionsContainer')} >
          Save Options
        </summary>
        <div className='save-options-container' id='saveOptionsContainer' >
          <h4>Autosave</h4>
          <div className='autosave-option-container' >
            <label>Search & Search Options</label>
            <button
              id='autoSaveSearch'
              className={`user-options-button ${autoSaveSearch ? 'user-options-button-active' : ''}`}
              onClick={(event) => handleAutosaveToggle(event.target.id)} >
              {autoSaveSearch ? 'On' : 'Off'}
            </button>
          </div>
          <div className='autosave-option-container' >
            <label>Selected Filters</label>
            <button
              id='autoSaveFilters'
              className={`user-options-button ${autoSaveFilters ? 'user-options-button-active' : ''}`}
              onClick={(event) => handleAutosaveToggle(event.target.id)} >
              {autoSaveFilters ? 'On' : 'Off'}
            </button>
          </div>
          <div className='autosave-option-container' >
            <label>View Options</label>
            <button
              id='autoSaveOptions'
              className={`user-options-button ${autoSaveOptions ? 'user-options-button-active' : ''}`}
              onClick={(event) => handleAutosaveToggle(event.target.id)} >
              {autoSaveOptions ? 'On' : 'Off'}
            </button>
          </div>
          {(!autoSaveSearch || !autoSaveFilters || !autoSaveOptions) &&
            <h4>Load Last Save / Save Options</h4>
          }
          {!autoSaveSearch &&
            <>
              <label>Search & Search Options</label>
              <div className='autosave-option-container' >
                <button
                  id='loadSearchSettings'
                  className='user-options-button'
                  disabled={!areSearchSettingsChanged}
                  onClick={(event) => handleLoad(event.target.id)} >
                  Load
                </button>
                <button
                  id='saveSearchSettings'
                  className='user-options-button'
                  disabled={!areSearchSettingsChanged}
                  onClick={(event) => handleSave(event.target.id)} >
                  Save
                </button>
              </div>
              <pre className={changeData.loadSearchSettings ? '' : 'invisible'} >{changeData.loadSearchSettings ? `${changeData.loadSearchSettings}` : 'invisible'}</pre>
            </>
          }
          {!autoSaveFilters &&
            <>
              <label>Selected Filters</label>
              <div className='autosave-option-container' >
                <button
                  id='loadFiltersSettings'
                  className='user-options-button'
                  disabled={!areFilterSettingsChanged}
                  onClick={(event) => handleLoad(event.target.id)} >
                  Load
                </button>
                <button
                  id='saveFiltersSettings'
                  className='user-options-button'
                  disabled={!areFilterSettingsChanged}
                  onClick={(event) => handleSave(event.target.id)} >
                  Save
                </button>
              </div>
              <pre className={changeData.loadFilterSettings ? '' : 'invisible'} >{changeData.loadFilterSettings ? `${changeData.loadFilterSettings}` : 'invisible'}</pre>
            </>
          }
          {!autoSaveOptions &&
            <>
              <label>View Options</label>
              <div className='autosave-option-container' >
                <button
                  id='loadOptionsSettings'
                  className='user-options-button'
                  disabled={!areOptionsSettingsChanged}
                  onClick={(event) => handleLoad(event.target.id)} >
                  Load
                </button>
                <button
                  id='saveOptionsSettings'
                  className='user-options-button'
                  disabled={!areOptionsSettingsChanged}
                  onClick={(event) => handleSave(event.target.id)} >
                  Save
                </button>
              </div>
              <pre className={changeData.loadOptionsSettings ? '' : 'invisible'} >{changeData.surName ? `${changeData.loadOptionsSettings}` : 'invisible'}</pre>
            </>
          }
          {autoSaveSearch &&
            <>
              <br /><br /><br /><br /><br />
            </>
          }
          {autoSaveFilters &&
            <>
              <br /><br /><br /><br /><br />
            </>
          }
          {autoSaveOptions &&
            <>
              <br /><br /><br /><br /><br />
            </>
          }
        </div>
      </details>
      <details>
        <summary>Change User Image</summary>
      </details>
      <div>
        <details id='homeBackgroundDetailsTag' className='user-options-details-tag' ref={homeBackgroundRef}>
          <summary
            id='homeBackground'
            onClick={(event) => handleDetailsClick(event, homeBackgroundRef, 'homeBackgroundContainer')} >
            Change Home Background</summary>
          <div className='background-images-container' id='homeBackgroundContainer' >
            {backgroundImages.map((background, index) => (
              <div key={index}
                className='thumbnail-image-div' >
                <img
                  src={background.src}
                  alt={background.name}
                  name='home'
                  className={selectedHomeBackground === background.name ? 'selected-background' : ''}
                  onClick={handleBackgroundChange} />
              </div>
            ))}
          </div>
        </details>
      </div>
      <div>
        <details id='favoritesBackgroundDetailsTag' className='user-options-details-tag' ref={favoritesBackgroundRef}>
          <summary
            id='favoritesBackground'
            onClick={(event) => handleDetailsClick(event, favoritesBackgroundRef, 'favoritesBackgroundContainer')} >
            Change Favorites Background</summary>
          <div className='background-images-container' id='favoritesBackgroundContainer' >
            {backgroundImages.map((background, index) => (
              <div key={index}
                className='thumbnail-image-div' >
                <img
                  src={background.src}
                  alt={background.name}
                  name='favorites'
                  className={selectedFavoritesBackground === background.name ? 'selected-background' : ''}
                  onClick={handleBackgroundChange} />
              </div>
            ))}
          </div>
        </details>
      </div>
      <div>
        <details id='detailBackgroundDetailsTag' className='user-options-details-tag' ref={detailBackgroundRef} >
          <summary
            id='detailBackground'
            onClick={(event) => handleDetailsClick(event, detailBackgroundRef, 'detailBackgroundContainer')} >
            Change Detail Background</summary>
          <div className='background-images-container' id='detailBackgroundContainer' >
            {backgroundImages.map((background, index) => (
              <div key={index}
                className='thumbnail-image-div' >
                <img
                  src={background.src}
                  alt={background.name}
                  name='detail'
                  className={selectedDetailBackground === background.name ? 'selected-background' : ''}
                  onClick={handleBackgroundChange} />
              </div>
            ))}
          </div>
        </details>
      </div>
      <div>
        <details id='loadingScreenDetailsTag' className='user-options-details-tag' ref={loadingScreenRef} >
          <summary
            id='loadingScreen'
            onClick={(event) => handleDetailsClick(event, loadingScreenRef, 'loadingScreenContainer')} >
            Change Loading Screen</summary>
          <div className='background-images-container' id='loadingScreenContainer' >
            {loadingGifs.map((gif, index) => (
              <div key={index}
                className='thumbnail-image-div' >
                <img
                  src={gif.src}
                  alt={gif.name}
                  name='loading'
                  className={selectedLoadingScreen === gif.name ? 'selected-background' : ''}
                  onClick={handleBackgroundChange} />
              </div>
            ))}
          </div>
        </details>
      </div>
      <details id='changeUserDataDetailsTag' className='user-options-details-tag' ref={changeUserDataRef} >
        <summary id='changeUserData' onClick={handleUserDataChangeClick} >Change User Data</summary>
        <div className='user-data-container' id='UserDataContainer' >
          <form onSubmit={handleUserDataChangeSubmit} >
            <div className='user-data-input-label-container' >
              <label htmlFor='changeName' >Name</label>
              <input
                type='text'
                key='changeName'
                id='changeName'
                name='name'
                value={changeData.name}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.name ? '' : 'invisible'} >{changeDataErrors.name ? `${changeDataErrors.name}` : 'invisible'}</p>
            <div className='user-data-input-label-container' >
              <label htmlFor='changeSurName' >Surname</label>
              <input
                type='text'
                key='changeSurName'
                id='changeSurName'
                name='surName'
                value={changeData.surName}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.surName ? '' : 'invisible'} >{changeDataErrors.surName ? `${changeDataErrors.surName}` : 'invisible'}</p>
            <div className='user-data-input-label-container' >
              <label htmlFor='changeUserName' >Username</label>
              <input
                type='text'
                key='changeUserName'
                id='changeUserName'
                name='userName'
                value={changeData.userName}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.userName ? '' : 'invisible'} >{changeDataErrors.userName ? `${changeDataErrors.userName}` : 'invisible'}</p>
            <div className='user-data-input-label-container' >
              <label htmlFor='changeDateOfBirth' >Date Of Birth</label>
              <input
                type='date'
                key='changeDateOfBirth'
                id='changeDateOfBirth'
                name='dateOfBirth'
                value={changeData.dateOfBirth}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.dateOfBirth ? '' : 'invisible'} >{changeDataErrors.dateOfBirth ? `${changeDataErrors.dateOfBirth}` : 'invisible'}</p>
            <p className={changeDataErrors.userData ? '' : 'invisible'} >{changeDataErrors.userData ? `${changeDataErrors.userData}` : 'invisible'}</p>
            <button
              type='submit'
              className='user-options-button'
              disabled={!isUserDataChanged || (!changeData.name && !changeData.surName && !changeData.userName && !changeData.dateOfBirth) || (changeDataErrors.name || changeDataErrors.surName || changeDataErrors.userName || changeDataErrors.dateOfBirth)} >
              Save
            </button>
          </form>
        </div>
      </details>
      <details id='changeEmailDetailsTag' className='user-options-details-tag' ref={changeEmailRef} >
        <summary
          id='changeEmail'
          onClick={(event) => handleDetailsClick(event, changeEmailRef, 'changeEmailContainer')} >
          Change Email</summary>
        <div className='change-email-container' id='changeEmailContainer'>
          <form onSubmit={handleUserEmailChangeSubmit}  >
            <div className='user-data-input-label-container' >
              <label>Current Email</label>
              <input
                type='email'
                key='changeEmailEmail'
                id='changeEmailEmail'
                name='currentEmail'
                value={changeData.currentEmail}
                autoComplete="off"
                onChange={handleUserDataChange} />
            </div>
            <div className='user-data-input-label-container' >
              <label>New Email</label>
              <input
                type='email'
                key='changeEmailNew'
                id='changeEmailNew'
                name='email'
                value={changeData.email}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.email ? '' : 'invisible'} >{changeDataErrors.email ? `${changeDataErrors.email}` : 'invisible'}</p>
            <div className='user-data-input-label-container' >
              <label>Password</label>
              <input
                type='password'
                key='emailPassword'
                id='emailPassword'
                name='emailPassword'
                value={changeData.emailPassword}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.emailPassword ? '' : 'invisible'} >{changeDataErrors.emailPassword ? `${changeDataErrors.emailPassword}` : 'invisible'}</p>
            <p className={changeDataErrors.changeEmail ? '' : 'invisible'} >{changeDataErrors.changeEmail ? `${changeDataErrors.changeEmail}` : 'invisible'}</p>
            <button
              type='submit'
              className='user-options-button'
              onClick={handleUserEmailChangeSubmit}
              disabled={!changeData.currentEmail || !changeData.email || !changeData.emailPassword || changeDataErrors.currentEmail || changeDataErrors.email || changeDataErrors.emailPassword} >
              Save
            </button>
          </form>
        </div>
      </details>
      <details id='changePasswordDetailsTag' className='user-options-details-tag' ref={changePasswordRef} >
        <summary
          id='changePassword'
          onClick={(event) => handleDetailsClick(event, changePasswordRef, 'changePasswordContainer')} >
          Change Password
        </summary>
        <div className='change-password-container' id='changePasswordContainer' >
          <form onSubmit={handleUserPasswordChangeSubmit} >
            <div className='user-data-input-label-container' >
              <label>Current Password</label>
              <input
                type='password'
                key='passwordPassword'
                id='passwordPassword'
                name='passwordPassword'
                value={changeData.passwordPassword}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.passwordPassword ? '' : 'invisible'} >{changeDataErrors.passwordPassword ? `${changeDataErrors.passwordPassword}` : 'invisible'}</p>
            <div className='user-data-input-label-container' >
              <label>New Password</label>
              <input
                type='password'
                key='changePasswordNew'
                id='changePasswordNew'
                name='password'
                value={changeData.password}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.password ? '' : 'invisible'} >{changeDataErrors.password ? `${changeDataErrors.password}` : 'invisible'}</p>
            <div className='user-data-input-label-container' >
              <label>Repeat New Password</label>
              <input
                type='password'
                key='changePasswordNewRepeat'
                id='changePasswordNewRepeat'
                name='repeatPassword'
                value={changeData.repeatPassword}
                onChange={handleUserDataChange} />
            </div>
            <p className={changeDataErrors.repeatPassword ? '' : 'invisible'} >{changeDataErrors.repeatPassword ? `${changeDataErrors.repeatPassword}` : 'invisible'}</p>
            <p className={changeDataErrors.changePassword ? '' : 'invisible'} >{changeDataErrors.changePassword ? `${changeDataErrors.changePassword}` : 'invisible'}</p>
            <button
              type='submit'
              className='user-options-button'
              disabled={!changeData.passwordPassword || !changeData.password || !changeData.repeatPassword || changeDataErrors.passwordPassword || changeDataErrors.password || changeDataErrors.repeatPassword} >
              Save
            </button>
          </form>
        </div>
      </details>
      <details id='deleteAccountDetailsTag' className='user-options-details-tag' ref={deleteAccountRef} >
        <summary
          id='deleteAccount'
          onClick={(event) => handleDetailsClick(event, deleteAccountRef, 'deleteAccountContainer')} >
          Delete Account
        </summary>
        <div className='delete-account-container' id='deleteAccountContainer' >
          <button
            className='user-options-button'
            onClick={handleDeleteAccountButtonClick} >
            Delete
          </button>
        </div>
      </details>
      <details id='logOutDetailsTag' className='user-options-details-tag' ref={logOutRef} >
        <summary
          id='logOut'
          onClick={(event) => handleDetailsClick(event, logOutRef, 'logOutContainer')} >
          Exit / Log Out
        </summary>
        <div className='log-out-container' id='logOutContainer' >
          <button
            className='user-options-button'
            onClick={handleLogOut} >
            Log Out
          </button>
        </div>
      </details>
      <br /><br />
      {isUserDataModalOpen && <PromptPasswordModal requiresInput={modalMessage.requiresInput} title={modalMessage.title} errorMessage={modalMessage.message} inputName='promptModalPassword' inputValue={changeData.promptModalPassword} handleChange={handleUserDataChange} validationMessage={changeDataErrors.promptModalPassword} handleCloseModal={handleCloseModal} handleSubmit={handleUserDataPasswordSubmit} cancelButtonText={modalMessage.cancelButtonText} submitButtontext={modalMessage.submitButtontext} />}

      {isDeletePromptModalOpen && <PromptPasswordModal requiresInput={modalMessage.requiresInput} title={modalMessage.title} errorMessage={modalMessage.message} inputName='promptModalPassword' inputValue={changeData.promptModalPassword} handleChange={handleUserDataChange} validationMessage={changeDataErrors.promptModalPassword} handleCloseModal={handleCloseModal} handleSubmit={handleDeleteAccountPasswordSubmit} cancelButtonText={modalMessage.cancelButtonText} submitButtontext={modalMessage.submitButtontext} />}

      {isDeleteConfirmationModalOpen && <PromptPasswordModal requiresInput={modalMessage.requiresInput} title={modalMessage.title} errorMessage={modalMessage.message} inputName='promptModalPassword' inputValue={changeData.promptModalPassword} handleChange={handleUserDataChange} validationMessage={changeDataErrors.promptModalPassword} handleCloseModal={handleCloseModal} handleSubmit={handleDeleteAccount} cancelButtonText={modalMessage.cancelButtonText} submitButtontext={modalMessage.submitButtontext} />}

      {isNotificationModalOpen && <NotificationModal title={modalMessage.title} message={modalMessage.message} buttonClassname='user-options-button' handleCloseModal={handleCloseModal} />}

      {(isloadingScreenTested || (loadingGif && isLoading)) && (
        <div className='loading-screen-container' >
          <img src={loadingGif} alt={loadingScreen} className={`loading-screen`} />
        </div>
      )}
    </div>
  )
}