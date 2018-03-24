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

  componentDidMount() {
    document.title = 'Properties';
  }

  render() {
    return (
      <div>
        <h2 className="center-align">Properties</h2>
        <PropertyManager
          apiClient={this.props.apiClient}
          googleApiKey={this.props.googleApiKey}
        />
      </div>
    );
  }
}

export default Properties;
