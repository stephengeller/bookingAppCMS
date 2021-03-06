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
        <PropertyItemEditor id={id} />
      </div>
    );
  }
}

export default PropertyDetails;
