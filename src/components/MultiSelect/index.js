import React, { useState } from 'react';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { MultiSelectStyled } from './styled';


const MultiValue = (prop) => {
  return (
    <Chip
      tabIndex={-1}
      label={prop.children}
      onDelete={prop.removeProps.onClick}
    />
  );
}

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
}

const Control = (prop) => {
  const textFieldProps = { ...prop.selectProps.textFieldProps }
  // if (!props.value.length) {
    // delete textFieldProps.InputLabelProps;
  // }
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
          inputRef: prop.innerRef,
          children: prop.children,
          ...prop.innerProps,
        },
      }}
      {...textFieldProps}
    />
  );
}

const Option = (prop) => {
  return (
    <MenuItem
      buttonRef={prop.innerRef}
      selected={prop.isFocused}
      component="div"
      style={{
        fontWeight: prop.isSelected ? 500 : 400,
        border: '1px solid #2f839d',
        background: '#fff',
        margin: '5px',
        borderRadius: '15px',
        display: 'inline-flex',
        padding: '2px 13px',
        fontFamily: 'Gilroy-medium',
        fontSize: '14px',
        cursor: 'pointer',
      }}
      {...prop.innerProps}
    >
      {prop.children}
    </MenuItem>
  );
}


const MultiSelect = props => {

  const [inputValue, updateInput] = useState('');

  const updateInputValue = event => {
    if (event) {
      updateInput(event.target.value);
    } else {
      updateInput('');
    }
  }

  const components = {
    Control,
    MultiValue,
    Option
  };
  return (
    <MultiSelectStyled>
      <Select
        value={props.value}
        isMulti
        name="selectedProfessions"
        options={inputValue !== '' ? props.options : []}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={props.placeholder}
        onMenuClose={updateInputValue}
        components={components}
        onChange={props.onChange}
        textFieldProps={{
          label: props.label,
          onChange: updateInputValue,
          InputLabelProps: !props.value.length ? {} : { shrink: true },
        }}
      />
    </MultiSelectStyled>
  )
}

export default MultiSelect;
