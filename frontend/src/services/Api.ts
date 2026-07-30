import axios from "axios";

const api = axios.create({
 baseURL: "https://predictwell-7qik.onrender.com"});

export default api;