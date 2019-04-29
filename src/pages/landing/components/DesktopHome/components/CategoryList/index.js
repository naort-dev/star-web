import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarExclamation } from '@fortawesome/pro-light-svg-icons';
import { categoryIcons } from './constants';
import { updateCategory } from '../../../../actions/updateFilters';
import { CategoryListWrapper, CategoryListItem, CategoryIcon, CategoryName, CategoryDescription, CategoryContent } from './styled';

const CategoryList = (props) => {

  const updateMainCategory = (title, value, subCategories) => () => {
    props.updateCategory(title, value, subCategories);
  }

  return (
    <CategoryListWrapper>
      <CategoryListItem>
        <Link to="/browse-stars" onClick={updateMainCategory('Featured', 0, [])}>
          <CategoryIcon>
            <FontAwesomeIcon icon={faStarExclamation} />
          </CategoryIcon>
          <CategoryContent>
            <CategoryName>FEATURED</CategoryName>
            <CategoryDescription>Stars creating a buzz.</CategoryDescription>
          </CategoryContent>
        </Link>
      </CategoryListItem>
      {
        props.professionsList.professions.map(profession => (
          <CategoryListItem key={profession.id} onClick={updateMainCategory(profession.title, profession.id, profession.child)}>
            <Link to="/browse-stars">
              <CategoryIcon>
                <FontAwesomeIcon icon={categoryIcons[profession.id]} />
              </CategoryIcon>
              <CategoryContent>
                <CategoryName>{profession.title}</CategoryName>
                <CategoryDescription>{profession.description}</CategoryDescription>
              </CategoryContent>
            </Link>
          </CategoryListItem>
        ))
      }
      {/* <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faMusic} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>MUSIC</CategoryName>
          <CategoryDescription>Bands, beats, battlestar galactica.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faMagic} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>COMEDIANS</CategoryName>
          <CategoryDescription>Knock knock…</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faFutbol} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>SPORTS</CategoryName>
          <CategoryDescription>Today’s superstars and yesterday’s heroes.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faPodcast} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>RADIO/PODCAST</CategoryName>
          <CategoryDescription>Your morning DJ or fav talk show host.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faBug} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>EVERYDAY STARS</CategoryName>
          <CategoryDescription>Local legends and leaders.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faFilm} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>MOVIES/TV</CategoryName>
          <CategoryDescription>From the big screen to your small screen.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faGlobe} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>SOCIAL/YOUTUBE</CategoryName>
          <CategoryDescription> Instagrammers, Youtubers, Bloggers.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faTv} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>IMITATORS</CategoryName>
          <CategoryDescription>Tupac is alive here.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem> */}
    </CategoryListWrapper>
  );
};

CategoryList.propTypes = {
  professionsList: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  professionsList: state.professionsList,
})

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
