import axios from "axios";
import { environment } from "./config";
import Cookies from 'js-cookie';

export const baseService = {};
baseService.get = get;
baseService.post = post;

function post(url, fields) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('access_token'),
    }
    return axios.post(environment.baseUrl + url,
        fields, { headers: headers }
    )
        .then(handleResponse);
}
function get(url) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('access_token'),
    }
    return axios.get(environment.baseUrl + url,
        { headers: headers }
    )
        .then(handleResponse);
}

function handleResponse(response) {
    return response.data
}