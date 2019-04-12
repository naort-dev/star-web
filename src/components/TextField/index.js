import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export const TextInput = props => (
  <TextField
    placeholder={props.placeholder}
    type={props.type}
    name={props.name}
    value={props.value}
    fullWidth={props.fullWidth}
    onChange={props.onChange}
    id={props.id}
    required={props.required}
    onBlur={props.onBlur} />
);

TextInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func
};

TextInput.defaultProps = {
  placeholder: '',
  type: '',
  name: '',
  value: '',
  fullWidth: false,
  id: '',
  required: false,
  onBlur: () => { },
  onChange: () => { }
};
