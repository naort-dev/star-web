
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import StarDrawer from '../../components/StarDrawer';
import Header from '../../components/Header';
import FilterSection from './components/FilterSection';
import StarListing from '../../components/StarListing';
import StarAvatar from '../../components/StarAvatar';
import { pipeSeparator } from '../../utils/dataToStringFormatter';
import CategoryPageStyled from './styled';

const BrowseStars = (props) => {
  // eslint-disable-next-line react/prop-types
  const { paleSkyBlue } = props.theme;
  const starData = [{
    size: '130px',
    horizontal: '30%',
    vertical: '50px',
    rotation: '15deg',
    color: paleSkyBlue,
  }, {
    size: '60px',
    horizontal: '70%',
    vertical: '30px',
    rotation: '-15deg',
    color: paleSkyBlue,
  }, {
    size: '78px',
    horizontal: '85%',
    vertical: '75%',
    rotation: '15deg',
    color: paleSkyBlue,
  }];
  const [showFilter, toggleFilter] = useState(false);
  const [fixedContent, toggleContentPos] = useState(false);
  const [listHeight, updateListHeight] = useState(null);
  const contentRef = useRef(null);
  const mainRef = useRef(null);
  const filterRef = useRef(null);
  const headerRef = useRef(null);

  const toggleFilterCall = () => {
    toggleFilter(!showFilter);
  };

  const getListHeight = () => {
    if (filterRef && filterRef.current) {
      updateListHeight(filterRef.current.clientHeight);
    } else {
      return updateListHeight(null);
    }
  };

  const onWindowResize = () => {
    if (document.body.getBoundingClientRect().width >= 832 || window.innerWidth >= 832) {
      toggleFilter(true);
    }
    getListHeight();
  };

  const onWindowScroll = () => {
    const bounding = mainRef.current.getBoundingClientRect();
    if (bounding.top - headerRef.current.clientHeight <= 0 && !fixedContent) {
      toggleContentPos(true);
      getListHeight();
    } else {
      getListHeight();
      toggleContentPos(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onWindowScroll);
    document.documentElement.scrollTop = 0;
    onWindowResize();
  }, []);

  useEffect(() => {
    props.fetchCelebrityList(0, true);
  }, [props.category.selected.length, props.sortValue, props.lowPrice, props.highPrice]);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onWindowScroll);
    };
  }, []);

  useEffect(() => {
    if (!props.featuredStars[props.category.label]) {
      props.fetchFeaturedStars(props.category);
    }
    props.fetchCelebrityList(0, true);
    toggleContentPos(false);
    getListHeight();
  }, [props.category.label]);

  const title = props.featuredStars[props.category.label] ? props.featuredStars[props.category.label].title : '';

  const getAvatarData = (index) => {
    const featuredStars = props.featuredStars[props.category.label] ? props.featuredStars[props.category.label].data : [];
    const finalStarData = featuredStars[index - 1];
    if (finalStarData) {
      return ({
        nick_name: finalStarData && finalStarData.name,
        celebrity_user: { rate: finalStarData && finalStarData.rate },
        celebrity_profession: finalStarData.professions.map(profession => ({ title: profession })),
        user_id : finalStarData.celebrity_id,
        ...finalStarData,
      });
    }
    return ({});
  };
  return (
    <CategoryPageStyled>
      <Header
        forwardRef={headerRef}
      />
      <CategoryPageStyled.Toolbar headerRef={headerRef}>
        <CategoryPageStyled.CategoryName>
          {props.category.label}
          <CategoryPageStyled.FilterList>
            {
              pipeSeparator(props.category.selected, 'title')
            }
          </CategoryPageStyled.FilterList>
        </CategoryPageStyled.CategoryName>
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
      <CategoryPageStyled.Content innerRef={contentRef}>
        <CategoryPageStyled.FeaturedWrapper>
          <CategoryPageStyled.Heading>{title}</CategoryPageStyled.Heading>
          <CategoryPageStyled.FeaturedSection heading={`Featured ${props.category.label !== 'Featured' ? props.category.label : ''} stars`}>
            <CategoryPageStyled.StarWrapper>
              <StarDrawer starData={starData} />
            </CategoryPageStyled.StarWrapper>
            <CategoryPageStyled.AvatarWrapper className="featured" >
              <StarAvatar star={getAvatarData(1)} type="featured" />
            </CategoryPageStyled.AvatarWrapper>
            <CategoryPageStyled.AvatarWrapper className="secondary" disableIpad >
              <StarAvatar star={getAvatarData(2)} type="secondary" />
            </CategoryPageStyled.AvatarWrapper>
            <CategoryPageStyled.AvatarWrapper className="secondary" >
              <StarAvatar star={getAvatarData(3)} type="secondary" />
            </CategoryPageStyled.AvatarWrapper>
            <CategoryPageStyled.AvatarWrapper className="secondary" disableIpad disableMobile>
              <StarAvatar star={getAvatarData(4)} type="secondary" />
            </CategoryPageStyled.AvatarWrapper>
          </CategoryPageStyled.FeaturedSection>
        </CategoryPageStyled.FeaturedWrapper>
        <CategoryPageStyled.MainContent fixedContent={fixedContent} padding={listHeight} innerRef={mainRef}>
          {
            props.category.label !== 'Featured' && showFilter &&
              <CategoryPageStyled.FilterSection headerRef={headerRef} fixedContent={fixedContent} innerRef={filterRef}>
                <FilterSection onClose={toggleFilterCall} />
              </CategoryPageStyled.FilterSection>
          }
          <CategoryPageStyled.ListingWrapper>
            <StarListing
              customLoader
              dataList={props.celebList.data}
              loading={props.celebList.loading}
              offset={props.celebList.offset}
              fetchData={(offset, refresh) => props.fetchCelebrityList(offset, refresh)}
              totalCount={props.celebList.count}
              limit={props.celebList.limit}
            />
          </CategoryPageStyled.ListingWrapper>
        </CategoryPageStyled.MainContent>
      </CategoryPageStyled.Content>
    </CategoryPageStyled>
  );
};

BrowseStars.propTypes = {
  category: PropTypes.object.isRequired,
  featuredStars: PropTypes.object.isRequired,
  fetchFeaturedStars: PropTypes.func.isRequired,
  celebList: PropTypes.object.isRequired,
  lowPrice: PropTypes.number.isRequired,
  highPrice: PropTypes.number.isRequired,
  fetchCelebrityList: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
};

export default withTheme(BrowseStars);

