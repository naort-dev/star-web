import React, { useState, useEffect } from 'react';
import { BackArrow, SectionHead } from 'styles/CommonStyled';
import Dropdown from '../../components/Dropdown';
import { GeneralList, StarCompleted } from '../../components/ListCards';
import { parseQueryString } from '../../utils/dataformatter';
import BookingsStyled from './styled';

const options = [{
  title: 'All',
  id: 'all',
}, {
  title: 'Open Bookings',
  id: 'open',
}, {
  title: 'Completed Bookings',
  id: 'completed',
}, {
  title: 'Cancelled Bookings',
  id: 'cancelled',
}];

const Bookings = (props) => {

  const [dropValue , setDropValue] = useState({
    title: 'All',
    id: 'all',
  });

  useEffect(() => {
    const queryString = parseQueryString(props.location.search);
    const newDropValue = options.find(option => option.id === queryString.type);
    if (newDropValue) {
      setDropValue(newDropValue)
    } else {
      setDropValue({
        title: 'All',
        id: 'all',
      })
    }
  }, [])

  const handleCategoryChange = (option) => {
    setDropValue(option)
  }

  return (
    <BookingsStyled>
      <Dropdown
        rootClass='drop-down'
        secondary
        selected={dropValue}
        options={options}
        labelKey="title"
        valueKey="id"
        onChange={handleCategoryChange}
        placeHolder="Select a booking type"
      />
      {/* <BackArrow className="arrow" />
      <BookingsStyled.Header>My Requests</BookingsStyled.Header> */}
      <BookingsStyled.SectionHeader>
        <SectionHead>Open Bookings</SectionHead>
      </BookingsStyled.SectionHeader>
      <GeneralList />
      <GeneralList />
      <BookingsStyled.SectionHeader>
        <SectionHead>Latest Activity</SectionHead>
      </BookingsStyled.SectionHeader>
      <StarCompleted />
      <StarCompleted />
    </BookingsStyled>
  )
}

export default Bookings;
