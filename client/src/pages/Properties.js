import React, { Component } from 'react';
import PropertyManager from '../components/PropertyManager';

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
        <PropertyManager googleApiKey={this.props.googleApiKey} />
      </div>
    );
  }
}

export default Properties;
