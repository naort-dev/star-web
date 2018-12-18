import styled from 'styled-components';

const MultiSelectStyled = styled.div`

`;

MultiSelectStyled.SelectField = styled.input`
  font-family: 'Avenir-Regular';
  color: #333333;
  font-size: 14px;
  display: block;
  text-align:left;
  outline:none;
  width: 100%;
  height: 80px;
  margin: 4px 0;
  padding: 8px 8px;
  background-color: white;
  border: 1px solid #EBEBEB;
  border-radius: 4px;
  &:focus {
    border-color: #FF6C58;
  }
  @media(min-width:768px){
    margin-top:0;
  }
  @media(min-width:1025px){
    margin-top:0;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

MultiSelectStyled.PlaceHolder = styled.span`
  font-family: 'Avenir-Regular';
  color: #6d6d6d;
  font-size: 14px;
`;

export default MultiSelectStyled;
