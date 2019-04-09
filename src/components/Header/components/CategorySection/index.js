import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryStyled from './styled';

const CategorySection = (props) => {
  const professionsList = props.professionsList.professions;
  return (
    <CategoryStyled>
      <CategoryStyled.Item>Featured</CategoryStyled.Item>
      {
        professionsList.map((profession) => {
          return <CategoryStyled.Item>{profession.title}</CategoryStyled.Item>;
        })
      }
    </CategoryStyled>
  );
};

CategorySection.propTypes = {
  professionsList: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  professionsList: state.professionsList,
});

export default connect(mapStateToProps)(CategorySection);
