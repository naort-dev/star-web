import React from 'react';
import FooterSection from './styled';


export const SettingsFooter = props => (
  <div>
    <FooterSection>
      <FooterSection.LeftSection>
        <FooterSection.leftButton>Cancel</FooterSection.leftButton>
      </FooterSection.LeftSection>
      <FooterSection.RightSection>
        <FooterSection.Button>Save</FooterSection.Button>
      </FooterSection.RightSection>
    </FooterSection>
  </div>
);
