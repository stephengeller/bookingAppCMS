import React, { Component } from 'react';
import { Icon } from 'react-materialize';

class DeletePropertyButton extends Component {
  render() {
    const { property } = this.props;
    return (
      <span className="right-align">
        <button
          className="btn waves-effect waves-light red accent-4 hoverable"
          onClick={() => {
            if (window.confirm('Delete the property?')) {
              this.props.deleteProperty(property);
            }
          }}
        >
          <Icon right>delete</Icon>Delete Property
        </button>
      </span>
    );
  }
}

export default DeletePropertyButton;
