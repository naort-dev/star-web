import styled from 'styled-components';

const HeaderSection = styled.div`
  padding: 3px 15px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 8px 2px rgba(51, 51, 51, 0.1);
  
`;
HeaderSection.LogoImage = styled.img`
  width:100px;
  height:45px;
  @media(min-width:1025px){
    width:160px;
    height:60px;
  }
`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: #333333;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Medium';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
  &:hover {
    color :#FF6C58;
  }
  @media(min-width:1025px){
    font-size:14px
  }
  @media(min-width:1920px){
    font-size:18px;
  }
`;

export { HeaderSection };
