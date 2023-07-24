import axios from 'axios';
const BASE_URL = "http://localhost:81/Energym/Rutinas"

class RutinaService {
    //obtiene todos los planes
    getRutinas(){
        return axios.get(BASE_URL);
    }
    //obtiene los detalles de un plan
    getRutinaById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }    
    //se obtiene el detalle de una rutina
    getRutinaDetalle(Id){
        return axios.get(BASE_URL + '/getRutinaDetalle/' + Id);
    }
    //se crea una rutina
    createRutina(Rutina){
        return axios.post(BASE_URL, Rutina);
    }
    //se obtiene la rutina para el form
    getRutinaFormById(RutinaId){
        return axios.get(BASE_URL + '/getForm/' + RutinaId);
    }
    //se actualiza una rutina
    updateRutina(Rutina){
        return axios.put(BASE_URL, Rutina);
    }
}

export default new RutinaService()