import React, { Component } from 'react';
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

class CategoryList extends Component {
  state = {};
  render() {
    return (
      <Layout>
        {this.props.dataModal.map((item, index) => {
          return (
            <ContentWrapper>
              <FlexBoxSB key={item.header}>
                <ImageWrapper>
                  <img
                    src={item.icon}
                    alt="categoryIcon"
                    className={index > 0 ? 'iconPadding' : ''}
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
  }
}

export default CategoryList;
