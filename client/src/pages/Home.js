import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <h2 className="center">Welcome To CareFreeBreaks CMS</h2>
        <Button waves="light">
          Log In<Icon left>person</Icon>
        </Button>
      </div>
    );
  }
}

export default Home;
