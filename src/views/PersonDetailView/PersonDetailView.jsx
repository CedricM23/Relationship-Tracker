import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonService from "../../services/PersonService";

export default function PersonDetailView(){
     const { id, } = useParams();
     const [person, setPerson] = useState([])

     useEffect(() =>{
        PersonService.getPersonbyid(id)
        .then((response) => {
            setPerson(response.data)
        })
     })

     return(
        <>
        <h1>{person.name}</h1>
        </>
    )
}