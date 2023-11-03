import React, { useEffect, useState } from "react";
import './Nav.css';
import Button from '../Button/Button';
import { useLocation, useNavigate } from "react-router-dom";
import UserSideBarLeft from "../UserSideBarLeft/UserSideBarLeft";
import OptionsSideBarRight from "../OptionsSideBarRight/OptionsSideBarRight";
import RandomizeAll from "../RandomizeAll/RandomizeAll";
import RandomizeAllFavorites from "../RandomizeAllFavorites/RandomizeAllFavorites";
import backgroundVideo from '../../images/backgroundVideo.mp4';
export default function Nav({ isFiltersBarExtended }) {
    const [randomId, setRandomId] = useState(null);
    const [videoheight, setVideoHeight] = useState('video-retracted');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (randomId) { // Cuando hay un cambio en el estado de randomId
            navigate(`/detail/${randomId}`); // Navega a la página
        }
        setRandomId(null); // Setea el estado a null para que no redirija a la página al volver atras
    }, [randomId, navigate]);

    const handleRandomize = async () => {
        let isValidId = false;
        let newRandomId;
        while (!isValidId) {
            newRandomId = Math.floor(Math.random() * 826) + 1; // Genera un número aleatorio entre 1 y 826 (cantidad de ids)
            isValidId = await validateRandomId(newRandomId); // Devuelve verdadero o falso si la página existe o no
        }
        setRandomId(newRandomId); // Actualiza el estado de randomId
    };
    const validateRandomId = async (id) => { // Los await son para esperar a que fetchee o modifique toda la data 
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`); // Devuelve un objeto de respuesta en forma de promesa 
        const data = await response.json(); // Pasa la respuesta a JSON y devuelve otra promesa 
        return data !== null; // Si data existe devuelve verdadero o falso si no
    };
    useEffect(() => {
        console.log('useEffect Nav');
        console.log(isFiltersBarExtended);
        if (isFiltersBarExtended) {
            setVideoHeight('video-extended');
        } else {
            setVideoHeight('video-retracted');
        }
    }, [isFiltersBarExtended]);

    return (
        <>
            <div className={`navbar-video-container ${videoheight}`} >
                <video src={backgroundVideo} className='navbar-background-video' autoPlay muted loop>
                </video>
            </div>
            <nav className='navBar'>
                <details>
                    <summary>User Options</summary>
                    <UserSideBarLeft />
                    {/* <Button text='Login' /> */}
                </details>
                <Button link='/home' text='Home' />
                <Button link='/favorites' text='Favorites' />
                <Button link='/about' text='About' />
                <button className='menu-button' onClick={handleRandomize} >Randomize</button>
                {location.pathname === '/home' && <RandomizeAll />}
                {location.pathname === '/favorites' && <RandomizeAllFavorites />}
                <div className='space-div'></div>
                <details>
                    <summary>Options</summary>
                    <OptionsSideBarRight />
                </details>
            </nav>
        </>
    );
}