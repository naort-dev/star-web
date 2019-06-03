import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { BackArrow, SectionHead } from 'styles/CommonStyled';
import Dropdown from '../../components/Dropdown';
import OpenBookings from './components/OpenBookings';
import { options } from './constants';
import { GeneralList, StarCompleted } from '../../components/ListCards';
import { parseQueryString } from '../../utils/dataformatter';
import BookingsStyled from './styled';

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

  const onBackClick = () => {
    props.history.goBack();
  }

  return (
    <BookingsStyled>
      <BackArrow className="arrow" onClick={onBackClick} />
      <BookingsStyled.Header>My Bookings</BookingsStyled.Header>
      {
        dropValue.id === 'all' &&
          <React.Fragment>
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
            <BookingsStyled.SectionHeader>
              <SectionHead>Open Bookings</SectionHead>
            </BookingsStyled.SectionHeader>
            <GeneralList />
            <GeneralList />
            <BookingsStyled.SectionHeader>
              <SectionHead>Latest Activity</SectionHead>
            </BookingsStyled.SectionHeader>
            <StarCompleted type='comment' />
            <StarCompleted type='reaction' />
            <StarCompleted type='tip' />
            <StarCompleted type='rating' />
          </React.Fragment>
      }
      {
        dropValue.id === 'open' && <OpenBookings dropValue={dropValue} handleCategoryChange={handleCategoryChange} />
      }
    </BookingsStyled>
  )
}

Bookings.propTypes = {
  history: propTypes.object.isRequired,
  location: propTypes.object.isRequired,
}

export default Bookings;
