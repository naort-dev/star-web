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
  overflow: auto;
  padding-top: 20px;
  padding-bottom: 20px;
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
  background: url('assets/images/banner-background.png') no-repeat;
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
  @media(min-width: 1920px) {
    height: 180px;
  }
`;

ListStyled.BannerHeading = styled.span`
  font-family: 'Ubuntu-Bold';
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
  font-family: 'Ubuntu-Regular';
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
  cursor: pointer;
  width: 33px;
  height: 32px;
  @media(min-width: 768px) {
    width: 47px;
    height: 46px;
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
    width: auto;
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
`;

ListStyled.VideoContentWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  max-width: 100%;
  margin: 0 10px;
  cursor: initial;
  @media(min-width: 768px) {
    display: flex;
  }
`;

ListStyled.VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
`;

ListStyled.SocialMediaWrapper = styled.div`
  position: absolute;
  transition: 0.2s bottom ease-out;
  padding: 10px;
  background: #fff;
  left: 0;
  right: 0;
  bottom: ${props => (props.visible ? '10px' : '-100%')};
  @media(min-width: 768px) {
    position: absolute;
    background: transparent;
    width: 50px;
    bottom: 0;
    top: 0;
    display: ${props => (props.visible ? 'block' : 'none')};
    right: ${props => (props.visible ? '-52px' : '0')};
    left: initial;
  }
`;

ListStyled.Somenetwork = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-right: 30px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
`;

ListStyled.VideoContent = styled.section`
  padding: 10px;
  background-color: rgba(0,0,0,.5);
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

ListStyled.VideoTitle = styled.span`
  display: block;
  color: #fff;
  font-size: 11px;
  font-family: 'Ubuntu-Regular';
`;

ListStyled.ShareButton = styled.span`
  padding-top: 10px;
  color: #fff;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: url( 'assets/images/icons8-share-50.svg' ) no-repeat left;
`;

ListStyled.VideoRequester = styled.div`
  display: flex;
  justify-content: space-between;
`;
ListStyled.VideoRequestImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:40px;
  border: solid 2px #FFFFFF;
  box-shadow: 2px 2px 9px #4f4f4f;
  width:40px;
  position: relative;
  margin-right: 11px;
  @media(min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media(min-width: 1025px) {
    width: 35px;
    height: 35px;
    margin-right: 11px;
  }
`;
ListStyled.VideoRequestName = styled.span`
  display: inline-block;
  color: #fff;
  font-size: 16px;
  font-family: 'Ubuntu-Regular';
  vertical-align: top;
  padding-top: 5px;
  @media(min-width: 1025px) {
    padding-top: 9px;
    font-size: 14px;
  }
`;
ListStyled.SliderArrows = styled.span`
  width: 30px;
  height: 30px;
  border-color: #000;
  position: absolute;
  top: 50%;
  margin-top: -31px;
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  @media(min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

ListStyled.LeftSliderArrow = ListStyled.SliderArrows.extend`
  border-bottom: 6px solid;
  border-left: 6px solid;
  transform: rotate(45deg);
  left: 15px;
`;

ListStyled.RightSliderArrow = ListStyled.SliderArrows.extend`
  border-bottom: 6px solid;
  border-left: 6px solid;
  transform: rotate(-135deg);
  right: 15px;
`;


export default ListStyled;
