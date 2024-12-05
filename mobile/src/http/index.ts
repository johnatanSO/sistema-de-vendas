import axios from 'axios'

const API_URL_PRODUCTION =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : 'https://backend-trabalho-react-native.onrender.com/'

const BASE_URL = API_URL_PRODUCTION

export default axios.create({
  baseURL: BASE_URL,
})
