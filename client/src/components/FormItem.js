import React, { Component } from 'react';

class FormItem extends Component {
  constructor(props) {
    super(props);
    FormItem.capitaliseFirstLetter = FormItem.capitaliseFirstLetter.bind(this);
  }

  static capitaliseFirstLetter(word) {
    const array = word.split('');
    array[0] = array[0].toUpperCase();
    return array.join('');
  }

  render() {
    const { name, label } = this.props;
    return (
      <div ref="propertyForm">
        <div className="input-field col s6">
          <input
            id={name}
            type="text"
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
