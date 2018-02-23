import React, { Component } from 'react';

class PropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: []
    };
  }

  render() {
    console.log(this.props);
    const { params } = this.props.match;
    return (
      <div className="">
        Property Details
        <h2 className="center">{params.id}</h2>
      </div>
    );
  }
}

export default PropertyDetails;
