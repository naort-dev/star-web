import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const HeaderDiv = styled.section`
  height: 160px;
  ${media.mobileScreen} {
    height: 178px;

    &.headerGlobal.custom-header {
      min-height: 150px;
      height: auto;
    }
  
    &.custom-header:after {
      display: none;
    }
  }
  background: #ff6c58;
  padding: 12px 40px 0;
  position: relative;

  .arrow {
    visibility: ${props => !props.arrow && 'hidden'};
  }
  :after {
    content: '';
    position: absolute;
    top: 99%;
    left: 50%;
    width: 0;
    height: 0;
    border-top: solid 20px #ff6c58;
    border-left: solid 20px transparent;
    border-right: solid 20px transparent;
    transform: translateX(-50%);
    z-index: 1;
  }

  

  .customHead {
    font-family: Gilroy;
    font-size: 24px;
    color: #ff6c58;
  }

  &.headerGlobal {
    min-height: 157px;
    margin-bottom: 45px;

    ${media.mobileScreen} {
      min-height: 178px;
      margin-bottom: 20px;
    }
  }
`;

export const HeaderText = styled.section`
  color: #fff;
  text-align: center;
  font-family: Gilroy;
  font-size: 18px;
  font-weight: 600;
  padding-top: 17px;

  ${media.mobileScreen} {
    font-family: Gilroy-Medium;
  }
`;

export const ProfileIcon = styled.section`
  width: 120px;
  display: flex;
  justify-content: center;
  position: relative;
  height: 85px;
`;

export const Image = styled.span`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 8px 13px 0 rgba(0, 0, 0, 0.28);
  margin-top: 8px;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
