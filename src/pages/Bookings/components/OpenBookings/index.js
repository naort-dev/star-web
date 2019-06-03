import React from 'react';
import Dropdown from '../../../../components/Dropdown';
import { CompactCard } from '../../../../components/ListCards';
import { options } from '../../constants';
import OpenStyled from './styled';

const OpenBookings = (props) => {
  return (
    <OpenStyled>
      <OpenStyled.LeftSection>
        <Dropdown
          rootClass='drop-down'
          secondary
          selected={props.dropValue}
          options={options}
          labelKey="title"
          valueKey="id"
          onChange={props.handleCategoryChange}
          placeHolder="Select a booking type"
        />
        <CompactCard selected />
        <CompactCard />
      </OpenStyled.LeftSection>
      <OpenStyled.RightSection>
        Text to be added
      </OpenStyled.RightSection>
    </OpenStyled>
  )
}

export default OpenBookings;
