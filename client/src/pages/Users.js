import React, { Component } from 'react';
import UserManager from '../components/UserManager';

class Users extends Component {
  render() {
    return (
      <div>
        <h2 className="center-align">Users</h2>
        <UserManager
          userStore={this.props.userStore}
        />
      </div>
    );
  }
}

export default Users;
