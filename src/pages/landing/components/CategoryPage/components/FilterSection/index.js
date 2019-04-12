import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import HeaderSection from '../../../../../../components/Header/styled';
import { updateSelectedSubCategory } from '../../../../actions/updateFilters';
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
      <FilterStyled.Heading mobileOnly>
        Filter
      </FilterStyled.Heading>
      <FilterStyled.Heading>
        Select your { props.category.label } category
      </FilterStyled.Heading>
      <FilterStyled.SubCategoryList>
        <FilterStyled.SubCategoryItem selected>ALL</FilterStyled.SubCategoryItem>
        {
          props.category.subCategories.map(subCategory => (
            <FilterStyled.SubCategoryItem
              key={subCategory.id}
            >
              {subCategory.title}
            </FilterStyled.SubCategoryItem>
          ))
        }
      </FilterStyled.SubCategoryList>
    </FilterStyled>
  );
};

FilterSection.propTypes = {
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  updateSelectedSubCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  category: state.filters.category,
});

const mapDispatchToProps = dispatch => ({
  updateSelectedSubCategory: selectedList => dispatch(updateSelectedSubCategory(selectedList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);
