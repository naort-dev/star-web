import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { celebCompletedStatusList } from '../../../../constants/requestStatusList';
import { fetchMyVideosList } from '../../actions/getMyVideosList';
import Dropdown from '../../../../components/Dropdown';
import Loader from '../../../../components/Loader';
import Pagination from '../../../../components/Pagination';
import { FanGeneralList } from '../../../../components/ListCards';
import { options } from '../../constants';
import CompletedStyled from './styled';

const CompletedBookings = (props) => {

  const fetchList = (low, high) => {
    props.fetchMyVideosList(low, false, celebCompletedStatusList)
  }

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
        !props.bookingsList.loading &&
          <CompletedStyled.ListSection>
            {
              props.bookingsList.data.map((bookItem) => (
                <FanGeneralList onClick={onCompletedClick(bookItem)} key={bookItem.id} data={bookItem} classes={{root: 'list-item'}} />
              ))
            }
          </CompletedStyled.ListSection>
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
    </CompletedStyled>
  )
}

CompletedBookings.propTypes = {
  dropValue: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchMyVideosList: PropTypes.func.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, requestStatus) => dispatch(fetchMyVideosList(offset, refresh, requestStatus)),
})

export default connect(null, mapDispatchToProps)(CompletedBookings);
