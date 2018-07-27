import React from 'react';
import FooterSection from './styled';


export const SettingsFooter = props => (
  <React.Fragment>
    <FooterSection>
      <FooterSection.LeftSection>
        <FooterSection.LeftButton>Cancel</FooterSection.LeftButton>
      </FooterSection.LeftSection>
      <FooterSection.RightSection>
        <FooterSection.Button>Save</FooterSection.Button>
      </FooterSection.RightSection>
    </FooterSection>
  </React.Fragment>
);
