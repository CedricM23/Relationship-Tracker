import { useEffect, useState } from "react";
import WatchlistNav from "../../components/WatchlistNavBar/WatchlistNav";
import ShowService from "../../services/ShowService";
import MediaCard from "../../components/MediaCard/MediaCard";

export default function WatchlistView() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    function handleSubmit(event) {
        setSearch(event.target.value)
    }

    useEffect(() => {
        ShowService.SearchQuery(search)
            .then((response) => {
                 setResults(response.data.results || []);
                setLoading(false)
            })
    }, [search])

    return (
        <>
            <WatchlistNav />
            {loading ? "loading" :
                <div>
                    <h1>Watchlist placeholder</h1>
                    <p>A search function will go here</p>
                    <input type="text" onChange={handleSubmit} />
                    <div className={StyleSheet.imagegrid}>
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