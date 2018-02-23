import React, { Component } from 'react';

class DeletePropertyButton extends Component {
  render() {
    const { property } = this.props;
    return (
      <div className="container">
        <span className="right-align">
          <button
            className="btn waves-effect waves-light red accent-4"
            onClick={() => this.props.deleteProperty(property)}
          >
            Delete Property
          </button>
        </span>
      </div>
    );
  }
}

export default DeletePropertyButton;
