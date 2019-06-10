import styled from 'styled-components';

const ListingStyled = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;
  height: 100%;
  padding-top: 30px;

  @media(min-width: 832px){
    margin-left: -59px;
  }

  @media(min-width: 1280px) {
    padding-top: 30px;
    margin-left: -55px;
  }
`;

ListingStyled.Content = styled.li`
  display: flex;
  padding-bottom: 35px;
  flex: 1 0 calc(33.33% - 20px);
  margin-left: 20px;
  justify-content: center;
  

  @media(min-width: 832px) {
    flex: 1 0 calc(33.33% - 59px);
    margin-left: 59px;
  }
  
  @media(min-width: 1280px) {
    flex: 1 0 calc(20% - 55px);
    margin-left: 55px;
  }
`;

ListingStyled.NoDataText = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: Gilroy-Medium;
`;

ListingStyled.LoadingIcon = styled.span`
  width: 100px;
  height: 100px;
  display: block;
  background: url('assets/images/starloader_mobile.png') no-repeat;
  background-size: contain;
  @media(min-width: 832px) {
    background: url('assets/images/starloader_web.png') no-repeat;
    background-size: contain;
    width: 200px;
    height: 200px;
  }
`;

export default ListingStyled;
