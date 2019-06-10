import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import { options } from './constants';
import { celebOpenStatusList, celebCompletedStatusList } from '../../constants/requestStatusList';
import { parseQueryString } from '../../utils/dataformatter';
import {  } from '../../styles/CommonStyled';
import BookingsStyled from './styled';

const Bookings = (props) => {

  const [dropValue , setDropValue] = useState({
    title: 'All',
    id: 'all',
  });

  const fetchList = (type) => {
    switch (type) {
      case 'all':
        props.fetchBookingsList(0, true, 'all');
        break;
      case 'open':
        props.fetchBookingsList(0, true, celebOpenStatusList);
        break;
      case 'completed':
        props.fetchBookingsList(0, true, celebCompletedStatusList);
        break;
      case 'cancelled':
        props.fetchBookingsList(0, true, [6]);
        break;
      default:
        return null;
    }
  }

  useEffect(() => {
    const queryString = parseQueryString(props.location.search);
    const newDropValue = options.find(option => option.id === queryString.type);
    if (newDropValue && newDropValue.id !== 'all') {
      setDropValue(newDropValue);
      fetchList(newDropValue.id);
    } else {
      setDropValue({
        title: 'All',
        id: 'all',
      })
      fetchList('open');
    }
  }, [])

  const setRequestType = (option) => () => {
    setDropValue(option)
  }

  const handleCategoryChange = (option) => {
    setDropValue(option)
    if (option.id === 'all') {
      fetchList('open'); 
    } else {
      fetchList(option.id); 
    }
  }

  const onBackClick = () => {
    props.history.goBack();
  }

  const onOpenClick = bookingId => () => {
    props.history.push(`/manage/bookings?type=open&selected=${bookingId}`)
  }

  return (
    <BookingsStyled>
      <BackArrow className="arrow" onClick={onBackClick} />
      <BookingsStyled.Header>My Bookings</BookingsStyled.Header>
      {
        dropValue.id === 'all'&&
          <AllBookings
            bookingsList={props.bookingsList}
            dropValue={dropValue}
            config={props.config}
            handleCategoryChange={handleCategoryChange}
            onOpenClick={onOpenClick}
            setRequestType={setRequestType}
          />
      }
      {
        dropValue.id === 'open' &&
          <OpenBookings
            bookingsList={props.bookingsList}
            config={props.config}
            dropValue={dropValue}
            handleCategoryChange={handleCategoryChange}
          />
      }
      {
        dropValue.id === 'completed' &&
          <CompletedBookings
            bookingsList={props.bookingsList}
            dropValue={dropValue}
            toggleBookingModal={props.toggleBookingModal}
            handleCategoryChange={handleCategoryChange}
          />
      }
    </BookingsStyled>
  )
}

Bookings.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
}

export default Bookings;
