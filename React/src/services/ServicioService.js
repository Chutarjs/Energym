import axios from 'axios';
const BASE_URL = "http://localhost:81/Energym/Servicio"

class ServicioService {
    //obtiene todos los planes
    getServicios(){
        console.log(BASE_URL);
        return axios.get(BASE_URL);
    }
    //obtiene los detalles de un plan
    getServicioById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }    
    
    getServicioPlan(Id){
        return axios.get(BASE_URL + '/getRutinaDetalle/' + Id);
    }
}

export default new ServicioService()