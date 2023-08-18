import axios from 'axios';
const BASE_URL = "http://localhost:81/Energym/Plan"

class PagoService {
    //obtiene todos los pagos
    getPagos(){
        return axios.get(BASE_URL);
    }
    //Obtiene los pagos de un cliente
    getPagosCliente(Id){
        return axios.get(BASE_URL + "/getByCliente/" + Id);
    }
    //obtiene los detalles de un plan
    getPagoById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
    //pagar
    createPago(Plan){
        return axios.post(BASE_URL, Plan);
    }
}

export default new PagoService()