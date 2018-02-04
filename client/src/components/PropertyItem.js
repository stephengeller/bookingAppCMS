import React, { Component } from 'react';

class PropertyItem extends Component {
  render() {
    let property = this.props.property;
    return (
      <section className="property-item">
        <h5>{property.title}</h5>
        <h6 className="property-line">
          <span className="property-line-title">Description: </span>
          {property.description}
        </h6>
        <div className="property-line">
          <span className="property-line-title">OwnerID: </span>
          {property.ownerId}
        </div>
        <div className="property-line">
          <span className="property-line-title">Facilities: </span>
          {property.facilities}
        </div>
        <button
          className="btn waves-effect waves-light"
          onClick={() => this.props.deleteProperty(property)}
        >
          Delete This Property
        </button>
        <br />
        <br />
      </section>
    );
  }
}

export default PropertyItem;
