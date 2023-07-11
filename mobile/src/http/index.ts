import axios from 'axios'
const API_URL_PRODUCTION = 'https://backend-trabalho-react-native.onrender.com/'
// const API_URL_DEVELOPMENT = 'http://192.168.15.104:3333/'
const BASE_URL = API_URL_PRODUCTION
/* Passando o URL hardcode mesmo pois é apenas um trabalho,
  caso fosse um projeto real, deveriam ser criadas variáveis de 
  ambiente. 
*/

/* Para iniciar web service (API), abra o terminal na pasta 'server' e 
  execute o comando 'npm install' para instalar as dependências e depois 
  'npm start' para iniciar o servidor local.
*/
export default axios.create({
  baseURL: BASE_URL,
})
