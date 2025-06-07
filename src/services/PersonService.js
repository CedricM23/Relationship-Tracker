import axios from "axios";

const watchlistAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
})


export default{
    getPersonbyid(person_id){
        return watchlistAPI.get(`person/${person_id}`)
    }
}