import React from 'react';
import Select from 'react-select';
import './multiselect';

const MultiSelect = props => (
  <Select
    {...props.otherOptions}
    closeOnSelect={false}
    multi
    options={props.dataValues}
    onChange={(value) => props.handleFieldChange(value)}
    simpleValue
    value={props.value}
  />
);

export default MultiSelect;

