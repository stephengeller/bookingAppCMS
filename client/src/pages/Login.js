import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { Input, Button, Icon } from 'react-materialize';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      disableLogin: false
    }
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.setState({
      disableLogin: true
    })
    this.props
      .logUserIn(this.refs.username.state.value, this.refs.password.state.value)
      .then(this.props.onLoggedIn)
      .catch(err => {
        this.setState({
          disableLogin: false
        })
      })
  }

  renderButton() {
    if(this.state.disableLogin) {
      return (
        <Button 
          ref="loginButton"
          disabled
          type="submit">
          <Icon right>person</Icon>
          Login
        </Button>
      )  
    }
    return (
      <Button 
        onClick={this.onSubmit.bind(this)}
        ref="loginButton"
        type="submit">
        <Icon right>person</Icon>
        Login
      </Button>
    )
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
            {this.renderButton()}
          </form>
        </div>
      );
    }
  }
}

export default withRouter(Login);
