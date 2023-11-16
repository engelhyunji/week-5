    import axios from "axios";

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL, 
        headers: {
        "content-type": "application/json",
        },
        withCredentials: true,
    });

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    });