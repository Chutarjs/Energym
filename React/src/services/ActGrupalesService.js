import axios from 'axios';
const BASE_URL= "http://localhost:81/Energym/ActividadesGrupales"

class ActGrupalesService{
    //Definición para Llamar al API y obtener el listado de peliculas
    //localhost:81/Energym/actividadesgrupales
    getActividades(){
        return axios.get(BASE_URL);
    }
    //localhost:81/Energym/actividadesgrupales/1
    getActividadById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
    
    //aun por hacer
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

export default new ActGrupalesService()