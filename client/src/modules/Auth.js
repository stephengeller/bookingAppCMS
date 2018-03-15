import Amplify from 'aws-amplify'

var exp = {};

var AWS_USER = null;

exp.init = (awsConf) => {
  Amplify.configure(awsConf);
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

export default exp
