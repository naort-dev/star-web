import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, FlexBoxSBC, SubHeader, Heading } from './styled';
import UserCard from './UserCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';

const Payment = (props) => {
  const CardList = [
    { id: '2342', number: '**** **** **** 4422' },
    { id: '2342', number: '**** **** **** 5555' },
  ];

  const [isNewCard, cardSelection] = useState(false);

  const contentSwitchCallback = (value) => {
    cardSelection(value);
  };

  const backArrowClick = () => {
    if (CardList.length === 0) {
      props.backArrowHandler();
    } else if (isNewCard) {
      cardSelection(false);
    } else if (!isNewCard && CardList.length > 0) {
      props.backArrowHandler();
    }
  };

  const paymentSuccess = () => {
    debugger;
  };

  const handleBooking = (res) => {
    props.createCharge(
      props.request.id,
      150,
      res.token.card.id,
      paymentSuccess,
    );
  };

  return (
    <React.Fragment>
      <SubHeader>
        <FlexBoxSBC>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="arrow"
            onClick={backArrowClick}
          />
          <Heading>Payment Details</Heading>
          <FontAwesomeIcon icon={faTimes} onClick={props.closeHandler} />
        </FlexBoxSBC>
      </SubHeader>
      <Scrollbars className="customScroll">
        <Layout>
          <UserCard
            {...props}
            CardList={CardList}
            contentSwitchCallback={contentSwitchCallback}
            isNewCard={isNewCard}
            handleBooking={handleBooking}
          />
        </Layout>
      </Scrollbars>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  request: state.paymentDetails.requestDetails,
});

export default connect(
  mapStateToProps,
  null,
)(Payment);
