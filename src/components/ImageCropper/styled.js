import styled from 'styled-components';

const CropperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 80%;
  @media(min-width: 768px) {
    width: 100%;
  }
  @media(min-width: 1025px) {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
  .ReactCrop {
    width: 100%;
    min-height: 498px;
    // max-height: 70vh;
    // overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .ReactCrop__image {
      max-height: fit-content !important;
    }
  }
`;

CropperStyled.ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  transform: translateY(-50%);
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
  border-radius: 30px;
  min-width: 170px;
  height: 60px;
  outline: none;
  border: 0px;
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
  margin: 0 17px;
  border: 0px;
  &:hover {
    background-color: #ededed;
    color: #2f839d;
  }
`;

CropperStyled.CropperCancel = styled.span`
  display: block;
  padding: 11px 25px;
  color: #fff;
  cursor: pointer;
`;

export default CropperStyled;
