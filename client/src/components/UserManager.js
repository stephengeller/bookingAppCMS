import React, { Component } from 'react';
import { Input, Button, Preloader } from 'react-materialize';

import { Alert } from 'react-bootstrap';
import EditButton from './buttons/EditButton';

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMsg: null,
      loading: false
    };
    this.searchForUser = this.searchForUser.bind(this);
    this.checkForUser = this.checkForUser.bind(this);
  }

  checkForUser(user) {
    if (user) {
      return (
        <div>
          <div className="divider" style={{ margin: '20px' }} />
          {user.attr['given_name']} {user.attr['family_name']}
          <div style={{ float: 'right' }}>
            <EditButton
              type="users"
              props={user}
              id={`${user.attr['email']}`}
            />
          </div>
        </div>
      );
    } else {
      return '';
    }
  }

  searchForUser(email) {
    this.setState({errorMsg: null});
    if (email) {
      this.setState({ loading: true });
      this.props.userStore.searchByEmail(email)
        .then(r => {
          if (r !== undefined) {
            console.log('Successfully found user', r);
            this.setState({ user: r });
          } else {
            console.log('No USER found here, Frodo');
          }
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({
            errorMsg: err.message,
            loading: false
          });
        });
    } else {
      console.log('add an email');
    }
  }

  renderError() {
    if(this.state.errorMsg === null) {
      return;
    }
    return (
      <Alert bsStyle="danger">
        <p>{this.state.errorMsg}</p>
      </Alert>
    );
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
          validate
          value={email}
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
        />
        {this.renderError()}
        {this.state.loading ? (
          <Preloader />
        ) : (
          <Button modal={'confirm'} onClick={() => this.searchForUser(email)}>
            Search for user
          </Button>
        )}
        <div>{userDeets}</div>
      </div>
    );
  }
}

export default UserManager;
