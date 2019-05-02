import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCategory } from '../../../../pages/landing/actions/updateFilters';
import CategoryStyled from './styled';

const CategorySection = (props) => {
  const professionsList = props.professionsList.professions;
  const updateMainCategory = (title, value, subCategories) => () => {
    if (props.showCategories) {
      props.closeCategories();
    }
    props.updateCategory(title, value, subCategories);
  }
  return (
    <CategoryStyled>
      <CategoryStyled.Item
        onClick={updateMainCategory('Featured', 0, [])}
        selected={props.category.label === 'Featured' && props.location.pathname === '/browse-stars'}
        data-value="Featured"
      >
        <span className="category-label">Featured</span>
      </CategoryStyled.Item>
      {
        professionsList.map((profession) => {
          return (
            <CategoryStyled.Item
              key={profession.id}
              onClick={updateMainCategory(profession.title, profession.id, profession.child)}
              selected={props.category.label === profession.title && props.location.pathname === '/browse-stars'}
              data-value={profession.title}
            >
              <span className="category-label">{profession.title}</span>
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
  showCategories: PropTypes.bool.isRequired,
  closeCategories: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  category: state.filters.category,
});

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategorySection));
