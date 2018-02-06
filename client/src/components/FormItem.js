import React, { Component } from 'react';

class FormItem extends Component {
  constructor(props) {
    super(props);
    this.capitaliseFirstLetter = this.capitaliseFirstLetter.bind(this);
  }

  capitaliseFirstLetter(word) {
    const array = word.split('');
    array[0] = array[0].toUpperCase();
    return array.join('');
  }

  render() {
    const name = this.props.name;
    return (
      <div ref="propertyForm">
        {this.capitaliseFirstLetter(name)}
        <div className="input-field col s6">
          <input
            id={name}
            type="text"
            className="validate"
            value={this.props.value}
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
