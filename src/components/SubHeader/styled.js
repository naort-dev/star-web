import styled from 'styled-components';

export const SubHeaderWrap = styled.div`
  .head1 {
    color: ${props =>
      props.headercolor ? `props.theme.${props.headercolor}` : '#999999'};
    font-size: ${props => (props.size ? props.size : '30px')};
    font-family: Gilroy-Light;
    text-align: center;
    padding-top: 34px;
    padding-bottom: 30px;
  }
  .arrow-head {
    width: 14px;
    height: 28px;
    top: 100px;
  }
`;
