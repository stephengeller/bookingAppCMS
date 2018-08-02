import React, { Component } from 'react';
import PropertyManager from '../components/properties/PropertyManager';

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: []
    };
  }

  render() {
    return (
      <div>
        <h2 className="center-align">Property Manager</h2>
        <PropertyManager
          apiClient={this.props.apiClient}
          googleApiKey={this.props.googleApiKey} />
      </div>
    );
  }
}

export default Properties;
