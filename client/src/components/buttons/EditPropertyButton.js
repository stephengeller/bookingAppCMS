import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

class EditPropertyButton extends Component {
  render() {
    const { property } = this.props;
    return (
      <span className="left-align">
        <Link
          to={`/properties/${property.id}`}
          className="edit-property-button"
        >
          <button className="btn waves-effect waves-light blue accent-2 hoverable">
            <Icon right>edit</Icon>Edit Property
          </button>
        </Link>
      </span>
    );
  }
}

export default EditPropertyButton;
