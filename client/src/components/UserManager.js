import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';

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
          <div className="divider" style={{ margin: '20px' }} />
          {user.Attributes[7].Value} {user.Attributes[8].Value}
          <div style={{ float: 'right' }}>
            <EditButton
              type="users"
              props={user}
              id={`${user.Attributes[9].Value}`}
            />
          </div>
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
        <h5 className="center-align">Search for a user by email:</h5>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
        />
        <Button
          validate
          modal={'confirm'}
          onClick={() => this.searchForUser(email)}
        >
          Search for user
        </Button>
        <div>{userDeets}</div>
      </div>
    );
  }
}

export default UserManager;
