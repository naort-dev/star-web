import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom';
import SubHeader from 'components/SubHeader';
import InnerSidebar from 'components/InnerSidebar';
import AccountInfo from 'components/SettingsComponents/AccountInfo';
import Password from 'components/SettingsComponents/Password';
import Payment from 'components/SettingsComponents/Payment';
import Notification from 'components/SettingsComponents/Notification';
import Modal from 'components/Modal/Modal';
import { useMedia } from 'utils/domUtils';
import { CloseButton } from 'styles/CommonStyled';
import { generateOtp, validateOtp } from 'services/otpGenerate';
import GetPhoneNumber from 'components/GetPhoneNumber';
import { Layout, ContentWrapper, OtpWrap } from './styled';
import { Links } from './Constants';

const Settings = props => {
  const isModalView = useMedia('(min-width:832px) and (max-width: 1279px)');
  const webView = useMedia('(min-width: 1280px)');
  const [redirect, setRedirect] = useState(false);
  const [phoneData, setPhoneData] = useState({
    number: '',
    countryCode: '',
    trigger: false,
    country: '',
    error: false,
  });
  const goBack = () => {
    props.history.goBack();
  };

  const getNotifications = () => {
    const notifications = [
      {
        key: 'celebrity_starsona_message',
        value:
          props.userDetails.notification_settings.celebrity_starsona_message,
        mainText: 'Messages from Starsona',
        subText:
          'These are communications regarding corporate updates such as updates to terms or privacy policy, etc.',
      },
      {
        key: 'celebrity_account_updates',
        value:
          props.userDetails.notification_settings.celebrity_account_updates,
        mainText: 'Account updates',
        subText:
          'Messages when changes to your specific account information are made.',
      },
      {
        key: 'celebrity_starsona_request',
        value:
          props.userDetails.notification_settings.celebrity_starsona_request,
        mainText: 'My Starsona updates',
        subText:
          'Messages regarding bookings (e.g. new requests, reminders, reactions).',
      },
    ];
    return notifications;
  };

  const handleCheck = (notification, checked) => {
    props.updateNotification({
      [notification.key]: checked,
    });
  };

  const handleAccountSave = userDetails => {
    props.updateUserDetails(props.userDetails.id, {
      celebrity_details: {},
      user_details: userDetails,
    });
  };

  const passwordUpdate = passwordData => {
    props.changePassword(passwordData);
  };

  const modalClose = () => {
    props.history.push('/manage/settings');
  };

  const getComponent = component => {
    if (isModalView) {
      return (
        <Modal open onClose={modalClose}>
          <CloseButton onClick={modalClose}></CloseButton>
          {component}
        </Modal>
      );
    }
    return component;
  };

  const linkStatus = link => {
    switch (link.selectedName) {
      case 'Password':
        if (props.celbDetails.has_password) {
          const temp = { ...link };
          temp.completed = true;
          return temp;
        }
        break;

      case 'Payment':
        if (!isEmpty(props.stripeCard)) {
          const temp = { ...link };
          temp.completed = true;
          return temp;
        }
        break;
      case 'Notification':
        if (props.userDetails.notification_settings.is_viewed) {
          const temp = { ...link };
          temp.completed = true;
          return temp;
        }
        break;
      default:
        return link;
    }
    return link;
  };

  const generateOTP = (number, countryCode, country) => {
    props.loaderAction(true);
    generateOtp(number, countryCode)
      .then(resp => {
        if (resp.success) {
          setPhoneData({
            ...phoneData,
            number,
            countryCode,
            trigger: true,
            country,
            error: '',
          });
        }
        props.loaderAction(false);
      })
      .catch(error => {
        props.loaderAction(false);
      });
  };

  const validateOTP = (number, countryCode, country) => otp => {
    props.loaderAction(true);
    validateOtp(number, countryCode, otp, country)
      .then(resp => {
        if (resp.success) {
          setPhoneData({ ...phoneData, trigger: false, error: '' });
          props.userDetailsUpdateHandler({
            mobile_country_code: countryCode,
            mobile_number: number,
          });
          props.updateToast({
            value: true,
            message: 'Successfully updated',
            variant: 'success',
          });
        }
        props.loaderAction(false);
      })
      .catch(err => {
        setPhoneData({ ...phoneData, error: err.response.data.error.message });
        props.loaderAction(false);
      });
  };

  const getLinks = () => {
    return Links.map(link => {
      return linkStatus(link);
    });
  };

  const resendOtp = () => {
    generateOTP(phoneData.number, phoneData.countryCode);
  };

  const triggerOtp = () => {
    setPhoneData({ ...phoneData, trigger: false, error: '' });
  };

  const getAccountScreen = childProps => {
    if (phoneData.trigger) {
      return (
        <OtpWrap>
          <GetPhoneNumber
            onBack={triggerOtp}
            onClose={triggerOtp}
            resendOtp={resendOtp}
            verifyOtp={validateOTP(
              phoneData.number,
              phoneData.countryCode,
              phoneData.country,
            )}
            last4={phoneData.number.replace(/\d(?=\d{4})/g, '*')}
            switched
            otptitle="Enter the verification code"
            otp_sub_title="Let's make sure it's really you. A 4-digit code has been sent to the phone ending in ******"
            otp_receive_code="Didn't Receive a code?"
            error={phoneData.error}
          />
        </OtpWrap>
      );
    }
    return getComponent(
      <AccountInfo
        {...childProps}
        {...props}
        generateOTP={generateOTP}
        validateOTP={validateOTP}
        handleAccountSave={handleAccountSave}
        mobHead="Account Info"
        webHead="Account Information"
        allowPhone
        labels={{
          firstNameLbl: 'First Name',
          lastNameLbl: 'Last Name',
          emailLbl: 'Email',
          emailHead: 'Email address',
          nameHead: 'Use your real name so we can pay you',
          phoneLabel: 'Phone Number',
          buttonLbl: 'Save',
        }}
      />,
    );
  };

  useEffect(() => {
    if (webView && props.history.location.pathname === '/manage/settings')
      setRedirect(true);
    else setRedirect(false);
  }, [webView]);

  if (redirect) return <Redirect to="/manage/settings/account-info" />;
  return (
    <Layout showMenu={props.history.location.pathname === '/manage/settings'}>
      <SubHeader
        heading={webView ? 'My Account Settings' : 'Account Settings'}
        onClick={goBack}
      />
      <ContentWrapper>
        <InnerSidebar links={getLinks()}></InnerSidebar>
        <Switch>
          <Route
            path="/manage/settings/account-info"
            render={childProps => getComponent(getAccountScreen(childProps))}
          />
          <Route
            path="/manage/settings/password"
            render={childProps =>
              getComponent(
                <Password
                  {...childProps}
                  {...props}
                  passwordUpdate={passwordUpdate}
                  mobHead="Update Password"
                  webHead="Update Password"
                  showPasswd
                  labels={{
                    password: 'Password',
                    confirmPasswd: 'Confirm Password',
                    hint:
                      'Passwords must be a minimum of 8 characters and include at least one special character like !?@#',
                    buttonLbl: 'Save',
                  }}
                />,
              )
            }
          />

          <Route
            path="/manage/settings/payment"
            render={childProps =>
              getComponent(
                <Payment
                  {...childProps}
                  stripeCard={props.stripeCard}
                  stripeUrl={props.stripeUrl}
                  dashboardURL={props.dashboardURL}
                  mobHead="Payment Account"
                  webHead="My Payment Account"
                  labels={{
                    btnWeb: 'Create Stripe Account',
                    btnMob: '+ Set up Stripe Account',
                    noteWeb:
                      'Set up your payment account so we can pay you for your videos and your referrals.',
                    noteMob:
                      'We want to get you paid as quickly as possible, so make sure you get your Stripe account setup.',
                  }}
                />,
              )
            }
          />

          <Route
            path="/manage/settings/notification"
            render={childProps =>
              getComponent(
                <Notification
                  {...childProps}
                  notifications={getNotifications()}
                  handleCheck={handleCheck}
                  updateNotificationViewed={props.updateNotificationViewed}
                  is_viewed={props.userDetails.notification_settings.is_viewed}
                  mobHead="Notifications"
                  webHead="Notifications"
                />,
              )
            }
          />
        </Switch>
      </ContentWrapper>
    </Layout>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  stripeCard: PropTypes.string,
  stripeUrl: PropTypes.string,
  userDetails: PropTypes.object.isRequired,
  updateNotification: PropTypes.func.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  dashboardURL: PropTypes.string,
  celbDetails: PropTypes.object.isRequired,
  updateNotificationViewed: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  userDetailsUpdateHandler: PropTypes.func.isRequired,
};
Settings.defaultProps = {
  stripeCard: '',
  stripeUrl: '',
  dashboardURL: '',
};

export default Settings;
