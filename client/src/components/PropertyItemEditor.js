import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';
import axios from '../modules/axios';
import FormItem from './FormItem';

class PropertyItemEditor extends Component {
  constructor(props) {
    super(props);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    const property = this.props.property;
    this.state = {
      fields: property
    };
  }

  updateProperty() {
    const { property } = this.props;
    const { fields } = this.state;
    const url = `/properties/${property.id}`;
    axios
      .put(url, fields)
      .then(response => {
        this.props.hideEditor();
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
          type={'text'}
          placeholder={'description'}
          value={this.state.fields.description}
          updateInputValue={this.updateInputValue}
        />
        Facilities
        <FormItem
          name={'facilities'}
          type={'text'}
          placeholder={'facilities'}
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
