import axios from 'axios';
const BASE_URL="http://localhost:81/Energym/Ejercicio"

class EjercicioService{
    //Definición para Llamar al API y obtener el listado de peliculas
    getEjercicios(){
        return axios.get(BASE_URL);
    }
    //se obtiene un ejercicio por su id
    getEjercicioById(EjercicioId){
        return axios.get(BASE_URL + '/' + EjercicioId);
    }
    //se crea un ejercicio
    createEjercicio(Ejercicio){
        return axios.post(BASE_URL, Ejercicio);
    }
    //se obtiene el ejercicio para su form
    getEjercicioFormById(EjercicioId){
        return axios.get(BASE_URL + '/getForm/' + EjercicioId);
    }
    //se actualiza el ejercicio
    updateEjercicio(Ejercicio){
        return axios.put(BASE_URL, Ejercicio);
    }
}

export default new EjercicioService()