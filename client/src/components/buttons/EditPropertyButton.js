import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditPropertyButton extends Component {
  render() {
    const { property } = this.props;
    return (
      <div className="container">
        <span className="left-align">
          <Link
            to={`/properties/edit/${property.id}`}
            className="edit-property-button"
          >
            <button className="btn waves-effect waves-light blue accent-2">
              Edit Property
            </button>
          </Link>
        </span>
      </div>
    );
  }
}

export default EditPropertyButton;
