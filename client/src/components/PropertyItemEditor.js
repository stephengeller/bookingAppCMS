import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import DateRangeArrayMaker from '../modules/DateRangeArrayMaker';
import DateRangeDisplayer from './DateRangeDisplayer';
import Formatter from '../modules/Formatter';
import ErrorHandler from '../modules/ErrorHandler';
import axios from '../modules/axios';
import FormItem from './FormItem';

class PropertyItemEditor extends Component {
  constructor(props) {
    super(props);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
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
    axios
      .get(this.url)
      .then(response => {
        const property = response.data;
        this.setState({
          fields: property,
          property
        });
      })
      .catch(error => {
        const messageString = 'Error getting property: ' + error;
        const message = this.errorHandler.createErrorMessage(
          messageString,
          false
        );
        this.setState({ error: message });
      });
  }

  updateProperty() {
    const { fields } = this.state;
    fields.facilities = this.formatter.formatItemStringToArray(
      fields.facilities
    );
    axios
      .put(this.url, fields)
      .then(response => {
        const message = 'successfully updated property!';
        console.log(message);
        this.setState({ error: message });
      })
      .catch(function(error) {
        const message = ('Error updating property: ', error);
        console.log(message);
        this.setState({ error: message });
      });
  }

  updateAvailability(startDate, endDate) {
    if (startDate && endDate) {
      const array = this.dateRangeArrayMaker.getDateArray(
        startDate._d,
        endDate._d
      );
      const url = `${this.url}/available`;
      axios
        .post(url, array)
        .then(response => {
          const message = 'Successfully updated availabilty';
          console.log(message, response);
          const error = this.errorHandler.createErrorMessage(message, true);
          this.setState({ error });
        })
        .catch(errorResponse => {
          const message = 'Error updating availabilty: ' + errorResponse;
          const error = this.errorHandler.createErrorMessage(message, false);
          this.setState({ error });
        });
    } else {
      const message = 'Fill in the date fields';
      const error = this.errorHandler.createErrorMessage(message, false);
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
        <h2 className="center-align"> {this.state.fields.title} </h2>
        <div className="error" style={this.state.error.style} id="error">
          {this.state.error.message}
        </div>
        <br />
        Title
        <FormItem
          name={'title'}
          type={'text'}
          placeholder={'title'}
          value={this.state.fields.title}
          updateInputValue={this.updateInputValue}
        />
        Description
        <FormItem
          name={'description'}
          type={'textarea'}
          placeholder={'description'}
          value={this.state.fields.description}
          updateInputValue={this.updateInputValue}
        />
        Facilities
        <FormItem
          name={'facilities'}
          value={this.state.fields.facilities}
          updateInputValue={this.updateInputValue}
        />
        <Button
          className="btn waves-effect waves-light span4 text-right"
          type="submit"
          onClick={this.updateProperty}
        >
          <Icon right>edit</Icon>Update Property
        </Button>
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
        <DateRangeDisplayer id={this.props.id} />
      </div>
    );
  }
}

export default PropertyItemEditor;
