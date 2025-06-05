import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ShowService from "../../services/ShowService";

export default function MediaDetailView(){
    const {id, type} = useParams();
    const [media, setMedia] = useState([]);



    useEffect(() => {
        // if its movie then run one block, else run the other one

        if(type === 'TV'){
        ShowService.getShowbyId(id)
        .then((response) => {
            // if(response.data.results.name){
            setMedia(response.data)
            // }
        }).catch((error) =>
            console.log('Shows not found')
        )
    }   else {
        ShowService.getMoviebyId(id)
        .then((response) => {
            // if(response.data.results.original_title){
            setMedia(response.data)
            // }
        }).catch((error) =>
            console.log('Movies not found')
        )
    }
    }, [])
   
    return (
     <>
        <section>
             <h1>{media.name == null? media.original_title : media.name}</h1>
        </section>
     </>   
    )

}