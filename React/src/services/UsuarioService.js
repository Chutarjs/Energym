import axios from 'axios';
const BASE_URL = "http://localhost:81/Energym/Usuario"

class UsuarioService {

    getUsers(){
        return axios.get(BASE_URL);
    }
    getUserById(UsuarioId){
        return axios.get(BASE_URL + '/' + UsuarioId);
    }
    create(Usuario){
        return axios.post(BASE_URL, Usuario);
    }
    update(Usuario){
        return axios.put(BASE_URL, Usuario);
    }
    updateAdmin(Usuario){
        return axios.post(BASE_URL + "/updateAdmin/", Usuario);
    }
    login(Usuario){
        return axios.post(BASE_URL+ '/login/', Usuario);
    }
}

export default new UsuarioService()