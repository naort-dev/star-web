import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import StarDrawer from '../../../../components/StarDrawer';
import Header from '../../../../components/Header';
import FilterSection from './components/FilterSection';
import StarListing from '../../../../components/StarListing';
import StarAvatar from '../../../../components/StarAvatar';

import CategoryPageStyled from './styled';

const CategoryPage = (props) => {
  const star = {
    avatar_photo: { id: 'nel2GrbK', image_url: 'https://s3.amazonaws.com/starsona-stb-usea1/images/profile/FILE_15542000974Y8Z0KKK.jpeg', thumbnail_url: 'https://s3.amazonaws.com/starsona-stb-usea1/images/profile/thumbnail_FILE_15542000974Y8Z0KKK.jpeg', photo: 'FILE_15542000974Y8Z0KKK.jpeg', thumbnail: 'thumbnail_FILE_15542000974Y8Z0KKK.jpeg', },
    celebrity_profession: [{
      id: 85,
      parent: 'Everyday Stars',
      show_parent: false,
      title: 'Business',
    }],
    celebrity_user: { rate: '50' },
    featured_photo: null,
    first_name: 'Bill',
    get_short_name: 'Bill Gates',
    id: 'pmbkl6dz',
    last_name: 'Gates',
    nick_name: 'Bill Gates',
    show_nick_name: true,
    user_id: 'billgates',
  };

  const starData = [{
    size: '130px',
    horizontal: '30%',
    vertical: '50px',
    rotation: '15deg',
    color: props.theme.paleSkyBlue,
  }, {
    size: '60px',
    horizontal: '70%',
    vertical: '30px',
    rotation: '-15deg',
    color: props.theme.paleSkyBlue,
  }, {
    size: '78px',
    horizontal: '85%',
    vertical: '75%',
    rotation: '15deg',
    color: props.theme.paleSkyBlue,
  }];
  const [showFilter, toggleFilter] = useState(false);

  const toggleFilterCall = () => {
    toggleFilter(!showFilter);
  };

  return (
    <CategoryPageStyled>
      <Header />
      <CategoryPageStyled.Toolbar>
        <CategoryPageStyled.CategoryName>{props.category.label}</CategoryPageStyled.CategoryName>
        {
          props.category.label !== 'Featured' &&
            <CategoryPageStyled.Filter
              title="Filter"
              onClick={toggleFilterCall}
            >
              <FontAwesomeIcon icon={faFilter} />
            </CategoryPageStyled.Filter>
        }
      </CategoryPageStyled.Toolbar>
      <CategoryPageStyled.Content>
        <CategoryPageStyled.FeaturedWrapper>
          <CategoryPageStyled.Heading>Create A Winning Moment With A Sports Star!</CategoryPageStyled.Heading>
          <CategoryPageStyled.FeaturedSection title={`Featured ${props.category.label !== 'Featured' ? props.category.label : ''} stars`}>
            <CategoryPageStyled.StarWrapper>
              <StarDrawer starData={starData} />
            </CategoryPageStyled.StarWrapper>
            <CategoryPageStyled.AvatarWrapper className="featured" >
              <StarAvatar star={star} type="featured" />
            </CategoryPageStyled.AvatarWrapper>
            <CategoryPageStyled.AvatarWrapper className="secondary" disableIpad >
              <StarAvatar star={star} type="secondary" />
            </CategoryPageStyled.AvatarWrapper>
            <CategoryPageStyled.AvatarWrapper className="secondary" >
              <StarAvatar star={star} type="secondary" />
            </CategoryPageStyled.AvatarWrapper>
            <CategoryPageStyled.AvatarWrapper className="secondary" disableIpad disableMobile>
              <StarAvatar star={star} type="secondary" />
            </CategoryPageStyled.AvatarWrapper>
          </CategoryPageStyled.FeaturedSection>
        </CategoryPageStyled.FeaturedWrapper>
        {
          props.category.label !== 'Featured' &&
            <CategoryPageStyled.FilterSection showFilter={showFilter}>
              <FilterSection onClose={toggleFilterCall} />
            </CategoryPageStyled.FilterSection>
        }
        <CategoryPageStyled.ListingWrapper>
          <StarListing
            dataList={props.trendingStars.data}
            loading={props.trendingStars.loading}
            noScroll
            totalCount={props.trendingStars.length}
            limit={10}
          />
        </CategoryPageStyled.ListingWrapper>
      </CategoryPageStyled.Content>
    </CategoryPageStyled>
  );
};

CategoryPage.propTypes = {
  category: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  category: state.filters.category,
  trendingStars: state.trendingStars,
});

export default withTheme(connect(mapStateToProps)(CategoryPage));

