import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

import GoToManageButton from '../components/buttons/GoToManageButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.showButtonOrWelcome = this.showButtonOrWelcome.bind(this);
  }

  showButtonOrWelcome(user) {
    if (user) {
      return (
        <div>
          <h3>Welcome {user.given_name}</h3>
          <br />
          <GoToManageButton />
        </div>
      );
    } else {
      return (
        <Button waves="light" onClick={this.props.login}>
          Log In<Icon left>person</Icon>
        </Button>
      );
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="center">
        <h2 className="center">Welcome To CareFreeBreaks CMS</h2>
        <div className="divider" />
        {this.showButtonOrWelcome(user)}
      </div>
    );
  }
}

export default Home;
