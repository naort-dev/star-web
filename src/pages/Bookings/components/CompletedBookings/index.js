import React, { useState } from 'react';
import Dropdown from '../../../../components/Dropdown';
import { CompletedCard } from '../../../../components/ListCards';
import { options, filterOptions, SortBy } from '../../constants';
import CompletedStyled from './styled';

const CompletedBookings = (props) => {

  const [filterVal, setFilterVal] = useState({});
  const [sortVal, setSortVal] = useState({});

  return (
    <CompletedStyled>
      <CompletedStyled.FilterSection>
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
        <Dropdown
          rootClass='drop-down filter'
          secondary
          selected={filterVal}
          options={filterOptions}
          labelKey="title"
          valueKey="id"
          onChange={setFilterVal}
          placeHolder="Filter"
        />
        <Dropdown
          rootClass='drop-down sort-by'
          secondary
          selected={sortVal}
          options={SortBy}
          labelKey="title"
          valueKey="id"
          onChange={setSortVal}
          placeHolder="Sort by"
        />
      </CompletedStyled.FilterSection>
      <CompletedStyled.ListSection>
        <CompletedCard />
      </CompletedStyled.ListSection>
    </CompletedStyled>
  )
}

export default CompletedBookings;
