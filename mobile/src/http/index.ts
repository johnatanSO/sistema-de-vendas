import axios from 'axios'
/* 
  Passando o URL via hardcore pois é apenas um trabalho,
  caso fosse um projeto real, deveriam ser criadas variáveis de ambiente. 
*/
export default axios.create({
  baseURL: 'http://localhost:3333/',
})
