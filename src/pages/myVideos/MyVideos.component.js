import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import CancelledBookings from './components/CancelledBookings';
import { options } from './constants';
import { openStatusList, completedStatusList, celebCancelledStatusList } from '../../constants/requestStatusList';
import { parseQueryString } from '../../utils/dataformatter';
import {} from '../../styles/CommonStyled';
import BookingsStyled from './styled';

class MyVideos extends React.Component {
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
    props.fetchRecentActivity();
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
        this.props.fetchMyVideosList(0, true, 'all');
        break;
      case 'open':
        this.props.fetchMyVideosList(0, true, openStatusList);
        break;
      case 'completed':
        this.props.fetchMyVideosList(0, true, completedStatusList);
        break;
      case 'cancelled':
        this.props.fetchMyVideosList(0, true, celebCancelledStatusList);
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
        <BookingsStyled.Header>My Videos</BookingsStyled.Header>
        {
          dropValue.id === 'all'&&
            <AllBookings
              bookingsList={props.myVideosList}
              dropValue={dropValue}
              config={props.config}
              recentActivity={props.recentActivity}
              updateMyVideosList={props.updateMyVideosList}
              handleCategoryChange={this.handleCategoryChange}
              onOpenClick={this.onOpenClick}
              setRequestType={this.setRequestType}
            />
        }
        {
          dropValue.id === 'open' &&
            <OpenBookings
              bookingsList={props.myVideosList}
              config={props.config}
              dropValue={dropValue}
              updateMyVideosList={props.updateMyVideosList}
              selected={selected}
              updateSelected={this.setRequest}
              handleCategoryChange={this.handleCategoryChange}
            />
        }
        {
          dropValue.id === 'completed' &&
            <CompletedBookings
              bookingsList={props.myVideosList}
              dropValue={dropValue}
              toggleBookingModal={props.toggleBookingModal}
              handleCategoryChange={this.handleCategoryChange}
            />
        }
        {
          dropValue.id === 'cancelled' &&
            <CancelledBookings
              bookingsList={props.myVideosList}
              config={props.config}
              dropValue={dropValue}
              toggleBookingModal={props.toggleBookingModal}
              handleCategoryChange={this.handleCategoryChange}
            />
        }
      </BookingsStyled>
    );
  }
}

MyVideos.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  myVideosList: PropTypes.object.isRequired,
  fetchMyVideosList: PropTypes.func.isRequired,
  fetchRecentActivity: PropTypes.func.isRequired,
  recentActivity: PropTypes.object.isRequired,
  updateMyVideosList: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
};

export default MyVideos;
