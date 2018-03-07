import React, { Component } from 'react';
import { Input } from 'react-materialize';

import EditButton from './buttons/EditButton';
import CognitoUserStore from '../modules/CognitoUserStore';

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
    this.searchForUser = this.searchForUser.bind(this);
    this.checkForUser = this.checkForUser.bind(this);
  }

  checkForUser(user) {
    if (user) {
      return (
        <div>
          {user.Attributes[7].Value} {user.Attributes[8].Value}
          <EditButton
            type="users"
            props={user}
            id={`${user.Attributes[9].Value}`}
          />
        </div>
      );
    } else {
      return '';
    }
  }

  searchForUser(email) {
    if (email) {
      CognitoUserStore.searchByEmail(email)
        .then(r => {
          if (r !== undefined) {
            console.log(r);
            this.setState({ user: r });
          } else {
            console.log('No USER found here, Frodo');
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('add an email');
    }
  }

  render() {
    const { email, user } = this.state;
    const userDeets = this.checkForUser(user);

    return (
      <div className="container">
        Search for a user by email:
        <Input
          type="email"
          label="Email"
          validate
          // value={email}
          value={email}
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
        />
        <button onClick={() => this.searchForUser(email)}>
          Search for user
        </button>
        <div>{userDeets}</div>
      </div>
    );
  }
}

export default UserManager;
