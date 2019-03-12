import styled, { keyframes } from 'styled-components';

const menuEnter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ListStyled = styled.section`
  padding: 0 16px;
  padding-right: 10px;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  .infinite-scroll-component {
    overflow: initial !important;
  }
  @media(min-width: 768px) {
    padding: 0 44px;
    padding-right: 38px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  @media(min-width: 1025px) {
    padding: 0;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  @media(min-width: 1920px) {
    padding-top: 32px;
  }
`;

ListStyled.Banner = styled.div`
  cursor: pointer;
  background: url('assets/images/banner-background.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  width: calc(100% - 11px);
  margin-bottom: 15px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  @media(min-width: 768px) {
    width: calc(100% - 17px);
    height: 128px;
    padding-right: 56px;
  }
  @media(min-width: 1025px) {
    width: calc(100% - 13px);
  }
  @media(min-width: 1920px) {
    height: 180px;
  }
`;

ListStyled.BannerHeading = styled.span`
  font-family: 'Avenir-Bold';
  display: block;
  font-size: 16px;
  color: white;
  @media(min-width: 768px) {
    font-size: 22px;
  }
  @media(min-width: 1025px) {
    font-size: 27px;
    padding: 18px 24px;
  }
  @media(min-width: 1920px) {
    font-size: 37px;
  }
`;

ListStyled.BannerSubHeading = styled.span`
  display: block;
  font-family: 'Avenir-Regular';
  font-size: 16px;
  margin-top: 5px;
  @media(min-width: 768px) {
    font-size: 20px;
  }
  @media(min-width: 1025px) {
    font-size: 26px;
  }
  @media(min-width: 1920px) {
    font-size: 34px;
  }
`;

ListStyled.BannerPlayButton = styled.img`
  display: inline-block;
  width: 33px;
  height: 32px;
  @media(min-width: 768px) {
    width: 47px;
    height: 46px;
  }
`;

ListStyled.SearchContainer = styled.span`
  font-size: 16px;
  font-family: 'Avenir-Medium';
  margin-bottom: 15px;
  display: inline-block;
  span {
    color: #FF6C58;
  }
`;

ListStyled.NoDataText = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

ListStyled.listWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: calc(100% - 10px);
  @media(min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  @media(min-width: 1025px) {
    margin-right: 15px;
  }
`;

ListStyled.listItem = styled.li`
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;
  padding-left: 0;
  animation: ${menuEnter} 0.2s linear;
  @media(min-width: 768px) {
    width: calc(50% - 14px);
    margin-right: 20px;
    &:nth-child(even) {
      margin-right: 0;
    }
  }

  @media(min-width: 1025px) {
    width: calc((100% / 3) - 14px);
    margin-bottom: 30px;
    &:nth-child(even) {
      margin-right: 20px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

ListStyled.listRequests = styled.li`
  animation: ${menuEnter} 0.2s linear;
  width: 100%;
  padding-bottom: 20px;
`;

ListStyled.listVideos = ListStyled.listItem.extend`
  width: calc(50% - 7px);
  margin-right: 10px;
  &:nth-child(even) {
    margin-right: 0;
  }
  @media(min-width: 768px) {
    padding: 0;
    width: calc((100% / 3) - 30px);
    margin-right: 40px;
    &:nth-child(even) {
      margin-right: 40px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  @media(min-width: 1025px) {
    padding: 0;
    width: ${props => (props.starsPage ? 'calc(85% / 3)' : 'calc(90% / 4)')};
    margin-right: ${props => (props.starsPage ? 'calc(15% / 2)' : 'calc(10% / 3)')};
    &:nth-child(even), &:nth-child(3n) {
      margin-right: ${props => (props.starsPage ? 'calc(15% / 2)' : 'calc(10% / 3)')};
    }
    &:nth-child(3n) {
      margin-right: ${props => (props.starsPage ? '0 !important' : 'calc(10% / 3)')};
    }
    &:nth-child(4n) {
      margin-right: ${props => (props.starsPage ? 'calc(15% / 2)' : 0)};
    }
  }
  @media ((min-device-width: 1025px) and (-ms-high-contrast: none) and (-ms-high-contrast: active)) {
    width: ${props => (props.starsPage ? 'calc(85% / 3)' : 'calc(80% / 4)')};
  } 
  
`;

ListStyled.VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
`;

export default ListStyled;
