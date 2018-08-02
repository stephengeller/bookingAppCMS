import React, { Component } from 'react';
import { Input } from 'react-materialize';

class FormItem extends Component {
  checkForDefaults(props) {
    let { type, s } = props;
    if (type === undefined) {
      type = 'text';
    }
    if (s === undefined) {
      s = 12;
    }
    return {
      type,
      s
    };
  }

  render() {
    let { name, label, value } = this.props;
    let { type, s } = this.checkForDefaults(this.props);
    return (
      <Input
        s={s}
        label={label}
        id={name}
        type={type}
        className="validate"
        value={value}
        onChange={value => {
          this.props.updateInputValue(value, name);
        }}
      />
    );
  }
}

export default FormItem;
