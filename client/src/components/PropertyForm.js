import React, { Component} from 'react'
import { Button, Icon } from 'react-materialize';
import axios from 'axios'
import FormItem from './FormItem'


class PropertyForm extends Component {
    constructor(props) {
      super(props)
      this.addProperty = this.addProperty.bind(this)
      this.updateInputValue = this.updateInputValue.bind(this)
      this.state={
        fields: {}
      }
    }

    // to get update, loop gettingProperties until
    // there's a difference between current and API

    addProperty() {
      let fields = this.state.fields
      console.log('adding property from within form: ', fields)
      let fieldNames = ['title', 'description', 'ownerId', 'facilities']
      axios
          .post("http://localhost:3000/properties/", fields)
          .then((response) => {
            fieldNames.map(fieldName => fields[fieldName] = '')
            this.setState({ fields })
            console.log('Successfully added property, form fields: ', this.state)
          })
          .catch(function(error) {
              console.log('Adding error: ', error);
          })
    }

    updateInputValue(evt, input) {
      let value = evt.target.value
      let fields = this.state.fields
      fields[input] = value
      this.setState({
        fields
      })
    }

    render() {
        return (
            <div className="container">
              < FormItem name={'title'} value={this.state.fields.title} updateInputValue={this.updateInputValue}/>
              < FormItem name={'description'} value={this.state.fields.description} updateInputValue={this.updateInputValue}/>
              < FormItem name={'ownerId'} value={this.state.fields.test} updateInputValue={this.updateInputValue}/>
              < FormItem name={'facilities'} value={this.state.fields.facilities} updateInputValue={this.updateInputValue}/>
              <Button
                  className="btn waves-effect waves-light"
                  type="submit"
                  onClick={this.addProperty}
              >
                  <Icon right>add</Icon>Add Property
              </Button>
              <br />
              <div className="divider" />
            </div>
            )
    }
}

export default PropertyForm
