import React, { Component } from 'react';
import { Card } from 'react-materialize';

import PropertyLine from './PropertyLine';
import DeletePropertyButton from '../buttons/DeletePropertyButton';
import EditPropertyButton from '../buttons/EditPropertyButton';

class PropertyItem extends Component {
  constructor(props) {
    super(props);
    this.toggleContents = this.toggleContents.bind(this);
    this.state = {
      shortDescription: true,
      property: this.props.property
    };
  }

  toggleContents() {
    const oppositeOfPrevious = !this.state.shortDescription;
    this.setState({ shortDescription: oppositeOfPrevious });
  }

  UNSAFE_componentWillMount() {
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
          field={ shortDescription ? this.createShortDescription(property) :
            <a style={{color: 'inherit'}}>{property.description}</a>
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

  createShortDescription(property) {
    const length = 20;
    const ellipsis = property.description.length > length ? "..." : ""
    return <a style={{color: 'inherit'}}>{property.description
      .split(' ')
      .splice(0, length)
      .join(' ')}{ellipsis}</a>;
  }
}

export default PropertyItem;
