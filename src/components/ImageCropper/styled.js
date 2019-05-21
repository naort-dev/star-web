import styled from 'styled-components';

const CropperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media(min-width: 832px) {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
  .ReactCrop {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 100%;
  }
`;

CropperStyled.ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media(max-width: 831px){
    margin-top: 96px;
  }
  @media(min-width: 832px){
    transform: translateY(-50%);
  }
`;
CropperStyled.CropperLightButton = styled.button`
  cursor: pointer;
  background-color: #ededed;
  font-family: Gilroy-Medium;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #2f839d;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  border-radius: 30px;
  min-width: 170px;
  height: 60px;
  outline: none;
  position: relative;
  &:hover {
    background-color: #2f839d;
    color: #ededed;
  }
`;
CropperStyled.CropperButton = styled.button`
  cursor: pointer;
  background-color: #2f839d;
  font-family: Gilroy-Medium;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 30px;
  min-width: 250px;
  height: 60px;
  outline: none;
  border: none;
  margin: 0 17px;
  &:hover {
    background-color: #ededed;
    color: #2f839d;
  }
`;

CropperStyled.UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;

CropperStyled.CropperCancel = styled.span`
  display: block;
  padding: 11px 25px;
  color: #fff;
  cursor: pointer;
`;

export default CropperStyled;
