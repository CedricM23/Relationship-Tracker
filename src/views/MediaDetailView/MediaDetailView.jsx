import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ShowService from "../../services/ShowService";
import styles from './MediaDetailView.module.css'
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import './popup.css'

export default function MediaDetailView() {
    const { id, type } = useParams();
    const [media, setMedia] = useState([]);
    const [mediavideos, setMediaVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([])
    let hours = Math.floor(media.runtime / 60)
    let time = `${hours}h ${hours % 60}m`
    const [statusMessage, setStatusMessage] = useState([])

    const payload = { items: [
        {
        media_type: type,
        media_id: id
        }
    ]}
    let selectedListId;

    const imagepath = 'https://image.tmdb.org/t/p/w500'



    useEffect(() => {
        // if its movie then run one block, else run the other one

        if (type === 'tv') {
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
        ShowService.getlists()
            .then((response) => {
                setLists(response.data.results)
            }).catch((error) => {
                alert('Could not get your lists! please try again!')
            })
    }, [])

    function handleChange(e){
        //not correctly getting if the item is in the list or not (commented out code is broken)
        const selectedListId = e.target.value;

        // ShowService.isMediaAlreadyInList(selectedListId, id, type)
        // .then((response) => {
        //     setStatusMessage(response.data)
        //     //try the If/Then statement here
        // })

        
        // if(statusMessage.status_message == "Success."){
        //         if(type === "tv"){
        //         alert(`${media.name} is already in`)
        //     } else if (type === "movie"){
        //         alert(`${media.title} is already in`)
        //     }
        // } else if (statusMessage.success == "false"){
             ShowService.addItemTolist(selectedListId, payload).then(
            (response) => {
                if(type === "tv"){
                alert(`${media.name} was added to your list`)
            } else if (type === "movie"){
                alert(`${media.title} was added to your list`)
            }
            }
        // ).catch((error) => {
        //     if (error.status == 403){
        //             alert(`${media.name} was not added to your list! Please Try again!`)
        //         }
        //     }
        )
    }
// }

    return (
        <>
            {loading ? "loading....." :
                <section>
                    <p style={{color : 'red', fontSize: '20px'}}>DOES NOT CHECK IF YOU ALREADY ADDED MEDIA TO A LIST.</p>

                    <div className={styles.fullheader}>
                        <div className={styles.header} >
                            <div className={styles.imagesection}>
                                <img className={styles.imageposter} src={`${imagepath}/${media.poster_path}`} alt="" loading="lazy" />
                                <p className={styles.imagecaption}>Watch this {type === "tv" ? 'show' : 'movie'}</p>
                            </div>
                            <div className={styles.mediainfo}>
                                <div className={styles.mediainfotitle}>
                                    <h1 className={styles.medianame}>{media.name ? media.original_name : media.original_title} </h1>
                                    <div className={styles.mediasubtitle}> <p className={styles.mediasubtitledemo}>{type === "tv" ? media.first_air_date : media.release_date} ({media.origin_country})</p> {type === "TV" ? <></> : <section className={styles.genres}> • <div className={styles.genremap}>{media.genres && media.genres.map((med, index) => (<div className={styles.genretext}>{med.name}{index < media.genres.length - 1 ? ', ' : ''}</div>))}</div> • {time} </section>}</div>
                                </div>
                                <div className={styles.rating}>
                                    <div className={styles.ratingscore}>
                                        {Math.round(media.vote_average / 10 * 100)}%
                                    </div>
                                    <div className={styles.ratingtext}>
                                        <div>User</div>
                                        <div>Score</div>
                                    </div>
                                </div>
                                <div className={styles.headerbuttons}>
                                    <Popup trigger={
                                        <button className={styles.headerbutton}>
                                            <FontAwesomeIcon icon={faList} />
                                        </button>}>
                                        <div className="popuptext"><Link className="dropdownlink">Create a new list</Link></div>
                                        
                                        <select className="popupselect" onChange={handleChange}>
                                            <option>Choose a list</option>
                                        {lists.map(
                                            (list, index) => (<option  key={index} value={list.id}>{list.name}</option>)
                                        )}
                                        </select>
                                    </Popup>
                                    <button className={styles.headerbutton}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                                <h2 className={styles.overviewtitle}>Overview</h2>
                                <p className={styles.overview}>{media.overview}</p>
                            </div>
                        </div>
                    </div>

                                        {selectedListId}
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
                                                key={index}
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