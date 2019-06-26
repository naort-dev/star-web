import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  .leftArrow {
    position: absolute;
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
  }
  @media(min-width: 832px) {
    height: 100%;
  }
`;

export const UploadContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media (min-width: 1025px) {
    flex-direction: row;
    padding-bottom: 0;
  }
`;

UploadContainer.ItemWrapper = styled.ul`
  min-width: 227px;
`;
UploadContainer.SubItemWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: visible;
  li {
    padding: 1px 15px 0;
    border-radius: 15px;
    border: 1px solid #2f839d;
    display: flex;
    font-family: Gilroy-Medium;
    font-size: 12px;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    line-height: 20px;
    margin-bottom: 5px;
    color: #555;
  }
`;

UploadContainer.CategoriesWrapper = styled.div`
max-width: 440px;
margin: 0 auto;
position: relative;

@media (min-width: 832px) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 40px;

  &.fans-want {
    padding-bottom: 2px;
    padding-top: 15px;
  }
  &.select-category {
    padding-bottom: 0;
  }
}

.select__value-container {
  padding: 7px 0px 0 !important;
  @media (max-width: 831px) {
    padding: 10px 0 0 !important;
  }
}
.basic-multi-select{
  max-width: 314px;
  margin: 0 auto;
}
.input-label {
  font-size: 18px !important;
  white-space: pre-line;
  line-height: 25px;
  top: -10px;
  &.input-label-shrink {
    font-size: 13px !important;
    line-height: 18px;
    color: #555 !important;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  + div {
    margin-top: 24px;
    @media (min-width: 832px) {
      margin-top: 28px;
    }
  }
}
.select__clear-indicator {
  svg {
    cursor: pointer;
  }
}
.MuiFormControl {
  width: 100%;
  margin-bottom: 12px;

  > div {
    &:before {
      border-bottom: 2px solid #aaa;
    }
    &:after {
      border-bottom: 0;
    }
  }
  input {
    padding-bottom: 14px;
  }
  label {
    font-size: 18px;
    color: #b7b7b7;
    font-family: Gilroy;
  }
  label[data-shrink='true'] {
    color: #555;
  }
}
`;
UploadContainer.Item = styled.li`
  font-size: 22px;
  font-family: Gilroy;
  cursor: pointer;
  padding: 0 0 28px;
  background-color: ${props =>
    props.selected ? props.theme.flatBlue : '#fff'};
  color: ${props => (props.selected ? '#fff' : '#555')} !important;

  &.categoryItem {
    background-color: #fff;
    color: ${props => (props.selected ? props.theme.flatBlue : '#999')} !important;
    font-family: ${props => (props.selected ? 'Gilroy-Medium' : 'Gilroy')};
  }
`;
UploadContainer.BrowseCategoryWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 3;
  max-height: 620px;
  height: 100%;
  top: 0;
  ${UploadContainer.Heading} {
    padding-top: 27px;
    @media (min-width: 832px) {
      padding-top: 52px;
    }
  }
`;
UploadContainer.Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy';
  padding-top: 22px;

  
  @media (min-width: 832px) {
    &.fans-want {
      & ~.upload-wrap {
        padding-top: 58px;
        padding-bottom: 0;
        margin-bottom: 57px
      }
    }
    &.select-category {
      & ~.upload-wrap {
        padding-bottom: 0;
        margin-bottom: 15px
      }
    }
  }
  @media (max-width: 831px) {
    padding-top: 31px;
    margin: 0 auto 9px;
    &.fans-want {
      max-width: 190px;
      & ~.upload-wrap {
        margin-bottom: 30px
      }
    }
    &.select-category {
      max-width: 260px;
      white-space: pre-line;
      & ~.upload-wrap {
        margin-bottom: 30px
      }
    }
  }
`;

UploadContainer.BrowseCategoryContainer = styled.div`
  display: flex;
  padding: 50px 40px 20px 70px;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }

  .right-section {
    display: flex;
    flex-direction: column;
    height: 525px;
    width: 100%;
  }
  .subCategoryHeading {
    color: #555;
    font-family: Gilroy-SemiBold;
    font-size: 19px;
    line-height: 23px;
    margin-bottom: 10px;
    max-width: 270px;
    span {
      font-family: Gilroy-Light;
      font-size: 14px;
      display: block;
    }
  }
`;

UploadContainer.DesktopView = styled.div`
  display: none;
  @media (min-width: 832px) {
    display: block;
  }
`;

UploadContainer.MobileView = styled.div`
  display: block;
  max-width: 317px;
  margin: 0 auto;
  ${UploadContainer.BrowseCategoryContainer} {
    padding: 4px 20px 10px;
    display: block;
    ${media.mobileView} {
      padding: 30px 20px 10px;
    }

    &.mobile-select-category .select__indicators {
      display: none;
    }
  }
  ${UploadContainer.Heading} {
    padding-top: 70px;
    max-width: 253px;
    white-space: pre-line;
    margin: 0 auto 11px;
  }
  .select-input {
    margin-top: 18px;
  }

  @media (min-width: 832px) {
    display: none;
  }
`;

UploadContainer.BrowseCategoriesLink = styled.span`
  color: #46829a;
  font-family: Gilroy-Medium;
  cursor: pointer;
`;

UploadContainer.BrowseCategories = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: Gilroy;
  margin-top: 10px;
  color:#555555;
  @media (max-width: 831px) {
    color: #b7b7b7;
  }
  .select__multi-value {
    margin-top: 6px;
  }
  .select__multi-value__label {
    font-family: Gilroy-Medium;
    font-size: 16px;
    line-height: 18px;
    padding: 5px 5px 3px 0;
  }
`;

UploadContainer.Wrapper = styled.div`
  .basic-multi-select {
    label {
    }
  }

  .error-msg {
    font-size: 14px;
    margin-bottom: 10px;
    color: #990000;
  }
`;

UploadContainer.ButtonWrapper = styled.div`
  margin-top: 0;
  text-align: center;
  padding-bottom: 20px;
  @media (max-width: 831px) {
    margin-top: 20px;
  }
`;

Layout.ButtonWrapper = styled.div`
  margin-top: 25px;
`;


export const Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy';
  padding-top: 61px;
  @media (max-width: 831px) {
    padding-top: 23px;
    max-width: 230px;
    margin: 0 auto 10.2px;
    line-height: 28px;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
  @media (max-width: 831px) {
    height: max-content;
  } 
`;