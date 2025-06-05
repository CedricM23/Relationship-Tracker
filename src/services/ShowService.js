import axios from "axios";

const watchlistAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzBkMGVlNGZmMDJhYWRjNzQ0OWM0MTUwZWQ1YWIxOSIsIm5iZiI6MTc0ODQwMjkxMS40Mywic3ViIjoiNjgzNjgyZGY5NDU4NGFmNWFlMDU1ZmVkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ixd4o66_wDMDUOrNzA0IMpkQ7vWOvt9POXuA9VVGe_8`
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
    }
}