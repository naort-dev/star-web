import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BackArrow, SectionHead } from 'styles/CommonStyled';
import Dropdown from '../../components/Dropdown';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import { options } from './constants';
import Loader from '../../components/Loader';
import { GeneralList, StarCompleted } from '../../components/ListCards';
import { celebOpenStatusList, celebCompletedStatusList } from '../../constants/requestStatusList';
import { parseQueryString } from '../../utils/dataformatter';
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
            {
              props.bookingsList.loading && <Loader />
            }
            {
              props.bookingsList.data.length > 0 &&
                <BookingsStyled.SectionHeader>
                  <SectionHead>Open Bookings</SectionHead>
                </BookingsStyled.SectionHeader>
            }
            {
              props.bookingsList.data.map((bookItem) => (
                <GeneralList
                  expiration={props.config.request_expiration_days}
                  onPrimaryClick={onOpenClick(bookItem.booking_id)}
                  key={bookItem.booking_id}
                  data={bookItem}
                />
              ))
            }
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
      {
        dropValue.id === 'completed' && <CompletedBookings bookingsList={props.bookingsList} dropValue={dropValue} handleCategoryChange={handleCategoryChange} />
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
}

export default Bookings;
