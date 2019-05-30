import React from 'react';
import { BackArrow } from 'styles/CommonStyled';
import Dropdown from '../../components/Dropdown';
import { GeneralList } from '../../components/ListCards';
import BookingsStyled from './styled';

class Bookings extends React.Component {
  state = {

  }
  render() {
    return (
      <BookingsStyled>
        <Dropdown
          secondary
          options={[{ title: 'Featured', id: 0 }]}
          labelKey="title"
          valueKey="id"
          onChange={this.handleCategoryChange}
          placeHolder="Select a booking type"
        />
        {/* <BackArrow className="arrow" />
        <BookingsStyled.Header>My Requests</BookingsStyled.Header> */}
        <GeneralList />
        <GeneralList />
      </BookingsStyled>
    )
  }
}

export default Bookings;
