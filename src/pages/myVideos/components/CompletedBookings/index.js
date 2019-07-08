import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EmptyText } from 'styles/CommonStyled';
import { fetchMyVideosList } from '../../actions/getMyVideosList';
import Dropdown from '../../../../components/Dropdown';
import Loader from '../../../../components/Loader';
import { FanGeneralList } from '../../../../components/ListCards';
import { options } from '../../constants';
import CompletedStyled from './styled';

const CompletedBookings = (props) => {

  const onCompletedClick = (requestData) => () => {
    props.toggleBookingModal(true, {...requestData, id: requestData.booking_id}, true);
  }

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
      </CompletedStyled.FilterSection>
      {
        props.bookingsList.loading && <Loader />
      }
      {!props.bookingsList.loading &&
      props.bookingsList.data.length === 0 && (
        <EmptyText>You currently do not have any completed bookings.</EmptyText>
      )}
      {
        !props.bookingsList.loading &&
          <CompletedStyled.ListSection>
            {
              props.bookingsList.data.map((bookItem) => (
                <FanGeneralList
                  onUpdateData={props.updateMyVideosList}
                  onClick={onCompletedClick(bookItem)}
                  key={bookItem.id}
                  data={bookItem}
                  classes={{root: 'list-item'}}
                />
              ))
            }
          </CompletedStyled.ListSection>
      }
    </CompletedStyled>
  )
}

CompletedBookings.propTypes = {
  dropValue: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchMyVideosList: PropTypes.func.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  updateMyVideosList: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, requestStatus) => dispatch(fetchMyVideosList(offset, refresh, requestStatus)),
})

export default connect(null, mapDispatchToProps)(CompletedBookings);
