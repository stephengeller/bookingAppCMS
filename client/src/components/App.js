import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Header from './Header';
import Properties from '../pages/Properties';
import Users from '../pages/Users';
import Home from '../pages/Home';
import AddProperty from '../pages/AddProperty';
import PropertyDetails from '../pages/PropertyDetails';
import UserDetails from '../pages/UserDetails';
import Login from '../pages/Login';

import Auth from '../modules/Auth';

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

// TODO: create route to handle redirect to login page and back (parse & store the token in local storage)
// TODO: set the token in the Header for all the calls to the API
// TODO: create global config components (eg for URL, maybe token)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    Auth.init({
      COGNITO_APP_ID: this.props['COGNITO_APP_ID'],
      USER_POOL_ID: this.props['USER_POOL_ID'],
      IDENTITY_POOL_ID: this.props['IDENTITY_POOL_ID']
    });

    Auth.getUserDeets()
      .then(this.onLoggedIn.bind(this))
      .catch(err => {
        console.error(err);
      });
  }

  onLoggedIn(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header user={this.state.user} />
          <PropsRoute
            exact
            path="/"
            component={Home}
            login={Auth.login}
            user={this.state.user}
          />
          <PropsRoute
            exact
            path="/properties"
            googleApiKey={this.props['GOOGLE_API_KEY']}
            component={Properties}
          />
          <Route
            exact
            path="/properties/edit/:id"
            component={PropertyDetails}
          />
          <PropsRoute
            exact
            path="/users"
            googleApiKey={this.props['GOOGLE_API_KEY']}
            component={Users}
          />
          <Route exact path="/users/edit/:id" component={UserDetails} />
          <PropsRoute
            exact
            path="/login"
            component={Login}
            logUserIn={Auth.logUserIn}
            onLoggedIn={this.onLoggedIn.bind(this)}
            user={this.state.user}
          />
          <Route exact path="/properties/add" component={AddProperty} />
          <Route path="/logout" component={Logout} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
