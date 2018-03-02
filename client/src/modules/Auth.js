const AWS = require('aws-sdk');

module.exports = {

    saveAuthDeets: () => {
        var rawHash = window.location.hash.substr(1);
        var aHash = rawHash.split('&');
        var accessToken = null;
        for (var i = 0, l = aHash.length; i < l; i++) {
          var parts = aHash[i].split('=');
          if (parts[0] === 'access_token') {
            accessToken = parts[1];
            break;
          }
        }
        if (!accessToken) {
          return Promise.resolve();
        }
        window.localStorage.setItem('cfb-accessToken', accessToken);
        return Promise.resolve();
    },

    login: () => {
      window.location.href = "https://cfb-staging.auth.eu-west-2.amazoncognito.com/login?client_id=23q08taipsqnc257mpinu7chcj&redirect_uri=http://localhost:5000/&response_type=token";
    },

    getUserDeets: () => {
        var accessToken = window.localStorage.getItem('cfb-accessToken');
        if (!accessToken || accessToken === 'null') {
          return Promise.resolve(null);
        }
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
            apiVersion: '2016-04-18',
            region:     'eu-west-2'
        });
        var params = {
          AccessToken: accessToken
        };
        return cognitoidentityserviceprovider
          .getUser(params)
          .promise()
          .then(data => {
            var rawAttrs = data.UserAttributes;
            var attrs = {};
            for (var i = 0, l = rawAttrs.length; i < l; i++) {
              attrs[rawAttrs[i]['Name']] = rawAttrs[i]['Value'];
              if (rawAttrs[i]['Name'] === 'custom:tokens') {
                attrs['custom:tokens'] = parseInt(attrs['custom:tokens'], 10);
              }
            }
            return attrs;
          })
          .catch(err => {
            window.localStorage.removeItem('cfb-accessToken');
            return Promise.reject(err);
        });
    }
}