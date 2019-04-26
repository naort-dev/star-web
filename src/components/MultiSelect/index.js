import React from 'react';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { MultiSelectStyled } from './styled';

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      onDelete={props.removeProps.onClick}
    />
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          style: {
            display: 'flex',
            padding: 0,
          },
          className: 'multiSelectInput',
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

const components = {
  Control,
  MultiValue,
};

export default class MultiSelect extends React.Component {
  render() {
    return (
      <MultiSelectStyled>
        <Select
          value={this.props.value}
          isMulti
          name="selectedProfessions"
          options={this.props.options}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder={this.props.placeholder}
          components={components}
          onChange={this.props.onChange}
          textFieldProps={{
            label: this.props.label,
            InputLabelProps: {
              shrink: true,
            },
          }}
        />
      </MultiSelectStyled>
    )
  }
}
