import axios from 'axios';
import Utils from "../shared/utils";

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    login
};

function login(username, password) {
    return axios.post(`${Utils.apiUrl}/auth`, {
        username: username,
        password: password
    });
}
