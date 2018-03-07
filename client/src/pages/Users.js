import React, { Component } from 'react';
import UserManager from '../components/UserManager';

class Users extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 className="center-align">Users</h2>
        <UserManager />
      </div>
    );
  }
}

export default Users;
