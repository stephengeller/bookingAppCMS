import React, { Component } from 'react';
import PropertyForm from '../components/propertyForm/PropertyForm';

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
        <br />
        <PropertyForm
          apiClient={this.props.apiClient}
          googleApiKey={this.props.googleApiKey}
        />
      </div>
    );
  }
}

export default AddProperty;
