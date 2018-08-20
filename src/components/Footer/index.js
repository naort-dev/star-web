import React from 'react';
import { FooterStyled } from './styled';

export const Footer = () => (
  <FooterStyled>
    <FooterStyled.Separator />
    <FooterStyled.list>
      <FooterStyled.Anchor target="_blank" rel="noopener noreferrer" href="https://about.starsona.com/contact/">
        <FooterStyled.listItem>Contact</FooterStyled.listItem>
      </FooterStyled.Anchor>
      <FooterStyled.Anchor target="_blank" rel="noopener noreferrer" href="https://about.starsona.com/privacy-policy/">
        <FooterStyled.listItem>Privacy Policy</FooterStyled.listItem>
      </FooterStyled.Anchor>
      <FooterStyled.Anchor target="_blank" rel="noopener noreferrer" href="https://about.starsona.com/terms-service/">
        <FooterStyled.listItem>Terms of Service</FooterStyled.listItem>
      </FooterStyled.Anchor>
    </FooterStyled.list>
    <FooterStyled.DownloadLabel>
      <span>Download the App</span>
    </FooterStyled.DownloadLabel>
    <FooterStyled.shareIconWrapper>
      <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/starsonahq/">
        <FooterStyled.shareIcon alt="playsore icon" src="assets/images/fb-icon.svg" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/starsonahq">
        <FooterStyled.shareIcon alt="playsore icon" src="assets/images/twitter-icon.svg" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/starsonahq/">
        <FooterStyled.shareIcon alt="playsore icon" src="assets/images/insta-icon.svg" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCmmN9QPqAGE18yWENxsw7jQ">
        <FooterStyled.shareIcon alt="playsore icon" src="assets/images/youtube-icon.svg" />
      </a>
    </FooterStyled.shareIconWrapper>
    <FooterStyled.StoreIconWrapper>
      <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.starsona.app">
        <FooterStyled.StoreIcon alt="playsore icon" src="assets/images/playstore-download.svg" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com/us/app/starsona/id1294478616?ls=1&mt=8">
        <FooterStyled.StoreIcon alt="playsore icon" src="assets/images/appstore-download.svg" />
      </a>
    </FooterStyled.StoreIconWrapper>
  </FooterStyled>
);
