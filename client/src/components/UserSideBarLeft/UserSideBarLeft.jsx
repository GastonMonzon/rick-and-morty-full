import { useRef } from 'react';
import './UserSideBarLeft.css'
import userBackgroundVideo from '../../assets/videos/optionsBackgroundVideo.mp4';
import { useAuth } from '../../context/AuthContext';

export default function UserSideBarLeft() {
  const videoRef = useRef(null);
  const { userOptions } = useAuth();

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
        <label>Change Image</label>
        <div>
          {}
        </div>
      </div>
      <div>
        <label>Change Home Background</label>
      </div>
      <div>
        <label>Change Favorites Background</label>
      </div>
      <div>
        <label>Change Detail Background</label>
      </div>
      <details>
        <summary>Change User Info</summary>
        <div className='user-info-input-label-container' >
          <label>Name</label>
          <input
            type='text'
            key='name'
            id='name'
            value={userOptions.name}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Surname</label>
          <input
            type='text'
            key='surName'
            id='surName'
            value={userOptions.surName}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Username</label>
          <input
            type='text'
            key='userName'
            id='userName'
            value={userOptions.userName}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Date Of Birth</label>
          <input
            type='date'
            key='dateOfBirth'
            id='dateOfBirth'
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
            key='registerEmail'
            id='registerEmail'
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
            key='registerPassword'
            id='registerPassword'
            value={userOptions.password}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>New Password</label>
          <input
            type='password'
            key='registerPassword'
            id='registerPassword'
            value={userOptions.password}
            onChange={handleUserInfoChange} />
        </div>
        <div className='user-info-input-label-container' >
          <label>Repeat New Password</label>
          <input
            type='password'
            key='registerPasswordRepeat'
            id='registerPasswordRepeat'
            value={userOptions.password}
            onChange={handleUserInfoChange} />
        </div>
      </details>
    </div>
  )
}