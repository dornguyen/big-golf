//http-common.js has the baseURL that allows node to make
//HTTP requests to our API.
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3001/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});