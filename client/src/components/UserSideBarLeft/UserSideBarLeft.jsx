import { useRef } from 'react';
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

export default function UserSideBarLeft() {
  const videoRef = useRef(null);
  const { userOptions } = useAuth();

  const backgroundImages = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    backgroundVideo1,
    backgroundVideo2
  ];

  const loadingGifs = [
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
    loading17,
    loading15,
    loading19,
    loading14,
    loading16,
    loading18,
    loading13
  ];

  const handleUserInfoChange = () => {

  }

  return (
    <div className='user-sidebar'>
      <div className='video-container-user-options'>
        <video ref={videoRef} src={userBackgroundVideo} id='user-options-background-video' autoPlay muted loop>
        </video>
      </div>
      <div className='video-container2-user-options'>
        <video ref={videoRef} src={userBackgroundVideo} id='user-options-background-video2' autoPlay muted loop>
        </video>
      </div>
      <div>
        <label>Change User Image</label>
      </div>
      <div>
        <label>Change Home Background</label>
        <div className='background-images-container' >
          {backgroundImages.map((background, index) => (
            <div key={index}
              className='thumbnail-image-div' >
              <img src={background} alt={background} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Change Favorites Background</label>
        <div className='background-images-container' >
          {backgroundImages.map((background, index) => (
            <div key={index}
              className='thumbnail-image-div' >
              <img src={background} alt={background} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Change Detail Background</label>
        <div className='background-images-container' >
          {backgroundImages.map((background, index) => (
            <div key={index}
              className='thumbnail-image-div' >
              <img src={background} alt={background} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Change Loading Screen</label>
        <div className='background-images-container' >
          {loadingGifs.map((gif, index) => (
            <div key={index}
              className='thumbnail-image-div' >
              <img src={gif} alt={gif} />
            </div>
          ))}
        </div>
      </div>
      <details>
        <summary>Change User Info</summary>
        <div className='user-info-input-label-container' >
          <label>Name</label>
          <input
            type='text'
            key='changeName'
            id='changeName'
            value={userOptions.name}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Surname</label>
          <input
            type='text'
            key='changeSurName'
            id='changeSurName'
            value={userOptions.surName}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Username</label>
          <input
            type='text'
            key='changeUserName'
            id='changeUserName'
            value={userOptions.userName}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Date Of Birth</label>
          <input
            type='date'
            key='changeDateOfBirth'
            id='changeDateOfBirth'
            value={userOptions.dateOfBirth}
            onChange={handleUserInfoChange} />
        </div>
      </details>
      <details>
        <summary>Change Email</summary>
        <div className='user-info-input-label-container' >
          <label>Email</label>
          <input
            type='email'
            key='changeEmail'
            id='changeEmail'
            value={userOptions.email}
            onChange={handleUserInfoChange} />
        </div>
      </details>
      <details>
        <summary>Change Password</summary>
        <div className='user-info-input-label-container' >
          <label>Old Password</label>
          <input
            type='password'
            key='changePasswordOld'
            id='changePasswordOld'
            value={userOptions.password}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>New Password</label>
          <input
            type='password'
            key='changePasswordNew'
            id='changePasswordNew'
            value={userOptions.password}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Repeat New Password</label>
          <input
            type='password'
            key='changePasswordNewRepeat'
            id='changePasswordNewRepeat'
            value={userOptions.password}
            onChange={handleUserInfoChange} />
        </div>
      </details>
    </div>
  )
}