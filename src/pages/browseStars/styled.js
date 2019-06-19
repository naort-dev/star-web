import styled from 'styled-components';

const CategoryPageStyled = styled.div`
  margin-top: 160px;
  height: calc(100vh - 160px);
  
  @media(min-width: 832px) and (max-width: 1280px) {
    margin-top: 235px;
    height: calc(100vh - 235px);
  }
  @media(min-width: 1281px) {
    margin-top: 260px;
    height: auto;
  }
  @media(min-width: 1280px) {
    margin-top: 151px;
  }
`;

CategoryPageStyled.CategoryName = styled.span`
  font-family: Gilroy-Bold;
  font-size: 20px;
  line-height: 21px;
  width: calc(100% - 42px);
  color: ${props => props.theme.flatBlue};
  text-transform: uppercase;
`;

CategoryPageStyled.FilterList = styled.span`
  display: block;
  width: 100%;
  font-family: Gilroy-Light;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.greyishBrown};
  text-transform: capitalize;
  padding-right: 30px;
`;

CategoryPageStyled.Filter = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  text-align: center;
  &:after {
    content: ${props => `'${props.title}'`};
    margin-top: 5px;
    display: block;
  }
`;

CategoryPageStyled.AvatarWrapper = styled.div`
  z-index: 3;
  &.featured {
    display: none;
  }
  &.secondary {
    display: ${props => (props.disableMobile ? 'none' : 'block')};
    &.top-two {
      @media(min-width: 832px) {
        margin-top: 24px;
      }
      @media(min-width: 1280px) {
        margin-top: 0;
      }
    }
  }
  @media(min-width: 832px) {
    &.featured {
      display: block;
      position: absolute;
      left: 33px;
      top: calc(100% - 345px);
      padding: 0 6px;
      //background: ${props => props.theme.white};

      .name {
        line-height: 42px;
        margin-bottom: 11px;
      }
      .play-button {
        bottom: 16px;
      }
    }
    &.secondary {
      display: ${props => (props.disableIpad ? 'none' : 'block')};
    }
  }
  @media(min-width: 1280px) {
    &.secondary {
      display: block;
      padding-right: 61px;
      margin-bottom: -17px;
    }
  }
`;

CategoryPageStyled.FilterSection = styled.div`
  position: fixed;
  padding-top: 12px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 13;
  background: #fff;
  display: block;
  @media(min-width: 832px) {
    background: transparent;
    position: static;
    z-index: 1;
    ${props => props.fixedContent && `
      position: fixed;
      top: ${props.headerRef && props.headerRef.current ? `${props.headerRef.current.clientHeight}px` : '138px'};
      bottom: initial;
      background: ${props.theme.white};
      max-width: 100%;
      box-shadow: 0 8px 6px -6px #00000029;
    `}
    display: block;
  }
  @media(min-width: 1280px) {
    max-width: 1246px;
    margin: 0 auto;
    ${props => props.fixedContent && `
      max-width: 100%;
    `}
  }
  @media(min-width: 832px) and (max-width: 1280px) {
    margin-top: -3px;
    padding-top: 13px;
  }
`;

CategoryPageStyled.StarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  display: none;
  @media(min-width: 832px) {
    display: block;
  }
`;

CategoryPageStyled.Heading = styled.span`
  display: block;
  margin-top: 0;
  font-family: Gilroy-Medium;
  font-size: 26px;
  text-align: center;
  color: ${props => props.theme.twilight};
  min-height: 32px;
  @media(min-width: 832px) {
    font-size: 50px;
    max-width: 692px;
    line-height: 50px;
    margin: 22px auto 0px;
  }
  @media(min-width: 1280px) {
    margin-top: 20px;
    max-width: 100%;
    letter-spacing: -1px;
  }
`;

CategoryPageStyled.FeaturedSection = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  border: ${props => `1px solid #555`}
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 23px 8px;
  max-width: 375px;
  margin: 0 auto;
  margin-top: 24px;
  z-index: 1;

  @media(max-width: 832px) {
    margin-top: 16px;
  }



  &:before {
    @media(min-width: 832px) {
      content: '';
      position: absolute;
      height:10px;
      bottom:-5px;
      left: 63px;
      background:${props => props.theme.white};
      width: 225px;
    }
  }

  &:after {
    content: ${props => `'${props.heading}'`};
    position: absolute;
    text-transform: uppercase;
    top: -7px;
    line-height: 21px;
    text-align: center;
    left: 50%;
    font-family: Gilroy-Semibold;
    font-size: 14px;
    color: ${props => props.theme.orangePink};
    transform: translateX(-50%);
    background: #fff;
    padding: 0 20px;
    white-space: nowrap;
  }
  @media(min-width: 832px) {
    max-width: 832px;
    margin-bottom: 88px;
    margin-top: 38px;
    justify-content: flex-end;
    padding: 27px 42px 38px;
    height: 357px;
    &:after {
      transform: translateX(0);
      left: 18px;
      font-size: 20px;
      background: ${props => props.theme.white};
    }
  }
  @media(min-width: 1280px) {
    max-width: 1246px;
    margin-bottom: 30px;
    padding-top: 45px;
    padding-bottom: 57px;
    padding-right: 0;
    margin-top: 20px;
  }

  @media (min-width: 832px) and (max-width: 1280px) {
    margin-bottom: 30px;
    padding-bottom: 57px;
  }
`;

CategoryPageStyled.Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 2;
  top: ${props => `${props.headerRef && props.headerRef.current && props.headerRef.current.clientHeight}px`};
  @media(min-width: 832px) {
    display: none;
  }
`;

CategoryPageStyled.Content = styled.div`
  //height: 100%;
  padding: 16px;
  position: relative;
  @media(min-width: 832px) {
    padding: 12px 16px;
    overflow: initial;
    background: ${props => props.theme.white};
  }
`;

CategoryPageStyled.FeaturedWrapper = styled.div`

`;

CategoryPageStyled.MainContent = styled.div`
  @media(min-width: 832px) {
    ${props => props.fixedContent && props.padding && `
      padding-top: ${props.padding}px;
    `}
  }
  .subcategory-list {
    margin-top: 0;
  }
  &.fixed-filter {
    .subcategory-list {
      margin-bottom: 5px;
      padding: 0 16px;

      & + div {
        margin-top: 0;
      }
    }
  }
`;

CategoryPageStyled.ListingWrapper = styled.div`
  max-width: 375px;
  margin: 0 auto;
  @media(min-width: 832px) {
    max-width: 832px;
  }
  @media(min-width: 1280px) {
    max-width: 1246px;
  }
`;

CategoryPageStyled.Footer = styled.div`
  display: none;
  @media(min-width: 832px) {
    display: block;
  }
`;

export default CategoryPageStyled;
