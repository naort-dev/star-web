import React from 'react';
import { connect } from 'react-redux';
import { options } from '../../constants';
import { fetchBookingsList } from '../../actions/getBookingsList';
import { GeneralList } from '../../../../components/ListCards';
import Pagination from '../../../../components/Pagination';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import CancelledStyled from './styled';

const CancelledBookings = (props) => {
  
  const fetchList = (low, high) => {
    props.fetchBookingsList(low, false, [5])
  }

  return (
    <CancelledStyled>
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
      {
        props.bookingsList.data.length > 0 &&
          <Pagination
            classes={{root: 'pagination-wrapper top'}}
            offset={props.bookingsList.offset}
            count={props.bookingsList.count}
            limit={props.bookingsList.limit}
            dataLoading={props.bookingsList.loading}
            onChange={fetchList}
          />
      }
      {
        props.bookingsList.loading && <Loader />
      }
      {
        !props.bookingsList.loading && props.bookingsList.data.map(bookItem => (
          <GeneralList
            expiration={props.config.request_expiration_days}
            // onPrimaryClick={onViewClick(bookItem)}
            key={bookItem.booking_id}
            data={bookItem}
            isOpen={false}
          />
        ))
      }
      {
        !props.bookingsList.loading && props.bookingsList.count > props.bookingsList.offset &&
          <Pagination
            classes={{root: 'pagination-wrapper bottom'}}
            offset={props.bookingsList.offset}
            count={props.bookingsList.count}
            limit={props.bookingsList.limit}
            dataLoading={props.bookingsList.loading}
            onChange={fetchList}
          />
      }
    </CancelledStyled>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (offset, refresh, requestStatus) => dispatch(fetchBookingsList(offset, refresh, requestStatus)),
})

export default connect(null, mapDispatchToProps)(CancelledBookings);
