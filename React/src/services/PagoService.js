import axios from 'axios';
const BASE_URL = "http://localhost:81/Energym/Pago"

class PagoService {
    //obtiene todos los pagos
    getPagos(){
        return axios.get(BASE_URL);
    }
    //Obtiene los pagos de un cliente
    getPagosCliente(Id){
        return axios.get(BASE_URL + "/getByCliente/" + Id);
    }
    //obtiene un pago
    getPagoById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
    //crear pago
    createPago(Plan){
        return axios.post(BASE_URL, Plan);
    }
    //pagar
    update(Pago){
        console.log(Pago);
        return axios.post(BASE_URL + "/update/",  Pago);
    }
}

export default new PagoService()