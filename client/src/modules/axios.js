var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'https://api.staging.carefreebreaks.com'
  /* add Authorization header here*/
});

module.exports = axiosInstance;
