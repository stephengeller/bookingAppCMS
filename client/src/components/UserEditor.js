import React, { Component } from 'react';
import { Button, Row, Input } from 'react-materialize';

import CognitoUserStore from '../modules/CognitoUserStore';

class UserEditor extends Component {
  constructor(props) {
    super(props);
    this.changeableFields = [
      { name: 'email', func: 'setEmail' },
      { name: 'address', func: 'setAddress' },
      { name: 'phone_number', func: 'setPhoneNum' },
      { name: 'given_name', func: 'setGivenName' },
      { name: 'family_name', func: 'setFamilyName' }
    ];
    this.user = this.props.user;
    this.userObject = this.createUserObject(this.user.Attributes);
    this.loadField = this.loadField.bind(this);
    this.updateField = this.updateField.bind(this);
    this.state = {
      inputField: '',
      error: {}
    };
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
      if (obj[field.name]) {
        return (obj['functions'][field.name] = field.func);
      }
      return null;
    });
    return obj;
  }

  handleChange(e) {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }

  loadField(key) {
    this.setState({ inputValue: this.userObject[key], inputField: key });
  }

  updateField() {
    const functionName = this.userObject.functions[this.state.inputField];
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
    const { error } = this.state;
    const input = (
      <Input
        value={this.state.inputValue}
        s={6}
        label={this.state.inputField}
        onChange={e => this.handleChange(e)}
      />
    );
    const button = (
      <div className="center">
        <Button onClick={() => this.updateField()}>
          Update {this.state.inputField}
        </Button>
      </div>
    );
    return (
      <div style={{ margin: '30px' }}>
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
              return (
                <option key={field.name} value={field.name}>
                  {field.name}
                </option>
              );
            })}
          </Input>
          {input}
        </Row>
        {button}
      </div>
    );
  }
}

export default UserEditor;
