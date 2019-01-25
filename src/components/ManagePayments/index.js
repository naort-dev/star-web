import React from 'react';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import Checkout from '../StripeCheckout/checkout';
import ManagePaymentsStyled from './styled';
import { cardTypeImageFinder } from '../../utils/itemImageFinder';
import Loader from '../Loader';
import Popup from '../Popup';
import {
  paymentFetchSourceStart,
  paymentFetchSourceEnd,
  fetchSourceList,
  modifySourceList,
} from '../../store/shared/actions/processPayments';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';

class ManagePayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '',
      stripe: null,
      cardSelection: true,
      showForm: true,
      selectedCardIndex: '0',
    };
  }
  componentWillMount() {
    fetchEphemeralKey(this.props.authToken)
      .then((resp) => {
        if (resp.success) {
          this.props.fetchSourceList();
        }
        const customerId = resp.data.ephemeralKey.associated_objects && resp.data.ephemeralKey.associated_objects[0] ? resp.data.ephemeralKey.associated_objects[0].id : null;
        this.setState({ customerId });
      });
  }
  setStripe = (stripe) => {
    this.setState({ stripe });
  }
  removeCard = (source) => {
    this.props.modifySourceList(source, this.state.customerId, false);
  }
  addCard = () => {
    this.props.paymentFetchSourceStart();
    this.state.stripe
      .createSource({
        type: 'card',
      })
      .then((payload) => {
        this.props.paymentFetchSourceEnd();
        if (payload.source) {
          this.setState({ showForm: false });
          this.props.modifySourceList(payload.source.id, this.state.customerId, true, () => {
            this.setState({ showForm: true });
            this.props.fetchSourceList();
          });
        }
      });
  }
  renderCardList = () => {
    return (
      <ManagePaymentsStyled.cardListWrapper>
        <Scrollbars
          autoHeight
          autoHeightMax={200}
        >
          {
            Object.keys(this.props.sourceList).map(index => (
              <ManagePaymentsStyled.cardListItem
                key={index}
              >
                <ManagePaymentsStyled.cardItemDetails
                  selected={this.state.selectedCardIndex === index}
                  onClick={() => this.setState({ selectedCardIndex: index })}
                >
                  <ManagePaymentsStyled.CardTypeIcon cardImage={cardTypeImageFinder(this.props.sourceList[index].brand)} />
                  <ManagePaymentsStyled.CardNumber>
                    **** **** **** {this.props.sourceList[index].last4}
                  </ManagePaymentsStyled.CardNumber>
                </ManagePaymentsStyled.cardItemDetails>
                {
                  Object.keys(this.props.sourceList).length > 1 &&
                    <ManagePaymentsStyled.removeCardListItem
                      selected={this.state.selectedCardIndex === index}
                      onClick={() => this.removeCard(this.props.sourceList[index].id)}
                    />
                }
              </ManagePaymentsStyled.cardListItem>
            ))
          }
        </Scrollbars>
      </ManagePaymentsStyled.cardListWrapper>
    );
  }
  render() {
    return (
      <Popup
        smallPopup
        height="80%"
        closePopUp={this.props.onClosePayments}
      >
        <ManagePaymentsStyled>
          {
            this.props.loading ?
              <Loader />
            : this.renderCardList()
          }
          {
            this.state.showForm ?
              <React.Fragment>
                <Elements>
                  <Checkout
                    handleBooking={this.addCard}
                    setStripe={this.setStripe}
                  />
                </Elements>
                <ManagePaymentsStyled.ButtonWrapper>
                  <ManagePaymentsStyled.AddCard
                    onClick={this.addCard}
                  >
                      Add Card
                  </ManagePaymentsStyled.AddCard>
                </ManagePaymentsStyled.ButtonWrapper>
              </React.Fragment>
            : null
          }
        </ManagePaymentsStyled>
      </Popup>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.paymentDetails.loading,
  authToken: state.session.auth_token.authentication_token,
  paymentStatus: state.paymentDetails.paymentStatus,
  sourceList: state.paymentDetails.sourceList,
});

const mapDispatchToProps = dispatch => ({
  paymentFetchSourceStart: () => dispatch(paymentFetchSourceStart()),
  paymentFetchSourceEnd: () => dispatch(paymentFetchSourceEnd()),
  fetchSourceList: () => dispatch(fetchSourceList()),
  modifySourceList: (source, customer, action, callback) => dispatch(modifySourceList(source, customer, action, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePayments);
