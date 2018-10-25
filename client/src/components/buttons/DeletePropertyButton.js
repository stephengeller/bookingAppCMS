import React from 'react';
import { Icon } from 'react-materialize';

const DeletePropertyButton = (props) => {
    const { property } = props;
    return (
      <span className="right-align">
        <button
          className="btn waves-effect waves-light red accent-4 hoverable"
          onClick={() => {
            if (window.confirm(`Delete the property ${property.title}?`)) {
              props.deleteProperty(property);
            }
          }}
        >
          <Icon right>delete</Icon>Delete Property
        </button>
      </span>
    );
  };

export default DeletePropertyButton;
