import './LoginRegister.css';
import { useEffect, useState } from 'react';
import loginValidation from './loginValidation.js';
import registerValidation from './registerValidation.js';
import mailIcon from '../../assets/icons/mail-outline.svg';
import lockIcon from '../../assets/icons/lock-closed-outline.svg';
import nameIcon from '../../assets/icons/id-card-outline.svg';
import usernameIcon from '../../assets/icons/person-outline.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';
import { useDispatch } from 'react-redux';
import { setAllValues } from '../../redux/actions.js';

export default function LoginRegister() {
  const { createUser, logIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ loginEmail: '', loginPassword: '' });
  const [registerData, setRegisterData] = useState({ name: '', surName: '', userName: '', dateOfBirth: '', registerEmail: '', registerPassword: '', registerPasswordRepeat: '' })
  const [errors, setErrors] = useState({ loginEmail: '', loginPassword: '', name: '', surName: '', userName: '', dateOfBirth: '', registerEmail: '', registerPassword: '', registerPasswordRepeat: '' });
  const [mainError, setMainError] = useState('');

  const handleRegisterInputChange = (event) => {
    const { id, value } = event.target;
    // console.log(id, value);
    setRegisterData({
      ...registerData, // Trae todo lo que ya está en registerData
      [id]: value // Altera el valor con el nombre de la propiedad = [nombrePropiedad]
    });
    setErrors(
      registerValidation({
        ...registerData,
        [id]: value
      }));
  }
  const handleLoginInputChange = (event) => {
    const { id, value } = event.target;
    // console.log(id, value);
    setLoginData({
      ...loginData,
      [id]: value
    });
    setErrors(
      loginValidation({
        ...loginData,
        [id]: value,
      }));
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      createUser(registerData.registerEmail, registerData.registerPassword);
    } catch (error) {
      console.error('Error creating new user', error);
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await logIn(loginData.loginEmail, loginData.loginPassword)
      dispatch(setAllValues(user));
      navigate('/home');
    } catch (error) {
      console.error('Error loging in:', error);
    }
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
              className={loginData.loginEmail ? 'color-input' : ''}
              value={loginData.loginEmail}
              onChange={handleLoginInputChange} />
            <label className={loginData.loginEmail ? 'move-label' : ''} >Email</label>
            <img src={mailIcon} alt="Mail Icon" width="24" height="24" />
          </div>
          <p className={errors.loginEmail ? '' : 'invisible'} >{errors.loginEmail ? `${errors.loginEmail}` : 'invisible'}</p>
          <div className='input-icon-container' >
            <input
              type='password'
              key='loginPassword'
              id='loginPassword'
              className={loginData.loginPassword ? 'color-input' : ''}
              value={loginData.loginPassword}
              onChange={handleLoginInputChange} />
            <label className={loginData.loginPassword ? 'move-label' : ''} >Password</label>
            <img src={lockIcon} alt="Mail Icon" width="24" height="24" />
          </div>
          <p className={errors.loginPassword ? '' : 'invisible'} >{errors.loginPassword ? `${errors.loginPassword}` : 'invisible'}</p>
          <p>{mainError}</p>
          <button
            type='submit'
            disabled={!loginData.loginEmail || !loginData.loginPassword || errors.loginEmail || errors.loginPassword} >
            Login
          </button>
        </form>
      </div>
      <div className='register-container'>
        <h2>Register</h2>
        <form className='register-form' onSubmit={handleRegister} >
          <div className='input-icon-container'>
            <input
              type='text'
              key='name'
              id='name'
              className={registerData.name ? 'color-input' : ''}
              value={registerData.name}
              onChange={handleRegisterInputChange} />
            <label className={registerData.name ? 'move-label' : ''} >Name</label>
            <img src={nameIcon} alt="Name Icon" width="24" height="24" />
          </div>
          <p className={errors.name ? '' : 'invisible'} >{errors.name ? `${errors.name}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='text'
              key='surName'
              id='surName'
              className={registerData.surName ? 'color-input' : ''}
              value={registerData.surName}
              onChange={handleRegisterInputChange} />
            <label className={registerData.surName ? 'move-label' : ''} >Surname</label>
            <img src={nameIcon} alt="Surname Icon" width="24" height="24" />
          </div>
          <p className={errors.surName ? '' : 'invisible'} >{errors.surName ? `${errors.surName}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='text'
              key='userName'
              id='userName'
              className={registerData.userName ? 'color-input' : ''}
              value={registerData.userName}
              onChange={handleRegisterInputChange} />
            <label className={registerData.userName ? 'move-label' : ''} >Username</label>
            <img src={usernameIcon} alt="Username Icon" width="24" height="24" />
          </div>
          <p className={errors.userName ? '' : 'invisible'} >{errors.userName ? `${errors.userName}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='date'
              key='dateOfBirth'
              id='dateOfBirth'
              className={registerData.dateOfBirth ? 'color-input' : ''}
              value={registerData.dateOfBirth}
              onChange={handleRegisterInputChange} />
            <label className={registerData.dateOfBirth ? 'move-label' : ''} >Date Of Birth</label>
          </div>
          <p className={errors.dateOfBirth ? '' : 'invisible'} >{errors.dateOfBirth ? `${errors.dateOfBirth}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='email'
              key='registerEmail'
              id='registerEmail'
              className={registerData.registerEmail ? 'color-input' : ''}
              value={registerData.registerEmail}
              onChange={handleRegisterInputChange} />
            <label className={registerData.registerEmail ? 'move-label' : ''} >Email</label>
            <img src={mailIcon} alt="Mail Icon" width="24" height="24" />
          </div>
          <p className={errors.registerEmail ? '' : 'invisible'} >{errors.registerEmail ? `${errors.registerEmail}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='password'
              key='registerPassword'
              id='registerPassword'
              className={registerData.registerPassword ? 'color-input' : ''}
              value={registerData.registerPassword}
              onChange={handleRegisterInputChange} />
            <label className={registerData.registerPassword ? 'move-label' : ''} >Password</label>
            <img src={lockIcon} alt="Lock Icon" width="24" height="24" />
          </div>
          <p className={errors.registerPassword ? '' : 'invisible'} >{errors.registerPassword ? `${errors.registerPassword}` : 'invisible'}</p>
          <div className='input-icon-container'>
            <input
              type='password'
              key='registerPasswordRepeat'
              id='registerPasswordRepeat'
              className={registerData.registerPasswordRepeat ? 'color-input' : ''}
              value={registerData.registerPasswordRepeat}
              onChange={handleRegisterInputChange} />
            <label className={registerData.registerPasswordRepeat ? 'move-label' : ''} >Repeat Password</label>
            <img src={lockIcon} alt="Lock Icon" width="24" height="24" />
          </div>
          <p className={errors.registerPasswordRepeat ? '' : 'invisible'} >{errors.registerPasswordRepeat ? `${errors.registerPasswordRepeat}` : 'invisible'}</p>
          <button
            type='submit'
            disabled={!registerData.registerEmail || !registerData.registerPassword || !registerData.registerPasswordRepeat ||(errors.name || errors.surName || errors.userName || errors.dateOfBirth || errors.registerEmail || errors.registerPassword || errors.registerPasswordRepeat)} >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}