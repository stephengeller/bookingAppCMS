import React, { Component } from 'react';
import { Button, Row, Input, Icon } from 'react-materialize';

import CognitoUserStore from '../modules/CognitoUserStore';

class UserEditor extends Component {
  constructor(props) {
    super(props);
    this.changeableFields = [
      { attrName: 'email', label: 'Email', func: 'setEmail' },
      { attrName: 'address', label: 'Address', func: 'setAddress' },
      { attrName: 'phone_number', label: 'Phone Number', func: 'setPhoneNum' },
      { attrName: 'given_name', label: 'Given Name', func: 'setGivenName' },
      { attrName: 'family_name', label: 'Family Name', func: 'setFamilyName' },
      {
        attrName: 'custom:tokens',
        label: 'Number of Tokens',
        func: 'setNumTokens'
      }
    ];
    this.user = this.props.user;
    this.userObject = this.createUserObject(this.user.Attributes);
    this.loadField = this.loadField.bind(this);
    this.updateField = this.updateField.bind(this);
    this.disableUser = this.disableUser.bind(this);
    this.resetUserPassword = this.resetUserPassword.bind(this);
    this.state = {
      inputField: '',
      error: {}
    };
  }

  resetUserPassword(email) {
    CognitoUserStore.resetUserPassword(email)
      .then(r => console.log(r))
      .catch(err => console.log(err));
  }

  disableUser(email) {
    CognitoUserStore.disableUser(email)
      .then(r => console.log(r))
      .catch(err => console.log(err));
  }

  async resetComponent() {
    // const user = await CognitoUserStore.searchByEmail(this.userObject.email);
    // this.userObject = this.createUserObject(user.Attributes);
    console.log(this.state);
  }

  createUserObject(attributes) {
    const obj = {
      functions: {}
    };
    for (let i = 0; i < attributes.length; i++) {
      obj[attributes[i].Name] = attributes[i].Value;
    }
    this.changeableFields.map(field => {
      if (obj[field.attrName]) {
        return (obj['functions'][field.attrName] = field.func);
      }
      return null;
    });
    console.log(obj);
    return obj;
  }

  handleChange(e) {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }

  loadField(key) {
    console.log(this.userObject, key);
    this.setState({ inputValue: this.userObject[key], inputField: key });
  }

  updateField(field) {
    const functionName = this.userObject.functions[field];
    const cognitoFunction = CognitoUserStore[functionName];

    cognitoFunction(this.state.inputValue, this.userObject.email)
      .then(r => {
        const message = { message: 'Success', style: { color: 'green' } };
        console.log(message.message, r);
        this.setState({ error: message });
        this.resetComponent();
      })
      .catch(err => {
        const message = { message: 'Failure', style: { color: 'red' } };
        console.log(message.message, err);
        this.setState({ error: message });
      });
  }

  componentWillMount() {
    this.loadField('email');
  }

  render() {
    const { error, userObject, inputField, inputValue } = this.state;
    const input = (
      <Input
        value={inputValue || ''}
        s={6}
        label={inputField}
        onChange={e => this.handleChange(e)}
      />
    );
    const buttons = (
      <div className="center">
        <div>
          <Button
            className="button"
            onClick={() => this.updateField(this.state.inputField)}
          >
            <Icon right>create</Icon> Update {inputField.replace(/custom:/, '').replace(/_/, ' ')}
          </Button>
        </div>
        <div className="divider" />
        <div>
          <Button
            className={'blue darken-1 button'}
            onClick={() => this.resetUserPassword(userObject.email)}
          >
            <Icon right>cached</Icon>Reset user password
          </Button>
        </div>
        <div>
          <Button
            className={'red accent-4 button'}
            onClick={() => this.disableUser(this.userObject.email)}
          >
            <Icon right>block</Icon>Disable user
          </Button>
        </div>
      </div>
    );
    return (
      <div style={{ margin: '30px' }}>
        <h6 className="center-align">({this.props.user.UserStatus} / {this.props.user.Enabled ? 'enabled' : 'disabled'})</h6>
        <h5 style={error.style}>{error.message}</h5>
        <Row>
          <Input
            s={6}
            type="select"
            label="Field to edit"
            icon="edit"
            onChange={e => {
              this.loadField(e.target.value);
            }}
          >
            {this.changeableFields.map(field => {
              const name = field.attrName;
              return (
                <option key={name} value={name}>
                  {name.replace(/custom:/, '').replace(/_/, ' ')}
                </option>
              );
            })}
          </Input>
          {input}
          {buttons}
        </Row>
      </div>
    );
  }
}

export default UserEditor;
