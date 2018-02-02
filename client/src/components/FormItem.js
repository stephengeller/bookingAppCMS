import React, { Component} from 'react'
import { Button, Icon } from 'react-materialize';
import axios from 'axios'


class FormItem extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      const name = this.props.name
        return (
          <div ref="propertyForm">
              <div className="input-field col s6">
                  <input
                    id={name}
                    type="text"
                    className="validate"
                    value={this.props.value}
                    onChange={value => {
                      console.log('value: ', value.target.value)
                      this.props.updateInputValue(value, name)
                      }
                    }
                    />
                  <label htmlFor={name}>{name.toUpperCase()}</label>
              </div>
          </div>
        )
    }
}

export default FormItem
