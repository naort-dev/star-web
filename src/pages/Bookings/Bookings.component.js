import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BackArrow, EmptyText } from 'styles/CommonStyled';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import CancelledBookings from './components/CancelledBookings';
import { options, filterOptions, sortBy } from './constants';
import { checkIfAnyBooking, getRequestDetails } from '../../services/request';
import OrderDetails from '../../components/OrderDetails';
import { celebOpenStatusList, celebCompletedStatusList, celebCancelledStatusList } from '../../constants/requestStatusList';
import { parseQueryString } from '../../utils/dataformatter';
import {} from '../../styles/CommonStyled';
import BookingsStyled from './styled';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    let dropValue = {};
    let selected = '';
    this.queryString = parseQueryString(this.props.location.search);
    const newDropValue = options.find(option => option.id === this.queryString.type);
    let filter = filterOptions.find(filterItem => filterItem.id === this.queryString.filter);
    let sort = sortBy.find(sortItem => sortItem.id === this.queryString.sort);
    if (this.queryString.selected && newDropValue.id === 'open') {
      selected = this.queryString.selected;
    }
    if (!filter) {
      filter = {
        title: 'Show all',
        id: '',
      }
    }
    if (!sort) {
      sort = {
        title: 'Most recent',
        id: '',
      }
    }
    if (newDropValue && newDropValue.id !== 'all') {
      dropValue = newDropValue;
      this.fetchList(newDropValue.id);
    } else {
      dropValue = {
        title: 'Overview',
        id: 'all',
      };
      this.fetchList('open');
    }
    props.fetchRecentActivity();
    this.state = {
      dropValue,
      orderDetails: null,
      filter,
      selected,
      sort,
      hasBookings: true,
    };
  }

  componentDidMount() {
    checkIfAnyBooking('celebrity_id')
      .then((hasBookings) => {
        this.setState({ hasBookings });
      })
    if (this.queryString.request_id) {
      getRequestDetails(this.queryString.request_id)
        .then((requestDetails) => {
          if (requestDetails.success) {
            const newRequestDetails = requestDetails.data.stargramz_response;
            if (celebCompletedStatusList.indexOf(newRequestDetails.request_status) >= 0) {
              this.props.toggleBookingModal(true, { id: this.queryString.request_id }, true);
            } else if (celebCancelledStatusList.indexOf(newRequestDetails.request_status) >= 0) {
              this.setState({
                orderDetails: requestDetails.data.stargramz_response,
              })
            }
          }
        })
    }
  }

  onBackClick = () => {
    this.props.history.push('/manage');
  };

  onOpenClick = bookingId => () => {
    this.setState({
      dropValue: {
        title: 'Open',
        id: 'open',
      },
      selected: bookingId,
    });
  };

  setRequestType = dropValue => () => {
    this.setState({ dropValue });
  };

  setRequest = bookId => {
    this.setState({ selected: bookId });
  };

  closeOrderDetails = () => {
    this.setState({ orderDetails: null });
  }

  fetchList = (type, filter={}, sort={}) => {
    switch (type) {
      case 'all':
        this.props.fetchBookingsList(0, true, 'all');
        break;
      case 'open':
        this.props.fetchBookingsList(0, true, celebOpenStatusList);
        break;
      case 'completed':
        this.props.fetchBookingsList(0, true, celebCompletedStatusList, filter.id, sort.id);
        break;
      case 'cancelled':
        this.props.fetchBookingsList(0, true, celebCancelledStatusList);
        break;
      default:
        return null;
    }
    return null;
  };

  handleCategoryChange = option => {
    const {filter, sort } = this.state;
    this.setState({ dropValue: option });
    if (option.id === 'all') {
      this.fetchList('open');
    } else {
      this.fetchList(option.id, filter, sort);
    }
  };

  handleFilterOrSort = (type) => (option) => {
    const { dropValue } = this.state;
    let {filter, sort } = this.state;
    this.setState({ [type]: option });
    filter = type === 'filter' ? option : filter;
    sort = type === 'sort' ? option: sort;
    this.fetchList(dropValue.id, filter, sort);
  }

  render() {
    const { dropValue, selected, filter, sort, hasBookings, orderDetails } = this.state;
    const { props } = this;
    return (
      <BookingsStyled className="booking-wrapper">
        <BackArrow className="arrow" onClick={this.onBackClick} />
        <BookingsStyled.Header className="top-heading">My Bookings</BookingsStyled.Header>
        {
          orderDetails &&
            <OrderDetails
              isModal
              starMode
              closeModal={this.closeOrderDetails}
              onCheckboxChange={this.onPrivacyChange}
              bookingData={orderDetails}
            />
        }
        <BookingsStyled.Container>
          {
            hasBookings ?
             <React.Fragment>
                {
                  dropValue.id === 'all'&&
                    <AllBookings
                      bookingsList={props.bookingsList}
                      recentActivity={props.recentActivity}
                      dropValue={dropValue}
                      config={props.config}
                      handleCategoryChange={this.handleCategoryChange}
                      onOpenClick={this.onOpenClick}
                      setRequestType={this.setRequestType}
                    />
                }
                {
                  dropValue.id === 'open' &&
                    <OpenBookings
                      bookingsList={props.bookingsList}
                      config={props.config}
                      dropValue={dropValue}
                      selected={selected}
                      updateSelected={this.setRequest}
                      handleCategoryChange={this.handleCategoryChange}
                    />
                }
                {
                  dropValue.id === 'completed' &&
                    <CompletedBookings
                      bookingsList={props.bookingsList}
                      dropValue={dropValue}
                      filter={filter}
                      sort={sort}
                      favoriteVideo={props.favoriteVideo}
                      toggleBookingModal={props.toggleBookingModal}
                      handleCategoryChange={this.handleCategoryChange}
                      handleFilterOrSort={this.handleFilterOrSort}
                    />
                }
                {
                  dropValue.id === 'cancelled' &&
                    <CancelledBookings
                      bookingsList={props.bookingsList}
                      config={props.config}
                      dropValue={dropValue}
                      toggleBookingModal={props.toggleBookingModal}
                      handleCategoryChange={this.handleCategoryChange}
                    />
                }
              </React.Fragment>
              :
                <EmptyText className="empty-text">You currently do not have any bookings.
                  Visit&nbsp;<Link to="/manage/promotional-tools">Promote Yourself</Link>&nbsp;to spread the word you are available.
                </EmptyText>
          }
        </BookingsStyled.Container>
      </BookingsStyled>
    );
  }
}

Bookings.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  fetchRecentActivity: PropTypes.func.isRequired,
  recentActivity: PropTypes.object.isRequired,
  favoriteVideo: PropTypes.func.isRequired,
};

export default Bookings;
