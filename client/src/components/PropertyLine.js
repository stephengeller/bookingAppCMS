import React, { Component } from 'react';

class PropertyLine extends Component {
  render() {
    const { field, label } = this.props;
    return (
      <div className="property-line">
        <div className="property-line-title">{label}: </div>
        {field}
      </div>
    );
  }
}

export default PropertyLine;
