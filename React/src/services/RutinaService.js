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
    
    getRutinaDetalle(Id){
        return axios.get(BASE_URL + '/getRutinaDetalle/' + Id);
    }

    createRutina(Rutina){
        return axios.post(BASE_URL, Rutina);
    }

    getRutinaFormById(RutinaId){
        return axios.get(BASE_URL + '/getForm/' + RutinaId);
    }

    updateRutina(Rutina){
        return axios.put(BASE_URL, Rutina);
    }
}

export default new RutinaService()