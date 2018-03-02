import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'react-materialize';

class GoToManageButton extends Component {
  render() {
    return (
      <span className="left-align">
        <Link to={`/properties`} className="edit-property-button">
          <Button className="btn waves-effect waves-light blue accent-2 hoverable">
            <Icon right>folder</Icon>Manage Properties
          </Button>
        </Link>
      </span>
    );
  }
}

export default GoToManageButton;
