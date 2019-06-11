import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import { options } from './constants';
import {
  celebOpenStatusList,
  celebCompletedStatusList,
} from '../../constants/requestStatusList';
import { parseQueryString } from '../../utils/dataformatter';
import {} from '../../styles/CommonStyled';
import BookingsStyled from './styled';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    let dropValue;
    const queryString = parseQueryString(this.props.location.search);
    const newDropValue = options.find(option => option.id === queryString.type);
    if (newDropValue && newDropValue.id !== 'all') {
      dropValue = newDropValue;
      this.fetchList(newDropValue.id);
    } else {
      dropValue = {
        title: 'All',
        id: 'all',
      };
      this.fetchList('open');
    }
    this.state = {
      dropValue,
      selected: '',
    };
  }

  onBackClick = () => {
    this.props.history.goBack();
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

  fetchList = type => {
    switch (type) {
      case 'all':
        this.props.fetchBookingsList(0, true, 'all');
        break;
      case 'open':
        this.props.fetchBookingsList(0, true, celebOpenStatusList);
        break;
      case 'completed':
        this.props.fetchBookingsList(0, true, celebCompletedStatusList);
        break;
      case 'cancelled':
        this.props.fetchBookingsList(0, true, [6]);
        break;
      default:
        return null;
    }
    return null;
  };

  handleCategoryChange = option => {
    this.setState({ dropValue: option });
    if (option.id === 'all') {
      this.fetchList('open');
    } else {
      this.fetchList(option.id);
    }
  };

  render() {
    const { dropValue, selected } = this.state;
    const { props } = this;
    return (
      <BookingsStyled>
        <BackArrow className="arrow" onClick={this.onBackClick} />
        <BookingsStyled.Header>My Bookings</BookingsStyled.Header>
        {dropValue.id === 'all' && (
          <AllBookings
            bookingsList={props.bookingsList}
            dropValue={dropValue}
            config={props.config}
            handleCategoryChange={this.handleCategoryChange}
            onOpenClick={this.onOpenClick}
            setRequestType={this.setRequestType}
          />
        )}
        {dropValue.id === 'open' && (
          <OpenBookings
            bookingsList={props.bookingsList}
            config={props.config}
            dropValue={dropValue}
            selected={selected}
            updateSelected={this.setRequest}
            handleCategoryChange={this.handleCategoryChange}
          />
        )}
        {dropValue.id === 'completed' && (
          <CompletedBookings
            bookingsList={props.bookingsList}
            dropValue={dropValue}
            toggleBookingModal={props.toggleBookingModal}
            handleCategoryChange={this.handleCategoryChange}
          />
        )}
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
};

export default Bookings;
