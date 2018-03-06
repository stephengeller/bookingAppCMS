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
    this.adminUrl = `/admin/${this.url}`
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
        <li className="collection-header" key="header">
          <h4>{this.months[month - 1]}</h4>
        </li>
      );
      if (arrayOfDates instanceof Array) {
        for (var i = 0; i < arrayOfDates.length; i++) {
          let date = arrayOfDates[i];
          availableDates.push(
            <li key={i} className="collection-item">
              <div>
                <span>{date.date.slice(0, 10)}</span>
                <a
                  className="secondary-content"
                  onClick={() => this.deleteAvailability(date.date)}
                >
                  <Icon className="material-icons">delete</Icon>
                </a>
              </div>
              <div class="updateNumRooms">
                <label>
                  <span>Number of rooms: </span>
                  <input 
                    type="number"
                    min="1"
                    defaultValue={date.numRooms}></input>
                </label>
                <Button
                  waves='light'>
                  Update number of rooms
                  <Icon right>system_update_alt</Icon>
                </Button>
              </div>
            </li>
          );
        }
      } else {
        availableDates.push('No dates available');
      }
      this.setState({ availableDates });
    }
  }

  deleteAvailability(date) {
    axios
      .delete(`${this.url}/${date}`)
      .then(response => {
        alert(`${date.slice(0, 10)} successfully deleted.`);
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
    const url = `${this.adminUrl}/${year}/${month}`;
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
      <div>
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
        <ul className="collection with-header">{availableDates}</ul>
      </div>
    );
  }
}

export default DateRangeDisplayer;
