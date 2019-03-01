const AWS = require('aws-sdk');

const USER_POOL_ID = 'eu-west-2_BmTJxzD8N';

function searchForUser(property, value) {
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  var params = {
    UserPoolId: USER_POOL_ID,
    Filter: `${property} = "${value}"`,
    Limit: 1
  };
  return cognitoidentityserviceprovider.listUsers(params).promise();
}

function updateAtrribute(attribute, value, username) {
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  var params = {
    UserAttributes: [
      {
        Name: attribute,
        Value: value
      }
    ],
    UserPoolId: USER_POOL_ID,
    Username: username
  };
  return cognitoidentityserviceprovider
    .adminUpdateUserAttributes(params)
    .promise();
}

module.exports = {
  searchByEmail: email => {
    return searchForUser('email', email)
      .then(result => {
        if (result.Users.length === 0) {
          throw new Error('User not found');
        }
        return result;
      })
      .then(result => result.Users[0])
      .then(result => {
        result.attr = {};
        let i = 0,
          l = result.Attributes.length;
        for (; i < l; i++) {
          result.attr[result.Attributes[i]['Name']] =
            result.Attributes[i]['Value'];
        }
        return result;
      });
  },

  setNumTokens: (tokens, email) => {
    return updateAtrribute('custom:tokens', tokens, email);
  },

  setAddress: (address, email) => {
    return updateAtrribute('address', address, email);
  },

  setPhoneNum: (phoneNum, email) => {
    return updateAtrribute('phone_number', phoneNum, email);
  },

  setGivenName: (givenName, email) => {
    return updateAtrribute('given_name', givenName, email);
  },

  setFamilyName: (familyName, email) => {
    return updateAtrribute('family_name', familyName, email);
  },

  setEmail: (newEmail, oldEmail) => {
    return updateAtrribute('email', newEmail, oldEmail);
  },

  disableUser: email => {
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    var params = {
      UserPoolId: USER_POOL_ID,
      Username: email
    };
    return cognitoidentityserviceprovider.adminDisableUser(params).promise();
  },

  enableUser: email => {
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    var params = {
      UserPoolId: USER_POOL_ID,
      Username: email
    };
    return cognitoidentityserviceprovider.adminEnableUser(params).promise();
  },

  deleteUser: email => {
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    var params = {
      UserPoolId: USER_POOL_ID,
      Username: email
    };
    return cognitoidentityserviceprovider.adminDeleteUser(params).promise();
  },

  resetUserPassword: email => {
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    var params = {
      UserPoolId: USER_POOL_ID,
      Username: email
    };
    cognitoidentityserviceprovider.adminResetUserPassword(params).promise();
  }
};
