import React, { Component } from 'react';
import { Navbar, NavItem, NavLink } from 'react-materialize';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  renderContent() {
    switch (this.props.user) {
      case null:
        return [
          <li className="nav-dropdown" key="1">
            <Link to="/">Login</Link>
          </li>
        ];
      default:
        return [
          <LinkContainer to="/">
            <NavItem eventKey={1}>Home</NavItem>
          </LinkContainer>,
          <LinkContainer to="/properties/add">
            <NavItem eventKey={2}>Add Property</NavItem>
          </LinkContainer>,
          <LinkContainer to="/properties">
            <NavItem eventKey={3}>Manage</NavItem>
          </LinkContainer>,
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
