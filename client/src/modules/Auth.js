import Amplify, { Auth } from 'aws-amplify'

var exp = {};

var AWS_USER = null;

exp.init = (awsConf) => {
  Amplify.configure({
    Auth: awsConf,
  });
  return Auth.currentAuthenticatedUser()
  .then(user => AWS_USER = user);
}

exp.logIn = (username, password) => {
  return Amplify.Auth.signIn(username, password)
  .then(user => AWS_USER = user);
}

exp.getUserDeets = () =>  {
  return new Promise((resolve, reject) => {
    AWS_USER.getUserAttributes(function(err, result) {
      if(err) {
        reject(err);
        return;
      }
      var attr = {};
      for(var i = 0, l = result.length; i < l; i++) {
        attr[result[i]['Name']] = result[i]['Value']
      }
      resolve(attr);
    });
  });
}

exp.getCurrentSession = () => {
  return Auth.currentSession();
}

exp.getIdToken = () => {
  return exp.getCurrentSession()
  .then(result => result.getIdToken().getJwtToken())
}

export default exp

var axios = require('axios');

var api = {};

api.create = (baseDomain) => {
  return exp.getIdToken()
  .then(token => {
    return axios.create({
      baseURL: baseDomain,
      headers: {'authorization': token}
    });
  })
}

export {api as ApiClient}
