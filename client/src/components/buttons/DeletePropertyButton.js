import React, { Component } from 'react';
import { Icon } from 'react-materialize';

class DeletePropertyButton extends Component {
  render() {
    const { property } = this.props;
    return (
      <div className="container">
        <span className="right-align">
          <button
            className="btn waves-effect waves-light red accent-4"
            onClick={() => {
              if (window.confirm('Delete the item?')) {
                this.props.deleteProperty(property);
              }
            }}
          >
            <Icon right>delete</Icon>Delete Property
          </button>
        </span>
      </div>
    );
  }
}

export default DeletePropertyButton;
