import React, { Component } from 'react';
import { Card } from 'react-materialize';

import PropertyLine from './PropertyLine';
import DeletePropertyButton from '../buttons/DeletePropertyButton';
import EditPropertyButton from '../buttons/EditPropertyButton';
import GoogleMapsAPI from '../../modules/GoogleMapsAPI';

class PropertyItem extends Component {
  constructor(props) {
    super(props);
    this.toggleContents = this.toggleContents.bind(this);
    this.state = {
      shortDescription: true,
      property: {
        location: ''
      }
    };
    this.mapsAPI = new GoogleMapsAPI({
      googleApiKey: this.props.googleApiKey
    });
  }

  toggleContents() {
    const oppositeOfPrevious = !this.state.shortDescription;
    this.setState({ shortDescription: oppositeOfPrevious });
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
    const { property, shortDescription } = this.state;
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
          field={shortDescription ? <a style={{color: 'inherit'}}>{property.description
            .split(' ')
            .splice(0, 20)
              .join(' ')}...</a> : <a style={{color: 'inherit'}}>{property.description}</a>
          }
          toggleContents={this.toggleContents}
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
