import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'react-materialize';

class GoToAddPropertyButton extends Component {
  render() {
    return (
      <div className="center-align">
        <Link to={`/properties/add`} className="edit-property-button">
          <Button className="btn waves-effect waves-light blue accent-2 hoverable">
            <Icon right>folder</Icon>Add Property
          </Button>
        </Link>
      </div>
    );
  }
}

export default GoToAddPropertyButton;
