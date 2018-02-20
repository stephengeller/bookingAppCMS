import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

class FormItem extends Component {
  render() {
    let { name, label, type, value } = this.props;
    if (type === undefined) {
      type = 'text';
    }
    return (
      <Row ref="propertyForm" className="">
        <Input
          s={12}
          label={label}
          id={name}
          type={type}
          className="validate"
          value={value}
          onChange={value => {
            this.props.updateInputValue(value, name);
          }}
        />
      </Row>
    );
  }
}

export default FormItem;
