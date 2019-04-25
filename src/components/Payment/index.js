import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';
import { Layout, FlexBoxSBC, SubHeader, Heading } from './styled';
import UserCard from './UserCard';
import {
  createCharge,
  fetchSourceList,
  modifySourceList,
} from '../../store/shared/actions/processPayments';
import { updateCustomerId } from '../../store/shared/actions/commonActions';

const Payment = props => {
  const [isNewCard, cardSelection] = useState(false);

  useEffect(() => {
    props.fetchSourceList();
    props.fetchCelebDetails('starlord-8');
  }, []);

  const contentSwitchCallback = value => {
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

  const handleBooking = source => {
    props.createCharge(
      props.request.id,
      //props.celebDetails.celebrityDetails.rate,
      '1.00',
      source.source.id,
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
                  loaderAction={props.loaderAction}
                  modifySourceList={props.modifySourceList}
                  updateCustomerId={props.updateCustomerId}
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
  modifySourceList: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateCustomerId: PropTypes.func.isRequired,
  celebDetails: PropTypes.object,
};
Payment.defaultProps = {
  celebDetails: {},
};

const mapStateToProps = state => ({
  request: state.paymentDetails.requestDetails,
  sourceList: state.paymentDetails.sourceList,
  celebDetails: state.celebDetails,
});

function mapDispatchToProps(dispatch) {
  return {
    createCharge: (starsonaId, amount, tokenId, callBack) => {
      dispatch(createCharge(starsonaId, amount, tokenId, callBack));
    },
    fetchSourceList: () => {
      dispatch(fetchSourceList());
    },
    modifySourceList: (source, customer, action, callBack) => {
      dispatch(modifySourceList(source, customer, action, callBack));
    },
    updateCustomerId: value => {
      dispatch(updateCustomerId(value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payment);
