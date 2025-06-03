import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

import styles from './DateCard.module.css'

export default function DateCard({date}){
    return (
        <>
        <article className={styles.datecard}>
            <Link to={`/dates/${date.id}`} className={styles.links}>
            <img className={styles.image} src={date.imageOfPlace}/>
            <h3 className={styles.title}>{date.name}
                <FontAwesomeIcon  icon={faArrowRight} className={styles.icon}/>
            </h3>
            </Link>
        </article>
        </>
    )
}