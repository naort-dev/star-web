import React from 'react';
import FooterSection from './styled';


export const SettingsFooter = props => (
  <React.Fragment>
    <FooterSection>
      <FooterSection.LeftSection>
        <FooterSection.LeftButton>Cancel</FooterSection.LeftButton>
      </FooterSection.LeftSection>
      <FooterSection.RightSection>
        { props.isCelebrity && props.isMyAccount ?
          <FooterSection.Button onClick={() => props.onSave()}>Next</FooterSection.Button>
          :
          <FooterSection.Button onClick={() => props.onSave()}>Save</FooterSection.Button>
        }
      </FooterSection.RightSection>
    </FooterSection>
  </React.Fragment>
);
