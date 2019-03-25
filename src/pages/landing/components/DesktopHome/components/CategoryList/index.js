import React from 'react';
import { CategoryListWrapper, CategoryListItem, CategoryIcon, CategoryName, CategoryDescription } from './styled';

const CategoryList = (props) => {
  return (
    <CategoryListWrapper>
      <CategoryListItem>
        <div>
          <CategoryName>FEATURED</CategoryName>
          <CategoryDescription>Stars creating a buzz.</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>MUSIC</CategoryName>
          <CategoryDescription>Bands, beats, battlestar galactica.</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>COMEDIANS</CategoryName>
          <CategoryDescription>Knock knock…</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>SPORTS</CategoryName>
          <CategoryDescription>Today’s superstars and yesterday’s heroes.</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>RADIO/PODCAST</CategoryName>
          <CategoryDescription>Your morning DJ or fav talk show host.</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>EVERYDAY STARS</CategoryName>
          <CategoryDescription>Local legends and leaders.</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>MOVIES/TV</CategoryName>
          <CategoryDescription>From the big screen to your small screen..</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>SOCIAL/YOUTUBE</CategoryName>
          <CategoryDescription> Instagrammers, Youtubers, Bloggers. .</CategoryDescription>
        </div>
      </CategoryListItem>
      <CategoryListItem>
        <div>
          <CategoryName>IMITATORS</CategoryName>
          <CategoryDescription>Tupac is alive here.</CategoryDescription>
        </div>
      </CategoryListItem>
    </CategoryListWrapper>
  );
};

export default CategoryList;
