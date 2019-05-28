import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { FlexBoxSB } from 'styles/CommonStyled';
import {
  Icon,
  HeaderText,
  Paragraph,
  ImageWrapper,
  Message,
  ContentWrapper,
  Layout,
} from './styled';

const CategoryList = ({
  dataModal,
  getCategory,
  headerUpdate,
  starNM,
  isLoggedIn,
  toggleLogin,
}) => {
  const handleGetCategory = type => () => {
    if (getCategory) getCategory(type);
    if (type === 1) {
      headerUpdate('Tell me about this Personalized Shoutout');
    } else if (type === 2) {
      headerUpdate('Announcement');
    } else if (type === 3) {
      if (!isLoggedIn) {
        toggleLogin(true);
      }
      headerUpdate(`Ask ${starNM} something! `);
    }
  };
  useEffect(() => {
    headerUpdate('What kind of video message do you want?');
  }, []);

  return (
    <Layout>
      {dataModal.map((item, index) => {
        return (
          <ContentWrapper
            onClick={handleGetCategory(item.type)}
            key={item.type}
          >
            <FlexBoxSB key={item.header}>
              <ImageWrapper>
                <img
                  src={item.icon}
                  alt="categoryIcon"
                  className={`icon image-${index + 1}`}
                />
              </ImageWrapper>
              <Message>
                <HeaderText>{item.header}</HeaderText>
                <Paragraph>{item.text}</Paragraph>
              </Message>
              <Icon icon={faAngleRight} />
            </FlexBoxSB>
          </ContentWrapper>
        );
      })}
    </Layout>
  );
};

CategoryList.propTypes = {
  getCategory: PropTypes.func.isRequired,
  dataModal: PropTypes.array,
  headerUpdate: PropTypes.func.isRequired,
  starNM: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  toggleLogin: PropTypes.func.isRequired,
};

CategoryList.defaultProps = {
  dataModal: [],
  starNM: '',
};

export default CategoryList;
