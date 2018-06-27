import styled from 'styled-components';

const Request = styled.footer`
  padding: 28px 29px;
  @media(min-width:768px){
    padding:63px 50px;
  }
  @media(min-width:1025px){
    padding: 110px 95px;
  }
  @media(min-width: 1920px){
    padding: 165px 188px;
  }
`;
Request.HeaderText = styled.div`
  text-align:center;
  color:#FF6C58;
  font-size:20px;
  font-family: 'Ubuntu-Bold';
  @media(min-width:768px){
    font-size:32px;
  }
  @media(min-width:1025px){
    font-size:20px;
  }
`;
Request.ButtonWrapper = styled.div`
  padding-top:29px;
  text-align:center;
  @media(min-width: 768px){
    padding-top:52px;
  }
`;
Request.Button = styled.button`
  width:100%;
  max-width:364px;
  height:56px;
  background-color:white;
  color:rgba(51, 51, 51, 1);
  border: 3px solid rgba(51, 51, 51, 0.72); 
  border-radius:19px;
  font-size:16px;
  font-family: 'Ubuntu-Medium';
  box-shadow: -2px 6px 8px rgba(0, 0, 0, 0.12);
  margin-bottom:25px;
  outline:none;
  cursor: pointer;
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width: 768px){
    max-width:500px;
    height:80px;
    font-size:28px;
    margin-bottom:40px;
  }
  @media(min-width: 1025px){
    max-width:325px;
    height:53px;
    font-size:20px;
  }
  @media(min-width:1920px){
    max-width: 475px;
  }
`;

export { Request };
