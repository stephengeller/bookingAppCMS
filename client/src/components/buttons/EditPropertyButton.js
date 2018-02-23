import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditPropertyButton extends Component {
  render() {
    const { property } = this.props;
    return (
      <div className="container">
        <span className="left-align">
          <button className="btn waves-effect waves-light blue accent-2">
            <Link
              to={`/properties/edit/${property.id}`}
              className="edit-property-button"
            >
              Edit Property
            </Link>
          </button>
        </span>
      </div>
    );
  }
}

export default EditPropertyButton;
