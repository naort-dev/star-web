import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { BackArrow } from 'styles/CommonStyled';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import CancelledBookings from './components/CancelledBookings';
import { options } from './constants';
import OrderDetails from '../../components/OrderDetails';
import { getRequestDetails } from '../../services/request';
import { openStatusList, completedStatusList, celebCancelledStatusList } from '../../constants/requestStatusList';
import { parseQueryString } from '../../utils/dataformatter';
import {} from '../../styles/CommonStyled';
import BookingsStyled from './styled';

class MyVideos extends React.Component {
  constructor(props) {
    super(props);
    let dropValue = {};
    this.queryString = parseQueryString(this.props.location.search);
    const newDropValue = options.find(option => option.id === this.queryString.type);
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
      orderDetails: null,
    };
  }

  componentDidMount() {
    if (this.queryString.request_id) {
      getRequestDetails(this.queryString.request_id)
        .then((requestDetails) => {
          if (requestDetails.success) {
            const newRequestDetails = requestDetails.data.stargramz_response;
            if (completedStatusList.indexOf(newRequestDetails.request_status) >= 0) {
              this.props.toggleBookingModal(true, { id: this.queryString.request_id }, false);
            } else if (celebCancelledStatusList.indexOf(newRequestDetails.request_status) >= 0 ||
              openStatusList.indexOf(newRequestDetails.request_status) >= 0
              ) {
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

  onPrivacyChange = (isPublic) => {
    const { orderDetails } = this.state;
    const newRequestData = cloneDeep(orderDetails);
    newRequestData.public_request = isPublic;
    this.props.updateMyVideosList(newRequestData.id, newRequestData);
  }

  setRequestType = dropValue => () => {
    this.setState({ dropValue });
  };

  setRequest = bookId => {
    this.setState({ selected: bookId });
  };

  closeOrderDetails = () => {
    this.setState({ orderDetails: null });
  }

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
    const { dropValue, selected, orderDetails } = this.state;
    const { props } = this;
    return (
      <BookingsStyled>
        <BackArrow className="arrow" onClick={this.onBackClick} />
        <BookingsStyled.Header>My Videos</BookingsStyled.Header>
        {
          orderDetails &&
            <OrderDetails
              isModal
              closeModal={this.closeOrderDetails}
              onCheckboxChange={this.onPrivacyChange}
              bookingData={orderDetails}
            />
        }
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
              updateMyVideosList={props.updateMyVideosList}
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
