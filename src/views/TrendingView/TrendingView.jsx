import { useEffect, useState } from "react"
import ShowService from "../../services/ShowService.js"
import MediaCard from "../../components/MediaCard/MediaCard.jsx"
import styles from './TrendingView.module.css'
import WatchlistNav from "../../components/WatchlistNavBar/WatchlistNav.jsx"

export default function TrendingView() {
    const [media, setMedia] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const [showFilter, setShowFilter] = useState("today");

    function handleShowFilterChange(e) {
        setShowFilter(e.target.value);
    }

    useEffect(() => {
        if (showFilter === "today") {
            ShowService.trendingToday()
                .then((response) => {
                    setMedia(response.data.results)
                    setLoading(false)
                }).catch((error) =>
                    console.log("Could not get today's shows")
                )
        } else if (showFilter === "popular") {
            ShowService.getPopularShows()
                .then((response) => {
                    setMedia(response.data.results)
                    setLoading(false)
                }).catch((error) =>
                    console.log("Could not get popular shows")
                )
        }
        ShowService.getPopularMovies()
            .then((response) => {
                setMovies(response.data.results)
                setLoading(false)
            }).catch((error) =>
                    console.log("Could not get popular movies")
                )
    }, [showFilter])

    return (
        <>
            <WatchlistNav />

            <div className={styles.container}>
                <section className={styles.header}>
                    <div className={styles.leftsection}></div>
                    <h1 className={styles.sectiontitle}>Trending Tv Shows</h1>
                    <div className={styles.filtersection}>
                        <label htmlFor="filter">Filter : </label>
                        <select className={styles.filter} name="filter" id="Showfilter" onChange={handleShowFilterChange}>
                            <option value="today">Today</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                </section>
                {loading ? 'loading...' :
                    <div className={styles.mediagrid}>
                        {media.map(
                            (media) => (
                                <MediaCard key={media.id} media={media} imagewidth={185} title={media.name} mediaType='TV' />
                            )
                        )}
                    </div>
                }
                <div id="Trending Movies">
                    <section className={styles.header}>
                        <div className={styles.leftsection}></div>
                        <h1 className={styles.sectiontitle}>Trending Movies</h1>
                        <div className={styles.filtersection}>
                        </div>
                    </section>
                    {loading ? 'loading' :
                        <div className={styles.mediagrid}>
                            {movies.map(
                                (movie) => (
                                    <MediaCard key={media.id} media={movie} imagewidth={185} title={movie.original_title} mediaType='MOVIE' />
                                )
                            )}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}