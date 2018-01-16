import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

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
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo truncate"
                    >
                        CareFreeBreaks CMS
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header
