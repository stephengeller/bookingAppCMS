import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
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
          <LinkContainer key={'home'} to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>,
          <LinkContainer key={'properties'} to="/properties">
            <NavItem>Properties</NavItem>
          </LinkContainer>,
          <LinkContainer key={'users'} to="/users">
            <NavItem>Users</NavItem>
          </LinkContainer>,
          <span key={'welcome'} style={{ margin: '0 10px' }}>
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
