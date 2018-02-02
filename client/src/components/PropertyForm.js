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

    addProperty() {
      let fields = this.state.fields
      console.log('adding property from within form: ', fields)
      let fieldNames = ['title', 'description', 'ownerId', 'facilities']
      axios
          .post("http://localhost:3000/properties/", fields)
          .then((response) => {
            fieldNames.map(fieldName => fields[fieldName] = '')
            this.setState({ fields })
            console.log('form state', this.state)
            setTimeout(() => {
              this.props.getProperties()
            }, 500)
          })
          .catch(function(error) {
              console.log('Adding error: ', error);
          })
    }

    updateInputValue(evt, input) {
      console.log('evt is: ', evt)
      let value = evt.target.value
      let fields = this.state.fields
      fields[input] = value
      this.setState({
        fields
      })
      console.log(this.state)
    }

    render() {
        return (
            <div className="container">
                < FormItem name={'test'} value={this.state.fields.test} updateInputValue={this.updateInputValue}/>
                <div ref="propertyForm">
                    <div className="input-field col s6">
                        <input
                          id="title"
                          type="text"
                          className="validate"
                          value={this.state.fields.title}
                          onChange={value => { this.updateInputValue(value, 'title')}}
                          />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            id="description"
                            type="text"
                            className="validate"
                            value={this.state.fields.description}
                            onChange={value => { this.updateInputValue(value, 'description')}}
                        />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                          id="ownerId"
                          type="text"
                          className="validate"
                          value={this.state.fields.ownerId}
                          onChange={value => { this.updateInputValue(value, 'ownerId')}}
                          />
                        <label htmlFor="ownerId">OwnerId</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                          id="facilities"
                          type="text"
                          className="validate"
                          value={this.state.fields.facilites}
                          onChange={value => { this.updateInputValue(value, 'facilities')}}
                          />
                        <label htmlFor="facilities">Facilities</label>
                    </div>
                    <Button
                        className="btn waves-effect waves-light"
                        type="submit"
                        onClick={this.addProperty}
                    >
                        <Icon right>add</Icon>Add Property
                    </Button>
                </div>
                <br />
                <div className="divider" />
            </div>
            )
    }
}

export default PropertyForm
