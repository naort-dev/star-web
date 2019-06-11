import React from 'react';
import { options } from '../../constants';
import { GeneralList } from '../../../../components/ListCards';
import Dropdown from '../../../../components/Dropdown';
import CancelledStyled from './styled';

const CancelledBookings = (props) => {
  return (
    <CancelledStyled>
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
      {
        props.bookingsList.data.map(bookItem => (
          <GeneralList
            expiration={props.config.request_expiration_days}
            // onPrimaryClick={props.onOpenClick(bookItem.booking_id)}
            key={bookItem.booking_id}
            data={bookItem}
            isOpen={false}
          />
        ))
      }
    </CancelledStyled>
  )
}

export default CancelledBookings;
