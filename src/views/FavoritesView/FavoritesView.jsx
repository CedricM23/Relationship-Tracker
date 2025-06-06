import { useEffect, useState } from "react";
import ListCreateForm from "../../components/ListCreateForm/ListCreateForm";
import styles from '../FavoritesView/FavoritesView.module.css'
import ShowService from "../../services/ShowService";
import WatchlistNavBar from '../../components/WatchlistNavBar/WatchlistNav'
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FavoritesView() {
    const [lists, setLists] = useState([])


    useEffect(() => {
        ShowService.getlists()
            .then((response) => {
                setLists(response.data.results)
            }).catch((error) => {
                alert('Could not get your lists! please try again!')
            })
    })

    function handleClick(){
        let element = document.getElementById("form");
        if(element.style.display = "none"){
        element.style.display = "flex";
        }
    }

    function handleClose(){
        let element = document.getElementById("form");
        if (element.style.display = "flex" ){
        element.style.display = "none";
        }
    }



    function handleDelete(list_id){
        ShowService.deleteListById(list_id)
    }


    return (
        <>
            <WatchlistNavBar />
            <button onClick={handleClick}>New List</button>
            <button onClick={handleClose}>Close List</button>
            <div className={styles.form} id="form">
                <ListCreateForm />
            </div>
            {lists.length < 1 ? <div className={styles.notext}>Create a new list to get started</div> :
                <div>
                    {lists.map(
                        (list) => (
                            <div className={styles.list}>
                                <div className={styles.header}>
                                <h1 className={styles.listname}>{list.name}</h1>
                                <div className={styles.middlesection}></div>
                                <button onClick={handleDelete} className={styles.headerbutton}>
                                    <FontAwesomeIcon icon={faTrash} className={styles.headericon}/>
                                </button>
                                </div>
                                <div className={styles.listgrid}>

                                </div>
                            </div>
                        )
                    )}
                </div>
            }


        </>
    )
}