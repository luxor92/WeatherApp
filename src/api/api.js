import axios from "axios";

const instance = axios.create({
    baseURL: "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}",
    API_Key: "ee55b6855ec750af3d410b4ca101cb67",
})

export const weatherAPI = {
    getWeather() {
        return axios.get("api.openweathermap.org/data/2.5/weather?q={city name}&appid=ee55b6855ec750af3d410b4ca101cb67")
    }
}

export default weatherAPI