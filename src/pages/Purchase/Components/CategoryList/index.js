import React from 'react';
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
  return (
    <Layout>
      {dataModal.map((item, index) => {
        return (
          <ContentWrapper
            onClick={() => getCategory(item.type)}
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

export default CategoryList;
