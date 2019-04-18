import React from 'react';
import PropTypes from 'prop-types';
import { FlexBoxSB } from '../../../../styles/CommonStyled';
import {
  Icon,
  HeaderText,
  Paragraph,
  ImageWrapper,
  Message,
  ContentWrapper,
  Layout,
} from './styled';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons';

const CategoryList = ({ dataModal, getCategory }) => {
  const handleGetCategory = (type) => (e) => {
    getCategory && getCategory(type);
  };

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
};

export default CategoryList;
