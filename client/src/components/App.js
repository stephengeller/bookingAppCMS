import React, { Component } from 'react';
import Header from './Header';
import Properties from '../pages/Properties';
import AddProperty from '../pages/AddProperty';
import { BrowserRouter, Route } from 'react-router-dom';
const Logout = () => <h2>Logged out</h2>;

// TODO: create route to handle redirect to login page and back (parse & store the token in local storage)
// TODO: set the token in the Header for all the calls to the API
// TODO: create global config components (eg for URL, maybe token)

class App extends Component {
  render() {
    return (
      <div className="">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/properties" component={Properties} />
            <Route exact path="/properties/add" component={AddProperty} />
            <Route path="/logout" component={Logout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
