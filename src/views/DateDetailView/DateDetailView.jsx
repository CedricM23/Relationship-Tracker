import { useState } from "react";
import { useParams } from "react-router-dom";
import DatesService from "../../services/DatesService";
import styles from './DateDetailView.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import scrapbook from './ScrapbookDateDetailView.module.css'
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";

export default function DateDetailView() {
    const { id } = useParams();
    const [date] = useState(DatesService.getDateById(id))

    //make this dynamic maybe the user can choose what kind of view they want? using a ternary operator??

    const [scrapbookMode, setScrapbookMode] = useState(false);


    return (
        <>
            <div id='Fancy'>
                <section className={scrapbookMode ? scrapbook.DateDetail : styles.DateDetail}>
                    <div className={styles.titleslide}>
                        <div className={styles.container}>
                            <span className={styles.slidertext}>Fancy</span>
                            <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                            <span className={styles.slidertext}>Scrapbook</span>
                        </div>
                        <h2 className={styles.title}>{date.name}</h2>
                        <h1 className={styles.righttitle}></h1>
                        <div className={styles.mobilecontainer}>
                            <span className={styles.slidertext}>Fancy</span>
                            <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                            <span className={styles.slidertext}>Scrapbook</span>
                        </div>
                    </div>
                    <section className={scrapbookMode ? scrapbook.body : styles.body}>
                        <p className={scrapbookMode ? scrapbook.subtitle : styles.subtitle}>{date.articleTitle} — {date.datetime}</p>
                        <section className={scrapbookMode ? scrapbook.trying : styles.trying}>
                            <div className={scrapbookMode ? scrapbook.leftsection : styles.leftsection}>
                                <p className={scrapbookMode ? scrapbook.leftcaption : styles.songtitle}>The song that reminds me of this date:</p>
                                <div className={scrapbookMode ? scrapbook.album : styles.album}>
                                    <iframe src={date.song}
                                        loading="eager"
                                        className={scrapbookMode ? scrapbook.song : styles.song}
                                        allowFullScreen allow="encrypted-media *; fullscreen *; clipboard-write *;" ></iframe>
                                </div>
                                <p className={scrapbookMode ? scrapbook.leftcaption : styles.songtitle}>Location:</p>
                                <iframe src={date.location}
                                    loading="eager">
                                </iframe>
                            </div>
                            <div className={scrapbookMode ? scrapbook.articlebody : styles.articlebody}>
                                <p>
                                    {date.Description.map(
                                        (paragraph, key) => (
                                            <p key={key}>{paragraph}</p>
                                        )
                                    )}
                                </p>
                            </div>
                        </section>
                    </section>
                </section>
                <aside className={styles.backbutton}>
                    <Link to='/dates' className={styles.links}>
                        <FontAwesomeIcon icon={faArrowLeft} className={styles.backbuttonicon} />Back to dates</Link>
                </aside>
            </div>
        </>
    )
}