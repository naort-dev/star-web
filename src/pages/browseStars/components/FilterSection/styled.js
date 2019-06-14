import styled from 'styled-components';

const FilterStyled = styled.div`
  padding: 12px 0;
  padding-top: 0;
  background: #fff;
  @media(min-width: 832px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: transparent;
  }
  .fixed-filter & {
    @media(min-width: 832px) {
      max-width: 1246px;
      margin: 0 auto;
    }
  }
`;

FilterStyled.Header = styled.div`
  padding: 12px 16px;
  @media(min-width: 832px) {
    display: none;
  }
  .filter-header {
    div:last-child {
      margin-top: -3px;
    }
    .filter-logo {
      margin-top: -10px;
    }
  }
`;

FilterStyled.CloseButton = styled.span`
  font-size: 30px;
  color: ${props => (props.theme.flatBlue)};
`;

FilterStyled.Heading = styled.span`
  padding: 0 16px;
  font-family: Gilroy-Bold;
  font-size: 20px;
  color: ${props => props.theme.twilight};
  display: ${props => (props.mobileOnly ? 'block' : 'none')};
  text-transform:  ${props => (props.mobileOnly ? 'uppercase' : 'none')};;
  &.filter-heading {
    color: #2f839d;
  }
  @media(min-width: 832px) {
    display: ${props => (props.mobileOnly ? 'none' : 'block')};
    font-size: 30px;
    font-family: Gilroy;
  }
`;

FilterStyled.Content = styled.div`
  padding: 0;
  height: calc(100vh - 100px);
  overflow: auto;
  width: 100%;
  @media(min-width: 832px) {
    height: auto;
    overflow: initial;
  }
  @media(max-width: 832px) {
    padding: 0 0 25px;
  }
`;

FilterStyled.SubCategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 21px;
  padding: 0;
  margin-bottom: 13px;
  @media(min-width: 832px) {
    margin-bottom: 5px;
  }
  @media(max-width: 832px) {
    padding: 0 25px;
  }
`;

FilterStyled.SubCategoryItem = styled.li`
  padding: 1px 15px 0;
  border-radius: 15px;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  background-color: ${props => (props.selected ? props.theme.flatBlue : '#fff')};
  color: ${props => (props.selected ? '#fff' : props.theme.greyishBrown)}
  display: flex;
  font-family: Gilroy-medium;
  font-size: 12px;
  line-height: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

FilterStyled.ApplyButton = styled.span`
  .controlButton {
    width: 233px;
    min-width: 233px;
  }
  text-align: center;
  margin: 45px auto;

  @media(min-width: 832px) {
    display: none;
  }
`;

FilterStyled.SecondaryFilterWrapper = styled.div`
  margin: 20px 40px 0;
  display: flex;
  flex-direction: column;
  border-top: ${props => `1px solid ${props.theme.brownGrey}`};
  @media(min-width: 832px) {
    flex-direction: row;
    max-width: 832px;
    margin: 0 auto;
  }
  @media(min-width: 1280px) {
    max-width: 1246px;
    margin: 0 auto;
  }
`;

FilterStyled.SecondaryFilter = styled.div`
  margin-top: 10px;
  @media(min-width: 832px) {
    display: flex;
    align-items: center;
    margin-right: 33px;
  }
`;


FilterStyled.FilterHeading = styled.span`
  font-family: Gilroy-Bold;
  color: ${props => props.theme.greyishBrown};
  font-size: 14px;
  display: block;
  margin-right: 10px;
  @media(min-width: 832px) {
    display: inline-block;
    margin-right: 20px;
  }
`;

FilterStyled.SortHeading = FilterStyled.FilterHeading.extend`
  display: inline-block;
`;

export default FilterStyled;
