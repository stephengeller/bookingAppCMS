import React, { Component } from 'react';

class FormItem extends Component {
  render() {
    let { name, label, type, value } = this.props;
    if (type === undefined) {
      type = 'text';
    }
    return (
      <div ref="propertyForm">
        <div className="input-field col s12">
          <input
            id={name}
            type={type}
            className="validate"
            value={value}
            onChange={value => {
              this.props.updateInputValue(value, name);
            }}
          />
          <label className="active" for={name}>
            {label}
          </label>
        </div>
      </div>
    );
  }
}

export default FormItem;
