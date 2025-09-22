import { useEffect, useState } from "react";
import ListCreateForm from "../../components/ListCreateForm/ListCreateForm";
import styles from '../FavoritesView/FavoritesView.module.css'
import ShowService from "../../services/ShowService";
import WatchlistNavBar from '../../components/WatchlistNavBar/WatchlistNav'
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FavoritesView() {
    const [lists, setLists] = useState([])
    const [listdetails, setListDetails] = useState([])
    let listid;

    useEffect(() => {
        ShowService.getlists()
            .then((response) => {
                console.log('problem?')
                console.log(response.data)
                setLists(response.data.results)

                //Fav list hardcoded
                ShowService.getListDetailsById(8559472)
                    .then((response) => {
                        setListDetails(response.data.results)
                        console.log('')
                        console.log(response.data)
                    }).catch(() => {
                        alert('Could not get your list item! please try again!');
                    });



                console.log(lists)
            }).catch((error) => {
                alert('Could not get your lists! please try again!')
            })
    }, [])

    function getLists() {
        ShowService.getlists()
            .then((response) => {
                setLists(response.data.results);
            }).catch((error) => {
                alert('Could not get your lists! please try again!');
            });
    }

    function getListDetails(id) {
        ShowService.getListDetailsById(id)
            .then((response) => {
                setListDetails(response.data.results)
            }).catch(() => {
                alert('Could not get your list item! please try again!');
            });
    }

    function handleClick() {
        let element = document.getElementById("form");
        if (element.style.display = "none") {
            element.style.display = "flex";
        }
    }

    function handleClose() {
        let element = document.getElementById("form");
        if (element.style.display = "flex") {
            element.style.display = "none";
        }
    }



    function handleDelete(event) {
        ShowService.deleteListById(event.currentTarget.dataset.id)
            .catch((error) =>
                console.log('could not delete your list'))
        getLists();
    }


    return (
        <>
            <WatchlistNavBar />
            <p style={{ color: 'red', fontSize: '20px' }}>DATA CANNOT BE PULLED FOR MULTIPLE LISTS</p>
            <button onClick={handleClick}>New List</button>
            <button onClick={handleClose}>Close List</button>
            <div className={styles.form} id="form">
                <ListCreateForm onCreate={getLists} />
            </div>



            {lists.length < 1 ? <div className={styles.notext}>Create a new list to get started</div> :
                <div>
                    {/* move lists into sepereate componenets and render each lists data seperately (this might work) */}
                    {lists.map(
                        (list) => (
                            <div className={styles.list}>
                                <div className={styles.header}>
                                    <h1 className={styles.listname}>{list.name}</h1>
                                    <div className={styles.middlesection}></div>
                                    <button onClick={handleDelete} className={styles.headerbutton} data-id={list.id}>
                                        { list.id === 8559472 ? <></> : <FontAwesomeIcon icon={faTrash} className={styles.headericon} />}
                                    </button>
                                </div>
                                <div className={styles.listgrid} >
                             
                                    {listdetails.map(
                                        (item, index) => (
                                            <div key={index}>{item.original_title ? item.original_title : item.name} {item.id}</div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            }


        </>
    )
}