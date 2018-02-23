import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Header from './Header';
import Properties from '../pages/Properties';
import Home from '../pages/Home';
import AddProperty from '../pages/AddProperty';
import PropertyDetails from '../pages/PropertyDetails';
const Logout = () => <h2>Logged out</h2>;

// TODO: create route to handle redirect to login page and back (parse & store the token in local storage)
// TODO: set the token in the Header for all the calls to the API
// TODO: create global config components (eg for URL, maybe token)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/properties" component={Properties} />
          <Route
            exact
            path="/properties/edit/:id"
            component={PropertyDetails}
          />
          <Route exact path="/properties/add" component={AddProperty} />
          <Route path="/logout" component={Logout} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
