import styles from './Button.module.css';
import { NavLink } from "react-router-dom"

export default function Button({ link, text }){
    return(
        <NavLink to={link}>
            <button className={styles.menuButton} >{text}</button>
        </NavLink>
    )
}