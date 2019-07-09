import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { Layout, Heading, Content, SetPriceWrapper } from  './styled';
import Checkbox from '../../../../components/Checkbox';
import { BackArrow } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import { TextInput } from '../../../TextField';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings';
import { iosPriceFinder, numberToCommaFormatter, commaToNumberFormatter } from '../../../../utils/dataformatter' 

const SetPriceAndCharity = props => {
  const celebrityDetails = props.userDetails.settings_celebrityDetails;
  const [priceCharityData, setpriceCharityData] = useState({
          price:{ value: celebrityDetails.rate ? celebrityDetails.rate : '', isValid: false, message: '' },
          charityName: celebrityDetails.charity ? celebrityDetails.charity : '',
          charityWebsite: celebrityDetails.website ? celebrityDetails.website : '',
          bookingsLimit: celebrityDetails.weekly_limits ? celebrityDetails.weekly_limits : '',
          addToProfile: celebrityDetails.charity_visibility ? celebrityDetails.charity_visibility : false,
  });
  const [confirmPrice, setconfirmPrice] = useState(false);
  const [enableCharity, setenableCharity] = useState(!isEmpty(celebrityDetails.charity));
  const [modifyDetails, setmodifyDetails] = useState(!isEmpty(celebrityDetails.charity));
  const [showCharity, setShowCharity] = useState(false);
  const saveFormEntries = (event, type) => {
    const pattern = /(?=.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{1,2})?$/;
    const dollarpattern = /^\$.*$/;
    const value = dollarpattern.test(event.target.value) ? event.target.value.substr(1) : event.target.value;
    
    if(type==='price' && value !== '') {
      setpriceCharityData({
        ...priceCharityData,
        [type]: {
          ...priceCharityData.type,
          value: pattern.test(commaToNumberFormatter(value)) ? numberToCommaFormatter(commaToNumberFormatter(value)) : priceCharityData.price.value,
        },
      });
    } else if (type==='price' && value  === '') {
      setpriceCharityData({
        ...priceCharityData,
        [type]: {
          ...priceCharityData.type,
          value
        },
      });

    } else {
      setpriceCharityData({
        ...priceCharityData,
        [type]: event.target.value
    });
  }
  };
  const convertedApplePrice = (actualPrice, inAppPriceList) => {
    const priceText = actualPrice < 1000 || !actualPrice ? `In the iOS app we will convert your price to the nearest supported Apple price (for example, $25 will be $24.99 in the iOS app).`
    : 'Please tell your fans that they will not be able to book you using the iOS app because Apple does not support purchases over $999.99. They will still be able to book you using their browser (mobile or desktop) or the Android app.';
  return priceText
  }
  const toggleCharity = (checkValue) => {
      setenableCharity(checkValue)
  };
  const toggleAddToProfile = (checkValue) => {
      setpriceCharityData({
        ...priceCharityData,
        addToProfile: checkValue,
      });
  };
  const displayCharityDetails = () => {
    setShowCharity(true);
  }
  const checkPriceRequired = () => {
    const pattern = /(?=.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{1,2})?$/;
    const priceEmpty = !priceCharityData.price.value
    if (priceEmpty) {
      const priceMsg = "Price can't be blank";
      setpriceCharityData({
        ...priceCharityData,
        price: {
          ...priceCharityData.price,
          message: priceMsg
        }
      });
      return false;
    }
    if (!pattern.test(commaToNumberFormatter(priceCharityData.price.value))) {
      setpriceCharityData({
        ...priceCharityData,
        price: {
          ...priceCharityData.price,
          message: 'Price must be a number'
        }
      });
      return false;
    }
    setpriceCharityData({
      ...priceCharityData,
      price: {
        ...priceCharityData.price,
        message: '',
        isValid: true
      },
    });
    return true;
  };

  const backArrowClickHandler = () => {
    if((enableCharity && !modifyDetails) || showCharity) {
      !modifyDetails ? setenableCharity(false): setShowCharity(false);
    } else if(confirmPrice) {
      setconfirmPrice(false);
    } else {
      props.goBack();
    }
  }
  const saveCharityDetails = () => {
    setmodifyDetails(true);
    setShowCharity(false);
  };
  const saveSetPriceAndCharity = () => {
    const priceValue = commaToNumberFormatter(priceCharityData.price.value);
    if (checkPriceRequired()) {
      if (parseInt(priceValue) < 500 || confirmPrice ) {
        const finalUserDetails = {
          celebrity_details: {
            rate: priceCharityData.price.value,
            weekly_limits: priceCharityData.bookingsLimit ? priceCharityData.bookingsLimit : 0 ,
            charity: priceCharityData.charityName,
            website: priceCharityData.charityWebsite,
            charity_visibility: priceCharityData.addToProfile,
          },
          user_details: {},
        };
        props.updateUserDetails(props.userDetails.settings_userDetails.id, finalUserDetails);
      } else {
        setconfirmPrice(true);
      }
    }
    
  }
  const renderContent = () => {
    if((enableCharity && !modifyDetails) || showCharity) {
      return(
        <React.Fragment>
          <Heading>Charity/Non-Profit Organizations</Heading>
          <Content>
          <section className= "price-wrapper">
            <SetPriceWrapper.Description>
              Charity Name
            </SetPriceWrapper.Description>
            <TextInput 
              value={priceCharityData.charityName}
              placeholder="Who are you supporting?"
              fullWidth
              // inputRef={charityname}
              onChange={(event)=>saveFormEntries(event,'charityName')}
            />
          </section>
          <SetPriceWrapper.Description>
            Charity Website (optional)
          </SetPriceWrapper.Description>
          <TextInput 
            value={priceCharityData.charityWebsite}
            placeholder="What is the website for the charity?"
            fullWidth
            // inputRef={website}
            onChange={(event)=>saveFormEntries(event,'charityWebsite')}
          />
          <Content.CharityCheckbox>
            <Checkbox
              onChange={toggleAddToProfile}
              checked={priceCharityData.addToProfile}
              disabled={isEmpty(priceCharityData.charityName)}
            />
            <span className="check-text">
            Add this to my profile
            </span>
          </Content.CharityCheckbox>
          </Content>
          <Layout.ButtonWrapper className="align-center">
          <PrimaryButton className='save-button'onClick={saveCharityDetails} >
            Save             
          </PrimaryButton>
        </Layout.ButtonWrapper>
        </React.Fragment>
      );
    }
    return(
      <React.Fragment>
        <Heading>{confirmPrice ? props.confirmationTitle : props.title}</Heading>
        <Content>
          <SetPriceWrapper.Description error={priceCharityData.price.message}>
          {(priceCharityData.price.message) ?
            priceCharityData.price.message : confirmPrice ? props.confirmDescription : props.description}
          </SetPriceWrapper.Description>
          <SetPriceWrapper.WrapsInput>
            <TextInput
              error={!!priceCharityData.price.message}
              placeholder={'Price'}
              type="text"
              name="price"
              value={`${priceCharityData.price.value !== '' ? '$':''}${priceCharityData.price.value}`}
              onChange={(event) => saveFormEntries(event, "price")}
            />
          </SetPriceWrapper.WrapsInput>
          <React.Fragment>
          {confirmPrice ? null :                                              
            <SetPriceWrapper.Label>
            { priceCharityData.price.value && priceCharityData.price.value > 0 && priceCharityData.price.value < 10000 ?
              (<React.Fragment>Converted Apple Price: <b>${iosPriceFinder(priceCharityData.price.value, props.inAppPriceList)}</b>. &nbsp;</React.Fragment> )  : ''
            }
              {convertedApplePrice(commaToNumberFormatter(priceCharityData.price.value), props.inAppPriceList)}
            </SetPriceWrapper.Label>
          }
          { !confirmPrice &&
          <React.Fragment>
          <SetPriceWrapper.Description>
          How many bookings can you handle at once?
          </SetPriceWrapper.Description>
          <TextInput 
            value={priceCharityData.bookingsLimit}
            fullWidth
            defaultValue={25}
            onChange={(event)=>saveFormEntries(event,'bookingsLimit')}
          />
          <Content.CharityCheckbox>
            <Checkbox
              onChange={toggleCharity}
              checked={enableCharity}
            />
            <span className="check-text"> 
            I’m here to support a charity
            </span>
          </Content.CharityCheckbox>
          </React.Fragment>
          }

          { modifyDetails && !confirmPrice &&
            <Content.ModifyDetails onClick={displayCharityDetails}> Modify Details</Content.ModifyDetails>
          }
        </React.Fragment> 
        </Content>
        <Layout.ButtonWrapper className="align-center">
          <PrimaryButton className='save-button'onClick={saveSetPriceAndCharity} >
          {confirmPrice ? 'Yes, I’m worth it!' : 'Save' }
          </PrimaryButton>
        </Layout.ButtonWrapper>
      </React.Fragment>
    );
  };

  return(
    <Layout>
      <BackArrow className="leftArrow" onClick={backArrowClickHandler}/>
      {renderContent()}
    </Layout>
  );
}

const mapStateToProps = (state)=> ({
  userDetails: state.userDetails,
  inAppPriceList: state.config.data.in_app_pricing,
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
