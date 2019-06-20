import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EmptyText } from 'styles/CommonStyled'
import { options } from '../../constants';
import { fetchMyVideosList } from '../../actions/getMyVideosList';
import { FanGeneralList } from '../../../../components/ListCards';
import OrderDetails from '../../../../components/OrderDetails';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import CancelledStyled from './styled';

const CancelledBookings = (props) => {
  
  const [selected, updateSelected] = useState({});

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
      </CancelledStyled.FilterSection>
      {
        !props.bookingsList.loading && props.bookingsList.data.length === 0 &&
          <EmptyText>
            You currently do not have any cancelled bookings.
          </EmptyText>
      }
      {
        props.bookingsList.loading && <Loader />
      }
      {
        !props.bookingsList.loading && props.bookingsList.data.map(bookItem => (
          <FanGeneralList
            expiration={props.config.request_expiration_days}
            onPrimaryClick={onSetSelected(bookItem)}
            key={bookItem.booking_id}
            data={bookItem}
            isOpen={false}
          />
        ))
      }
    </CancelledStyled>
  )
}

CancelledBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  fetchMyVideosList: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, requestStatus) => dispatch(fetchMyVideosList(offset, refresh, requestStatus)),
})

export default connect(null, mapDispatchToProps)(CancelledBookings);
