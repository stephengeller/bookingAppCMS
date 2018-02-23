import React, { Component } from 'react';
import { Row } from 'react-materialize';

import Formatter from '../modules/Formatter';
import ErrorHandler from '../modules/ErrorHandler';
import GoogleMapsAPI from '../modules/GoogleMapsAPI';
import axios from '../modules/axios';
import AddPropertyButton from './buttons/AddPropertyButton';
import FormItem from './FormItem';

class PropertyForm extends Component {
  constructor(props) {
    super(props);
    this.addProperty = this.addProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.formatter = new Formatter();
    this.errorHandler = new ErrorHandler();
    this.mapsAPI = new GoogleMapsAPI();
    this.allFields = [
      'title',
      'description',
      'facilities',
      'addressLine1',
      'addressLine2',
      'city',
      'postcode',
      'availableFrom',
      'availableTo',
      'bookingEmail'
    ];
    this.requiredFields = [
      'title',
      'description',
      'facilities',
      'addressLine1',
      'city',
      'postcode',
      'availableFrom',
      'availableTo',
      'bookingEmail'
    ];

    this.state = {
      fields: {
        location: {}
      },
      error: ''
    };
  }

  async setUpFieldsObject(fields) {
    const lngLat = await this.mapsAPI.getPostcodeResults(
      this.state.fields.postcode
    );
    console.log(fields);
    const {
      title,
      description,
      availableFrom,
      availableTo,
      bookingEmail
    } = fields;

    return {
      title,
      description,
      availableFrom: this.formatter.formatDate(availableFrom),
      availableTo: this.formatter.formatDate(availableTo),
      location: {
        lat: lngLat.latitude,
        lon: lngLat.longitude
      },
      facilities: this.formatter.formatItemStringToArray(
        fields.facilities.toString()
      ),
      address: await this.formatter.convertAddressToArray(fields),
      ownerId: 'testOwnerId',
      bookingEmail
    };
  }

  async addProperty() {
    if (
      this.errorHandler.allFieldsAreCompleted(
        this.requiredFields,
        this.state.fields
      )
    ) {
      console.log('No empty fields, making axios call to add property');

      const fields = await this.setUpFieldsObject(this.state.fields);

      axios
        .post('/properties/', fields)
        .then(() => {
          console.log(fields, 'was posted to axios');
          const error = {
            message: `Property "${fields.title}" successfully added`,
            style: { color: 'green' }
          };
          const currentFieldsState = this.state.fields;
          this.allFields.map(fieldName => (currentFieldsState[fieldName] = ''));
          this.setState({ fields: currentFieldsState, error });
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
      const error = this.errorHandler.emptyBoxErrorHandler(
        this.requiredFields,
        this.state
      );
      this.setState({ error });
    }
  }

  updateInputValue(evt, formName) {
    let value = evt.target.value.toString();
    let fields = this.state.fields;
    fields[formName] = value;
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
          type={'textarea'}
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
          name={'bookingEmail'}
          label={'Booking Email'}
          type={'email'}
          value={this.state.fields.bookingEmail}
          updateInputValue={this.updateInputValue}
        />
        <br />
        Address
        <FormItem
          name={'addressLine1'}
          label={'Address Line 1'}
          value={this.state.fields['addressLine1']}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'addressLine2'}
          label={'Address Line 2 (optional)'}
          value={this.state.fields['addressLine2']}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'city'}
          label={'City'}
          value={this.state.fields['city']}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'postcode'}
          label={'Post Code'}
          value={this.state.fields['postcode']}
          updateInputValue={this.updateInputValue}
        />
        <br />
        Available Dates
        <Row>
          <FormItem
            name={'availableFrom'}
            label={'Available From'}
            type={'date'}
            s={6}
            value={this.state.fields['availableFrom']}
            updateInputValue={this.updateInputValue}
          />
          <FormItem
            name={'availableTo'}
            label={'Available To'}
            type={'date'}
            s={6}
            value={this.state.fields['availableTo']}
            updateInputValue={this.updateInputValue}
          />
          <AddPropertyButton addProperty={this.addProperty} />
          <br />
        </Row>
      </div>
    );
  }
}

export default PropertyForm;
