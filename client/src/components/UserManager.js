import React, { Component } from 'react';
import CognitoUserStore from '../modules/CognitoUserStore';

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'stephen'
    };
    this.test = this.test.bind(this);
  }

  test() {
    CognitoUserStore.searchByEmail('stephen.geller@hotmail.com')
      .then(r => console.log(r))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <button onClick={() => this.test()}>Click me</button>
        Users Component
        {this.state.name}
      </div>
    );
  }
}

export default UserManager;
