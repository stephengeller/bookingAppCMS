import React, { Component } from 'react';

class FormItem extends Component {
  render() {
    const { name, label, type, value } = this.props;
    return (
      <div ref="propertyForm">
        <div className="input-field col s12">
          <input
            id={name}
            type={type}
            className="validate"
            value={value}
            placeholder={label}
            onChange={value => {
              this.props.updateInputValue(value, name);
            }}
          />
        </div>
      </div>
    );
  }
}

export default FormItem;
