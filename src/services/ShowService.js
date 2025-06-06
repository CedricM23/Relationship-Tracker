import axios from "axios";

const watchlistAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `bearer ${import.meta.env.VITE_API_KEY}`
    }
})

export default {
    trendingToday(){
        return watchlistAPI.get('tv/airing_today');
    },
    getShowbyId(series_id){
        return watchlistAPI.get(`tv/${series_id}`)
    },
    getTopRatedMovies(){
        return watchlistAPI.get('movie/top_rated')
    },
    getPopularMovies(){
        return watchlistAPI.get('movie/popular')
    },
    getMoviebyId(movie_id){
        return watchlistAPI.get(`/movie/${movie_id}`)
    },
    createlist(body){
        return watchlistAPI.post(`https://api.themoviedb.org/3/list`, body);
    },
    getlists(){
        return watchlistAPI.get(`https://api.themoviedb.org/3/account/22039344/lists`);
    }, deleteListById(list_id){
        return watchlistAPI.delete(`https://api.themoviedb.org/3/list/${list_id}`)
    }
}