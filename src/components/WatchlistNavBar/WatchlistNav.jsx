import { Link } from "react-router-dom"
import styles from './WatchlistNav.module.css'

export default function WatchlistNav(){
    return(
    <nav className={styles.navbar}>
        <Link to='/movies' className={styles.links}>Movies</Link>
        <Link to='/shows' className={styles.links}>Tv Shows</Link>
        <Link to='/trending' className={styles.links}>Trending</Link>
        <Link to='/favorites' className={styles.links}>Favorites</Link>
    </nav>
    )
}