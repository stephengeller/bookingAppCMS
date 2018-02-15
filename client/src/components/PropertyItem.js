import React, { Component } from 'react';

import PropertyItemEditor from './PropertyItemEditor';
import GoogleMapsAPI from './GoogleMapsAPI';

class PropertyItem extends Component {
  constructor(props) {
    super(props);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.hideEditor = this.hideEditor.bind(this);
    this.state = {
      showPropertyEditor: false,
      property: {
        location: ''
      }
    };
    this.mapsAPI = new GoogleMapsAPI();
  }

  toggleEditor() {
    const oppositeOfPrevious = !this.state.showPropertyEditor;
    this.setState({ showPropertyEditor: oppositeOfPrevious });
  }

  hideEditor() {
    this.setState({ showPropertyEditor: false });
  }

  componentWillMount() {
    const property = this.props.property;
    if (property.address) {
      property.address = property.address.join(', ');
    } else if (property.location) {
      property.address = `${property.location.lat}, ${property.location.lon}`;
    }
    this.setState({ property });
  }

  render() {
    const { property } = this.state;
    return (
      <section className="property-item center-align ">
        <h4 className="property-line-title">{property.title}</h4>
        <h6 className="property-line">
          <div className="property-line-title">Description: </div>
          {property.description}
        </h6>
        <div className="property-line">
          <div className="property-line-title">Facilities: </div>
          {property.facilities}
        </div>
        <div className="property-line">
          <div className="property-line-title">Location: </div>
          {property.address}
        </div>
        <div className="container">
          <span className="right-align">
            <button
              className="btn waves-effect waves-light red accent-4"
              onClick={() => this.props.deleteProperty(property)}
            >
              Delete Property
            </button>
          </span>
          <span className="left-align">
            <button
              className="btn waves-effect waves-light blue accent-2"
              onClick={() => this.toggleEditor(property)}
            >
              {this.state.showPropertyEditor
                ? 'Hide Property Editor'
                : 'Edit Property'}
            </button>
            {this.state.showPropertyEditor ? (
              <PropertyItemEditor
                property={property}
                hideEditor={this.hideEditor}
              />
            ) : null}
          </span>
        </div>
        <br />
      </section>
    );
  }
}

export default PropertyItem;
