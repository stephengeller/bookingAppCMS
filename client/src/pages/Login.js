import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { Input, Button, Icon } from 'react-materialize';

class Login extends Component {
  onSubmit(evt) {
    evt.preventDefault();
    this.props
      .logUserIn(this.refs.username.state.value, this.refs.password.state.value)
      .then(this.props.onLoggedIn);
  }

  render() {
    if (this.props.user !== null) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="center container">
          <h2>Please login</h2>
          <form>
            <label>
              Username: <Input ref="username" type="text" />
            </label>
            <label>
              Password: <Input ref="password" type="password" />
            </label>
            <Button onClick={this.onSubmit.bind(this)} type="submit">
              <Icon right>person</Icon>
              Login
            </Button>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(Login);
