import { useState } from "react";
import { useParams } from "react-router-dom";
import DatesService from "../../services/DatesService";
import styles from './DateDetailView.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function DateDetailView() {
    const { id } = useParams();
    const [date] = useState(DatesService.getDateById(id))

    //make this dynamic maybe the user can choose what kind of view they want? using a ternary operator??

    return (
        <>
            <section className={styles.DateDetail}>
                <h2 className={styles.title}>{date.name}</h2>
                <section className={styles.body}>
                    <p className={styles.subtitle}>{date.articleTitle} — {date.datetime}</p>
                    <section className={styles.trying}>
                        <div className={styles.leftsection}>
                            <p className={styles.songtitle}>The song that reminds me of this date:</p>
                            <div className={styles.album}>
                                <iframe src={date.song}
                                    loading="eager"
                                    className={styles.song}
                                    allowFullScreen allow="encrypted-media *; fullscreen *; clipboard-write *;"></iframe>
                            </div>
                            <p className={styles.songtitle}>Location:</p>
                            <iframe src={date.location}
                                loading="eager">
                            </iframe>
                        </div>
                        <div className={styles.articlebody}>
                            <p>{date.Descriptionp1}</p>
                            <p>{date.Descriptionp2}</p>
                            <p>{date.Descriptionp3}</p>
                        </div>
                    </section>
                </section>
            </section>
            <aside className={styles.backbutton}>
                <Link to='/dates' className={styles.links}>
                <FontAwesomeIcon icon={faArrowLeft} className={styles.backbuttonicon}/>Back to dates</Link>
            </aside>
        </>
    )
}