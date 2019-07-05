import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { CloseButton } from 'styles/CommonStyled';
import RequestFlowPopup from '../RequestFlowPopup';
import OrderDetails from '../OrderDetails';
import { requestTypes } from '../../constants/requestTypes';
import StarView from './components/StarView';
import Payment from '../Payment';
import FanView from './components/FanView';
import BookingTitle from '../BookingTitle';
import ModalHeader from '../ModalHeader';

import Loader from '../Loader';
import SuccessScreen from '../SuccessScreen';
import { getRequestDetails } from '../../services/request';
import { celebCompletedStatusList } from '../../constants/requestStatusList';
import { updateToast, loaderAction } from '../../store/shared/actions/commonActions';
import { fetchActivitiesList, resetActivitiesList } from '../../store/shared/actions/getActivities'
import { toggleBookingModal, toggleContactSupport } from '../../store/shared/actions/toggleModals';
import BookingStyled from './styled';

const BookingCard = (props) => {

  const [showDetails, toggleDetails] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showPaymentSuccess, togglePaymentSuccess] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const closeModal = () => {
    props.toggleBookingModal(false)
  }

  const setDetails = (state) => () => {
    toggleDetails(state);
  }

  useEffect(() => {
    if (props.bookingModal.requestId) {
      getRequestDetails(props.bookingModal.requestId)
        .then((requestDetails) => {
          const newRequestDetails = requestDetails.success && requestDetails.data && requestDetails.data.stargramz_response
          const validRequestDetails = newRequestDetails && celebCompletedStatusList.indexOf(newRequestDetails.request_status) >= 0 ? true : false;
          if (validRequestDetails) {
            setRequestData(requestDetails.data.stargramz_response);
          } else {
            closeModal();
          }
        })
    }
  }, [props.bookingModal.requestId]);

  const resetPaymentDetails = () => {
    setPaymentDetails(null);
  }

  const changePaymentSuccess = (state) => () => {
    togglePaymentSuccess(state);
    resetPaymentDetails();
  }

  const updateRequestData = (newData) => {
    setRequestData(newData)
  }

  const onFanCompleteAction = (type, data) => {
    const newRequestData = { ...requestData }
    if (type === 'tip') {
      setPaymentDetails({
        celebDetails: {
          rate: data,
          charity: requestData.charity,
        },
        userDetails: {
          avatar_photo: requestData.avatar_photo,
          first_name: requestData.celebrity,
          last_name: '',
        },
        type: 'Tip',
        tipRequestId: requestData.booking_id,
        paymentSuccessCallBack: changePaymentSuccess(true),
        loaderAction: props.loaderAction,
      })
    } else if (type === 'rating') {
      props.fetchActivitiesList(newRequestData.booking_id, 0, true);
      newRequestData.has_rating = true;
      setRequestData(newRequestData)
    } else if (type === 'reaction') {
      props.fetchActivitiesList(newRequestData.booking_id, 0, true);
      newRequestData.has_reaction = true;
      setRequestData(newRequestData);
    }
  }

  const renderHeading = () => {
    const requestDetails = requestData.request_details;
    if (requestTypes[requestData.request_type] === 'Q&A') {
      return (
        <React.Fragment>
            <strong>Question</strong>&nbsp;
            from&nbsp;
            <strong>
              {
                requestData.fan
              }
            </strong>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <strong>{requestData.occasion}</strong>&nbsp;
          {requestTypes[requestData.request_type] === 'Shout-out' ? 'shoutout' : 'announcement'} for&nbsp; 
          <strong>
            { requestDetails && requestDetails.is_myself !== undefined && !requestDetails.is_myself ? requestDetails.stargramto : requestData.fan_first_name }
          </strong>
          {
            requestDetails && requestDetails.is_myself !== undefined && !requestDetails.is_myself && requestDetails.stargramfrom !== '' ?
              <React.Fragment>
                &nbsp;from <strong>{requestDetails.stargramfrom}</strong>
              </React.Fragment>
            : null
          }
      </React.Fragment>
    )
  }

  const { starMode } = props.bookingModal;

  if (showPaymentSuccess) {
    return (
      <RequestFlowPopup
        noPadding
        disableClose
        closePopUp={changePaymentSuccess(false)}
      >
        <SuccessScreen
          title= 'High Five!'
          successMsg= 'Thanks for your tip!'
          note= 'Don’t forget to download your video and share it on social so your friends can see your shoutout!'
          btnLabel= 'Back to Video'
          closeHandler={changePaymentSuccess(false)}
          buttonHandler={changePaymentSuccess(false)}
        />
      </RequestFlowPopup>
    )
  }

  else if (paymentDetails) {
    return (
      <RequestFlowPopup
        noPadding
        disableClose
        closePopUp={resetPaymentDetails}
      >
        <Payment
          {...paymentDetails}
          editHandler={resetPaymentDetails}
          closeHandler={resetPaymentDetails}
          backArrowHandler={resetPaymentDetails}
        />
      </RequestFlowPopup>
    )
  }

  return (
    <RequestFlowPopup
      noPadding={!starMode}
      disableClose
      closePopUp={closeModal}
    >
      {
        !requestData ?
          <Loader />
        :
          <BookingStyled.Wrapper>
            {
              !starMode &&
                <ModalHeader
                  starImage={requestData.avatar_photo && requestData.avatar_photo.thumbnail_url}
                  closeHandler={closeModal}
                  customHeading={<BookingTitle secondary requestData={requestData} />}
                />
            }
            {
              starMode &&
                <React.Fragment>
                  <CloseButton className="close-btn" onClick={closeModal} />
                  <BookingStyled.HeaderText>
                    {renderHeading()}
                  </BookingStyled.HeaderText>
                </React.Fragment>
            }
            <BookingStyled showDetails={showDetails} starMode={starMode}>
              <BookingStyled.Booking showDetails={showDetails} starMode={starMode}>
                <Scrollbars>
                  {
                    starMode ?
                      <StarView
                        bookingData={requestData}
                        fetchActivitiesList={props.fetchActivitiesList}
                        resetActivitiesList={props.resetActivitiesList}
                        loaderAction={props.loaderAction}
                        updateToast={props.updateToast}
                        activitiesList={props.activitiesList}
                        modalData={props.bookingModal.data}
                        toggleDetails={setDetails}
                        closeModal={closeModal}
                      />
                    :
                      <FanView
                        bookingData={requestData}
                        fetchActivitiesList={props.fetchActivitiesList}
                        resetActivitiesList={props.resetActivitiesList}
                        toggleContactSupport={props.toggleContactSupport}
                        updateRequestData={updateRequestData}
                        loaderAction={props.loaderAction}
                        updateToast={props.updateToast}
                        onCompleteAction={onFanCompleteAction}
                        activitiesList={props.activitiesList}
                        modalData={props.bookingModal.data}
                        toggleDetails={setDetails}
                        closeModal={closeModal}
                      />
                  }
                </Scrollbars>              
              </BookingStyled.Booking>
              <BookingStyled.OrderWrapper showDetails={showDetails} starMode={starMode}>
                <Scrollbars>
                  <BookingStyled.Heading starMode={starMode}>
                    Order Details
                  </BookingStyled.Heading>
                  <OrderDetails
                    closeModal={closeModal}
                    disableHeader
                    starMode={starMode}
                    onPrimaryClick={setDetails(false)}
                    bookingData={requestData}
                  />
                </Scrollbars>
              </BookingStyled.OrderWrapper>
            </BookingStyled>
          </BookingStyled.Wrapper>
      }
    </RequestFlowPopup>
  )
}

BookingCard.propTypes = {
  toggleBookingModal: PropTypes.func.isRequired,
  bookingModal: PropTypes.object.isRequired,
  fetchActivitiesList: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  resetActivitiesList: PropTypes.func.isRequired,
  activitiesList: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  bookingModal: state.modals.bookingModal,
  activitiesList: state.activitiesList,
})

const mapDispatchToProps = dispatch => ({
  toggleBookingModal: (state, bookingData, starMode) => dispatch(toggleBookingModal(state, bookingData, starMode)),
  toggleContactSupport: state => dispatch(toggleContactSupport(state)),
  fetchActivitiesList: (bookingId, offset, refresh) => dispatch(fetchActivitiesList(bookingId, offset, refresh)),
  resetActivitiesList: () => dispatch(resetActivitiesList()),
  updateToast: errorObject => dispatch(updateToast(errorObject)),
  loaderAction: state => dispatch(loaderAction(state)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingCard);
