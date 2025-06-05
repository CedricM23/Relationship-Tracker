import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom"
import styles from './nav.module.css'



export default function NavBar(){

    function myFunction() {
    var x = document.getElementById("navlinks");
    if (x.style.display === "block") {
    x.style.display = "none";
    } else {
    x.style.display = "block";
    }
    }

    return(
        <>
        <nav className={styles.navbar}>
            <Link to="/" className={styles.links}>Home</Link>
            <Link to="/dates" className={styles.links}>Our Dates</Link>
            <Link to="/shows" className={styles.links}>Watchlist</Link>
            <Link to="/about-us" className={styles.links}>About us</Link>
        </nav>
        <nav className={styles.mobileTopBar}>
            <button onClick={myFunction} className={styles.mobilemenubutton}>X</button>
            <div className={styles.mobilenavbar} id='navlinks'>
            <Link to="/" className={styles.links}>Home</Link>
            <Link to="/dates" className={styles.links}>Our Dates</Link>
            <Link to="/shows" className={styles.links}>Watchlist</Link>
            <Link to="/about-us" className={styles.links}>About us</Link>
            </div>
        </nav>
    </>
    )
}