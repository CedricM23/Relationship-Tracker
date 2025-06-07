import { useEffect, useState } from "react";
import WatchlistNav from "../../components/WatchlistNavBar/WatchlistNav";
import ShowService from "../../services/ShowService";
import MediaCard from "../../components/MediaCard/MediaCard";
import styles from './WatchlistView.module.css'

export default function WatchlistView() {
    const [search, setSearch] = useState("plce");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    function handleSubmit(event) {
        setSearch(event.target.value)
    }

   useEffect(() => {
    async function fetchData() {
        try {
            const movieRes = await ShowService.SearchQuery(search);
            const tvRes = await ShowService.tvSearchQuery(search);
            
            const movieResults = movieRes.data.results || [];
            const tvResults = tvRes.data.results || [];

            setResults([...movieResults, ...tvResults]);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    if (search.trim() !== "") {
        fetchData();
    } else {
        setResults([]);
        setLoading(false);
    }
}, [search]);


    return (
        <>
            <WatchlistNav />
            {loading ? "loading" :
                <div>
                    <h1>Watchlist placeholder</h1>
                    <div className={styles.searchsection}>
                    <div className={styles.section}></div>
                    <input type="text" className={styles.searchbar} onChange={handleSubmit} placeholder="Search for Tv Shows or Movies" />
                    <div className={styles.section}></div>
                    </div>
                    <div className={styles.imagegrid}>
                    {results.map(
                        (result) => (
                            <MediaCard key={result.id} media={result} imagewidth={185} title={result.name? result.name: result.original_title} />
                        )
                    )}
                </div>
                </div>
            }
        </>
    )
}