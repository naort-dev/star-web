import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StarDrawer from 'components/StarDrawer';
import { BackArrow, CloseButton, FlexCenter } from 'styles/CommonStyled';
import { HeaderDiv, HeaderText, ProfileIcon, Image } from './styled';

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
            <img
              src={props.starImage || 'assets/images/profile.png'}
              alt="profile_icon"
            />
          </Image>
        </ProfileIcon>
        <CloseButton onClick={props.closeHandler} white />
      </FlexCenter>
      <HeaderText>{props.header}</HeaderText>
    </HeaderDiv>
  );
};

Header.propTypes = {
  arrowVisible: PropTypes.bool,
  backArrowHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  header: PropTypes.string,
  starImage: PropTypes.string,
};
Header.defaultProps = {
  arrowVisible: false,
  header: '',
  starImage: '',
};

export default connect(
  state => ({
    header: state.occasionList.header,
  }),
  null,
)(Header);
