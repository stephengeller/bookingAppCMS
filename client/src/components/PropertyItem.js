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
      showPropertyEditor: false
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
    console.log(property);
    if (typeof property.facilities === Array) {
      console.log('Array!');
      property.facilities = property.facilities.join(', ');
    } else if (typeof property.facilities === String) {
      console.log('String!');
      property.facilities = property.facilities.split(',').join(', ');
    } else if (property.facilities === undefined) {
      console.log('wtf');
    } else {
      console.log(property.facilities);
      return property.facilities;
    }
  }

  componentWillMount() {
    this.formatFacilities(this.props.property);
    console.log();
  }

  render() {
    const { property } = this.props;
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
          {property.location.postcode}
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
