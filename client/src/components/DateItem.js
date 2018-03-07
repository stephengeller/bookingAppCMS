import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

class DateItem extends Component {
  updateRooms() {
    this.props.onUpdateNumRooms(this.refs.numOfRooms.value);
  }

  render() {
    return (
      <div>
        <div>
          <div className="updateNumRooms">
            <label>
              <span>Number of rooms: </span>
              <input
                type="number"
                min="1"
                ref="numOfRooms"
                defaultValue={this.props.date.numRooms}
              />
            </label>
            <Button onClick={this.updateRooms.bind(this)} waves="light">
              Update number of rooms
              <Icon right>system_update_alt</Icon>
            </Button>
          </div>
          <span>{this.props.date.date.slice(0, 10)}</span>
          <span style={{ 'margin-left': '10px' }}>
            <Button
              onClick={() => this.props.onDeleteAvailability()}
              waves="light"
            >
              <Icon right>delete</Icon>
              Delete
            </Button>
          </span>
        </div>
      </div>
    );
  }
}

export default DateItem;
