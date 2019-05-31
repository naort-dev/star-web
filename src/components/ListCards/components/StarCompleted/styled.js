import styled from 'styled-components';
import { FlexBoxSB } from 'styles/CommonStyled';
import { CardContainer } from '../../styled';


const StarStyled = CardContainer.extend`
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 18px;
  .card-description {
    display: none;
  }
  @media(min-width: 832px) {
    flex-direction: row;
    align-items: center;
    .card-description {
      display: initial;
    }
  }
`;

StarStyled.CommentContainer = FlexBoxSB.extend`
  margin-top: 12.2px;
  justify-content: flex-start;
  .comment-section {
    height: 73px;
    width: 50%;
    overflow: hidden;
  }
  .divider {
    width: 0;
    height: 71px;
    display: block;
    position: relative;
    border-left: 1px solid #d1d1d1;
    margin-left: 28px;
    .quick-comment-root {
      width: 28px;
      height: 28px;
      position: absolute;
      left: -15px;
      top: 22px;
      box-shadow: 0 3px 5px 0 rgba(0,0,0,0.06);
      border: solid 1px #e3e3e3;
      border-radius: 50%;
      font-size: 11px;  
    }
  }
  @media(min-width: 832px) {
    margin-top: 0;
    .comment-section {
      width: 209px;
    }
  }
`;

export default StarStyled;