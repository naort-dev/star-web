import React from 'react';
import { FooterStyled } from './styled';

export const Footer = () => (
  <FooterStyled>
    <FooterStyled.Separator />
    <FooterStyled.list>
      <FooterStyled.listItem>About Starsona</FooterStyled.listItem>
      <FooterStyled.listItem>Contact</FooterStyled.listItem>
      <FooterStyled.listItem>Privacy Policy</FooterStyled.listItem>
      <FooterStyled.listItem>Terms of Service</FooterStyled.listItem>
    </FooterStyled.list>
    <FooterStyled.DownloadLabel>
      <span>Download the App</span>
    </FooterStyled.DownloadLabel>
    <FooterStyled.shareIconWrapper>
      <FooterStyled.shareIcon alt="playsore icon" src="assets/images/fb-icon.svg" />
      <FooterStyled.shareIcon alt="playsore icon" src="assets/images/twitter-icon.svg" />
      <FooterStyled.shareIcon alt="playsore icon" src="assets/images/insta-icon.svg" />
      <FooterStyled.shareIcon alt="playsore icon" src="assets/images/youtube-icon.svg" />
    </FooterStyled.shareIconWrapper>
    <FooterStyled.StoreIconWrapper>
      <FooterStyled.StoreIcon alt="playsore icon" src="assets/images/playstore-download.svg" />
      <FooterStyled.StoreIcon alt="playsore icon" src="assets/images/appstore-download.svg" />
    </FooterStyled.StoreIconWrapper>
  </FooterStyled>
);
