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
    this.truncateDescription = this.truncateDescription.bind(this);
    this.state = {
      showPropertyEditor: false,
      property: {
        location: ''
      }
    };
    this.mapsAPI = new GoogleMapsAPI({
      googleApiKey: this.props.googleApiKey
    });
  }

  toggleEditor() {
    const oppositeOfPrevious = !this.state.showPropertyEditor;
    this.setState({ showPropertyEditor: oppositeOfPrevious });
  }

  hideEditor() {
    this.setState({ showPropertyEditor: false });
  }

  truncateDescription(text) {
    if (text.length > 20) {
      return `${text
        .split(' ')
        .splice(0, 20)
        .join(' ')}...`;
    } else {
      return text;
    }
  }

  componentWillMount() {
    const { property } = this.props;
    if (property.address && typeof property.address === Array) {
      property.address = property.address.join(', ');
    } else if (property.location) {
      property.address = `${property.location.lat}, ${property.location.lon}`;
    }
    this.setState({ property });
  }

  render() {
    const { property } = this.state;
    console.log(property.title, property.description.length);
    return (
      <Card
        className="property-item center-align hoverable"
        title={property.title}
        waves="light"
      >
        <div className="divider" />
        <br />
        <PropertyLine
          label={'Description'}
          field={this.truncateDescription(property.description)}
        />
        <PropertyLine
          label={'Facilities'}
          field={property.facilities.join(', ')}
        />
        <PropertyLine label={'Location'} field={property.address} />
        <div style={{ float: 'right' }}>
          <EditPropertyButton property={property} />
        </div>
        <div style={{ float: 'left' }}>
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
