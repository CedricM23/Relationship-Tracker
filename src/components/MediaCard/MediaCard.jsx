import { Link } from "react-router-dom";
import styles from './MediaCard.module.css'
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { faHeart as Liked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholder from '../../images/no_poster.png'
import { useEffect, useState } from "react";
import ShowService from "../../services/ShowService";

export default function MediaCard({ media, imagewidth, title, mediaType }) {
   const [heart, setHeart] = useState(Unliked)
   const FAVORITES_LIST_ID = 8559472;
   const payload = {
      items: [
         {
            media_type: mediaType,
            media_id: media.id
         }
      ]
   }
   const deleteLoad = {
      items:[
         
      ]
   }

   //checks to see if media is already in list and displays a solid heart if it is
   useEffect(() => {
      ShowService.isMediaAlreadyInList(FAVORITES_LIST_ID, media.id, mediaType)
         .then((response) => {
            setHeart(Liked)
         }).catch(console.log(""))
   }, [])

   function handleClick() {
      //adds item to favorites list
      if (heart === Unliked) {
         ShowService.addItemTolist(FAVORITES_LIST_ID, payload).then(
            (response) => {
               setHeart(Liked);
               if (mediaType === "tv") {
                  alert(`${media.name} was added to your Favorites`)
               } else if (mediaType === "movie") {
                  alert(`${media.title} was added to your Favorites`)
               }
            }).catch((error) => { alert("item was not added to your list") })
      } else if (heart === Liked) {
         //removes item from Favorites List

         //code not working, throwing error
         ShowService.DeleteItemFromList(FAVORITES_LIST_ID, payload)
            .then((response) => {
               setHeart(Unliked);
               if (mediaType === "tv") {
                  alert(`${media.name} was removed from your Favorites`)
               } else if (mediaType === "movie") {
                  alert(`${media.title} was removed from your Favorites`)
               }
            }
            ).catch((error) => { alert(`item was not removed`) })
      }
   }


   return (
      <>
         {/* placeholder code to test data */}
         <section className={styles.mediacard}>
            <Link to={`/watchlist/${media.id}/${mediaType}`} className={styles.link}>
               {media.poster_path ?
                  <img src={`https://image.tmdb.org/t/p/w${imagewidth}/${media.poster_path}`} alt="poster" /> :
                  <img className={styles.placeholder} src={placeholder} alt="" />}
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