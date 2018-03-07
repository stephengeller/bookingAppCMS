import React, { Component } from 'react';

import UserEditor from '../components/UserEditor';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {}
    };
  }

  render() {
    const user = this.props.location.state.props;
    return (
      <div className="container">
        <h4 className="center-align">
          {user.Attributes[7].Value} {user.Attributes[8].Value}
        </h4>
        <div className="error" style={this.state.error.style} id="error">
          {this.state.error.message}
        </div>
        <UserEditor user={user} />
      </div>
    );
  }
}

export default UserDetails;
