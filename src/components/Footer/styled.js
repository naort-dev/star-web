import styled from 'styled-components';

const FooterStyled = styled.footer`
  padding: 20px 0;
  @media(min-width: 768px) and (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 40px;
    border-top: 1px solid #CCCCCC;
  }
  @media(min-width: 1025px) {
    display: flex;
    flex-direction: column;
  }
`;

const Separator = styled.span`
  border-top: 1px solid #CCCCCC;
  display: block;
  margin: 0 40px;
  @media(min-width: 768px) {
    display: none;
  }
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
  }
`;

const ListItem = styled.li`
  padding: 0 40px;
  font-family: 'Ubuntu-Regular';
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #FF6C58;
    background-color: #F8F8F8;
  }
  @media(min-width: 768px) and (max-width: 1024px) {
    opacity: 0.5;
    padding: 0 10px;
  }
  @media(min-width: 1025px) {
    font-size: 12px;
  }
`;

const DownloadLabel = styled.div`
  display: none;
  @media(min-width: 1025px) {
    display: block;
    font-family: 'Ubuntu-Bold';
    color: #333333;
    font-size: 12px;
    margin: 0;
    margin: 0 20px;
    order: 1;
    span {
      display: inline-block;
    }
    &::before, &::after {
      content: '';
      display: inline-block;
      height: 1px;
      background-color: #ccc;
      vertical-align: middle;
      width: 50px;
      width: calc(50% - 69px);
    }
    &::before {
      margin-right: 10px;
    }
    &::after {
      margin-left: 10px;
    }
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
    order:3;
    text-align: center;
    margin: 0 20px;
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
    order: 2;
    text-align: center;
    margin: 0 20px;
  }
`;

const StoreIcon = styled.img`
  cursor: pointer;
  width: 117px;
  height: 40px;
  margin: 10px;
  margin-left: 0;
  display: inline-block;
`;

FooterStyled.list = List;
FooterStyled.listItem = ListItem;
FooterStyled.Separator = Separator;
FooterStyled.DownloadLabel = DownloadLabel;
FooterStyled.StoreIconWrapper = StoreIconWrapper;
FooterStyled.StoreIcon = StoreIcon;
FooterStyled.shareIconWrapper = shareIconWrapper;
FooterStyled.shareIcon = shareIcon;

export { FooterStyled };
