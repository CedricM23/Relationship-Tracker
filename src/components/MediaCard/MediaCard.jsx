import { Link } from "react-router-dom";
import styles from './MediaCard.module.css'
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { faHeart as Liked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholder from '../../images/no_poster.png'
import { useState } from "react";

export default function MediaCard( { media, imagewidth, title, mediaType }) {
   const [heart, setHeart] = useState(Unliked)

   function handleClick() {
      if (heart === Unliked) {
         setHeart(Liked);
      } else if (heart === Liked) {
         setHeart(Unliked);
      }
   }

 
   return (
      <>
         {/* placeholder code to test data */}
            <section className={styles.mediacard}>
                <Link to={`/watchlist/${media.id}/${mediaType}`} className={styles.link}>
                {media.poster_path ? 
               <img src={`https://image.tmdb.org/t/p/w${imagewidth}/${media.poster_path}`} alt="poster" />:
                  <img className={styles.placeholder} src={placeholder} alt=""/>}
               </Link>
               <section>
                  <Link to={`/show/${media.id}`} className={styles.link}>
                  <p>{Math.round(media.vote_average / 10 * 100)}%</p>
                  <h1 className={styles.cardtitle}>{title}</h1>
                  </Link>
                  <button className={styles.button} onClick={handleClick}>
                     <FontAwesomeIcon className={styles.icon} icon={heart} />
                  </button>
               </section>
            </section>
      </>
   )

}