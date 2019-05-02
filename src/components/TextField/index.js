import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export const TextInput = props => (
  <TextField
    error={props.error}
    placeholder={props.placeholder}
    type={props.type}
    name={props.name}
    value={props.value}
    fullWidth={props.fullWidth}
    onChange={props.onChange}
    id={props.id}
    required={props.required}
    onBlur={props.onBlur}
    label={props.label} 
    classes={{root:"MuiFormControl"}}
  />
);

TextInput.propTypes = {
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
};

TextInput.defaultProps = {
  error: false,
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
