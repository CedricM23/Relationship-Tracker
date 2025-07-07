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

            {scrapbookMode ?
                //========================== TRUE - SCRAPBOOK =======================
                <>
                    <div id='Scrapbook' className={styles.scrapbook}>
                        <div className={styles.titleslide}>
                            <div className={styles.container}>
                                <span className={styles.slidertext}>Fancy</span>
                                <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                                <span className={styles.slidertext}>Scrapbook</span>
                            </div>
                            <h2 className={scrapbook.title}>
                                <span>🌸</span>{date.articleTitle}<span>🌸</span>
                            </h2>
                            <h1 className={styles.righttitle}></h1>
                            <div className={styles.mobilecontainer}>
                                <span className={styles.slidertext}>Fancy</span>
                                <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                                <span className={styles.slidertext}>Scrapbook</span>
                            </div>
                        </div>
                        <section className={scrapbook.body}>
                            <p className={scrapbook.subtitle}>{date.name} — {date.datetime}</p>
                        </section>
                        {/* PHOTO AND MAP SECTION */}
                        <div className={scrapbook.midsection}>
                            {/* PHOTO SECTION */}
                            <section className={scrapbook.photosection}>

                                <div class={scrapbook.polaroid}>
                                    <img src="your-image.jpg" alt="Image Description" />
                                    <div class={scrapbook.container}>
                                        <p class={scrapbook.containtertext}>{date.scrapbookImageCaption}</p>
                                    </div>
                                </div>

                            </section>
                            {/* SCARPBOOK SECTION */}
                            <section className={scrapbook.mapsection}>
                                <div className={scrapbook.map}>
                                    <div>
                                        <p className={scrapbook.mapcaption}>The room where it happened:</p>
                                    </div>
                                    <iframe src={date.location}
                                        loading="eager">
                                    </iframe>
                                </div>
                            </section>
                        </div>
                        {/* TEXT ON NOTEBOOK PAPER */}
                        <div>

                        </div>
                        {/* CASSETE PLAYER */}
                        <div className={styles.cassette}>
                        <div className={styles.scrapalbum}>
                            <div className={styles.scrapsongtext}>The song that reminds me of this date:</div>
                            <iframe src={date.song}
                                loading="eager"
                                className={styles.scrapsong}
                                allowFullScreen allow="encrypted-media *; fullscreen *; clipboard-write *;" ></iframe>
                        </div>
                        </div>
                    </div>
                </> :
                // ================ FALSE - FANCY ======================
                <>



                    <div id='Fancy'>
                        <section className={styles.DateDetail}>
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
                            <section className={styles.body}>
                                <p className={styles.subtitle}>{date.articleTitle} — {date.datetime}</p>
                                <section className={styles.trying}>
                                    <div className={styles.leftsection}>
                                        <p className={styles.songtitle}>The song that reminds me of this date:</p>
                                        <div className={styles.album}>
                                            <iframe src={date.song}
                                                loading="eager"
                                                className={styles.song}
                                                allowFullScreen allow="encrypted-media *; fullscreen *; clipboard-write *;" ></iframe>
                                        </div>
                                        <p className={styles.songtitle}>Location:</p>
                                        <iframe src={date.location}
                                            loading="eager">
                                        </iframe>
                                    </div>
                                    <div className={styles.articlebody}>
                                        {date.Description.map(
                                            (paragraph, key) => (
                                                <p className={styles.articlebody} key={key}>{paragraph}</p>
                                            )
                                        )}
                                    </div>
                                </section>
                            </section>
                        </section>
                        <aside className={styles.backbutton}>
                            <Link to='/dates' className={styles.links}>
                                <FontAwesomeIcon icon={faArrowLeft} className={styles.backbuttonicon} />Back to dates</Link>
                        </aside>
                    </div>
                </>}
        </>
    )
}