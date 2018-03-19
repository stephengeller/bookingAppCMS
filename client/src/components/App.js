import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Preloader } from 'react-materialize';

import Header from './Header';
import Properties from '../pages/Properties';
import Users from '../pages/Users';
import Home from '../pages/Home';
import AddProperty from '../pages/AddProperty';
import ImageManager from '../components/ImageManager';
import PropertyDetails from '../pages/PropertyDetails';
import UserDetails from '../pages/UserDetails';
import Login from '../pages/Login';
import UserStore from '../modules/CognitoUserStore';

import Auth, { ApiClient } from '../modules/Auth';

const Logout = () => <h2>Logged out</h2>;

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      awsConfig: {
        identityPoolId: this.props['IDENTITY_POOL_ID'],
        region: 'eu-west-2',
        userPoolId: this.props['USER_POOL_ID'],
        userPoolWebClientId: this.props['COGNITO_APP_ID']
      },
      apiClient: null,
      loggingIn: true
    };
    Auth.init(this.state.awsConfig).then(this.postAuth.bind(this));
  }

  logIn(username, password) {
    return Auth.logIn(username, password).then(this.postAuth.bind(this));
  }

  postAuth() {
    return Auth.getCurrentSession()
      .then(sesh => {
        UserStore.init(sesh, this.state.awsConfig);
      })
      .then(Auth.getUserDeets)
      .then(this.onLoggedIn.bind(this))
      .then(() => {
        return ApiClient.create(this.props['API']).then(api => {
          this.setState({
            apiClient: api,
            loggingIn: false
          });
        });
      })
      .catch(err => {
        this.setState({
          loggingIn: false
        });
        console.log('Auth failed');
        return err;
      });
  }

  onLoggedIn(user) {
    this.setState({
      user: user
    });
  }

  render() {
    if (this.state.loggingIn) {
      return (
        <div className="center container preloader-page">
          <h3>Loading, please wait...</h3>
          <Preloader flashing size="big" />
        </div>
      );
    }
    if (!this.state.user) {
      return (
        <BrowserRouter>
          <div>
            <Header user={this.state.user} />
            <PropsRoute
              exact
              logIn={this.logIn.bind(this)}
              component={Login}
              user={this.state.user}
            />
          </div>
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <div>
          <Header user={this.state.user} />
          <PropsRoute
            exact
            path="/"
            component={Home}
            login="" //{Auth.login}
            user={this.state.user}
          />
          <PropsRoute
            exact
            path="/properties"
            googleApiKey={this.props['GOOGLE_API_KEY']}
            apiClient={this.state.apiClient}
            component={Properties}
          />
          <PropsRoute
            exact
            path="/properties/:id"
            apiClient={this.state.apiClient}
            component={PropertyDetails}
          />
          <PropsRoute
            exact
            path="/properties/:id/images"
            apiClient={this.state.apiClient}
            component={ImageManager}
          />
          <PropsRoute
            exact
            path="/users"
            userStore={UserStore}
            googleApiKey={this.props['GOOGLE_API_KEY']}
            component={Users}
          />
          <PropsRoute
            exact
            path="/users/:id"
            userStore={UserStore}
            component={UserDetails}
          />
          <PropsRoute
            exact
            path="/login"
            logIn={this.logIn.bind(this)}
            component={Login}
            user={this.state.user}
          />
          <PropsRoute
            exact
            path="/properties/add"
            component={AddProperty}
            apiClient={this.state.apiClient}
            googleApiKey={this.props['GOOGLE_API_KEY']}
          />
          <Route path="/logout" component={Logout} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
