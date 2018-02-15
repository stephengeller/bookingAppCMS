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
    this.arrayFormatter = new ArrayFormatter();
    this.mapsAPI = new GoogleMapsAPI();
    this.fieldNames = [
      'title',
      'description',
      'facilities',
      'addressLine1',
      'addressLine2',
      'city',
      'postcode'
    ];
    this.state = {
      fields: {
        location: {}
      },
      error: ''
    };
  }

  emptyBoxErrorHandler(fieldNames) {
    const missingFields = [];
    fieldNames.forEach(field => {
      if (!this.state.fields[field]) {
        console.log('missing: ', this.state.fields[field], field);
        missingFields.push(field);
      }
    });
    const messageString =
      'The following fields are required: ' + missingFields.join(', ');
    return {
      style: { color: 'red' },
      message: messageString
    };
  }

  allFieldsAreCompleted() {
    for (let i = 0; i < this.fieldNames.length; i++) {
      if (!this.state.fields[this.fieldNames[i]]) {
        return false;
      }
    }
    return true;
  }

  async addProperty() {
    const { fields } = this.state;

    fields.facilities = this.arrayFormatter.formatItemStringToArray(
      fields.facilities
    );

    if (this.allFieldsAreCompleted()) {
      const lngLat = await this.mapsAPI.getPostcodeResults(fields.postcode);
      fields.location = {
        lat: lngLat.latitude,
        lon: lngLat.longitude
      };
      fields.ownerId = 'testOwnerId';
      console.log('No empty fields, making axios call to add property');

      axios
        .post('/properties/', fields)
        .then(() => {
          const error = {
            message: `Property "${fields.title}" successfully added`,
            style: { color: 'green' }
          };
          this.fieldNames.map(fieldName => (fields[fieldName] = ''));
          this.setState({ fields, error });
        })
        .catch(error => {
          console.log(error);
          console.log(fields);
          const errorMessage = {
            message: error.toString(),
            style: { color: 'red' }
          };
          this.setState({ error: errorMessage });
        });
    } else {
      const error = this.emptyBoxErrorHandler(this.fieldNames);
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
        Details
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
        <br />
        Address
        <FormItem
          name={'addressLine1'}
          label={'Address Line 1'}
          value={this.state.fields.location['addressLine1']}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'addressLine2'}
          label={'Address Line 2 (optional)'}
          value={this.state.fields.location['addressLine2']}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'city'}
          label={'City'}
          value={this.state.fields.location['city']}
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
