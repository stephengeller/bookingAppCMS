import React, { Component } from 'react';
import { Row, Preloader } from 'react-materialize';
import { Alert } from 'react-bootstrap';

import Formatter from '../modules/Formatter';
import ErrorHandler from '../modules/ErrorHandler';
import GoogleMapsAPI from '../modules/GoogleMapsAPI';
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
      'title',
      'description',
      'facilities',
      'addressLine1',
      'addressLine2',
      'city',
      'postcode',
      'bookingEmail'
    ];
    this.requiredFields = [
      'title',
      'description',
      'facilities',
      'addressLine1',
      'city',
      'postcode',
      'bookingEmail'
    ];

    this.state = {
      fields: {
        location: {}
      },
      error: null,
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

  cleanFields(fieldsToClean, currentFieldsState) {
    fieldsToClean.map(fieldName => (currentFieldsState[fieldName] = ''));
    return currentFieldsState;
  }

  submissionInProgress(bool) {
    this.setState({ loading: bool });
  }

  async addProperty() {
    this.submissionInProgress(true);
    if (
      this.errorHandler.allFieldsAreCompleted(
        this.requiredFields,
        this.state.fields
      )
    ) {
      const fields = await this.setUpFieldsObject(this.state.fields);

      this.props.apiClient
        .post('/properties/', fields)
        .then(() => {
          const error = {
            message: `Property "${fields.title}" successfully added`,
            style: 'success'
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
            style: 'danger'
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
      this.requiredFields,
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

  renderError() {
    const { error } = this.state;
    if (error) {
      const { message, style } = error;
      return (
        <Alert bsStyle={style}>
          <p>{message}</p>
        </Alert>
      );
    }
    return;
  }

  render() {
    const {
      title,
      description,
      facilities,
      bookingEmail,
      addressLine1,
      addressLine2,
      city,
      postcode
    } = this.state.fields;

    return (
      <div className="container">
        {this.renderError()}
        <h5 className="center-align">
          <strong>Details</strong>
        </h5>
        <FormItem
          name={'title'}
          label={'Title'}
          value={title}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'description'}
          type={'textarea'}
          label={'Property Description'}
          value={description}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'facilities'}
          label={'Facilities (separated by commas)'}
          value={facilities}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'bookingEmail'}
          label={'Booking Email'}
          type={'email'}
          value={bookingEmail}
          updateInputValue={this.updateInputValue}
        />
        <br />
        <h5 className="center-align">
          <strong>Address</strong>
        </h5>
        <FormItem
          name={'addressLine1'}
          label={'Address Line 1'}
          value={addressLine1}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'addressLine2'}
          label={'Address Line 2 (optional)'}
          value={addressLine2}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'city'}
          label={'City'}
          value={city}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'postcode'}
          label={'Post Code'}
          value={postcode}
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
