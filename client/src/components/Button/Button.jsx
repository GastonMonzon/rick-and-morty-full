import './Button.css';
import { NavLink } from "react-router-dom"

export default function Button({ link, text }){
    return(
        <NavLink to={link}>
            <button className='menu-button' >{text}</button>
        </NavLink>
    )
}