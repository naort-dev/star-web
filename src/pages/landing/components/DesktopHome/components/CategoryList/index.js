import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarExclamation, faMusic, faMagic, faFutbol, faPodcast, faBug, faFilm, faGlobe, faTv } from '@fortawesome/pro-light-svg-icons';
import { CategoryListWrapper, CategoryListItem, CategoryIcon, CategoryName, CategoryDescription, CategoryContent } from './styled';

const CategoryList = (props) => {
  return (
    <CategoryListWrapper>
      <CategoryListItem>
        <CategoryIcon>
          <FontAwesomeIcon icon={faStarExclamation} />
        </CategoryIcon>
        <CategoryContent>
          <CategoryName>FEATURED</CategoryName>
          <CategoryDescription>Stars creating a buzz.</CategoryDescription>
        </CategoryContent>
      </CategoryListItem>
      <CategoryListItem>
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
      </CategoryListItem>
    </CategoryListWrapper>
  );
};

export default CategoryList;
