import styled from 'styled-components';

const FooterStyled = styled.footer`
  padding: 20px 0;
  @media(min-width: 768px) and (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    border-top: 1px solid #CCCCCC;
  }
  @media(min-width: 1025px) {
    display: flex;
    padding: 20px 51px;
    height: 124px;
  }
`;

const Column = styled.div`
  width: 80%;
  display: flex;
`;

const List = styled.ul`
  padding: 20px 0;
  line-height: 30px;
  @media(min-width: 768px) and (max-width: 1024px) {
    padding: 10px 0;
    line-height: 42px;
    display: flex;
    flex-wrap: wrap;
    width: 40%;
  }
  @media(min-width: 1025px) {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
`;

const ListItem = styled.li`
  padding: 0 15px;
  font-family: 'Avenir-Heavy';
  cursor: pointer;
  text-align: left;
  a, a:visited {
    color: #42a3c1;
    font-size: 14px;
    font-weight: 900;
    line-height: 1.07;
    display: block;
  }
  @media(min-width: 768px) and (max-width: 1024px) {
    padding: 0 10px;
  }
  @media(min-width: 1025px) {
    padding: 0 32px;
    font-size: 12px;
  }
`;

const shareIconWrapper = styled.div`
  margin: 0 40px;
  @media(min-width: 768px) and (max-width: 1024px) {
    display: inline-block;
    margin: 0;
    margin-top: 10px;
  }
  @media(min-width: 1025px) {
    margin: 0;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0;
    a {
      font-size: 32px;
      display: block;
      margin-right: 25px;
      color: ${props => props.theme.brownGrey};
    }
  }
`;

const shareIcon = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 10px;
  margin-left: 0;
  display: inline-block;
`;

const StoreIconWrapper = styled.div`
  margin: 0 40px;
  @media(min-width: 768px) and (max-width: 1024px) {
    display: inline-block;
    margin: 0;
  }
  @media(min-width: 1025px) {
    margin: 0;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 20px;
    margin-right: 0;
    width: 20%;
    justify-content: flex-end;
  }
`;

const StoreIcon = styled.img`
  cursor: pointer;
  width: 117px;
  height: 40px;
  margin: 10px 0;
  display: inline-block;
`;
FooterStyled.Anchor = styled.a`
  &:visited{
    color:#333333;
  }
  color: #333333;
`;
FooterStyled.Column = Column;
FooterStyled.list = List;
FooterStyled.listItem = ListItem;
FooterStyled.StoreIconWrapper = StoreIconWrapper;
FooterStyled.StoreIcon = StoreIcon;
FooterStyled.shareIconWrapper = shareIconWrapper;
FooterStyled.shareIcon = shareIcon;


export { FooterStyled };
