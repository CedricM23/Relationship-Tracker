import { use, useEffect, useState } from 'react'
import DatesService from '../../services/DatesService'
import styles from "./DatesView.module.css"
import DateCard from '../../components/DateCard/DateCard'

export default function Datesview(){
    const [dates, setDates] = useState([])
    
    useEffect(() => {
        setDates(DatesService.getDates())
    },[])

    return (
        <>
        <h1 className={styles.title}>Dates</h1>
        <p className={styles.subtitle}>Number of dates: {dates.length}</p>
        <div className={styles.dategrid}>
            {dates.map(
                (date) => (
                    <DateCard key={date.id} date={date}/>
                )
            )}
        </div>
        </>
    )
}