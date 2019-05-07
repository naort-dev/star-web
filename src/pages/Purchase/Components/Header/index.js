import React from 'react';
import PropTypes from 'prop-types';
import StarDrawer from '../../../../components/StarDrawer';
import {
  HeaderDiv,
  FlexBoxSBC,
  HeaderText,
  ProfileIcon,
  Image,
} from './styled';
import { BackArrow, CloseButton } from '../../../../styles/CommonStyled';
import { FlexCenter } from '../../../../styles/CommonStyled';

const Header = props => {
  const starData = [
    {
      size: '28px',
      horizontal: '2px',
      vertical: '8px',
      rotation: '0deg',
      color: '#fff',
    },
    {
      size: '22px',
      horizontal: '90px',
      vertical: '0px',
      rotation: '30deg',
      color: '#fff',
    },
    {
      size: '15px',
      horizontal: '104',
      vertical: '20px',
      rotation: '15deg',
      color: '#fff',
    },
  ];

  return (
    <HeaderDiv className="headerGlobal" arrow={props.arrowVisible}>
      <FlexCenter>
        <BackArrow className="arrow" onClick={props.backArrowHandler} white />
        <ProfileIcon>
          <StarDrawer starData={starData} />
          <Image>
            <img src="../assets/images/profile.png" alt="profile_icon" />
          </Image>
        </ProfileIcon>
        <CloseButton onClick={props.closeHandler} white />
      </FlexCenter>
      <HeaderText>{props.headerText}</HeaderText>
    </HeaderDiv>
  );
};

Header.propTypes = {
  arrowVisible: PropTypes.bool,
  backArrowHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  headerText: PropTypes.string,
};
Header.defaultProps = {
  arrowVisible: false,
  headerText: '',
};

export default Header;
