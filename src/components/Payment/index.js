import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, FlexBoxSBC, SubHeader, Heading } from './styled';
import UserCard from './UserCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';

const Payment = (props) => {
  const [isNewCard, cardSelection] = useState(false);

  useEffect(() => {
    props.fetchSourceList();
    props.fetchCelebDetails('starlord-8');
  }, []);

  const contentSwitchCallback = (value) => {
    cardSelection(value);
  };

  const backArrowClick = () => {
    if (Object.keys(props.sourceList).length === 0) {
      props.backArrowHandler();
    } else if (isNewCard) {
      cardSelection(false);
    } else if (!isNewCard && Object.keys(props.sourceList).length > 0) {
      props.backArrowHandler();
    }
  };

  const paymentSuccess = () => {
    props.paymentSuccessCallBack();
  };

  const handleBooking = (res) => {
    // props.createCharge(
    //   props.request.id,
    //   props.celebDetails.celebrityDetails.rate,
    //   res.token.id,
    //   paymentSuccess,
    // );

    props.createCharge(
      'wdLgzjbj',
      '10.00',
      'src_1DttbOECTOB5aCAKPTVhJ7gU',
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
        {Object.keys(props.celebDetails).length > 0 && (
          <Layout>
            {Object.keys(props.celebDetails.celebrityDetails).length > 0 &&
              Object.keys(props.celebDetails.userDetails).length > 0 && (
                <UserCard
                  {...props}
                  CardList={props.sourceList}
                  contentSwitchCallback={contentSwitchCallback}
                  isNewCard={isNewCard}
                  handleBooking={handleBooking}
                  paymentSuccessCallBack={props.paymentSuccessCallBack}
                  celebDetails={props.celebDetails}
                />
              )}
          </Layout>
        )}
      </Scrollbars>
    </React.Fragment>
  );
};

Payment.propTypes = {
  backArrowHandler: PropTypes.func.isRequired,
  paymentSuccessCallBack: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  closeHandler: PropTypes.func.isRequired,
  sourceList: PropTypes.object.isRequired,
  createCharge: PropTypes.func.isRequired,
  fetchSourceList: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
};
Payment.defaultProps = {};

const mapStateToProps = (state) => ({
  request: state.paymentDetails.requestDetails,
  sourceList: state.paymentDetails.sourceList,
  celebDetails: state.celebDetails,
});

export default connect(
  mapStateToProps,
  null,
)(Payment);
