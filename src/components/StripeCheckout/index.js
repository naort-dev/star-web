import React from 'react';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import AlertView from '../../components/AlertView';
import Loader from '../../components/Loader';
import Popup from '../../components/Popup';
import { requestTypes } from '../../constants/requestTypes';
import Checkout from './checkout';
import {
  createCharge,
  tipPayment,
  paymentFetchSourceStart,
  paymentFetchSourceEnd,
  fetchSourceList,
  modifySourceList,
  resetPaymentsError,
} from '../../store/shared/actions/processPayments';
import PaymentStyled from './styled';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';
import { cardTypeImageFinder } from '../../utils/itemImageFinder';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '',
      dataLoading: false,
      stripe: null,
      cardSelection: false,
      selectedCardIndex: '0',
      selectedSourceId: null,
    };
  }
  componentWillMount() {
    this.getEphemeralKey();
    if (Object.keys(this.props.sourceList).length) {
      this.setState({ cardSelection: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.props.sourceList).length !== Object.keys(nextProps.sourceList).length && Object.keys(nextProps.sourceList).length) {
      this.setState({ cardSelection: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.paymentStatus) {
      this.props.exitPaymentMode();
    }
  }

  getEphemeralKey = () => {
    this.setState({ dataLoading: true });
    fetchEphemeralKey()
      .then((resp) => {
        if (resp.success) {
          const customerId = resp.data.ephemeralKey.associated_objects && resp.data.ephemeralKey.associated_objects[0] ? resp.data.ephemeralKey.associated_objects[0].id : null;
          this.props.fetchSourceList();
          this.setState({ customerId, dataLoading: false });
        }
      })
      .catch(() => {
        this.setState({ dataLoading: false });
      })
  }
  setStripe = (stripe) => {
    this.setState({ stripe });
  }
  toggleCardSelection = (event, value) => {
    this.setState({ cardSelection: value });
  }
  handleBooking = () => {
    if (this.state.cardSelection && Object.keys(this.props.sourceList).length) {
      const sourceId = this.state.selectedSourceId !== null ? this.state.selectedSourceId : this.props.sourceList['0'].id;
      this.chargeCreator(sourceId);
    } else if (!this.state.cardSelection && this.state.stripe) {
      this.props.paymentFetchSourceStart();
      this.state.stripe
        .createSource({
          type: 'card',
        })
        .then((payload) => {
          this.props.paymentFetchSourceEnd();
          if (payload.source) {
            this.props.modifySourceList(payload.source.id, this.state.customerId, true); // Add Card to list
            this.chargeCreator(payload.source.id, this.state.customerId);
          }
        });
    }
  }
  chargeCreator = (tokenId, customerId) => {
    const { paymentType, rate, requestDetails, paymentId } = this.props;
    if (paymentType === 'tip') {
      this.props.tipPayment(paymentId, rate, tokenId);
    } else {
      this.props.createCharge(requestDetails.id, rate, tokenId, customerId);
    }
  }
  removeCard = (source) => {
    this.props.modifySourceList(source, this.state.customerId, false);
  }
  renderCardList = () => {
    return (
      <PaymentStyled.cardListWrapper>
        <Scrollbars
          autoHeight
          autoHeightMax={250}
        >
          {
            Object.keys(this.props.sourceList).map(index => (
              <PaymentStyled.cardListItem
                key={index}
              >
                <PaymentStyled.cardItemDetails
                  selected={this.state.selectedCardIndex === index}
                  onClick={() => this.setState({ selectedCardIndex: index, selectedSourceId: this.props.sourceList[index].id })}
                >
                  <PaymentStyled.CardTypeIcon cardImage={cardTypeImageFinder(this.props.sourceList[index].brand)} />
                  <PaymentStyled.CardNumber>
                    **** **** **** {this.props.sourceList[index].last4}
                  </PaymentStyled.CardNumber>
                </PaymentStyled.cardItemDetails>
                {
                  Object.keys(this.props.sourceList).length > 1 &&
                    <PaymentStyled.removeCardListItem
                      selected={this.state.selectedCardIndex === index}
                      onClick={() => this.removeCard(this.props.sourceList[index].id)}
                    />
                }
              </PaymentStyled.cardListItem>
            ))
          }
        </Scrollbars>
      </PaymentStyled.cardListWrapper>
    );
  }
  renderAddCard = () => (
    <Elements>
      <Checkout
        handleBooking={this.handleBooking}
        chargeCreator={this.chargeCreator}
        setStripe={this.setStripe}
      />
    </Elements>
  )
  render() {
    const { error, loading, profilePhoto, customHeading, fullName, requestType, rate, sourceList } = this.props;
    const { dataLoading } = this.state;
    return (
      <PaymentStyled.wrapper>
        {
          error ?
            <Popup
              smallPopup
              closePopUp={this.props.resetPaymentsError}
            >
              <AlertView
                message={error.message.split(':')[1]}
                closePopup={this.props.resetPaymentsError}
              />
            </Popup>
          : null
        }
        {
          (loading || dataLoading) &&
            <PaymentStyled.LoaderWrapper>
              <Loader />
            </PaymentStyled.LoaderWrapper>
        }
        <PaymentStyled.Heading>Review your Purchase</PaymentStyled.Heading>
        <PaymentStyled.StarDetailsWrapper>
          <PaymentStyled.StarNameWrapper>
            <PaymentStyled.StarPhoto
              imageUrl={profilePhoto}
            />
            <PaymentStyled.RequestDetails>
              <PaymentStyled.SubTitle>
                { customHeading ? customHeading : 'Starsona booking' }
              </PaymentStyled.SubTitle>
              {fullName}
              {
                requestType ?
                  <PaymentStyled.RequestType>
                    {requestTypes[requestType]}
                  </PaymentStyled.RequestType>
                : null
              }
            </PaymentStyled.RequestDetails>
          </PaymentStyled.StarNameWrapper>
          <PaymentStyled.BookingRate>
            ${rate}
          </PaymentStyled.BookingRate>
        </PaymentStyled.StarDetailsWrapper>
        <PaymentStyled.OptionSelectionWrapper>
          {
            Object.keys(sourceList).length ?
              <PaymentStyled.OptionSelector>
                <input
                  id="card-select"
                  name="card-selection"
                  type="radio"
                  checked={this.state.cardSelection}
                  onChange={event => this.toggleCardSelection(event, true)}
                />
                <PaymentStyled.OptionLabel
                  htmlFor="card-select"
                >
                  Select cards
                </PaymentStyled.OptionLabel>
              </PaymentStyled.OptionSelector>
            : null
          }
          {
            this.state.cardSelection && this.renderCardList()
          }
          <PaymentStyled.OptionSelector>
            <input
              id="add-card"
              name="card-selection"
              type="radio"
              checked={!this.state.cardSelection}
              onChange={event => this.toggleCardSelection(event, false)}
            />
            <PaymentStyled.OptionLabel
              htmlFor="add-card"
            >
              Pay using new card
            </PaymentStyled.OptionLabel>
          </PaymentStyled.OptionSelector>
        </PaymentStyled.OptionSelectionWrapper>
        {
          !this.state.cardSelection && this.renderAddCard()
        }
        <PaymentStyled.PaymentControllerWrapper>
          <PaymentStyled.ContinueButton onClick={this.handleBooking}>
             Confirm Booking  -  ${rate}
          </PaymentStyled.ContinueButton>
          <PaymentStyled.StripeLogoWrapper>
            <img alt="stripe logo" src="assets/images/powered_by_stripe.svg" />
          </PaymentStyled.StripeLogoWrapper>
        </PaymentStyled.PaymentControllerWrapper>
      </PaymentStyled.wrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.paymentDetails.loading,
  requestDetails: state.paymentDetails.requestDetails,
  error: state.paymentDetails.error,
  paymentStatus: state.paymentDetails.paymentStatus,
  sourceList: state.paymentDetails.sourceList,
});

const mapDispatchToProps = dispatch => ({
  createCharge: (starsonaId, amount, tokenId) => dispatch((createCharge(starsonaId, amount, tokenId))),
  tipPayment: (booking, amount, tokenId) => dispatch(tipPayment(booking, amount, tokenId)),
  paymentFetchSourceStart: () => dispatch(paymentFetchSourceStart()),
  paymentFetchSourceEnd: () => dispatch(paymentFetchSourceEnd()),
  fetchSourceList: () => dispatch(fetchSourceList()),
  resetPaymentsError: () => dispatch(resetPaymentsError()),
  modifySourceList: (source, customer, action) => dispatch(modifySourceList(source, customer, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckout);
