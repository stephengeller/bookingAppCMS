import React  from 'react';
import { Input } from 'react-materialize';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const checkForDefaults = (props) => {
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
};

const renderTagsInput = (props) => {
  let { name, label, value } = props;
  value = value || [];
  return (
    <TagsInput
      className=""
      value={value}
      onChange={value => {
        props.updateTagValue(value, name);
      }}
      inputProps={{
        placeholder: label
      }}
      tagProps={{
        className: 'react-tagsinput-tag-custom'
      }}
    />
  );
};

const renderHTMLInput = (props, { type, s }) => {
  let { name, label, value } = props;
  return (
    <Input
      s={s}
      label={label}
      id={name}
      type={type}
      className="validate"
      value={value}
      onChange={value => {
        props.updateInputValue(value, name);
      }}
    />
  );
};

const FormItem = (props) => {
  let { type, s } = checkForDefaults(props);
  if (type === 'tags-input') {
    return renderTagsInput(props);
  } else {
    return renderHTMLInput(props, { type, s });
  }
};

export default FormItem;
