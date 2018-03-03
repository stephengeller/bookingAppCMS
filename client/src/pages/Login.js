import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom";

class Login extends Component {

  onSubmit(evt) {
    evt.preventDefault();
    this.props.logUserIn(this.refs.username.value, this.refs.password.value)
    .then(this.props.onLoggedIn);
  }
  
  render() {
    if(this.props.user !== null) {
      return <Redirect to="/" />;
    } else {
      return (
          <div className="center">
              <h2>Please login</h2>
              <form>
                  <label>Username: <input ref="username" type="text"></input></label>
                  <label>Password: <input ref="password" type="password"></input></label>
                  <button
                    onClick={this.onSubmit.bind(this)}
                    type="submit">Login</button>
              </form>
          </div>
      );
    }
  }
}


export default withRouter(Login);