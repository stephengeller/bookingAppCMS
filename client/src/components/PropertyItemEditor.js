import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import DateRangeArrayMaker from '../modules/DateRangeArrayMaker';
import DateRangeDisplayer from './DateRangeDisplayer';
import Formatter from '../modules/Formatter';
import ErrorHandler from '../modules/ErrorHandler';
import FormItem from './FormItem';

class PropertyItemEditor extends Component {
  constructor(props) {
    super(props);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.renderError = this.renderError.bind(this);
    this.setErrorState = this.setErrorState.bind(this);
    this.dateRangeArrayMaker = new DateRangeArrayMaker();
    this.errorHandler = new ErrorHandler();
    this.formatter = new Formatter();
    this.state = {
      fields: {},
      error: ''
    };
    this.url = `/properties/${this.props.id}`;
  }

  componentWillMount() {
    this.props.apiClient
      .get(this.url)
      .then(response => {
        const property = response.data;
        this.setState({
          fields: property,
          property
        });
      })
      .catch(error => {
        const message = 'Error getting property: ' + error;
        this.setErrorState(message, false);
      });
  }

  updateProperty() {
    const { fields } = this.state;
    fields.facilities = this.formatter.formatItemStringToArray(
      fields.facilities
    );
    this.props.apiClient
      .put(this.url, fields)
      .then(response => {
        this.setErrorState('Successfully updated property detail', true);
      })
      .catch(errorMsg => {
        const message = ('Error updating property: ', errorMsg);
        this.setErrorState(message, false);
      });
  }

  updateAvailability(startDate, endDate) {
    if (startDate && endDate) {
      const array = this.dateRangeArrayMaker.getDateArray(
        startDate._d,
        endDate._d
      );
      const url = `${this.url}/available`;
      this.props.apiClient
        .post(url, array)
        .then(response => {
          this.setErrorState('Successfully updated availabilty', true);
        })
        .catch(errorResponse => {
          const message = 'Error updating availabilty: ' + errorResponse;
          this.setErrorState(message, false);
        });
    } else {
      this.setErrorState('Fill in the date fields', false);
    }
  }

  setErrorState(message, boolean) {
    this.setState({
      error: this.errorHandler.createErrorMessage(message, boolean)
    });
  }

  updateInputValue(evt, input) {
    let value = evt.target.value;
    let fields = this.state.fields;
    fields[input] = value;
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
    const { fields } = this.state;
    return (
      <div className="container">
        <h2 className="center-align"> {fields.title} </h2>
        {this.renderError()}
        Title
        <FormItem
          name={'title'}
          type={'text'}
          placeholder={'title'}
          value={fields.title}
          updateInputValue={this.updateInputValue}
        />
        Description
        <FormItem
          name={'description'}
          type={'textarea'}
          placeholder={'description'}
          value={fields.description}
          updateInputValue={this.updateInputValue}
        />
        Facilities
        <FormItem
          name={'facilities'}
          value={fields.facilities}
          updateInputValue={this.updateInputValue}
        />
        <Button
          className="btn waves-effect waves-light span4 text-right"
          type="submit"
          onClick={this.updateProperty}
        >
          <Icon right>edit</Icon>Update Property
        </Button>
        <Link to={`${this.url}/images`} style={{ float: 'right' }}>
          <Button>
            Edit pictures<Icon right>camera_alt</Icon>
          </Button>
        </Link>
        <br />
        <h4 className="center-align">Available Dates</h4>
        <br />
        <div className="center-align">
          <DateRangePicker
            noBorder
            showClearDates
            showDefaultInputIcon
            startDate={this.state.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => {
              this.setState({ startDate, endDate });
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => {
              this.setState({ focusedInput });
            }}
          />
          <div>
            <Button
              onClick={() => {
                this.updateAvailability(
                  this.state.startDate,
                  this.state.endDate
                );
              }}
            >
              <Icon left>date_range</Icon>
              Update Availability
            </Button>
          </div>
        </div>
        <br />
        <div className={''} />
        <br />
        <DateRangeDisplayer
          apiClient={this.props.apiClient}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default PropertyItemEditor;
