import axios from 'axios';
const BASE_URL = "http://localhost:81/Energym/Rutinas"

class RutinaService {
    //obtiene todos los planes
    getRutinas(){
        console.log(BASE_URL);
        return axios.get(BASE_URL);
    }
    //obtiene los detalles de un plan
    getRutinaById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
}

export default new RutinaService()