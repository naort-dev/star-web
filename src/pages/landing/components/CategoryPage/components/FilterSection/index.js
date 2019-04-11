import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import HeaderSection from '../../../../../../components/Header/styled';
import FilterStyled from './styled';

const FilterSection = (props) => {
  return (
    <FilterStyled>
      <FilterStyled.Header>
        <HeaderSection.HeaderDiv>
          <HeaderSection.BackIcon onClick={props.onClose}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </HeaderSection.BackIcon>
          <HeaderSection.HeaderLeft>
            <HeaderSection.ImgLogo
              src="assets/images/logo_starsona.svg"
              alt="logo"
            />
          </HeaderSection.HeaderLeft>
          <HeaderSection.HeaderRight visible>
            <FilterStyled.CloseButton onClick={props.onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </FilterStyled.CloseButton>
          </HeaderSection.HeaderRight>
        </HeaderSection.HeaderDiv>
      </FilterStyled.Header>
    </FilterStyled>
  );
};

FilterSection.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default FilterSection;
