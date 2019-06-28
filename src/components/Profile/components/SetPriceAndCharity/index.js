import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Layout, Heading, Content, SetPriceWrapper } from  './styled';
import { BackArrow } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import { TextInput } from '../../../TextField';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings';
import { iosPriceFinder, numberToCommaFormatter, commaToNumberFormatter } from '../../../../utils/dataformatter' 

const SetPriceAndCharity = props => {

  // const [priceCharityData, setpriceCharityData] = useState({
  //         price:{ value: props.userDetails.settings_celibrityDetails.rate ? props.userDetails.settings_celibrityDetails.rate : '', isValid: false, message: '' },
  //         charity: {},
  //         bookingsLimit:''    
  // });
  const [confirmPrice, setconfirmPrice] = useState(false);

  const saveFormEntries = (event, type) => {
    const pattern = /(?=.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{1,2})?$/;
    const dollarpattern = /^\$.*$/;
    const value = dollarpattern.test(event.target.value) ? event.target.value.substr(1) : event.target.value;
    
    if(type==='price' && value !== '') {
      setpriceCharityData({
        [type]: {
          ...priceCharityData.type,
          value: pattern.test(commaToNumberFormatter(value)) ? numberToCommaFormatter(commaToNumberFormatter(value)) : priceCharityData.price.value,
        },
      });
    } else {
    this.setState({
      [type]: {
        ...priceCharityData.type,
        value: type === 'price' ? value : event.target.value
      },
    });
  }
  };
  const getInputValue = (socialLinkKey, substring) => {
      let value;
      socialLinks.filter(link => {
      if(link.social_link_key === socialLinkKey) {
        value = link.social_link_value.replace(substring,'');
      }
    });
    return value;
  }
  const saveSetPriceAndCharity = () => {
    const finalUserDetails = {
      celebrity_details: {},
      user_details: {
        social_links: socialLinks,
      },
    };
    props.updateUserDetails(props.userDetails.settings_userDetails.id, finalUserDetails);
  }
  return(
    <Layout>
      <BackArrow className="leftArrow" />
      <Heading>Set your price and limits</Heading>
      <Content>
      <Content.SubTitle>
        How much should your fans pay for you to create a video?
      </Content.SubTitle>
      {/* <SetPriceWrapper.Description error={this.state.price.message}>
            {(price.message) ?
              price.message : confirmPrice ? props.confirmDescription : props.description}
      </SetPriceWrapper.Description>
      <SetPriceWrapper.WrapsInput>
            <TextInput
              error={!!priceCharityData.price.message}
              placeholder={'Price'}
              type="text"
              name="price"
              value={`${priceCharityData.price.value !== '' ? '$':''}${priceCharityData.price.value}`}
              onChange={(event) => this.saveFormEntries(event, "price")}
            />
          </SetPriceWrapper.WrapsInput>
          {confirmPrice ? null :
            <SetPriceWrapper.Label>
            { priceCharityData.price.value && priceCharityData.price.value > 0 && priceCharityData.price.value < 10000 ?
              (<React.Fragment>Converted Apple Price: <b>${iosPriceFinder(priceCharityData.price.value, this.props.inAppPriceList)}</b>. &nbsp;</React.Fragment> )  : ''
            }
              {convertedApplePrice(commaToNumberFormatter(priceCharityData.price.value), this.props.inAppPriceList)}
            </SetPriceWrapper.Label>
          } */}
      </Content>
      <Layout.ButtonWrapper className="align-center">
          <PrimaryButton className='save-button'onClick={saveSetPriceAndCharity} >
            Save             
          </PrimaryButton>
        </Layout.ButtonWrapper>

    </Layout>
  );
}

const mapStateToProps = (state)=> ({
  userDetails: state.userDetails,
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  };
}

const SetPriceAndCharityRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetPriceAndCharity);
export { SetPriceAndCharityRoot };