//ajax request module that can send any types of requests with any data to any given url
// uses axios and returns a promise
import axios from "axios";

export function setHeader(contentType, token) {
    axios.defaults.headers.post["Content-Type"] = contentType;
    if(token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data)
        .then(res => {
            return resolve(res.data);
        })
        .catch(err => {
            return reject(err.response.data.error.error);
        }); 
    });
}