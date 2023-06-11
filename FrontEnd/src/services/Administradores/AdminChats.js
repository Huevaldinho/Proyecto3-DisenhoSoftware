import { API_URL } from '../config';

class AdminChats {
    //*Constructores
    constructor() { }
    //*Metodos
    async consultarChats() {

        let jsondata = [{id:1,integrantes:"Lobo, Jordan, Ángel"}];
        console.log(jsondata);
        return jsondata;
        
    }

}
export default AdminChats;
