import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

import Formatter from '../modules/Formatter';
import axios from '../modules/axios';
import FormItem from './FormItem';

class PropertyItemEditor extends Component {
  constructor(props) {
    super(props);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.formatter = new Formatter();
    this.state = {
      fields: {}
    };
  }

  componentWillMount() {
    const url = `/properties/${this.props.id}`;
    console.log(url);
    axios
      .get(url)
      .then(response => {
        const property = response.data;
        this.setState({
          fields: property,
          property
        });
      })
      .catch(function(error) {
        console.log('Error getting property: ', error);
      });
  }

  updateProperty() {
    const { fields, property } = this.state;
    fields.facilities = this.formatter.formatItemStringToArray(
      fields.facilities
    );
    const url = `/properties/${property.id}`;
    axios
      .put(url, fields)
      .then(response => {
        console.log('successfully updated!');
      })
      .catch(function(error) {
        console.log('Error updating property: ', error);
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
        <h2 className="center-align"> {this.state.fields.title} </h2>
        <br />
        Title
        <FormItem
          name={'title'}
          type={'text'}
          placeholder={'title'}
          value={this.state.fields.title}
          updateInputValue={this.updateInputValue}
        />
        Description
        <FormItem
          name={'description'}
          type={'textarea'}
          placeholder={'description'}
          value={this.state.fields.description}
          updateInputValue={this.updateInputValue}
        />
        Facilities
        <FormItem
          name={'facilities'}
          value={this.state.fields.facilities}
          updateInputValue={this.updateInputValue}
        />
        <Button
          className="btn waves-effect waves-light"
          type="submit"
          onClick={this.updateProperty}
        >
          <Icon right>add</Icon>Update Property
        </Button>
        <br />
      </div>
    );
  }
}

export default PropertyItemEditor;
