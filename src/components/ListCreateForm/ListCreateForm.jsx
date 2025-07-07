import { use, useState } from "react"
import styles from './ListCreateForm.module.css'
import ShowService from '../../services/ShowService'

export default function ListCreateForm({onCreate}) {
    const [newList, setNewList] = useState([])

    function updatelist(event){
        event.preventDefault();
        ShowService.createlist(newList).then(
            (response) => {
                if (response.status === 201){
                    alert('list created')
                    onCreate();
                }
            }
        ).catch((error) => {
            alert('List was not created')
        })
    }

    return (
        <>
        <div>
            <h1>Create a list:</h1>
            <form id="CreateListForm" className={styles.list} onSubmit={updatelist}>
                <div className={styles.formitem}>
                    <label htmlFor="name" >List Name: </label>
                    <input type="text" name="name" id="name" onChange={ (e) => setNewList({...newList, name:e.target.value })}/>
                </div>
                <div className={styles.formitem}>
                    <label htmlFor="Description">Description: </label>
                    <input type="text" name="Description" id="Description"  onChange={ (e) => setNewList({...newList, description:e.target.value })}/>
                </div>
                <div className={styles.formitem}>
                    <label htmlFor="language">Language: </label>
                    <select id="language" name="language" onChange={  (e) =>  setNewList({...newList, iso_639_1:e.target.value})}>
                        <option value="">Select a language</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div className={styles.formitem}>
                    <label htmlFor="region">Region: </label>
                    <select id="language" name="language" onChange={  (e) =>  setNewList({...newList,iso_3166_1: e.target.value})}>
                        <option value="">Select a region</option>
                        <option value="us">United States</option>
                    </select>
                </div>
                <div className={styles.formitem}>
                    <label htmlFor="region">Public list? </label>
                    <select id="region" name="region" onChange={  (e) =>  setNewList({...newList,public: e.target.value === 'true'})}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className={styles.formitem}>
                <button type="submit">Create List</button>
                </div>
            </form>
        </div>
        </>
    )
}