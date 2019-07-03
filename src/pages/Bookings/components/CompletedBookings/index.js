import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { celebCompletedStatusList } from '../../../../constants/requestStatusList';
import { fetchBookingsList } from '../../actions/getBookingsList';
import Dropdown from '../../../../components/Dropdown';
import Search from '../../../../components/Search';
import Loader from '../../../../components/Loader';
import Pagination from '../../../../components/Pagination';
import { CompletedCard } from '../../../../components/ListCards';
import { options, filterOptions, sortBy } from '../../constants';
import CompletedStyled from './styled';

const CompletedBookings = (props) => {

  const fetchList = (low, high) => {
    props.fetchBookingsList(low, false, celebCompletedStatusList, props.filter.id, props.sort.id);
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
        <Dropdown
          rootClass='drop-down filter'
          secondary
          selected={props.filter}
          options={filterOptions}
          labelKey="title"
          valueKey="id"
          onChange={props.handleFilterOrSort('filter')}
          placeHolder="Filter"
        />
        <Dropdown
          rootClass='drop-down sort-by'
          secondary
          selected={props.sort}
          options={sortBy}
          labelKey="title"
          valueKey="id"
          onChange={props.handleFilterOrSort('sort')}
          placeHolder="Sort by"
        />
        {/* <Search
          classes={{
            root: 'search-root',
            inputRoot: 'search-input-container',
          }}
          placeholder='Search by keyword'
        /> */}
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
                <CompletedCard
                  onClick={onCompletedClick(bookItem)}
                  onFavoriteClick={props.favoriteVideo}
                  key={bookItem.id}
                  data={bookItem}
                  classes={{root: 'list-item'}}
                />
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
  fetchBookingsList: PropTypes.func.isRequired,
  handleFilterOrSort: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  favoriteVideo: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (offset, refresh, requestStatus, filter, sort) => dispatch(fetchBookingsList(offset, refresh, requestStatus, filter, sort)),
})

export default connect(null, mapDispatchToProps)(CompletedBookings);
