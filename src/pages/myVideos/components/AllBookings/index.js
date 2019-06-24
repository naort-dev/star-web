import React from 'react';
import PropTypes from 'prop-types';
import { SectionHead, EmptyText } from 'styles/CommonStyled';
import { options } from '../../constants';
import { FanGeneralList } from '../../../../components/ListCards';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import BookingsStyled from '../../styled';

const AllBookings = props => {
  return (
    <React.Fragment>
      <Dropdown
        rootClass="drop-down"
        secondary
        selected={props.dropValue}
        options={options}
        labelKey="title"
        valueKey="id"
        onChange={props.handleCategoryChange}
        placeHolder="Select a booking type"
      />
      <BookingsStyled.SectionHeader>
        <SectionHead>Open Requests</SectionHead>
      </BookingsStyled.SectionHeader>
      {props.bookingsList.loading && <Loader />}
      {!props.bookingsList.loading && props.bookingsList.data.length === 0 && (
        <EmptyText>
          You currently do not have any recent activity.
        </EmptyText>
      )}
      {props.bookingsList.data.slice(0, 2).map(bookItem => (
        <FanGeneralList
          expiration={props.config.request_expiration_days}
          onPrimaryClick={props.onOpenClick(bookItem.booking_id)}
          key={bookItem.booking_id}
          data={bookItem}
        />
      ))}
      <BookingsStyled.SectionHeader>
        <SectionHead>Recent Activity</SectionHead>
      </BookingsStyled.SectionHeader>
      {/* <LatestCard type="comment" /> */}
      {/* <FanGeneralList key={bookItem.id} data={bookItem} classes={{root: 'list-item'}} /> */}
      {/* <LatestCard type="rating" /> */}
    </React.Fragment>
  );
};

AllBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  dropValue: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  onOpenClick: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  setRequestType: PropTypes.func.isRequired,
};

export default AllBookings;
