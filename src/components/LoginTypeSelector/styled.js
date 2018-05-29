import styled from 'styled-components';

const TypeSelectorWrapper = styled.div`
  padding: 0px 25px;
  text-align: center;
  @media(min-width: 1025px){
    padding: 63px 25px;
  }
`;
TypeSelectorWrapper.Content = styled.div`
  padding: 28px 0px;
`;

TypeSelectorWrapper.heading = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size: 14px;
  color:#FF6C58;
  @media(min-width : 768px){
    font-size: 32px;
  }
  @media(min-width: 1025px){
    font-size: 16px;
  }
`;
TypeSelectorWrapper.subheading = styled.div`
  font-family: 'Ubuntu-Light';
  font-size: 12px;
  color:#333333;
  @media(min-width : 768px){
    font-size: 16px;
  }
  @media(min-width: 1025px){
    font-size: 13px;
  }
`;
TypeSelectorWrapper.Button = styled.button`
  padding: 10px 10px;
  outline:none;
  border: 2px solid #333333; 
  background-color: white;
  border-radius: 13px;
  margin-top: 6%;
  font-family: 'Ubuntu-Medium';
  font-size:13px;
  color: #333333;
  width: 100%;
  text-align:center;
  cursor: pointer;
  
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width : 768px){
    font-size:22px;
    width: 490px;
  }
  @media(min-width: 1025px){
    font-size: 15px;
    width: 256px;
  }
`;

export default TypeSelectorWrapper;
