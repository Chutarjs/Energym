import axios from 'axios';
const BASE_URL = "localhost:81/Energym/Usuarios"

class UsuarioService {

    getUsers(){
        return axios.get(BASE_URL);
    }
    getUserById(UserId){
        return axios.get(BASE_URL + '/' + UserId);
    }
    createUser(User){
        return axios.post(BASE_URL, User);
    }
    loginUser(User){
        return axios.post(BASE_URL+ '/Login/', User);
    }
}

export default new UsuarioService()