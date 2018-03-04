import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


import GoToManageButton from '../components/buttons/GoToManageButton';

class Home extends Component {
  render() {
    const { user } = this.props;

    if(user === null) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="center">
          <h2 className="center">Welcome To CareFreeBreaks CMS</h2>
         <div className="divider" />
          <div>
            <h3>Welcome {user.given_name}</h3>
            <br />
            <GoToManageButton />
          </div>
        </div>
      );
    }
  }
}

export default Home;
