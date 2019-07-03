import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EmptyText } from 'styles/CommonStyled'
import { options } from '../../constants';
import { celebCancelledStatusList } from '../../../../constants/requestStatusList';
import { fetchBookingsList } from '../../actions/getBookingsList';
import { GeneralList } from '../../../../components/ListCards';
import Search from '../../../../components/Search';
import OrderDetails from '../../../../components/OrderDetails';
import Pagination from '../../../../components/Pagination';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import CancelledStyled from './styled';

const CancelledBookings = (props) => {
  
  const [selected, updateSelected] = useState({});

  const fetchList = (low) => {
    props.fetchBookingsList(low, false, celebCancelledStatusList)
  }

  const onSetSelected = (bookItem) => () => {
    updateSelected(bookItem)
  }

  return (
    <CancelledStyled>
      {
        !isEmpty(selected) &&
          <OrderDetails
            isModal
            disableFooter
            closeModal={onSetSelected({})}
            bookingData={selected}
            starMode
          />
      }
      <CancelledStyled.FilterSection>
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
        {/* <Search
          classes={{
            root: 'search-root',
            inputRoot: 'search-input-container',
          }}
          placeholder='Search by keyword'
        /> */}
      </CancelledStyled.FilterSection>
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
        !props.bookingsList.loading && props.bookingsList.data.length === 0 &&
          <EmptyText>
            You currently do not have any cancelled bookings.<br />
            Note: This is a great thing!
          </EmptyText>
      }
      {
        props.bookingsList.highCancel &&
          <EmptyText className='cancel-count-notification'>
            You have had {props.bookingsList.highCancelCount} cancellations within the last 30 days.
            Make sure you try and complete your bookings to keep your ratings up as well as your satisfaction with the fans. 
          </EmptyText>
      }
      {
        props.bookingsList.loading && <Loader />
      }
      {
        !props.bookingsList.loading && props.bookingsList.data.map(bookItem => (
          <GeneralList
            expiration={props.config.request_expiration_days}
            onPrimaryClick={onSetSelected(bookItem)}
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

CancelledBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (offset, refresh, requestStatus) => dispatch(fetchBookingsList(offset, refresh, requestStatus)),
})

export default connect(null, mapDispatchToProps)(CancelledBookings);
