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
    return <PropertyManager />;
  }
}

export default Properties;
