import React from 'react';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import Checkout from './checkout';
import Loader from '../Loader';
import {
  createCharge,
  paymentFetchSourceStart,
  paymentFetchSourceEnd,
  fetchSourceList,
} from '../../store/shared/actions/processPayments';
import { PaymentFooterController } from '../PaymentFooterController';
import PaymentStyled from './styled';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '',
      stripe: null,
      cardSelection: false,
      selectedCardIndex: '0',
      selectedSourceId: null,
    };
  }
  componentWillMount() {
    this.getEphemeralKey();
    this.props.fetchSourceList();
  }
  componentDidUpdate(prevProps) {
    if (this.props.paymentStatus) {
      this.props.exitPaymentMode();
    }
  }

  getEphemeralKey = () => {
    fetchEphemeralKey(this.props.authToken)
      .then((resp) => {
        const customerId = resp.ephemeralKey.associated_objects && resp.ephemeralKey.associated_objects[0] ? resp.ephemeralKey.associated_objects[0].id : null;
        this.setState({ customerId });
      });
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
            this.chargeCreator(payload.source.id);
          }
        });
    }
  }
  chargeCreator = (tokenId) => {
    this.props.createCharge(this.props.requestDetails.id, this.props.rate, tokenId);
  }
  removeCard = () => {

  }
  renderCardList = () => {
    return (
      <PaymentStyled.cardListWrapper>
        {
          Object.keys(this.props.sourceList).map(index => (
            <PaymentStyled.cardListItem
              key={index}
            >
              <PaymentStyled.cardItemDetails
                selected={this.state.selectedCardIndex === index}
                onClick={() => this.setState({ selectedCardIndex: index })}
              >
                **** **** **** {this.props.sourceList[index].last4}
              </PaymentStyled.cardItemDetails>
              {
                Object.keys(this.props.sourceList).length > 1 &&
                  <PaymentStyled.removeCardListItem
                    selected={this.state.selectedCardIndex === index}
                    onClick={event => this.removeCard(event)}
                  />
              }
            </PaymentStyled.cardListItem>
          ))
        }
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
    return (
      <PaymentStyled.wrapper>
        {
          this.props.loading ?
            <PaymentStyled.loaderWrapper>
              <Loader />
            </PaymentStyled.loaderWrapper>
          : null
        }
        <PaymentStyled.Heading>Review your Purchase</PaymentStyled.Heading>
        <PaymentStyled.StarDetailsWrapper>
          <PaymentStyled.StarNameWrapper>
            <PaymentStyled.SubTitle>
              Starsona booking for
            </PaymentStyled.SubTitle>
            {this.props.fullName}
          </PaymentStyled.StarNameWrapper>
          <PaymentStyled.StarPhoto 
            imageUrl={this.props.profilePhoto}
          />
        </PaymentStyled.StarDetailsWrapper>
        <PaymentStyled.OptionSelectionWrapper>
          {
            Object.keys(this.props.sourceList).length ?
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
          this.state.cardSelection ?
           this.renderCardList()
          : this.renderAddCard()
        }
        <PaymentStyled.PaymentController>
          <PaymentFooterController
            rate={this.props.rate}
            remainingBookings={this.props.remainingBookings}
            buttonName="Pay"
            handleBooking={this.handleBooking}
          />
        </PaymentStyled.PaymentController>
      </PaymentStyled.wrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.paymentDetails.loading,
  requestDetails: state.paymentDetails.requestDetails,
  paymentStatus: state.paymentDetails.paymentStatus,
  sourceList: state.paymentDetails.sourceList,
});

const mapDispatchToProps = dispatch => ({
  createCharge: (starsonaId, amount, tokenId) => dispatch((createCharge(starsonaId, amount, tokenId))),
  paymentFetchSourceStart: () => dispatch(paymentFetchSourceStart()),
  paymentFetchSourceEnd: () => dispatch(paymentFetchSourceEnd()),
  fetchSourceList: () => dispatch(fetchSourceList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckout);
