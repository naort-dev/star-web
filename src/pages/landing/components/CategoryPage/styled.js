import styled from 'styled-components';

const CategoryPageStyled = styled.div`
  margin-top: 120px;
  height: calc(100vh - 120px);
  overflow: hidden;
  @media(min-width: 832px) {
    margin-top: 260px;
    height: auto;
  }
`;

CategoryPageStyled.CategoryName = styled.span`
  font-family: Gilroy-Bold;
  font-size: 20px;
  line-height: 38px;
  color: ${props => props.theme.flatBlue};
  text-transform: uppercase;
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
  &.featured {
    display: none;
  }
  @media(min-width: 832px) {
    &.featured {
      display: block;
      position: absolute;
      left: 33px;
      top: calc(100% - 310px);
      padding: 0 10px;
      background: #fff;
    }
    &.secondary {
      display: ${props => (props.disableIpad ? 'none' : 'block')};
    }
  }
  @media(min-width: 1280px) {
    &.secondary {
      display: block;
    }
  }
`;

CategoryPageStyled.FilterSection = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background: #fff;
  display: ${props => (props.showFilter ? 'block' : 'none')};
  @media(min-width: 832px) {
    position: static;
    display: block;
  }
`;

CategoryPageStyled.Heading = styled.span`
  display: block;
  margin-top: 24px;
  font-family: Gilroy-Medium;
  font-size: 26px;
  text-align: center;
  color: ${props => props.theme.twilight};
  @media(min-width: 832px) {
    font-size: 56px;
  }
`;

CategoryPageStyled.FeaturedSection = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  border: ${props => `1px solid ${props.theme.brownGrey}`}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 23px;
  max-width: 375px;
  margin: 0 auto;
  margin-top: 24px;
  &:after {
    content: ${props => `'${props.title}'`};
    position: absolute;
    text-transform: uppercase;
    top: -7px;
    text-align: center;
    left: 50%;
    font-family: Gilroy-Bold;
    font-size: 14px;
    color: ${props => props.theme.orangePink};
    transform: translateX(-50%);
    background: #fff;
    padding: 0 20px;
  }
  @media(min-width: 832px) {
    max-width: 832px;
    margin-bottom: 112px;
    justify-content: flex-end;
    padding: 58px 42px;
    &:after {
      left: 198px;
      font-size: 23px;
    }
  }
  @media(min-width: 1280px) {
    max-width: 1280px;
  }
`;

CategoryPageStyled.Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 16px;
  @media(min-width: 832px) {
    display: none;
  }
`;

CategoryPageStyled.Content = styled.div`
  height: calc(100% - 40px);
  padding: 12px 16px;
  overflow: auto;
`;

CategoryPageStyled.FeaturedWrapper = styled.div`

`;

CategoryPageStyled.ListingWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default CategoryPageStyled;
