import React from 'react';
import SmartBanner from 'react-smartbanner';

const AppBanner = props => (
  <SmartBanner
    title="Starsona"
    daysHidden={0}
    daysReminder={0}
    url={{
      android: `${env('ANDROID_APP_ID')}://${props.androidUrl}`,
      ios: `${env('ANDROID_APP_ID')}://${props.iosUrl}`,
    }}
    onClose={() => props.hideAppBanner()}
    onInstall={() => {
      setTimeout(() => {
        if (/Android/i.test(navigator.userAgent)) {
          window.location = `http://play.google.com/store/apps/details?id=${env('ANDROID_APP_ID')}`;
        } else if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
            window.location = `itms-apps://itunes.apple.com/app/id${env('IOS_APP_ID')}`;
        }
      }, 3000);
    }}
  />
);

export default AppBanner;
