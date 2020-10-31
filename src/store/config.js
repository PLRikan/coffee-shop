import axios from 'axios';

export const instance = axios.create({
    baseURL:'http://207.148.69.170:8500',
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
})