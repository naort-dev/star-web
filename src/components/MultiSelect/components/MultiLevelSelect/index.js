import React from 'react';
import PropTypes from 'prop-types';
import MultiLevelStyled from './styled';

const MultiLevelSelect = (props) => {
  const { option } = props;
  console.log(props);
  if (option.parent) {
    return (
      <MultiLevelStyled.InnerListWrapper>
        <MultiLevelStyled.InnerListItem onClick={event => props.onSelect(option, event)}>{option.label}</MultiLevelStyled.InnerListItem>
      </MultiLevelStyled.InnerListWrapper>
    )
  }
  return (
    <MultiLevelStyled>
      <MultiLevelStyled.ParentItem>
        <MultiLevelStyled.MainItem onClick={event => props.onSelect(option, event)}>{option.label}</MultiLevelStyled.MainItem>
        {/* <MultiLevelStyled.InnerListWrapper>
          {
            option.child.map((item, index) => (
              <MultiLevelStyled.InnerListItem onClick={event => props.selectValue(item)} key={index}>- {item.label}</MultiLevelStyled.InnerListItem>
            ))
          }
        </MultiLevelStyled.InnerListWrapper> */}
      </MultiLevelStyled.ParentItem>
    </MultiLevelStyled>
  );
};

export default MultiLevelSelect;

// MultiLevelSelect.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
//   isDisabled: PropTypes.bool,
//   isFocused: PropTypes.bool,
//   isSelected: PropTypes.bool,
//   onFocus: PropTypes.func,
//   onSelect: PropTypes.func,
//   option: PropTypes.object.isRequired,
// };
