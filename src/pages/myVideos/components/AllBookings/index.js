import React from 'react';
import PropTypes from 'prop-types';
import { SectionHead, EmptyText } from 'styles/CommonStyled';
import { options } from '../../constants';
import { FanGeneralList, LatestCard } from '../../../../components/ListCards';
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
      {props.bookingsList.data.map(bookItem => (
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
      {props.recentActivity.loading && <Loader />}
      {
        props.recentActivity.activityList.map((activity) => {
          return activity.activity_type === 'video' ?
            <FanGeneralList onUpdateData={props.updateMyVideosList} key={activity.id} data={activity.request} classes={{root: 'list-item'}} />
          :
            <LatestCard activity={activity} key={activity.id} type={activity.activity_type} />
        })
      }
    </React.Fragment>
  );
};

AllBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  dropValue: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  onOpenClick: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  recentActivity: PropTypes.object.isRequired,
  setRequestType: PropTypes.func.isRequired,
  updateMyVideosList: PropTypes.func.isRequired,
};

export default AllBookings;
