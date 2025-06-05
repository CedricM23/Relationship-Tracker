import { use, useState } from "react"
import styles from './ListCreateForm.module.css'

export default function ListCreateForm() {
    const [list, setList] = useState([])

    return (
        <>
        <div>
            <h1>Create a list:</h1>
            <form id="CreateListForm" className={styles.list}>
                <div>
                    <label htmlFor="name">List Name: </label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="Description">Description: </label>
                    <input type="text" name="Description" id="Description" />
                </div>
                <div>
                    <label htmlFor="language">Language: </label>
                    <select id="language" name="language">
                        <option value="en">English</option>
                    </select>
                </div>
                <div>
                <button type="submit">Create List</button>
                </div>
            </form>
        </div>
        </>
    )
}