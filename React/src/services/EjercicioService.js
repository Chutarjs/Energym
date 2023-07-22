import axios from 'axios';
const BASE_URL="http://localhost:81/Energym/Ejercicio"

class EjercicioService{
    //Definición para Llamar al API y obtener el listado de peliculas
    //localhost:81/api/Ejercicio
    getEjercicios(){
        return axios.get(BASE_URL);
    }
    //localhost:81/api/movie/1
    getEjercicioById(EjercicioId){
        return axios.get(BASE_URL + '/' + EjercicioId);
    }
    createEjercicio(Ejercicio){
        return axios.post(BASE_URL, Ejercicio);
    }

    getEjercicioFormById(EjercicioId){
        return axios.get(BASE_URL + '/getForm/' + EjercicioId);
    }

    updateEjercicio(Ejercicio){
        return axios.put(BASE_URL, Ejercicio);
    }
}

export default new EjercicioService()