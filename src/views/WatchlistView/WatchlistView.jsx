import { useEffect, useState } from "react";
import WatchlistNav from "../../components/WatchlistNavBar/WatchlistNav";
import ShowService from "../../services/ShowService";
import MediaCard from "../../components/MediaCard/MediaCard";
import styles from './WatchlistView.module.css'
import PersonCard from "../../components/PersonCard/PersonCard";

export default function WatchlistView() {
    const [search, setSearch] = useState("plce");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState([])
    const [shows, setShows] = useState([])

    function handleSubmit(event) {
        setSearch(event.target.value)
    }

    //might have to refactor, results are slow, maybe to due to item status liked check

   useEffect(() => {
    async function fetchData() {
        try {
            const movieRes = await ShowService.SearchQuery(search);
            const tvRes = await ShowService.tvSearchQuery(search);
            const pepRes = await ShowService.personSearchQuery(search)
            
            const movieResults = movieRes.data.results || [];
            const tvResults = tvRes.data.results || [];
            const peopleResults = pepRes.data.results || []

            setResults(movieResults);
            setPerson(peopleResults)
            setShows(tvResults)

        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
            setPerson([])
        } finally {
            setLoading(false);
        }
    }

    if (search.trim() !== "") {
        fetchData();
    } else {
        setResults([]);
        setPerson([])
        setLoading(false);
    }
}, [search]);


    return (
        <>
            <WatchlistNav />
            {loading ? "loading" :
                <div>
                    <div className={styles.searchsection}>
                    <div className={styles.section}></div>
                    <input type="text" className={styles.searchbar} onChange={handleSubmit} placeholder="Search for Tv Shows or Movies or People" />
                    <div className={styles.section}></div>
                    </div>
                    <div className={styles.imagegrid}>
                    {results.map(
                        (result) => (
                            <MediaCard key={result.id} media={result} imagewidth={185} title={result.name? result.name: result.original_title} mediaType="movie"/>
                        )
                    )}
                    {shows.map(
                        (result) => (
                             <MediaCard key={result.id} media={result} imagewidth={185} title={result.name? result.name: result.original_title}  mediaType="tv"/>
                        )
                    )}

                   
                    {person.map(
                        (result) =>
                           <PersonCard person={result}/>
                    )}
                </div>
                </div>
            }
        </>
    )
}