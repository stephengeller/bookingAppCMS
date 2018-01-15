import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Properties extends Component {

    constructor(props) {
        super(props);
        this.state={
            user: 'Stephen'
        }
    }
    renderContent() {
        switch (this.state.user) {
            case null:
                return;
            case false:
                return [
                    <li className="nav-dropdown" key="1">
                        <a href="/login">Login</a>
                    </li>
                ];
            default:
                return [
                    <li key="1">
                        <a href="/properties" >Properties</a>
                    </li>,
                    <li key="2">
                        <a href="/logout" >Logout</a>
                    </li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Welcome {this.state.user}
                    </li>
                ];
        }
    }

    render() {
        return (
            <div>
                <h2>Properties</h2>
            </div>
        );
    }
}

export default Properties
