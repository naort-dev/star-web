import React from 'react';
import SmartBanner from 'react-smartbanner';

const AppBanner = props => (
  <SmartBanner
    title="Starsona"
    daysHidden={0}
    daysReminder={0}
    url={{
      android: `${env('androidAppId')}://${props.androidUrl}`,
      ios: `${env('androidAppId')}://${props.iosUrl}`,
    }}
    onClose={() => props.hideAppBanner()}
    onInstall={() => {
      setTimeout(() => {
        if (/Android/i.test(navigator.userAgent)) {
          window.location = `http://play.google.com/store/apps/details?id=${env('androidAppId')}`;
        } else if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
            window.location = `itms-apps://itunes.apple.com/app/id${env('iosAppId')}`;
        }
      }, 3000);
    }}
  />
);

export default AppBanner;
