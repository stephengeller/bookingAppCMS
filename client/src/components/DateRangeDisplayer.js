import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-materialize';

import axios from '../modules/axios';

class DateRangeDisplayer extends Component {
  constructor(props) {
    super(props);
    this.getDatesFromMonth = this.getDatesFromMonth.bind(this);
    this.addMissingZero = this.addMissingZero.bind(this);
    this.url = `/properties/${this.props.id}/available`;
    this.state = {
      availableDates: null
    };
  }

  addMissingZero(number) {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  renderDates(arrayOfDates) {
    if (arrayOfDates) {
      let availableDates = [];
      for (var i = 0; i < arrayOfDates.length; i++) {
        let date = arrayOfDates[i];
        availableDates.push(
          <div key={i}>
            {arrayOfDates[i].slice(0, 10)}
            <Button onClick={() => this.deleteAvailability(date)}>
              Delete
            </Button>
          </div>
        );
      }
      this.setState({ availableDates });
    }
  }

  deleteAvailability(date) {
    axios
      .delete(this.url, { data: [date] })
      .then(response => {
        this.setState({});
      })
      .catch(error => {
        console.log(error);
      });
  }

  getDatesFromMonth(year, month) {
    const url = `${this.url}/${year}/${month}`;
    axios
      .get(url)
      .then(response => {
        const datesArray = this.addMissingZero(response.data);
        this.renderDates(datesArray);
      })
      .catch(error => {
        const message = 'Error getting property availability: ' + error;
        // const message = this.errorHandler.createErrorMessage(
        //   messageString,
        //   false
        // );
        console.log(message);
        // this.setState({ errocr: message });
      });
  }

  render() {
    const { availableDates } = this.state;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return (
      <div>
        <Dropdown
          title="Dropdown"
          trigger={<Button>Show availabilty per month</Button>}
          id="1"
        >
          <ul>
            {months.map((name, index) => {
              return (
                <div
                  key={index}
                  onClick={() => this.getDatesFromMonth(2018, index + 1)}
                >
                  {name}
                </div>
              );
            })}
          </ul>
        </Dropdown>

        {availableDates}
      </div>
    );
  }
}

export default DateRangeDisplayer;
