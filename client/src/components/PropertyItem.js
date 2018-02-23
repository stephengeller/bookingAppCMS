import React, { Component } from 'react';
import { Card } from 'react-materialize';

import PropertyLine from './PropertyLine';
import DeletePropertyButton from './buttons/DeletePropertyButton';
import EditPropertyButton from './buttons/EditPropertyButton';
import GoogleMapsAPI from '../modules/GoogleMapsAPI';

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
      <Card
        className="property-item center-align"
        title={property.title}
        waves="light"
      >
        <PropertyLine label={'Description'} field={property.description} />
        <PropertyLine label={'Facilities'} field={property.facilities} />
        <PropertyLine label={'Location'} field={property.address} />
        <div className="container">
          <EditPropertyButton property={property} />
          <br />
          <DeletePropertyButton
            property={property}
            deleteProperty={this.props.deleteProperty}
          />
        </div>
        <br />
      </Card>
    );
  }
}

export default PropertyItem;
