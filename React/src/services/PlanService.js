import axios from 'axios';
const BASE_URL = "http://localhost:81/Energym/Plan"

class PlanService {
    //obtiene todos los planes
    getPlanes(){
        console.log(BASE_URL);
        return axios.get(BASE_URL);
    }
    //obtiene los detalles de un plan
    getPlanById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
}

export default new PlanService()