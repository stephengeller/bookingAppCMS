import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

class EditButton extends Component {
  render() {
    const { type, id, props } = this.props;
    return (
      <span className="left-align">
        <Link
          to={{
            pathname: `/${type}/${id}`,
            state: {
              props
            }
          }}
          className="edit-property-button"
        >
          <button className="btn waves-effect waves-light blue accent-2 hoverable">
            <Icon right>edit</Icon>Edit
          </button>
        </Link>
      </span>
    );
  }
}

export default EditButton;
