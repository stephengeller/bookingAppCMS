import React, { Component } from 'react';
import Header from './Header'
import Properties from '../pages/Properties'
import { BrowserRouter, Route } from 'react-router-dom';
const Logout = () => <h2>Logged out</h2>;

class App extends Component {
    // componentDidMount == do something AFTER the component is rendered
    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/properties" component={Properties} />
                        <Route path="/logout" component={Logout} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
