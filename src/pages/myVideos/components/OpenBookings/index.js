import React from 'react';
import PropTypes from 'prop-types';
import { EmptyText } from 'styles/CommonStyled';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import { FanGeneralList } from '../../../../components/ListCards';
import { options } from '../../constants';
import OpenStyled from './styled';

const OpenBookings = props => {

  return (
    <OpenStyled>
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
      {!props.bookingsList.loading && props.bookingsList.data.length === 0 && (
        <EmptyText>
          You currently do not have any open bookings.
        </EmptyText>
      )}
      {
        !props.bookingsList.loading &&
          <OpenStyled.BookingList>
            {
              props.bookingsList.data.map((bookItem) => (
                <FanGeneralList
                  expiration={props.config.request_expiration_days}
                  key={bookItem.id}
                  data={bookItem}
                  classes={{root: 'list-item'}}
                />
              ))
            }
          </OpenStyled.BookingList>
      }
      {props.bookingsList.loading && <Loader class="video-loader" />}
    </OpenStyled>
  );
};

OpenBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default OpenBookings
