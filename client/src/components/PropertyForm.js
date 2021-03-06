import React, { Component } from 'react';
import { Row, Preloader } from 'react-materialize';

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
    this.submissionInProgress = this.submissionInProgress.bind(this);
    this.handleMissingFields = this.handleMissingFields.bind(this);
    this.formatter = new Formatter();
    this.errorHandler = new ErrorHandler();
    this.mapsAPI = new GoogleMapsAPI({
      googleApiKey: this.props.googleApiKey
    });
    this.allFields = [
      { name: 'title', required: true },
      { name: 'description', required: true },
      { name: 'facilities', required: true },
      { name: 'addressLine1', required: true },
      { name: 'addressLine2', required: false },
      { name: 'city', required: true },
      { name: 'postcode', required: true },
      { name: 'bookingEmail', required: true }
    ];

    this.state = {
      fields: {
        location: {}
      },
      error: '',
      loading: false
    };
  }

  async setUpFieldsObject(fields) {
    const lngLat = await this.mapsAPI.getPostcodeResults(
      this.state.fields.postcode
    );
    const { title, description, bookingEmail } = fields;

    return {
      title,
      description,
      location: {
        lat: lngLat.latitude,
        lon: lngLat.longitude
      },
      facilities: this.formatter.formatItemStringToArray(fields.facilities),
      address: await this.formatter.convertAddressToArray(fields),
      ownerId: 'testOwnerId',
      bookingEmail
    };
  }

  cleanFields(allFields, currentFieldsState) {
    allFields.map(fieldObj => (currentFieldsState[fieldObj['name']] = ''));
    return currentFieldsState;
  }

  submissionInProgress(bool) {
    this.setState({ loading: bool });
  }

  async addProperty() {
    this.submissionInProgress(true);
    if (
      this.errorHandler.allFieldsAreCompleted(this.allFields, this.state.fields)
    ) {
      const fields = await this.setUpFieldsObject(this.state.fields);

      axios
        .post('/properties/', fields)
        .then(() => {
          const error = {
            message: `Property "${fields.title}" successfully added`,
            style: { color: 'green' }
          };
          const currentFieldsState = this.cleanFields(
            this.allFields,
            this.state.fields
          );
          this.submissionInProgress(false);
          this.setState({ fields: currentFieldsState, error });
        })
        .catch(error => {
          console.log(error, fields);
          const errorMessage = {
            message: error.toString(),
            style: { color: 'red' }
          };
          this.submissionInProgress(false);
          this.setState({ error: errorMessage });
        });
    } else {
      this.handleMissingFields();
    }
  }

  handleMissingFields() {
    const error = this.errorHandler.emptyBoxErrorHandler(
      this.allFields,
      this.state
    );
    this.submissionInProgress(false);
    this.setState({ error });
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
        <h5 className="center-align">
          <strong>Details</strong>
        </h5>
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
          label={'Facilities (separated by commas)'}
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
        <h5 className="center-align">
          <strong>Address</strong>
        </h5>
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
        {this.state.loading === false ? (
          <Row>
            <AddPropertyButton addProperty={this.addProperty} />
            <br />
          </Row>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

export default PropertyForm;
