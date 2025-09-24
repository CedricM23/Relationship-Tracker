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
    }, [listdetails, list.id])

    function handleDelete(event) {

    }




    return (
        <div>
            <div className={styles.listTitle}>
                {list.name}
            </div>
            {/* {JSON.stringify(listdetails)} */}
            {/* list item */}
            <div className={styles.items}>
                {listdetails.length < 1 ? <div className={styles.placeholderText}> Add movies or tv shows to get started.</div> :
                    <div className={styles.desktop}>
                        {/**slider not working correctly on mobile */}
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
                                    spaceBetween:10
                                },
                                920:{
                                    slidesPerView: 4,

                                },
                                //when window is >= 100px
                                758: {
                                    slidesPerView:3,
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
                                            {/** Add trash can to remove from list */}
                                            <button className={styles.headerbutton} data-id={list.id}>
                                                <FontAwesomeIcon icon={faTrash} className={styles.headericon} />
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