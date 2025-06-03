import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom"
import styles from './nav.module.css'

export default function NavBar(){
    return(
        <nav className={styles.navbar}>
            <Link to="/" className={styles.links}>Home</Link>
            <Link to="/dates" className={styles.links}>Our Dates</Link>
            <Link to ="/pictures" className={styles.links}>Images</Link>
            <Link to="/shows" className={styles.links}>Our Shows & Movies</Link>
            <Link to="/shows" className={styles.links}>About us</Link>
        </nav>
    )
}