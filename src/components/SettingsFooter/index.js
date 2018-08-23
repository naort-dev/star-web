import React from "react";
import { Link } from "react-router-dom";
import FooterSection from "./styled";

export const SettingsFooter = props => (
  <React.Fragment>
    <FooterSection>
      <FooterSection.LeftSection>
        <Link to="/">
          <FooterSection.LeftButton>Cancel</FooterSection.LeftButton>
        </Link>
      </FooterSection.LeftSection>
      <FooterSection.RightSection>
        {props.isCelebrity && props.isMyAccount ? (
          <FooterSection.Button onClick={() => props.onSave()}>
            Next
          </FooterSection.Button>
        ) : (
          <FooterSection.Button onClick={() => props.onSave()}>
            Save
          </FooterSection.Button>
        )}
      </FooterSection.RightSection>
    </FooterSection>
  </React.Fragment>
);
