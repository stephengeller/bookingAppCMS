var axios = require('axios');

var axiosInstance = axios.create({
  // baseURL: 'https://api.staging.carefreebreaks.com'
  baseURL: 'http://localhost:3001'
  /* add Authorization header here*/
});

module.exports = axiosInstance;
