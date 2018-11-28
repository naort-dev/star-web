import styled from 'styled-components';

const RowStyled = styled.li`
  padding-right: 15px;
  padding-bottom: 20px;
  margin-bottom: 5px;
  padding-top: 10px;
  border-bottom: 1px solid #D8D8D8;
  position: relative;
  width: 100%;
`;

RowStyled.ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 768px) {
    padding-left: 10px;
    flex-direction: row;
    align-items: center;
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
  word-break: break-word;
  @media(min-width: 768px) {
    font-size: 15px;
  }
`;

RowStyled.ControlWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  @media(min-width: 768px) {
    margin-top: 0;
    justify-content: flex-start;
  }
`;

RowStyled.ControlButton = styled.button`
  background-color: ${props => (props.alternate ? '#fff' : '#FF6C58')};
  color: ${props => (props.alternate ? '#333333' : 'rgb(255,255,255)')};
  text-align: center;
  display: inline-block;
  font-size: 14px;
  position: relative;
  font-family: Avenir-Regular;
  cursor: pointer;
  height: 40px;
  padding: 8px 25px;
  text-decoration: none;
  outline: none;
  border-radius: 20px;
  border: ${props => (props.alternate ? '1px solid' : '2px solid')};
  border-color: ${props => (props.alternate ? '#333333' : '#FF6C58')};
  border-image: initial;
  margin-left: 10px;
  @media(min-width: 768px) {
    width: auto;
    padding: 8px 25px;
    height: 37px;
  }
  &:hover {
    background-color: ${props => (props.alternate ? '#fff' : '#FF3B21')};
  }
  &:disabled {
    background-color: #D8D8D8;
    color: #676767;
    border-color: #D8D8D8;
  }
`;

RowStyled.RequestedButton = RowStyled.ControlButton.extend`
  background-color: #fff;
  color: #FF6C58;
  border-width: 1px;
  border-color: #FF6C58;
  &:hover {
    background-color: #fff;
  }
`;

RowStyled.ButtonOverlay = styled.span`
  position: absolute;
  bottom: -41px;
  left: 0;
  right: 0;
  background: #fff;
  padding: 5px;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  &::after {
    content: "";
    border-bottom: 5px solid #CCCCCC;
    position: absolute;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    width: 0;
    height: 0;
    right: 49px;
    bottom: 28px;;
  }
`;

export default RowStyled;
