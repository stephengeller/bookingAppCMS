import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.user) {
      case null:
        return [
          <li className="nav-dropdown" key="1">
            <Link to="/login">Login</Link>
          </li>
        ];
      default:
        return [
          <NavItem key="1" href="/">
            Home
          </NavItem>,
          <NavItem key="2" href="/properties/add">
            Add Property
          </NavItem>,
          <NavItem key="3" href="/properties">
            Manage
          </NavItem>,
          <span key="4" style={{ margin: '0 10px' }}>
            Welcome {this.props.user.given_name}
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
