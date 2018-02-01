import React, { Component } from 'react';
import Header from './Header';
import Properties from '../pages/Properties';
import PropertiesApi from '../pages/PropertiesApi';
import { BrowserRouter, Route } from 'react-router-dom';
const Logout = () => <h2>Logged out</h2>;

class App extends Component {
  // componentDidMount == do something AFTER the component is rendered
  componentDidMount() {}

  render() {
    return (
      <div className="">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/properties" component={Properties} />
            <Route exact path="/api" component={PropertiesApi} />
            <Route path="/logout" component={Logout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
