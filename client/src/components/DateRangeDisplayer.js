import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-materialize';
import DateItem from './DateItem';

class DateRangeDisplayer extends Component {
  constructor(props) {
    super(props);
    this.getDatesFromMonth = this.getDatesFromMonth.bind(this);
    this.addMissingZero = this.addMissingZero.bind(this);
    this.url = `/properties/${this.props.id}/available`;
    this.adminUrl = `/admin/${this.url}`;
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
              <DateItem
                date={date}
                onDeleteAvailability={this.onDeleteAvailability.bind(
                  this,
                  date.date
                )}
                onUpdateNumRooms={this.onUpdateNumRooms.bind(this, date.date)}
              />
            </li>
          );
        }
      } else {
        availableDates.push('No dates available');
      }
      this.setState({ availableDates });
    }
  }

  onDeleteAvailability(date) {
    this.props.apiClient
      .delete(`${this.url}/${date}`)
      .then(response => {
        const { datesArray } = this.state;
        let index = -1;
        for (var i = 0, l = datesArray.length; i < l; i++) {
          if (datesArray[i].date === date) {
            index = i;
            break;
          }
        }
        datesArray.splice(index, 1);
        this.setState({ datesArray });
        this.renderDates(datesArray);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onUpdateNumRooms(date, numRooms) {
    const url = `${this.url}/${date}`;
    this.props.apiClient
      .patch(url, { numRooms: numRooms })
      .then(response => {
        console.log('Yes!!!', response);
      })
      .catch(error => {
        const message = 'Error updating property rooms: ' + error;
        console.log(message);
      });
  }

  getDatesFromMonth(year, month) {
    const url = `${this.adminUrl}/${year}/${month}`;
    this.props.apiClient
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
