import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"actor"

class ActorService {

    getActors(){
        return axios.get(BASE_URL);
    }

    getActorById(ActorId){
        return axios.get(BASE_URL + '/' + ActorId);
    }
}

export default new ActorService()

