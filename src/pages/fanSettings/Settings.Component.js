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
import ProfilePhoto from 'components/SettingsComponents/ProfilePhoto';
import Modal from 'components/Modal/Modal';
import { useMedia } from 'utils/domUtils';
import { CloseButton } from 'styles/CommonStyled';
import { awsImageUpload } from 'services/awsImageUpload';
import ProgressBar from 'components/ProgressBar';
import { Layout, ContentWrapper, RightContentWrap } from './styled';
import { Links } from './Constants';

const Settings = props => {
  const isModalView = useMedia('(min-width:832px) and (max-width: 1279px)');
  const webView = useMedia('(min-width: 1280px)');

  const [redirect, setRedirect] = useState(false);

  const goBack = () => {
    props.history.goBack();
  };

  const getNotifications = () => {
    const notifications = [
      {
        key: 'fan_starsona_messages',
        value: props.userDetails.notification_settings.fan_starsona_messages,
        mainText: 'Messages from Starsona',
        subText:
          'These are communications regarding corporate updates such as updates to terms or privacy policy, etc.',
      },
      {
        key: 'fan_account_updates',
        value: props.userDetails.notification_settings.fan_account_updates,
        mainText: 'Account updates',
        subText:
          'Messages when changes to your specific account information are made.',
      },
      {
        key: 'fan_starsona_videos',
        value: props.userDetails.notification_settings.fan_starsona_videos,
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
    props.history.push('/manage/profile');
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

  let completed = 2;
  const linkStatus = link => {
    switch (link.selectedName) {
      case 'profilePhoto':
        if (
          props.userDetails.avatar_photo &&
          props.userDetails.avatar_photo.image_url
        ) {
          const temp = { ...link };
          temp.completed = true;
          completed += 1;
          return temp;
        }
        break;

      case 'Payment':
        if (!isEmpty(props.stripeCard)) {
          const temp = { ...link };
          temp.completed = true;
          completed += 1;
          return temp;
        }
        break;
      case 'Notification':
        if (props.userDetails.notification_settings.is_viewed) {
          const temp = { ...link };
          temp.completed = true;
          completed += 1;
          return temp;
        }
        break;
      default:
        return link;
    }
    return link;
  };

  const getLinks = () => {
    return Links.map(link => {
      return linkStatus(link);
    });
  };

  const updateProfilePhoto = image => {
    props.loaderAction(true);
    awsImageUpload(image.croppedFile, 'jpeg')
      .then(resp => {
        const fileName = {
          images: [resp],
          avatar_photo: resp,
          featured_image: '',
        };
        props.loaderAction(false);
        props.updateProfilePhoto(fileName, true);
      })
      .catch(error => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: 'Failed to upload photo',
          variant: 'error',
        });
      });
  };

  const clickHere = () => {};

  useEffect(() => {
    if (webView && props.history.location.pathname === '/manage/profile')
      setRedirect(true);
    else setRedirect(false);
  }, [webView]);

  if (redirect) return <Redirect to="/manage/profile/profile-photo" />;

  return (
    <Layout showMenu={props.history.location.pathname === '/manage/profile'}>
      <SubHeader heading="My Profile" onClick={goBack} />
      <ContentWrapper>
        <InnerSidebar links={getLinks()}></InnerSidebar>

        <RightContentWrap>
          {props.history.location.pathname === '/manage/profile' ||
            (webView && (
              <React.Fragment>
                <p className="note-progress">
                  Complete your Starsona profile to maximize your bookings:
                </p>
                <section className="progress-bar">
                  <ProgressBar percentage={completed * 20}></ProgressBar>
                </section>
              </React.Fragment>
            ))}
          <Switch>
            <Route
              path="/manage/profile/profile-photo"
              render={childProps =>
                getComponent(
                  <ProfilePhoto
                    {...childProps}
                    {...props}
                    updateProfilePhoto={updateProfilePhoto}
                    mobHead="Photo"
                    webHead="Profile Photo"
                    profImg={
                      props.userDetails.avatar_photo &&
                      props.userDetails.avatar_photo.image_url
                    }
                  />,
                )
              }
            ></Route>
            <Route
              path="/manage/profile/account-info"
              render={childProps =>
                getComponent(
                  <AccountInfo
                    {...childProps}
                    {...props}
                    handleAccountSave={handleAccountSave}
                    mobHead="Account Info"
                    webHead="Account Information"
                    tooltip={{
                      emailTooltip: true,
                      emailTooltipText:
                        'Your email will always be kept private and will not be shared with others.',
                    }}
                    labels={{
                      firstNameLbl: 'First Name',
                      lastNameLbl: 'Last Name',
                      emailLbl: 'Email',
                      emailHead: 'Email address',
                      nameHead: 'Your name',
                      buttonLbl: 'Save',
                    }}
                  />,
                )
              }
            />
            <Route
              path="/manage/profile/password"
              render={childProps =>
                getComponent(
                  <Password
                    {...childProps}
                    {...props}
                    passwordUpdate={passwordUpdate}
                    mobHead="Update Password"
                    webHead="Update Password"
                    showPasswd={false}
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
              path="/manage/profile/payment"
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
                      noteWeb: '',
                      noteMob: '',
                    }}
                    // note={
                    //   <span>
                    //     Set up your payment account so when your Star contacts
                    //     start creating videos Starsona can pay you for your
                    //     referrals.{' '}
                    //     <span
                    //       className="click-here"
                    //       onClick={clickHere}
                    //       role="presentation"
                    //     >
                    //       Click here{' '}
                    //     </span>
                    //     for more information.
                    //   </span>
                    // }
                  />,
                )
              }
            />

            <Route
              path="/manage/profile/notification"
              render={childProps =>
                getComponent(
                  <Notification
                    {...childProps}
                    notifications={getNotifications()}
                    handleCheck={handleCheck}
                    updateNotificationViewed={props.updateNotificationViewed}
                    is_viewed={
                      props.userDetails.notification_settings.is_viewed
                    }
                    mobHead="Notifications"
                    webHead="Notifications"
                  />,
                )
              }
            />
          </Switch>
        </RightContentWrap>
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
  updateProfilePhoto: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
};
Settings.defaultProps = {
  stripeCard: '',
  stripeUrl: '',
  dashboardURL: '',
};

export default Settings;
