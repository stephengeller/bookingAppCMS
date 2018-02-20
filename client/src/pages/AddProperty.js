import React, { Component } from 'react';
import PropertyForm from '../components/PropertyForm';

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: []
    };
  }

  render() {
    return (
      <div className="">
        <h2 className="center">Add Property</h2>
        <PropertyForm />
      </div>
    );
  }
}

export default AddProperty;
