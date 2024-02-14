import { useRef, useState } from 'react';
import './UserSideBarLeft.css'
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
import { changeBackground } from '../../redux/actions';
import { useNavigate } from 'react-router';
import dataValidation from '../../dataValidation.js';

export default function UserSideBarLeft() {
  const videoRef = useRef(null);
  const { userInfo, userOptions, logOut } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeData, setChangeData] = useState({ name: '', surName: '', userName: '', dateOfBirth: '', email: '', changeEmailPassword: '', changePasswordPassword: '', password: '', repeatPassword: '' });
  const [changeDataErrors, setChangeDataErrors] = useState({ name: '', surName: '', userName: '', dateOfBirth: '', email: '', changeEmailPassword: '', changePasswordPassword: '', password: '', repeatPassword: '' });
  const selectedHomeBackground = useSelector((state) => state.homeBackground);
  const selectedFavoritesBackground = useSelector((state) => state.favoritesBackground);
  const selectedDetailBackground = useSelector((state) => state.detailBackground);
  const selectedLoadingScreen = useSelector((state) => state.loadingScreen);

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

  // (function loadUserInfo() {
  // const nameInput = document.getElementById('changeName');
  // const surNameInput = document.getElementById('changeSurName');
  // const userNameInput = document.getElementById('changeUserName');
  // const dateOfBirthInput = document.getElementById('changeDateOfBirth');
  // nameInput.textContent(userInfo.name);
  // surNameInput.textContent(userInfo.surName);
  // userNameInput.textContent(userInfo.userName);
  // dateOfBirthInput.textContent(userInfo.dateOfBirth);
  // })();

  const handleBackgroundChange = (event) => {
    const { name, alt } = event.target;
    dispatch(changeBackground({ name: name, alt: alt }))
  }

  const handleUserInfoChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setChangeData({
      ...changeData,
    });
    setChangeDataErrors(
      dataValidation({
        ...changeData,
        [name]: value
      }));
  }
  const handleUserInfoChangeSubmit = () => {

  }
  const handleUserEmailChangeSubmit = () => {

  }
  const handleUserPasswordChangeSubmit = () => {

  }
  const handleLogOut = () => {
    try {
      logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='user-sidebar' id='user-sidebar' >
      <div className='video-container-user-options'>
        <video ref={videoRef} src={userBackgroundVideo} id='user-options-background-video' autoPlay muted loop>
        </video>
      </div>
      <div className='video-container2-user-options'>
        <video ref={videoRef} src={userBackgroundVideo} id='user-options-background-video2' autoPlay muted loop>
        </video>
      </div>
      <h4>Autosave</h4>
      <div className='autosave-option-container' >
        <label>Search & Search Options</label>
        <button className='user-options-button' >On</button>
      </div>
      <div className='autosave-option-container' >
        <label>Selected Filters</label>
        <button className='user-options-button'>On</button>
      </div>
      <div className='autosave-option-container' >
        <label>View Options</label>
        <button className='user-options-button'>On</button>
      </div>
      <h4>Load Last Save / Save Options</h4>
      <label>Search & Search Options</label>
      <div className='autosave-option-container' >
        <button className='user-options-button' >Load</button>
        <button className='user-options-button' >Save</button>
      </div>
        <label>Selected Filters</label>
      <div className='autosave-option-container' >
        <button className='user-options-button' >Load</button>
        <button className='user-options-button' >Save</button>
      </div>
        <label>View Options</label>
      <div className='autosave-option-container' >
        <button className='user-options-button' >Load</button>
        <button className='user-options-button' >Save</button>
      </div>
      <div>
        <details>
          <summary>Change User Image</summary>
        </details>
      </div>
      <div>
        <details>
          <summary>Change Home Background</summary>
          <div className='background-images-container' >
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
        <details>
          <summary>Change Favorites Background</summary>
          <div className='background-images-container' >
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
        <details>
          <summary>Change Detail Background</summary>
          <div className='background-images-container' >
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
        <details>
          <summary>Change Loading Screen</summary>
          <div className='background-images-container' >
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
      <details>
        <summary>Change User Info</summary>
        <form onSubmit={handleUserInfoChangeSubmit} >
          <div className='user-info-input-label-container' >
            <label>Name</label>
            <input
              type='text'
              key='changeName'
              id='changeName'
              name='name'
              value={changeData.name}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.name ? '' : 'invisible'} >{changeDataErrors.name ? `${changeDataErrors.name}` : 'invisible'}</p>
          <div className='user-info-input-label-container' >
            <label>Surname</label>
            <input
              type='text'
              key='changeSurName'
              id='changeSurName'
              name='surName'
              value={changeData.surName}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.surName ? '' : 'invisible'} >{changeDataErrors.surName ? `${changeDataErrors.surName}` : 'invisible'}</p>
          <div className='user-info-input-label-container' >
            <label>Username</label>
            <input
              type='text'
              key='changeUserName'
              id='changeUserName'
              name='userName'
              value={changeData.userName}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.userName ? '' : 'invisible'} >{changeDataErrors.userName ? `${changeDataErrors.userName}` : 'invisible'}</p>
          <div className='user-info-input-label-container' >
            <label>Date Of Birth</label>
            <input
              type='date'
              key='changeDateOfBirth'
              id='changeDateOfBirth'
              name='dateOfBirth'
              value={changeData.dateOfBirth}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.dateOfBirth ? '' : 'invisible'} >{changeDataErrors.dateOfBirth ? `${changeDataErrors.dateOfBirth}` : 'invisible'}</p>
          <button
            type='submit'
            className='user-options-button' >
            Save
          </button>
        </form>
      </details>
      <details>
        <summary>Change Email</summary>
        <form autoComplete='off' onSubmit={handleUserEmailChangeSubmit} >
          <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
          <div className='user-info-input-label-container' >
            <label>New Email</label>
            <input
              type='email'
              key='changeEmail'
              id='changeEmail'
              name='email'
              autoComplete='false'
              value={changeData.email}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.email ? '' : 'invisible'} >{changeDataErrors.email ? `${changeDataErrors.email}` : 'invisible'}</p>
          <div className='user-info-input-label-container' >
            <label>Password</label>
            <input
              type='password'
              key='changeEmailPassword'
              id='changeEmailPassword'
              name='changeEmailPassword'
              autoComplete='false'
              value={changeData.changeEmailPassword}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.changeEmailPassword ? '' : 'invisible'} >{changeDataErrors.changeEmailPassword ? `${changeDataErrors.changeEmailPassword}` : 'invisible'}</p>
          <button
            type='submit'
            className='user-options-button' >
            Save
          </button>
        </form>
      </details>
      <details>
        <summary>Change Password</summary>
        <form autoComplete='off' onSubmit={handleUserPasswordChangeSubmit} >
          <div className='user-info-input-label-container' >
            <label>Current Password</label>
            <input
              type='password'
              key='changePasswordPassword'
              id='changePasswordPassword'
              name='changePasswordPassword'
              autoComplete='false'
              value={changeData.changePasswordPassword}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.changePasswordPassword ? '' : 'invisible'} >{changeDataErrors.changePasswordPassword ? `${changeDataErrors.changePasswordPassword}` : 'invisible'}</p>
          <div className='user-info-input-label-container' >
            <label>New Password</label>
            <input
              type='password'
              key='changePasswordNew'
              id='changePasswordNew'
              name='password'
              autoComplete='false'
              value={changeData.password}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.password ? '' : 'invisible'} >{changeDataErrors.password ? `${changeDataErrors.password}` : 'invisible'}</p>
          <div className='user-info-input-label-container' >
            <label>Repeat New Password</label>
            <input
              type='password'
              key='changePasswordNewRepeat'
              id='changePasswordNewRepeat'
              name='repeatPassword'
              autoComplete='false'
              value={changeData.repeatPassword}
              onChange={handleUserInfoChange} />
          </div>
          <p className={changeDataErrors.repeatPassword ? '' : 'invisible'} >{changeDataErrors.repeatPassword ? `${changeDataErrors.repeatPassword}` : 'invisible'}</p>
          <button
            type='submit'
            className='user-options-button' >
            Save
          </button>
        </form>
      </details>
      <button
        className='user-options-button'
        onClick={handleLogOut} >
        Log Out
      </button>
    </div>
  )
}