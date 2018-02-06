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
        <div className="container">
          <div className="right-align">
            <button
              className="btn waves-effect waves-light red accent-4"
              onClick={() => this.props.deleteProperty(property)}
            >
              Delete Property
            </button>
          </div>
          <div className="left-align">
            <button
              className="btn waves-effect waves-light blue accent-2"
              onClick={() => this.props.deleteProperty(property)}
            >
              Update Property
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default PropertyItem;
