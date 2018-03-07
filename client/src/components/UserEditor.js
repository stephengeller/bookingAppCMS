import React, { Component } from 'react';

class UserEditor extends Component {
  updateRooms() {
    this.props.onUpdateNumRooms(this.refs.numOfRooms.value);
  }

  render() {
    const { user } = this.props;
    return <div>{JSON.stringify(user)}</div>;
  }
}

export default UserEditor;
