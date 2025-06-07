import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ShowService from "../../services/ShowService";
import styles from './MediaDetailView.module.css'
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

export default function MediaDetailView() {
    const { id, type } = useParams();
    const [media, setMedia] = useState([]);
    const [mediavideos, setMediaVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    let hours = Math.floor(media.runtime / 60)
    let time = `${hours}h ${hours % 60}m`

    const imagepath = 'https://image.tmdb.org/t/p/w500'



    useEffect(() => {
        // if its movie then run one block, else run the other one

        if (type === 'TV') {
            // GET SHOW DATA
            ShowService.getShowbyId(id)
                .then((response) => {
                    setMedia(response.data)
                }).catch((error) =>
                    console.log('Shows not found')
                )
            // GET IMAGES
            ShowService.getviedosbyshow(id)
                .then((response) => {
                    setMediaVideos(response.data.results)
                    setLoading(false)
                }).catch((error) =>
                    console.log('Videos not found')
                )
        } else {
            ShowService.getMoviebyId(id)
                .then((response) => {
                    setMedia(response.data)
                    setLoading(false)

                }).catch((error) =>
                    console.log('Movies not found')
                )
        }
    }, [])

    return (
        <>
            {loading ? "loading....." :
                <section>
                    <div className={styles.fullheader}>
                        <div className={styles.header} >
                            <div className={styles.imagesection}>
                                <img className={styles.imageposter} src={`${imagepath}/${media.poster_path}`} alt="" loading="lazy" />
                                <p className={styles.imagecaption}>Watch this {type === "TV" ? 'show' : 'movie'}</p>
                            </div>
                            <div className={styles.mediainfo}>
                                <div className={styles.mediainfotitle}>
                                    <h1 className={styles.medianame}>{media.name ? media.original_name : media.original_title} </h1>
                                    <div className={styles.mediasubtitle}> <p className={styles.mediasubtitledemo}>{type === "TV" ? media.first_air_date : media.release_date} ({media.origin_country})</p> {type === "TV" ? <></> : <section className={styles.genres}> • <div className={styles.genremap}>{media.genres && media.genres.map((med, index) => (<div className={styles.genretext}>{med.name}{index < media.genres.length - 1 ? ', ' : ''}</div>))}</div> • {time} </section>}</div>
                                </div>
                                <p className={styles.rating}>
                                    {Math.round(media.vote_average / 10 * 100)}%
                                </p>
                                <div className={styles.headerbuttons}>
                                    <button className={styles.headerbutton}>
                                        <FontAwesomeIcon icon={faList} />
                                    </button>
                                    <button className={styles.headerbutton}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                    <button className={styles.headerbutton}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </button>
                                </div>
                                <h2 className={styles.overviewtitle}>Overview</h2>
                                <p className={styles.overview}>{media.overview}</p>
                            </div>
                        </div>
                    </div>

                    {mediavideos.length > 0 ?
                        <div>
                            <h1 className={styles.videosheader}>Clips : {mediavideos.length} </h1>
                            <div className={styles.videogrid} >
                                {mediavideos.map(
                                    (video, index) => (
                                        <div>
                                            <iframe
                                                width="560"
                                                height="315"
                                                className={styles.showVideos}
                                                src={`https://www.youtube.com/embed/${video.key}`}
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )
                                )}
                            </div>
                        </div> : <></>}
                </section>
            }
        </>
    )

}