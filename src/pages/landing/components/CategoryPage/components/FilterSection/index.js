import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import HeaderSection from '../../../../../../components/Header/styled';
import RangeSlider from '../../../../../../components/RangeSlider';
import PrimaryButton from '../../../../../../components/PrimaryButton';
import Picker from '../../../../../../components/Picker';
import { updateSelectedSubCategory } from '../../../../actions/updateFilters';
import FilterStyled from './styled';

const FilterSection = (props) => {

  const [selectedSubCat, updateselectedSub] = useState(props.category.selected);
  const [selectedSort, updateSort] = useState({ label: 'Popularity', value: 'popularity' });

  const sortList = [{
    label: 'Popularity',
    value: 'popularity',
  }, {
    label: 'Alphabetically (A-Z)',
    value: 'alpha',
  }, {
    label: 'Price (lowest to highest)',
    value: 'lowToHigh',
  }, {
    label: 'Price (highest to lowest)',
    value: 'highToLow',
  }];

  useEffect(() => {
    updateselectedSub(props.category.selected);
  });

  const updateSubCategory = catId => () => {
    let selectedList = [...selectedSubCat];
    if (selectedList.find(cat => cat === catId)) {
      selectedList = selectedList.filter(cat => cat !== catId);
      updateselectedSub(selectedList);
    } else {
      selectedList = [...selectedList, catId];
      updateselectedSub(selectedList);
    }
    props.updateSelectedSubCategory(selectedList);
  };

  const toggleSelectAll = () => {
    if (props.category.subCategories.length !== selectedSubCat.length) {
      props.updateSelectedSubCategory(props.category.subCategories.map(cat => cat.id));
    } else {
      props.updateSelectedSubCategory([]);
    }
  };

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
        Select your { props.category.label.toLowerCase() } category
      </FilterStyled.Heading>
      <FilterStyled.Content>
        <FilterStyled.SubCategoryList>
          <FilterStyled.SubCategoryItem
            onClick={toggleSelectAll}
          >
            { props.category.subCategories.length === selectedSubCat.length ? 'Unselect All' : 'ALL' }
          </FilterStyled.SubCategoryItem>
          {
            props.category.subCategories.map(subCategory => (
              <FilterStyled.SubCategoryItem
                key={subCategory.id}
                selected={selectedSubCat.indexOf(subCategory.id) > -1}
                onClick={updateSubCategory(subCategory.id)}
              >
                {subCategory.title}
              </FilterStyled.SubCategoryItem>
            ))
          }
        </FilterStyled.SubCategoryList>
        <FilterStyled.SecondaryFilterWrapper>
          <FilterStyled.SecondaryFilter>
            <FilterStyled.SortHeading>Sort by</FilterStyled.SortHeading>
            <Picker list={sortList} onSelect={updateSort} selected={selectedSort} />
          </FilterStyled.SecondaryFilter>
          <FilterStyled.SecondaryFilter>
            <FilterStyled.FilterHeading>Price</FilterStyled.FilterHeading>
            <RangeSlider />
          </FilterStyled.SecondaryFilter>
          <FilterStyled.ApplyButton>
            <PrimaryButton className="controlButton">Apply</PrimaryButton>
          </FilterStyled.ApplyButton>
        </FilterStyled.SecondaryFilterWrapper>
      </FilterStyled.Content>
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
