import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"genre"

class GenreService {

    getGenres(){
        return axios.get(BASE_URL);
    }

    getGenreById(GenreId){
        return axios.get(BASE_URL + '/' + GenreId);
    }
}

export default new GenreService()

