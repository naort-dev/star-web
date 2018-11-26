import styled from 'styled-components';

const RowStyled = styled.div`
  padding-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #D8D8D8;
  position: relative;
`;

RowStyled.ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 768px) {
    padding-left: 10px;
  }
`;

RowStyled.ProfileDetailWrapper = styled.span`
  display: block;
  width: 100%;
  @media(min-width: 1920px) {
    padding-top: 6px;
  }
`;

RowStyled.ProfileImageWrapper = styled.span`
  display: inline-block;
  vertical-align: top;
`;

RowStyled.ProfileImage = styled.span`
  border-radius: 50%;
  display: block;
  background-image: ${props => (props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height: 60px;
  width: 60px;
  position: relative;
  @media(min-width: 768px) {
    height:70px;
    width:70px;
  }
  @media(min-width: 1025px) {
    height:80px;
    width:80px;
  }
`;

RowStyled.DetailWrapper = styled.span`
  line-height: 18px;
  position: relative;
  display: inline-block;
  width: calc(100% - 60px);
  vertical-align: middle;
  padding-left: 11px;
  padding-top: 10px;
  @media(min-width: 768px) {
    width: calc(100% - 70px);
  }
  @media(min-width: 1025px) {
    width: calc(100% - 80px);
  }
`;

RowStyled.StarName = styled.span`
  font-size: 16px;
  color:#333333;
  font-family: 'Avenir-Regular';
  @media(min-width: 768px) {
    display: inline-block;
  }
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;

RowStyled.DetailItem = styled.span`
  display: block;
  font-size: 14px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Avenir-Light';
  @media(min-width: 768px) {
    font-size: 15px;
  }
`;

export default RowStyled;
