import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Header from './Header';
import Properties from '../pages/Properties';
import Home from '../pages/Home';
import AddProperty from '../pages/AddProperty';
import PropertyDetails from '../pages/PropertyDetails';
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
    Auth.getUserDeets()
      .then(this.onLoggedIn.bind(this))
      .catch(err => {
        console.error(err);
      })
  }

  onLoggedIn(user) {
    this.setState({'user': user});
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
          <Route exact path="/properties" component={Properties} />
          <Route
            exact
            path="/properties/edit/:id"
            component={PropertyDetails}
          />
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
