import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

import ArrayFormatter from '../modules/ArrayFormatter';
import axios from '../modules/axios';
import FormItem from './FormItem';

class PropertyForm extends Component {
  constructor(props) {
    super(props);
    this.addProperty = this.addProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      fields: {},
      error: ''
    };
    this.arrayFormatter = new ArrayFormatter();
  }

  emptyBoxErrorHandler(fieldNames) {
    const missingFields = [];
    fieldNames.forEach(field => {
      if (!this.state.fields[field]) {
        missingFields.push(field);
      } else {
      }
    });
    const messageString =
      'The following fields are required: ' + missingFields.join(', ');
    return {
      style: { color: 'red' },
      message: messageString
    };
  }

  addProperty() {
    const fields = this.state.fields;
    fields.facilities = this.arrayFormatter.formatItemStringToArray(
      fields.facilities
    );
    const fieldNames = ['title', 'description', 'ownerId', 'facilities'];
    const { title, description, ownerId, facilities } = this.state.fields;
    if (!!title && !!description && !!ownerId && !!facilities) {
      axios
        .post('/properties/', fields)
        .then(() => {
          const error = {
            message: `Property "${fields.title}" successfully added`,
            style: { color: 'green' }
          };
          fieldNames.map(fieldName => (fields[fieldName] = ''));
          this.setState({ fields, error });
        })
        .catch(error => {
          const errorMessage = {
            message: error.toString(),
            style: { color: 'red' }
          };
          this.setState({ error: errorMessage });
        });
    } else {
      const error = this.emptyBoxErrorHandler(fieldNames);
      this.setState({ error });
    }
  }

  updateInputValue(evt, input) {
    let value = evt.target.value;
    let fields = this.state.fields;
    fields[input] = value;
    this.setState({
      fields
    });
  }

  render() {
    return (
      <div className="container">
        <div className="error" style={this.state.error.style} id="error">
          {this.state.error.message}
        </div>
        <FormItem
          name={'title'}
          label={'Title'}
          value={this.state.fields.title}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'description'}
          label={'Property Description'}
          value={this.state.fields.description}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'ownerId'}
          label={'Owner ID'}
          value={this.state.fields.ownerId}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'facilities'}
          label={'Facilities (separated by spaces)'}
          value={this.state.fields.facilities}
          updateInputValue={this.updateInputValue}
        />
        <FormItem
          name={'postcode'}
          label={'Post Code'}
          value={this.state.fields.facilities}
          updateInputValue={this.updateInputValue}
        />
        <Button
          className="btn waves-effect waves-light"
          type="submit"
          onClick={this.addProperty}
        >
          <Icon right>add</Icon>Add Property
        </Button>
        <br />
      </div>
    );
  }
}

export default PropertyForm;
