import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

class UserEditor extends Component {
  constructor(props) {
    super(props);
    this.changeableFields = ['email', 'address', 'phone_number', 'family_name'];
    this.user = this.props.user;
    this.userObject = this.createUserObject(this.user.Attributes);
    this.loadField = this.loadField.bind(this);
    this.state = {
      inputField: ''
    };
  }

  createUserObject(attributes) {
    const obj = {};
    for (let i = 0; i < attributes.length; i++) {
      obj[attributes[i].Name] = attributes[i].Value;
    }
    return obj;
  }

  updateRooms() {
    this.props.onUpdateNumRooms(this.refs.numOfRooms.value);
  }

  loadField(e) {
    const inputField = this.userObject[e];
    this.setState({ inputField });
  }

  componentDidMount() {
    this.loadField('email');
  }

  render() {
    const { user } = this.props;
    const { inputField } = this.state;
    return (
      <div>
        <Row>
          <Input
            s={12}
            type="select"
            label="Field to edit"
            icon="weekend"
            defaultValue="2"
            onChange={e => {
              this.loadField(e.target.value);
            }}
          >
            {this.changeableFields.map(field => {
              return (
                <option key={field} value={field}>
                  {field}
                </option>
              );
            })}
          </Input>
        </Row>
        {inputField}
      </div>
    );
  }
}

export default UserEditor;
