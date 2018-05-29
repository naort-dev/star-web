import styled from 'styled-components';

const HeaderSection = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  @media(min-width : 1025px){
    width: 660px;
  }
`;
HeaderSection.HeaderNavigation = styled.button`
  background-image: url( 'assets/images/icon_back_40a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  padding:20px;
  background-size: 26px;
  background-color:white;
`;
HeaderSection.MiddleDiv = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size : 13px;
  margin-left: 12%;
  @media(min-width : 1025px){
    margin-right: 20%;
  }

`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  padding: 6px 33px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  border: none;
`;

export default HeaderSection;
