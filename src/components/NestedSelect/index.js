import React, { useState } from 'react';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { NestedSelectStyled } from './styled';

const MultiValue = prop => {
  return (
    <Chip
      tabIndex={-1}
      label={prop.children}
      onDelete={prop.removeProps.onClick}
    />
  );
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const Control = prop => {
  const textFieldProps = { ...prop.selectProps.textFieldProps };
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        classes: { root: 'select-input' },
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
};

const handleGroupHeadClick = (id) => (event) => {
  document.getElementById(id).click();
  event.preventDefault();
}

const GroupHeading = (prop) => {
  return (
    <React.Fragment>
      <label className='select__group-heading' htmlFor={prop.id.split('-heading')[0]} onClick={handleGroupHeadClick(prop.id.split('-heading')[0])}>{prop.children}</label>
      <input id={prop.id.split('-heading')[0]} type='checkbox' defaultChecked />
    </React.Fragment>
  )
}

const Option = prop => {
  return (
    <React.Fragment>
      <MenuItem
        buttonRef={prop.innerRef}
        selected={prop.isFocused}
        component="div"
        classes={{root: 'select-option-item'}}
        {...prop.innerProps}
      >
        {prop.children}
      </MenuItem>
    </React.Fragment>
  );
};

const NestedSelect = props => {
  const [inputValue, updateInput] = useState('');

  const updateInputValue = event => {
    if (event) {
      updateInput(event.target.value);
    } else {
      updateInput('');
    }
  };

  const components = {
    Control,
    MultiValue,
    Option,
    GroupHeading,
  };
  return (
    <NestedSelectStyled>
      <Select
        value={props.value}
        isMulti
        name="selectedProfessions"
        options={props.options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={props.placeholder}
        onMenuClose={updateInputValue}
        components={components}
        onChange={props.onChange}
        textFieldProps={{
          label: props.label,
          onChange: updateInputValue,
          InputLabelProps:
            props.value && props.value.length ? { shrink: true } : {},
            classes: { root: 'input-label' },
        }}
      />
    </NestedSelectStyled>
  );
};

export default NestedSelect;
