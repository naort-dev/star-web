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
`;

CropperStyled.ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

CropperStyled.CropperButton = styled.div`
  background-color: #FF6C58;
  color: rgb(255,255,255);
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Bold;
  cursor: pointer;
  padding: 7px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
  margin-right: 20px;
  margin-top: 10px;
  &:hover {
    background-color: #FF3B21;
  }
`;

CropperStyled.CropperCancel = styled.span`
  display: block;
  padding: 11px 25px;
  color: #fff;
  cursor: pointer;
`;

export default CropperStyled;
