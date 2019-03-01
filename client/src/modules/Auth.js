const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

AWS.config.region = 'eu-west-2';

var COGNITO_APP_ID = '';
var USER_POOL_ID = '';
var IDENTITY_POOL_ID = '';

function quickLogin() {
  return new Promise((resolve, reject) => {
    var poolData = {
      UserPoolId: USER_POOL_ID,
      ClientId: COGNITO_APP_ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          reject(err);
          return;
        }
        console.log('session validity: ' + session.isValid());

        const loginUrl = 'cognito-idp.eu-west-2.amazonaws.com/' + USER_POOL_ID;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID,
          Logins: {
            [loginUrl]: session.getIdToken().getJwtToken()
          }
        });
        AWS.config.credentials
          .refreshPromise()
          .then(() => {
            COGNITO_USER = cognitoUser;
          })
          .then(resolve)
          .catch(reject);
      });
    } else {
      resolve();
    }
  });
}

function getUserAttributes(cognitoUser) {
  return new Promise((resolve, reject) => {
    if (cognitoUser === null) {
      resolve(null);
    }
    cognitoUser.getUserAttributes(function(err, result) {
      if (err) {
        reject(err);
        return;
      }
      var attr = {};
      for (var i = 0, l = result.length; i < l; i++) {
        attr[result[i]['Name']] = result[i]['Value'];
      }
      resolve(attr);
    });
  });
}

function getCurrentUser() {
  if (COGNITO_USER === null) {
    return quickLogin().then(() => {
      return getUserAttributes(COGNITO_USER);
    });
  } else {
    return getUserAttributes(COGNITO_USER);
  }
}

var COGNITO_USER = null;

module.exports = {
  init: options => {
    COGNITO_APP_ID = options['COGNITO_APP_ID'];
    USER_POOL_ID = options['USER_POOL_ID'];
    IDENTITY_POOL_ID = options['IDENTITY_POOL_ID'];
  },

  login: () => {
    window.location.href = '/login';
  },

  logUserIn: (username, password) => {
    return new Promise((resolve, reject) => {
      var authenticationData = {
        Username: username,
        Password: password
      };
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      );
      var poolData = {
        UserPoolId: USER_POOL_ID,
        ClientId: COGNITO_APP_ID
      };
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var userData = {
        Username: username,
        Pool: userPool
      };
      COGNITO_USER = new AmazonCognitoIdentity.CognitoUser(userData);
      COGNITO_USER.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          var loginUrl = 'cognito-idp.eu-west-2.amazonaws.com/' + USER_POOL_ID;
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IDENTITY_POOL_ID,
            Logins: {
              [loginUrl]: result.getIdToken().getJwtToken()
            }
          });
          AWS.config.credentials
            .refreshPromise()
            .then(getCurrentUser)
            .then(resolve);
        },
        onFailure: function(err) {
          reject(err);
        }
      });
    });
  },

  getUserDeets: getCurrentUser
};
