import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

class AddPropertyButton extends Component {
  render() {
    return (
      <Button
        className="btn waves-effect waves-light hoverable"
        type="submit"
        onClick={this.props.addProperty}
      >
        <Icon right>add</Icon>Add Property
      </Button>
    );
  }
}

export default AddPropertyButton;
