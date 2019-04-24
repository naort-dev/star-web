import styled from 'styled-components';

const QuickViewStyled = styled.div`
  display: flex;
  padding-top: 19px;
`;

QuickViewStyled.VideoContainer = styled.div`
  width: 300.5px;
  height: 484.5px;
`;

QuickViewStyled.Content = styled.div`
  padding: 30px 25px 0;
  width: calc(100% - 300.5px);
`;

QuickViewStyled.Categories = styled.span`
  font-family: Gilroy-Light;
  font-size: 24px;
  color: ${props => props.theme.twilight};
`;

QuickViewStyled.StarName = styled.span`
  font-family: Gilroy-Regular;
  font-size: 74px;
  display: block;
  color: ${props => props.theme.twilight};
`;

export default QuickViewStyled;
