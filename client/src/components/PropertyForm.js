import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';
import axios from 'axios';
import FormItem from './FormItem';

class PropertyForm extends Component {
  constructor(props) {
    super(props);
    this.addProperty = this.addProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      fields: {}
    };
  }

  static formatItemStringToArray(string) {
    return string.replace(/[^a-zA-Z\d]/g, ' ').split(' ');
  }

  addProperty() {
    const fields = this.state.fields;
    fields.facilites = PropertyForm.formatItemStringToArray(fields.facilities);
    const fieldNames = ['title', 'description', 'ownerId', 'facilities'];
    axios
      .post('http://localhost:3000/properties/', fields)
      .then(() => {
        alert(`Property "${fields.title}" has been successfully added`);
        fieldNames.map(fieldName => (fields[fieldName] = ''));
        this.setState({ fields });
      })
      .catch(function(error) {
        console.log('Error adding property: ', error);
      });
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
