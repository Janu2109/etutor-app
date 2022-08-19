import axios from 'axios';
const instance = axios.create({
    // baseURL: 'https://localhost:7122/'
    // baseURL: 'https://localhost:7122/'
    // baseURL: 'https://localhost:5001/'
    baseURL: 'https://nmu-turbojs-api-live.azure-api.net/v2/'
});
export default instance;