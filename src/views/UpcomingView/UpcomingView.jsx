import { use, useEffect, useState } from "react"
import WatchlistNav from "../../components/WatchlistNavBar/WatchlistNav"
import ShowService from "../../services/ShowService"
import MediaCard from "../../components/MediaCard/MediaCard";
import styles from '../UpcomingView/UpcomingView.module.css'

export default function UpcomingView() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        ShowService.GetUpcomingMovies()
            .then((response) => {
                setUpcomingMovies(response.data.results)
            })
    }, [])

    return (
        <>
            <WatchlistNav />
            <h1>Upcoming Movies</h1>
            <h3>View upcoming movies</h3>
            {/* {JSON.stringify(upcomingMovies)} */}
            <div className={styles.movieGrid}>
                {upcomingMovies.map(
                    (movie) => (
                        <MediaCard media={movie} mediaType="movie" imagewidth={185} title={movie.original_title} />
                    ))}
            </div>
        </>
    )
}