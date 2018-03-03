const AWS = require('aws-sdk');
const AUTH = require('./Auth')

module.exports = {

    searchForUser(property, value) {
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        var params = {
            UserPoolId: 'eu-west-2_BmTJxzD8N',
            Filter: 'email = "chris@ckxgroup.io"',
            Limit: 10
        };
        cognitoidentityserviceprovider.listUsers(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
    }

}