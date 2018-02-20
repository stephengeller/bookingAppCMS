import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'user'
    };
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
          <NavItem key="1">
            <a href="/properties/add">Add Property</a>
          </NavItem>,
          <NavItem key="2">
            <a href="/properties">Manage</a>
          </NavItem>,
          <span key="3" style={{ margin: '0 10px' }}>
            Welcome {this.state.user}
          </span>
        ];
    }
  }

  render() {
    return (
      <Navbar className="teal darken-4" brand="CareFreeBreaks CMS" right>
        <div>
          <div className="">{this.renderContent()}</div>
        </div>
      </Navbar>
    );
  }
}

export default Header;
