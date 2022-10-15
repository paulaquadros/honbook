import axios from 'axios'

// creating axios instance to request
const api = axios.create({
    baseURL: "http://localhost:3001"
})

export default api 