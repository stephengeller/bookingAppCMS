import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import HomePublic from '../HomePublic';
import HomePrivate from '../HomePrivate';
import TermsAndConditions from '../stuff/TermsAndConditions';
import PrivacyPolicy from '../stuff/PrivacyPolicy';
import PhotoCredits from '../stuff/PhotoCredits';
import WebDesign from '../stuff/WebDesign';
import ContactUs from '../stuff/ContactUs';
import { Navbar } from 'react-bootstrap';
import '../../styles/AuthCheck.css';
import Logo from '../../logo.svg';

class Login extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/private" />;
    }

    return (
      <div className="center">
        <p>You must log in to view this page.</p>
        <span className="app-button">
          <button onClick={this.props.authenticate}>Log in</button>
        </span>
      </div>
    );
  }
}

class AuthCheck extends Component {
  renderPhone() {
    if (this.props.isAuthenticated) {
      return (
        <span className="tele">
          <span className="ti-tel"> </span> 07932 333192
        </span>
      );
    }
  }

  renderPhoneMobile() {
    if (this.props.isAuthenticated) {
      return (
        <a href="tel:+447932333192" rel="noopener noreferrer">
          <span className="tele">
            <span className="ti-tel" />
          </span>
        </a>
      );
    }
  }

  render() {
    const AuthButton = withRouter(
      ({ history }) =>
        this.props.isAuthenticated ? (
          <p>
            Hello,{' '}
            <span className="navbar-user">{this.props.user.given_name} </span>
            <span className="header-login">
              <button
                onClick={() => {
                  this.props.signOut().then(() => {
                    history.push('/');
                  });
                }}
              >
                <span className="ti-power-off"> </span> Sign out
              </button>
            </span>
            <span className="light-grey"> {this.props.user.email}</span>
          </p>
        ) : (
          <p>
            <span className="header-login-x" />
          </p>
        )
    );

    const RouteWithProps = ({
      path,
      exact,
      strict,
      component: Component,
      location,
      ...rest
    }) => (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={props => <Component {...props} {...rest} />}
      />
    );
    const PrivateRoute = ({
      path,
      exact,
      strict,
      component: Component,
      location,
      ...rest
    }) => (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={props =>
          this.props.isAuthenticated ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    return (
      <Router>
        <div>
          <Navbar inverse fluid fixedTop>
            <Navbar.Header className="first-header">
              <div className="container">
                <AuthButton />
                {this.renderPhone()}
                <span className="mailto">
                  <span className="ti-email"> </span> info@carefreebreaks.com
                </span>
              </div>
            </Navbar.Header>
            <Navbar.Header className="second-header">
              <div className="container">
                <Navbar.Brand>
                  <Link to="/public">
                    <img
                      src={Logo}
                      className="nav-logo"
                      alt="Carefreebreaks SVG Logo"
                    />
                  </Link>
                </Navbar.Brand>
                <span className="x-collapse">
                  <span className="header-switch">
                    <Link to="/public">
                      <span className="ti-home v-m" />
                      <span className="v-l">Home</span>
                    </Link>
                  </span>
                  <span className="header-switch">
                    <Link to="/private">
                      <span className="ti-direction-alt v-m" />
                      <span className="v-l">Breaks</span>
                    </Link>
                  </span>
                  <span className="header-switch">
                    <a
                      href="https://www.kindlink.com/charity/carefreebreaks/profile"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ti-heart v-m" />
                      <span className="v-l"> Donate</span>
                    </a>
                  </span>
                </span>
              </div>
            </Navbar.Header>
          </Navbar>
          <footer>
            <Navbar fluid inverse fixedBottom className="footer">
              <div className="footer-links">
                <Link to="/terms-and-conditions">Terms and conditions</Link>
                <Link to="/privacy-policy">Privacy policy</Link>
                <Link to="/photo-credits">Photo credits</Link>
                <Link to="/web-design">Web design</Link>
                <Link to="/contact">Contact us</Link>
              </div>
              <div className="footer-links mobile">
                <Link to="/terms-and-conditions">T&C</Link>
                <Link to="/privacy-policy">Privacy</Link>
                <Link to="/photo-credits">Photos</Link>
                <Link to="/web-design">Devs</Link>
                <Link to="/contact">Contact</Link>
                {this.renderPhoneMobile()}
                <a
                  href="mailto:info@carefreebreaks.com?Subject=Hello&body=Hello,%0D%0A%0D%0A"
                  rel="noopener noreferrer"
                >
                  <span className="mailto">
                    <span className="ti-email" />
                  </span>
                </a>
              </div>
              <Grid fluid>
                <Row className="show-grid footer-copyright">
                  <Col xs={12} sm={4}>
                    Carefreebreaks, 6 Aulton Place, London SE4 11AG.
                  </Col>
                  <Col xs={12} sm={4}>
                    Registered charity number 1176459. Company number 10933982.
                  </Col>
                  <Col xs={12} sm={4}>
                    © Carefreebreaks 2018. All rights reserved.
                  </Col>
                </Row>
              </Grid>
            </Navbar>
          </footer>
          <Route exact path="/" component={HomePublic} />
          <Route path="/public" component={HomePublic} />
          <Route path="/terms-and-conditions" component={TermsAndConditions} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/photo-credits" component={PhotoCredits} />
          <Route path="/web-design" component={WebDesign} />
          <Route path="/contact" component={ContactUs} />
          <RouteWithProps
            path="/login"
            component={Login}
            isAuthenticated={this.props.isAuthenticated}
            authenticate={this.props.authenticate}
          />
          <PrivateRoute
            path="/private"
            component={HomePrivate}
            user={this.props.user}
            confirmBooking={this.props.confirmBooking}
          />
        </div>
      </Router>
    );
  }
}

export default AuthCheck;
