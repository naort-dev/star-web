import React from 'react';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import Checkout from './checkout';
import {
  createCharge,
  paymentFetchSourceStart,
  paymentFetchSourceEnd,
  fetchSourceList,
  modifySourceList,
} from '../../store/shared/actions/processPayments';
import { PaymentFooterController } from '../PaymentFooterController';
import PaymentStyled from './styled';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';
import { cardTypeImageFinder } from '../../utils/itemImageFinder';

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
            this.props.modifySourceList(payload.source.id, this.state.customerId, true); // Add Card to list
            this.chargeCreator(payload.source.id, this.state.customerId);
          }
        });
    }
  }
  chargeCreator = (tokenId, customerId) => {
    this.props.createCharge(this.props.requestDetails.id, this.props.rate, tokenId, customerId);
  }
  removeCard = (source) => {
    this.props.modifySourceList(source, this.state.customerId, false);
  }
  renderCardList = () => {
    return (
      <PaymentStyled.cardListWrapper>
        <Scrollbars
          autoHeight
          autoHeightMax={350}
          autoHide
        >
          {
            Object.keys(this.props.sourceList).map(index => (
              <PaymentStyled.cardListItem
                key={index}
              >
                <PaymentStyled.cardItemDetails
                  selected={this.state.selectedCardIndex === index}
                  onClick={() => this.setState({ selectedCardIndex: index })}
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
    return (
      <PaymentStyled.wrapper>
        <PaymentStyled.ComponentWrapperScroll
          autoHide
          renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
        >
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
          <PaymentStyled.StripeLogoWrapper>
            <img alt="stripe logo" src="assets/images/powered_by_stripe.svg" />
          </PaymentStyled.StripeLogoWrapper>
        </PaymentStyled.ComponentWrapperScroll>
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
  createCharge: (starsonaId, amount, tokenId, customerId) => dispatch((createCharge(starsonaId, amount, tokenId, customerId))),
  paymentFetchSourceStart: () => dispatch(paymentFetchSourceStart()),
  paymentFetchSourceEnd: () => dispatch(paymentFetchSourceEnd()),
  fetchSourceList: () => dispatch(fetchSourceList()),
  modifySourceList: (source, customer, action) => dispatch(modifySourceList(source, customer, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckout);