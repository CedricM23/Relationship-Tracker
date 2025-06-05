import { useEffect, useState } from "react"
import ShowService from "../../services/ShowService"
import MediaCard from "../../components/MediaCard/MediaCard"
import styles from './Watchlistview.module.css'
import WatchlistNav from "../../components/WatchlistNavBar/WatchlistNav.jsx"

export default function WatchlistView() {
    const [media, setMedia] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        ShowService.trendingToday()
            .then((response) => {
                setMedia(response.data.results)
            })
        ShowService.getPopularMovies()
            .then((response) => {
                setMovies(response.data.results)
            })
    }, [])

    return (
        <>
            <WatchlistNav />
            <div className={styles.container}>
                <section className={styles.header}>
                    <div className={styles.leftsection}></div>
                    <h1 className={styles.sectiontitle}>Trending Tv Shows</h1>
                    <div className={styles.filtersection}>
                        <label htmlFor="filter">Filter : </label>
                        <select className={styles.filter} name="filter" id="filter">
                            <option value="Today">Today</option>
                        </select>
                    </div>
                </section>
                <div className={styles.mediagrid}>
                    {media.map(
                        (media) => (
                            <MediaCard key={media.id} media={media} imagewidth={185} title={media.name} mediaType='TV'/>
                        )
                    )}
                </div>
                <div id="Trending Movies">
                    <section className={styles.header}>
                        <div className={styles.leftsection}></div>
                        <h1 className={styles.sectiontitle}>Trending Movies</h1>
                        <div className={styles.filtersection}>
                            <label htmlFor="filter">Filter : </label>
                            <select className={styles.filter} name="filter" id="filter">
                                <option value="Today">Popular</option>
                            </select>
                        </div>
                    </section>
                    <div className={styles.mediagrid}>
                        {movies.map(
                            (movie) => (
                                <MediaCard key={media.id} media={movie} imagewidth={185} title={movie.original_title} mediaType = 'MOVIE' />
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}