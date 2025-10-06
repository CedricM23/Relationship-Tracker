import { useEffect, useState } from "react"
import ShowService from "../../services/ShowService";
import styles from "../ListDetailCard/ListDetailCard.module.css"
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholder from '../../images/no_poster.png'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'



export default function ListDetailCard({ list, imagewidth }) {
    const [listdetails, setListDetails] = useState([])
    // ------ NOT WORKING YET -------

    useEffect(() => {
        //Fav list hardcoded
        ShowService.getListDetailsById(list.id)
            .then((response) => {
                setListDetails(response.data.results)
                console.log('')
                console.log(response.data)
            }).catch(() => {
                alert('Could not get your list item! please try again!');
            });
    }, [listdetails])



    // ------ WORKING BUT SLOW -------
    function handleDelete(event) {
        const payload = {
            items: [
                {
                    media_type: event.target.value,
                    media_id: event.currentTarget.dataset.id
                }
            ]
        }
        ShowService.DeleteItemFromList(list.id, payload)
            .catch((error) =>
                console.log(error)
            )
        alert(`${event.currentTarget.dataset.name} has been removed from you ${list.name} list`)
    }



    return (
        <div>
            <div className={styles.listTitle}>
                {list.name}
            </div>
            {/* {JSON.stringify(list.id)} --- API TESTING */}
            {/* list item */}
            <div className={styles.items}>
                {listdetails.length < 1 ? <div className={styles.placeholderText}> Add movies or tv shows to get started.</div> :
                    <div className={styles.desktop}>
                        {/**slider not working correctly on mobile, offset is wrong (needs to be troubleshooted) */}
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={30}
                            slidesPerView={2}

                            slidesOffsetAfter={20}
                            navigation
                            pagination={{ clickable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            centeredSlides={false} //makes items in slider centered
                            breakpoints={{
                                //when window is >= 768
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 10
                                },
                                920: {
                                    slidesPerView: 4,

                                },
                                //when window is >= 100px
                                758: {
                                    slidesPerView: 3,
                                    centeredSlides: false,
                                    slidesOffsetAfter: 40
                                },
                                100: {
                                    slidesPerView: 2,
                                    // centeredSlides: true,
                                    // centerInsufficientSlides: true,
                                    spaceBetween: 50,
                                    slidesOffsetAfter: 40

                                }
                            }}
                        >
                            {listdetails.map(
                                (item) => (
                                    /* item container */
                                    <SwiperSlide>
                                        <div className={styles.itemContainer}>
                                            <Link to={`/watchlist/${item.id}/${item.media_type}`} className={styles.link}>
                                                <div className={styles.image}>
                                                    {item.poster_path ?
                                                        <img src={`https://image.tmdb.org/t/p/w${imagewidth}/${item.poster_path}`} alt="poster" /> :
                                                        <img className={styles.placeholder} src={placeholder} alt="" />}
                                                </div>
                                                <div className={styles.cardTitle}>{item.name ? item.name : item.title}</div>
                                            </Link>
                                            {/** Delete Button */}
                                            <button className={styles.headerbutton} data-id={item.id} data-name={item.name ? item.name : item.title} onClick={handleDelete} value={item.media_type}>
                                               Delete
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>
                    </div>
                }
            </div>
        </div >
    )
}