import axios from "axios";
const BASE_URL = "http://localhost:81/Energym/Servicio";

class ServicioService {
  //obtiene todos los planes
  getServicios() {
    return axios.get(BASE_URL);
  }
  //obtiene los detalles de un plan
  getServicioById(Id) {
    return axios.get(BASE_URL + "/" + Id);
  }
  //se obtiene el servicio de un plan
  getServicioPlan(Id) {
    return axios.get(BASE_URL + "/getRutinaDetalle/" + Id);
  }
  //crear servicio
  createServicio(Servicio) {
    return axios.post(BASE_URL, Servicio);
  }
  //modificar servicio
  updateServicio(Servicio) {
    return axios.put(BASE_URL, Servicio);
  }
  //se obtiene el servicio para el form
  getServicioFormById(ServicioId) {
    return axios.get(BASE_URL + "/getForm/" + ServicioId);
  }
}

export default new ServicioService();
