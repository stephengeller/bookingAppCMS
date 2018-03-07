var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API // a bit hacky but will fix later
  /* add Authorization header here*/
});

module.exports = axiosInstance;
