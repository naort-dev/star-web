import styled from 'styled-components';

const FooterDiv = styled.div`
  display:flex;
  justify-content: space-between;
  background-color:white;
  z-index:1000;
 
`;
FooterDiv.BookingLeft = styled.div`
  font-size:14px;
  color:#333333;
`;
FooterDiv.BookingPrice = styled.div`
  color:#333333;
  font-size:14px;
`;
FooterDiv.Button = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
  margin-top: -5px;
`;

export default FooterDiv;
