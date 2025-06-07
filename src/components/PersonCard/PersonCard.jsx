import styles from './PersonCard.module.css'
import placholderimage from '../../images/avatar-1577909_640.png'
import { Link } from 'react-router-dom'

export default function Personcard({person, imagewidth}) {

    const imagepath = `https://image.tmdb.org/t/p/w185`

    return (
        <>
        <section className={styles.personcard}>
        <Link to={`person/${person.id}`} className={styles.link}>
        {person.profile_path != null ?
        <img className={styles.image} src={`${imagepath}${person.profile_path}`} alt="" /> : 
        <img className={styles.placeholderimage} src={placholderimage} alt="" />
        }
        </Link>
        {person.name}
        </section>
        </>
    )
}