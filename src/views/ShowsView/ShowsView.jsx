import { useEffect, useState } from "react";
import WatchlistNav from "../../components/WatchlistNavBar/WatchlistNav";
import ShowService from "../../services/ShowService";
import MediaCard from "../../components/MediaCard/MediaCard";

export default function ShowsView(){
    const [shows, setShows] = useState([])

    useEffect(() => {
        ShowService.DiscoverShows()
        .then((response) => {
            setShows(response.data.results)
        })
    }, [])

    return (
        <>
        <WatchlistNav />
        <h1>Shows PlaceHolder</h1>
        {/* {JSON.stringify(shows)} */}
        {shows.map(
            (show, index) => (
                // poster_path not working
                <MediaCard key={index} media={show} title={show.name} mediaType="tv"/>
            )
        )}
        </>
    )
}