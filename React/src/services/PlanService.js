import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"plan"

class PlanService {
    //obtiene todos los planes
    getPlanes(){
        return axios.get(BASE_URL);
    }
    //obtiene los detalles de un plan
    getPlanById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
    //obtiene los servicios del plan
    getServicioPlan(Id){
        return axios.get(BASE_URL + '/getServicioPlan/' + Id);
    }
}

export default new PlanService()

