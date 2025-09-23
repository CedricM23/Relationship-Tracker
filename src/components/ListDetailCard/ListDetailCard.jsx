import { useEffect, useState } from "react"
import ShowService from "../../services/ShowService";
import styles from "../ListDetailCard/ListDetailCard.module.css"
import { Link } from "react-router-dom";
import placeholder from '../../images/no_poster.png'

export default function ListDetailCard({list, imagewidth}) {
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
    }, [])



    return (
        <div>
            <div className={styles.listTitle}>
                {list.name}
            </div>
            {/* {JSON.stringify(listdetails)} */}
            {/* list item */}
            <div className={styles.items}>
                {listdetails.map(
                    (item) => (
                        /* item container */
                        <div className={styles.itemContainer}>
                            <Link to={`/watchlist/${item.id}/${item.media_type}`} className={styles.link}>
                                <div>
                                    {item.poster_path ?
                                        <img src={`https://image.tmdb.org/t/p/w${imagewidth}/${item.poster_path}`} alt="poster" /> :
                                        <img className={styles.placeholder} src={placeholder} alt="" />}
                                </div>
                                <div className={styles.cardTitle}>{item.name ? item.name : item.title}</div>
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}