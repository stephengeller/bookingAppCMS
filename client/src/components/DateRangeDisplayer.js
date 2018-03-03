import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Dropdown, Icon } from 'react-materialize';

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
    this.months = [
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
  }

  addMissingZero(number) {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  renderDates(arrayOfDates, month) {
    if (arrayOfDates) {
      let availableDates = [];
      availableDates.push(
        <li class="collection-header">
          <h4>{this.months[month - 1]}</h4>
        </li>
      );
      for (var i = 0; i < arrayOfDates.length; i++) {
        let date = arrayOfDates[i];
        availableDates.push(
          <li key={i} className="collection-item">
            <div>
              {arrayOfDates[i].slice(0, 10)}
              <a
                className="secondary-content"
                onClick={() => this.deleteAvailability(date)}
              >
                <Icon class="material-icons">delete</Icon>
              </a>
            </div>
          </li>
        );
      }
      this.setState({ availableDates });
    }
  }

  deleteAvailability(date) {
    axios
      .delete(this.url, { data: [date] })
      .then(response => {
        const { datesArray } = this.state;
        const index = datesArray.indexOf(date);
        datesArray.splice(index, 1);
        this.setState({ datesArray });
        this.renderDates(datesArray);
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
        this.setState({ datesArray });
        this.renderDates(datesArray, month);
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
    return (
      <div className="">
        <Dropdown
          title="Dropdown"
          trigger={<Button>Show availabilty per month</Button>}
          id="1"
        >
          {this.months.map((name, index) => {
            return (
              <div
                key={index}
                className="topContainer"
                onClick={() => this.getDatesFromMonth(2018, index + 1)}
              >
                {name}
              </div>
            );
          })}
        </Dropdown>
        <ul className="collection with-header">{this.state.availableDates}</ul>
      </div>
    );
  }
}

export default DateRangeDisplayer;
