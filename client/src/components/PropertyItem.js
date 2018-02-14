import React, { Component } from 'react';
import PropertyItemEditor from './PropertyItemEditor';
import GoogleMapsAPI from './GoogleMapsAPI';

class PropertyItem extends Component {
  constructor(props) {
    super(props);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.hideEditor = this.hideEditor.bind(this);
    this.formatFacilities = this.formatFacilities.bind(this);
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

  formatFacilities(property) {
    if (typeof property.facilities === Array) {
      console.log('Array!');
      property.facilities = property.facilities.join(', ');
    } else if (typeof property.facilities === String) {
      console.log('String!');
      property.facilities = property.facilities.split(',').join(', ');
    } else if (property.facilities === undefined) {
      console.log('wtf');
    } else {
      // console.log(property.facilities);
      return property.facilities;
    }
  }

  async componentWillMount() {
    const property = this.props.property;
    this.formatFacilities(property);
    const results = await this.mapsAPI.getAddressFromLatLng(
      property.location.lat,
      property.location.lon
    );
    console.log(results);
    if (results) {
      property.location.address = results.formatted_address;
      console.log('success', property);
    } else {
      property.location.address = 'missing';
    }
    this.setState({ property });
    console.log(this.state);
  }

  render() {
    const { property } = this.state;
    console.log(this.state);
    return (
      <section className="property-item center-align ">
        <h4 className="property-line-title">{property.title}</h4>
        <h6 className="property-line">
          <div className="property-line-title">Description: </div>
          {property.description}
        </h6>
        <div className="property-line">
          <div className="property-line-title">OwnerID: </div>
          {property.ownerId}
        </div>
        <div className="property-line">
          <div className="property-line-title">Facilities: </div>
          {property.facilities}
        </div>
        <div className="property-line">
          <div className="property-line-title">Location: </div>
          {property.location.address}
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
