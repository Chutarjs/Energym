import axios from 'axios';
const BASE_URL= "http://localhost:81/Energym/ActividadesGrupales"

class ActGrupalesService{
    //Definición para Llamar al API y obtener el listado de peliculas
    //localhost:81/Energym/actividadesgrupales
    getActividades(){
        return axios.get(BASE_URL);
    }
    //localhost:81/Energym/actividadesgrupales/1
    getActividadById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }

    getDetalle(){
        return axios.get(BASE_URL + '/getDetalle/1');
    }

    getDetalleByID(Id){
        return axios.get(BASE_URL + '/getDetalleById/' + Id);
    }
    
    createActividad(Actividad){
        return axios.post(BASE_URL, Actividad);
    }

    getActividadFormById(ActividadId){
        return axios.get(BASE_URL + '/getForm/' + ActividadId);
    }

    updateActividad(Actividad){
        return axios.put(BASE_URL, Actividad);
    }

    matricular(Objeto){
        return axios.post(BASE_URL + '/matricular', Objeto);
    }

    desmatricular(Objeto){
        return axios.post(BASE_URL + '/desmatricular', Objeto);
    }

    getMatriculadas(idUsuario){
        return axios.get(BASE_URL + '/getMatriculadas/' + idUsuario);
    }
    
    getHistorial(idUsuario){
        return axios.get(BASE_URL + '/getHistorial/' + idUsuario);
    }
    getGrafico(){
        return axios.get(BASE_URL + '/grafico/1');
    }
}

export default new ActGrupalesService()