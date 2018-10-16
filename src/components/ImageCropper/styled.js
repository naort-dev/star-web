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

CropperStyled.CropperButton = styled.div`
  background-color: white;
  margin-top: 10px;
  color: #FF6C58;
  padding: 4px 30px;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #FF6C58;
`;

export default CropperStyled
;
