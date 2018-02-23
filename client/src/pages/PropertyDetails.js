import React, { Component } from 'react';
import PropertyItemEditor from '../components/PropertyItemEditor';

class PropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: []
    };
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <div className="">
        <h2 className="center-align">Property Details</h2>
        <PropertyItemEditor id={id} />
      </div>
    );
  }
}

export default PropertyDetails;
