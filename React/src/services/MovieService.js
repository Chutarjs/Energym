import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+"movie"

class MovieService{
    //Definición para Llamar al API y obtener el listado de peliculas
    //localhost:81/api/movie
    getMovies(){
        return axios.get(BASE_URL);
    }
    //localhost:81/api/movie/1
    getMovieById(MovieId){
        return axios.get(BASE_URL + '/' + MovieId);
    }
    createMovie(Movie){
        return axios.post(BASE_URL, Movie);
    }

    getMovieFormById(MovieId){
        return axios.get(BASE_URL + '/getForm/' + MovieId);
    }

    updateMovie(Movie){
        return axios.put(BASE_URL, Movie);
    }
}

export default new MovieService()