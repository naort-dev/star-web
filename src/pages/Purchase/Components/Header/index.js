import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';
import StarDrawer from '../../../../components/StarDrawer';
import {
  HeaderDiv,
  FlexBoxSBC,
  HeaderText,
  ProfileIcon,
  Image,
} from './styled';

const Header = (props) => {
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
      <FlexBoxSBC>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="arrow"
          onClick={props.backArrowHandler}
        />
        <ProfileIcon>
          <StarDrawer starData={starData} />
          <Image>
            <img src="../assets/images/profile.png" alt="profile_icon" />
          </Image>
        </ProfileIcon>
        <FontAwesomeIcon icon={faTimes} onClick={props.closeHandler} />
      </FlexBoxSBC>
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
