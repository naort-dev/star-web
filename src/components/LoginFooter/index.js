import React from 'react';
import FooterSection from './styled';


export const LoginFooter = props => (
  <div>
    <FooterSection>
      <FooterSection.LeftSection>
        <FooterSection.Agreement>
          By creating an account you agree to Starsona’s Privacy Policy and Terms of Service
        </FooterSection.Agreement>
      </FooterSection.LeftSection>
      <FooterSection.RightSection>
        <FooterSection.Button>Join Free</FooterSection.Button>
      </FooterSection.RightSection>
    </FooterSection>
  </div>
);
