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
    //crear plan
    createPlan(Plan){
        return axios.post(BASE_URL, Plan);
    }
    //modificar plan
    updatePlan(Plan){
        return axios.put(BASE_URL, Plan);
    }

    getPlanFormById(PlanId){
        return axios.get(BASE_URL + '/getForm/' + PlanId);
    }
}

export default new PlanService()