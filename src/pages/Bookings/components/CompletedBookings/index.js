import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { celebCompletedStatusList } from '../../../../constants/requestStatusList';
import { fetchBookingsList } from '../../actions/getBookingsList';
import Dropdown from '../../../../components/Dropdown';
import Pagination from '../../../../components/Pagination';
import { CompletedCard } from '../../../../components/ListCards';
import { options, filterOptions, SortBy } from '../../constants';
import CompletedStyled from './styled';

const CompletedBookings = (props) => {

  const [filterVal, setFilterVal] = useState({});
  const [sortVal, setSortVal] = useState({});

  const fetchList = (low, high) => {
    props.fetchBookingsList(low, true, celebCompletedStatusList)
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
      <Pagination
        classes={{root: 'pagination-wrapper'}}
        count={props.bookingsList.count}
        limit={props.bookingsList.limit}
        dataLoading={props.bookingsList.loading}
        onChange={fetchList}
      />
      <CompletedStyled.ListSection>
        {
          props.bookingsList.data.map((bookItem) => (
            <CompletedCard key={bookItem.id} data={bookItem} classes={{root: 'list-item'}} />
          ))
        }
      </CompletedStyled.ListSection>
    </CompletedStyled>
  )
}

CompletedBookings.propTypes = {
  dropValue: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (offset, refresh, requestStatus) => dispatch(fetchBookingsList(offset, refresh, requestStatus)),
})

export default connect(null, mapDispatchToProps)(CompletedBookings);
