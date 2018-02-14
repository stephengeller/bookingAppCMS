import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

import ArrayFormatter from '../modules/ArrayFormatter';
import axios from '../modules/axios';
import FormItem from './FormItem';
import GoogleMapsAPI from './GoogleMapsAPI';

class PropertyForm extends Component {
  constructor(props) {
    super(props);
    this.addProperty = this.addProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.mapsAPI = new GoogleMapsAPI();
    this.state = {
      fields: {
        location: {}
      },
      error: ''
    };
    this.arrayFormatter = new ArrayFormatter();
  }

  emptyBoxErrorHandler(fieldNames) {
    const missingFields = [];
    fieldNames.forEach(field => {
      if (!this.state.fields[field]) {
        missingFields.push(field);
      } else {
      }
    });
    const messageString =
      'The following fields are required: ' + missingFields.join(', ');
    return {
      style: { color: 'red' },
      message: messageString
    };
  }

  async addProperty() {
    const fields = this.state.fields;
    fields.facilities = this.arrayFormatter.formatItemStringToArray(
      fields.facilities
    );
    const fieldNames = [
      'title',
      'description',
      'ownerId',
      'facilities',
      'postcode'
    ];
    const {
      title,
      description,
      facilities,
      postcode
    } = this.state.fields;
    if (!!title && !!description && !!facilities && !!postcode) {
      const lngLat = await this.mapsAPI.getPostcodeResults(postcode);
      fields.location = {
        lat: lngLat.latitude,
        lon: lngLat.longitude
      };
      fields.postcode = postcode;
      fields.ownerId = 'testOwnerId';
      console.log(fields);
      axios
        .post('/properties/', fields)
        .then(() => {
          const error = {
            message: `Property "${fields.title}" successfully added`,
            style: { color: 'green' }
          };
          fieldNames.map(fieldName => (fields[fieldName] = ''));
          this.setState({ fields, error });
        })
        .catch(error => {
          console.log(error);
          const errorMessage = {
            message: error.toString(),
            style: { color: 'red' }
          };
          this.setState({ error: errorMessage });
        });
    } else {
      const error = this.emptyBoxErrorHandler(fieldNames);
      this.setState({ error });
    }
  }

  updateInputValue(evt, input) {
    let value = evt.target.value;
    let fields = this.state.fields;
    fields[input] = value;
    this.setState({
      fields
    });
  }

  render() {
    return (
      <div className="container">
        <div className="error" style={this.state.error.style} id="error">
          {this.state.error.message}
        </div>
        <FormItem
          name={'title'}
          label={'Title'}
          value={this.state.fields.title}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'description'}
          label={'Property Description'}
          value={this.state.fields.description}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'facilities'}
          label={'Facilities (separated by spaces)'}
          value={this.state.fields.facilities}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'postcode'}
          label={'Post Code'}
          value={this.state.fields.location['postcode']}
          updateInputValue={this.updateInputValue}
        />
        <Button
          className="btn waves-effect waves-light"
          type="submit"
          onClick={this.addProperty}
        >
          <Icon right>add</Icon>Add Property
        </Button>
        <br />
      </div>
    );
  }
}

export default PropertyForm;
