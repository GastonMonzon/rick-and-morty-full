import './LoginRegister.css';
import { useState } from 'react';
import dataValidation from '../../dataValidation.js';
import mailIcon from '../../assets/icons/mail-outline.svg';
import lockIcon from '../../assets/icons/lock-closed-outline.svg';
import nameIcon from '../../assets/icons/id-card-outline.svg';
import usernameIcon from '../../assets/icons/person-outline.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useDispatch } from 'react-redux';
import { favoritesIcon, setAllValues } from '../../redux/actions.js';
import NotificationModal from '../NotificationModal/NotificationModal.jsx';

export default function LoginRegister() {
  const { createUser, logIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', surName: '', userName: '', dateOfBirth: '', email: '', password: '', repeatPassword: '' });
  const [registerErrors, setRegisterErrors] = useState({ name: '', surName: '', userName: '', dateOfBirth: '', email: '', password: '', repeatPassword: '' });
  const [loginErrors, setLoginErrors] = useState({ email: '', password: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', message: '' });

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
    setRegisterErrors(
      dataValidation({
        ...registerData,
        [name]: value
      }));
  }
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    setLoginErrors(
      dataValidation({
        ...loginData,
        [name]: value,
      }));
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await createUser(registerData);
      setModalMessage({ title: 'Success', message: response?.data?.message || '' });
      setIsModalOpen(true);
      setLoginData({ email: registerData.email, password: registerData.password });
      setLoginErrors({ email: '', password: '' });
      setRegisterData({ name: '', surName: '', userName: '', dateOfBirth: '', email: '', password: '', repeatPassword: '' });
    } catch (error) {
      setModalMessage({ title: 'Error registering user', message: error?.response?.data?.error?.code || '' });
      setIsModalOpen(true);
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await logIn(loginData.email, loginData.password);
      setLoginData({ email: '', password: '' });
      dispatch(setAllValues(user));
      navigate('/home');
    } catch (error) {
      setModalMessage({ title: 'Error logging in', message: error?.response?.data?.error?.code || '' });
      setIsModalOpen(true);
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='login-register-container'>
      <div className='login-container'>
        <h2>Login</h2>
        <form className='login-form' onSubmit={handleLogin} >
          <div className='input-icon-container'>
            <input
              type='email'
              key='loginEmail'
              id='loginEmail'
              name='email'
              className={loginData.email ? 'color-input' : ''}
              value={loginData.email}
              onChange={handleLoginInputChange} />
            <label className={loginData.email ? 'move-label' : ''} >Email</label>
            <img src={mailIcon} alt="Mail Icon" width="24" height="24" />
          </div>
          <p className={loginErrors.email ? '' : 'invisible'} >{loginErrors.email ? `${loginErrors.email}` : 'invisible'}</p>
          <div className='input-icon-container' >
            <input
              type='password'
              key='loginPassword'
              id='loginPassword'
              name='password'
              className={loginData.password ? 'color-input' : ''}
              value={loginData.password}
              onChange={handleLoginInputChange} />
            <label className={loginData.password ? 'move-label' : ''} >Password</label>
            <img src={lockIcon} alt="Mail Icon" width="24" height="24" />
          </div>
          <p className={loginErrors.password ? '' : 'invisible'} >{loginErrors.password ? `${loginErrors.password}` : 'invisible'}</p>
          <button
            type='submit'
            disabled={!loginData.email || !loginData.password || loginErrors.email || loginErrors.password} >
            Login
          </button>
        </form>
      </div>
      <div className='register-container'>
        <h2>Register</h2>
        <form className='register-form' onSubmit={handleRegister} noValidate={true} >
          <div className='input-icon-container'>
            <input
              type='text'
              key='registerName'
              id='registerName'
              name='name'
              className={registerData.name ? 'color-input' : ''}
              value={registerData.name}
              onChange={handleRegisterInputChange} />
            <label className={registerData.name ? 'move-label' : ''} >Name</label>
            <img src={nameIcon} alt="Name Icon" width="24" height="24" />
          </div>
          <p className={registerErrors.name ? '' : 'invisible'} >{registerErrors.name ? `${registerErrors.name}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='text'
              key='registerSurName'
              id='registerSurName'
              name='surName'
              className={registerData.surName ? 'color-input' : ''}
              value={registerData.surName}
              onChange={handleRegisterInputChange} />
            <label className={registerData.surName ? 'move-label' : ''} >Surname</label>
            <img src={nameIcon} alt="Surname Icon" width="24" height="24" />
          </div>
          <p className={registerErrors.surName ? '' : 'invisible'} >{registerErrors.surName ? `${registerErrors.surName}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='text'
              key='registerUserName'
              id='registerUserName'
              name='userName'
              className={registerData.userName ? 'color-input' : ''}
              value={registerData.userName}
              onChange={handleRegisterInputChange} />
            <label className={registerData.userName ? 'move-label' : ''} >Username</label>
            <img src={usernameIcon} alt="Username Icon" width="24" height="24" />
          </div>
          <p className={registerErrors.userName ? '' : 'invisible'} >{registerErrors.userName ? `${registerErrors.userName}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='date'
              key='registerDateOfBirth'
              id='registerDateOfBirth'
              name='dateOfBirth'
              className={registerData.dateOfBirth ? 'color-input' : ''}
              value={registerData.dateOfBirth}
              onChange={handleRegisterInputChange} />
            <label className={registerData.dateOfBirth ? 'move-label' : ''} >Date Of Birth</label>
          </div>
          <p className={registerErrors.dateOfBirth ? '' : 'invisible'} >{registerErrors.dateOfBirth ? `${registerErrors.dateOfBirth}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='email'
              key='registerEmail'
              id='registerEmail'
              name='email'
              className={registerData.email ? 'color-input' : ''}
              value={registerData.email}
              onChange={handleRegisterInputChange} />
            <label className={registerData.email ? 'move-label' : ''} >Email</label>
            <img src={mailIcon} alt="Mail Icon" width="24" height="24" />
          </div>
          <p className={registerErrors.email ? '' : 'invisible'} >{registerErrors.email ? `${registerErrors.email}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='password'
              key='registerPassword'
              id='registerPassword'
              name='password'
              className={registerData.password ? 'color-input' : ''}
              value={registerData.password}
              onChange={handleRegisterInputChange} />
            <label className={registerData.password ? 'move-label' : ''} >Password</label>
            <img src={lockIcon} alt="Lock Icon" width="24" height="24" />
          </div>
          <p className={registerErrors.password ? '' : 'invisible'} >{registerErrors.password ? `${registerErrors.password}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='password'
              key='registerRepeatPassword'
              id='registerRepeatPassword'
              name='repeatPassword'
              className={registerData.repeatPassword ? 'color-input' : ''}
              value={registerData.repeatPassword}
              onChange={handleRegisterInputChange} />
            <label className={registerData.repeatPassword ? 'move-label' : ''} >Repeat Password</label>
            <img src={lockIcon} alt="Lock Icon" width="24" height="24" />
          </div>
          <p className={registerErrors.repeatPassword ? '' : 'invisible'} >{registerErrors.repeatPassword ? `${registerErrors.repeatPassword}` : 'invisible'}</p>
          <button
            type='submit'
            disabled={!registerData.email || !registerData.password || !registerData.repeatPassword || (registerErrors.name || registerErrors.surName || registerErrors.userName || registerErrors.dateOfBirth || registerErrors.email || registerErrors.password || registerErrors.repeatPassword)} >
            Register
          </button>
        </form>
      </div>
      {isModalOpen &&
        <NotificationModal
          title={modalMessage.title}
          message={modalMessage.message}
          buttonClassname='modal-login-button'
          handleCloseModal={handleCloseModal} />}
    </div>
  )
}