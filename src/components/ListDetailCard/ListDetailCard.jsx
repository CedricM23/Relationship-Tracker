import { useEffect, useState } from "react"
import ShowService from "../../services/ShowService";
import styles from "../ListDetailCard/ListDetailCard.module.css"

export default function ListDetailCard(list) {
    const [listdetails, setListDetails] = useState([])

    useEffect(() => {
        //Fav list hardcoded
        ShowService.getListDetailsById(list.list.id)
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
            <div className={styles.listTtitle}>
                {list.list.name}
            </div>
            {/* {JSON.stringify(listdetails)} */}
            <div className={styles.items}>
                {listdetails.map(
                    (item) => (
                        <div className={styles.itemContainer}>
                            <div>{item.name ? item.name : item.title}</div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}