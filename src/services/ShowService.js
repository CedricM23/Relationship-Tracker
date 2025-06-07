import axios from "axios";

const watchlistAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
})

export default {
    trendingToday(){
        return watchlistAPI.get('tv/airing_today');
    },getPopularShows(){
        return watchlistAPI.get('tv/popular');
    },
    getShowbyId(series_id){
        return watchlistAPI.get(`tv/${series_id}`)
    },
    getviedosbyshow(series_id){
        return watchlistAPI.get(`tv/${series_id}/videos`)
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
        return watchlistAPI.post(`/list`, body);
    },
    getlists(){
        return watchlistAPI.get(`/account/22039344/lists`);
    }, deleteListById(list_id){
        return watchlistAPI.delete(`/list/${list_id}`)
    }
}