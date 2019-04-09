import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCategory } from '../../../../pages/landing/actions/updateFilters';
import CategoryStyled from './styled';

const CategorySection = (props) => {
  const professionsList = props.professionsList.professions;
  const updateMainCategory = (title, value) => () => {
    props.updateCategory(title, value);
  }
  return (
    <CategoryStyled>
      <CategoryStyled.Item
        onClick={updateMainCategory('featured', '')}
        selected={props.category.label === 'featured'}
      >
        Featured
      </CategoryStyled.Item>
      {
        professionsList.map((profession) => {
          return (
            <CategoryStyled.Item
              onClick={updateMainCategory(profession.title, profession.id)}
              selected={props.category.label === profession.title}
            >
              {profession.title}
            </CategoryStyled.Item>
          );
        })
      }
    </CategoryStyled>
  );
};

CategorySection.propTypes = {
  professionsList: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  category: state.filters.category,
});

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value) => dispatch(updateCategory(label, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySection);
