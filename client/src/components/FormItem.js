import React, { Component } from 'react';

class FormItem extends Component {
  render() {
    const { name, label } = this.props;
    return (
      <div ref="propertyForm">
        <div className="input-field col s12">
          <input
            id={name}
            type={this.props.type}
            className="validate"
            value={this.props.value}
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
